#!/usr/bin/env node
/**
 * HousePlus Merchant Center 集中管理工具
 * ============================================
 * 所有 Merchant Center 操作集中于此脚本，支持 CLI 和 GitHub Actions 自动化。
 *
 * 用法：
 *   node scripts/merchant-center-manager.js status      # 查看完整诊断
 *   node scripts/merchant-center-manager.js refetch     # 触发所有 Feed 重新抓取
 *   node scripts/merchant-center-manager.js fix         # 一键修复（触发抓取+等待+复查）
 *   node scripts/merchant-center-manager.js report      # 生成 JSON 诊断报告
 *   node scripts/merchant-center-manager.js feeds       # 查看 Feed 列表和状态
 *   node scripts/merchant-center-manager.js products    # 查看产品级问题
 *   node scripts/merchant-center-manager.js setup       # 打印配置指引
 *
 * 环境变量（.env 或 GitHub Secrets）：
 *   GOOGLE_SERVICE_ACCOUNT={"client_email":"...","private_key":"..."}  # Service Account JSON
 *   GOOGLE_MERCHANT_ID=575397679                                       # Merchant Center ID
 *
 * 一次性配置（约 5 分钟）：
 *   1. 在 Google Cloud Console 创建 Service Account（或复用已有的）
 *   2. 在 Merchant Center > Settings > Account access 添加 Service Account 邮箱为 Admin
 *   3. 把 Service Account JSON 和 Merchant ID 写入 .env
 */

const CONTENT_API = 'https://shoppingcontent.googleapis.com/content/v2.1';

// ============ 环境加载 ============
function loadEnv() {
  const fs = require('fs');
  const path = require('path');
  const candidates = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), '.env.local'),
    path.resolve(__dirname, '..', '.env'),
    path.resolve(__dirname, '..', '.env.local'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      for (const line of fs.readFileSync(c, 'utf8').split(/\r?\n/)) {
        if (!line || line.startsWith('#')) continue;
        const eq = line.indexOf('=');
        if (eq < 0) continue;
        const k = line.slice(0, eq).trim();
        let v = line.slice(eq + 1).trim();
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
        if (process.env[k] === undefined) process.env[k] = v;
      }
    }
  }
}

function getSA() {
  try { return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || 'null'); } catch { return null; }
}
function getMID() { return process.env.GOOGLE_MERCHANT_ID; }

// ============ 认证 ============
async function getToken(sa) {
  let jwt;
  try { jwt = require('jsonwebtoken'); } catch {
    console.error('❌ 缺少 jsonwebtoken 依赖。请运行: npm install jsonwebtoken');
    process.exit(1);
  }
  const payload = {
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/content',
    aud: 'https://oauth2.googleapis.com/token',
    exp: Math.floor(Date.now() / 1000) + 3600,
    iat: Math.floor(Date.now() / 1000),
  };
  const assertion = jwt.sign(payload, sa.private_key, { algorithm: 'RS256' });
  const resp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }),
  });
  const data = await resp.json();
  if (!data.access_token) throw new Error('获取 token 失败: ' + JSON.stringify(data));
  return data.access_token;
}

// ============ API 封装 ============
async function mc(method, path, body) {
  const sa = getSA();
  const mid = getMID();
  if (!sa || !sa.client_email) return { ok: false, status: 0, error: 'GOOGLE_SERVICE_ACCOUNT 未配置' };
  if (!mid) return { ok: false, status: 0, error: 'GOOGLE_MERCHANT_ID 未配置' };

  const token = await getToken(sa);
  const url = path.startsWith('https://') ? path : `${CONTENT_API}/${mid}${path}`;
  const resp = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await resp.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch {}
  if (!resp.ok) {
    const msg = data?.error?.message || text.slice(0, 300) || resp.statusText;
    return { ok: false, status: resp.status, error: msg };
  }
  return { ok: true, status: resp.status, data };
}

// ============ 命令实现 ============

async function cmdSetup() {
  const sa = getSA();
  console.log(`
╔══════════════════════════════════════════════════════════╗
║   Merchant Center 自动化管理 - 一次性配置指引            ║
╚══════════════════════════════════════════════════════════╝

▎第 1 步：获取 Service Account JSON（如已有可跳过）

  1. 打开 https://console.cloud.google.com/iam-admin/serviceaccounts
  2. 选择您的 Google Cloud 项目（与 Merchant Center 同一个）
  3. 点击 "+ CREATE SERVICE ACCOUNT"
  4. 名称输入: merchant-center-api
  5. 创建后 → 点击该账号 → "KEYS" 标签 → "ADD KEY" → "Create new key" → JSON
  6. 下载的 JSON 文件内容就是 GOOGLE_SERVICE_ACCOUNT 的值

▎第 2 步：把 Service Account 邮箱加入 Merchant Center

  1. 打开 https://merchants.google.com/mc/accountaccess?a=${getMID() || 'YOUR_MERCHANT_ID'}
  2. 点击 "+ Add user"
  3. 输入 Service Account 邮箱: ${sa?.client_email || '从 JSON 文件的 client_email 字段获取'}
  4. 角色选择: Admin
  5. 保存

▎第 3 步：配置环境变量

  在项目根目录 .env 文件中添加两行:

  GOOGLE_MERCHANT_ID=${getMID() || '575397679'}
  GOOGLE_SERVICE_ACCOUNT={"client_email":"xxx@xxx.iam.gserviceaccount.com","private_key":"-----BEGIN PRIVATE KEY-----\\n..."}

  ⚠️ 注意：private_key 中的换行符要用 \\n 表示

▎第 4 步：验证

  node scripts/merchant-center-manager.js status

  如果看到账号信息和 Feed 列表，说明配置成功！
`);
}

async function cmdStatus() {
  console.log('正在获取 Merchant Center 完整诊断...\n');

  // 1. 账号级问题
  console.log('━━━ 账号级问题 ━━━');
  const acc = await mc('GET', `${CONTENT_API}/${getMID()}/accountstatuses/${getMID()}`);
  if (!acc.ok) {
    console.log(`  ❌ ${acc.status} ${acc.error}`);
    if (acc.status === 401 || acc.status === 403) console.log('  → 请先运行 setup 命令配置 Service Account');
    return;
  }
  const issues = acc.data?.accountLevelIssues || [];
  if (issues.length === 0) console.log('  ✅ 无账号级问题');
  else issues.forEach(i => {
    const country = i.country ? ` [${i.country}]` : '';
    console.log(`  [${i.severity || 'info'}] ${i.title || i.detail || i.code}${country}`);
    if (i.suggestion) console.log(`    → ${i.suggestion}`);
  });

  // 2. Feed 列表 + 状态
  console.log('\n━━━ Feed 列表 ━━━');
  const feeds = await mc('GET', '/datafeeds');
  const feedList = feeds.data?.resources || [];
  if (feedList.length === 0) {
    console.log('  ⚠️ 未找到 Feed');
  } else {
    for (const f of feedList) {
      console.log(`  Feed ${f.id}: ${f.name} (${f.contentType})`);
      const fs = await mc('GET', `/datafeedstatuses/${f.id}`);
      if (fs.ok && fs.data?.datafeedStatus) {
        const s = fs.data.datafeedStatus;
        console.log(`    总数: ${s.itemsTotal}  ✅通过: ${s.itemsValid}  ❌错误: ${s.itemsInvalid}`);
        console.log(`    最后抓取: ${s.lastFetchDate || '未知'}`);
        if (s.errors) s.errors.slice(0, 5).forEach(e =>
          console.log(`    错误: [${e.count}次] ${e.code}: ${e.message}`)
        );
      }
    }
  }

  // 3. 产品级问题汇总
  console.log('\n━━━ 产品级问题 ━━━');
  const ps = await mc('GET', '/productstatuses?maxResults=250');
  const all = ps.data?.resources || [];
  const problematic = all.filter(p => (p.itemLevelIssues || []).length > 0);
  console.log(`  产品总数: ${all.length}  有问题: ${problematic.length}`);

  // 按问题类型分组统计
  const grouped = {};
  for (const p of problematic) {
    for (const ili of p.itemLevelIssues || []) {
      const key = ili.code || 'unknown';
      if (!grouped[key]) grouped[key] = { count: 0, severity: ili.severity, desc: ili.description || ili.title };
      grouped[key].count++;
    }
  }
  Object.values(grouped).sort((a, b) => b.count - a.count).forEach(g => {
    console.log(`  [${g.severity}] ${g.desc}: 影响 ${g.count} 个产品`);
  });

  console.log('\n━━━ 建议 ━━━');
  if (issues.some(i => (i.code || '').includes('korean') || (i.title || '').toLowerCase().includes('korean'))) {
    console.log('  • 韩国注册号: 在 MC 后台移除韩国目标国家，或添加注册号');
  }
  if (grouped['shipping']) console.log('  • 运费问题: 在 MC 后台设置运费模板 (shippingsettings)');
  if (grouped['currency']) console.log('  • 货币问题: 确认主货币为 USD，启用多国家上架');
  console.log('  • 运行 refetch 命令可触发 Feed 重新抓取');
}

async function cmdRefetch() {
  console.log('触发所有 Feed 重新抓取...\n');
  const list = await mc('GET', '/datafeeds');
  const feeds = list.data?.resources || [];
  if (feeds.length === 0) { console.log('❌ 未找到 Feed'); return; }
  for (const f of feeds) {
    const r = await mc('POST', `/datafeeds/${f.id}/fetchNow`);
    console.log(`${r.ok ? '✅' : '❌'} Feed ${f.id} (${f.name}): ${r.ok ? '已触发' : r.error}`);
  }
  console.log('\n⏳ Google 处理需要 10~60 分钟。稍后运行 status 查看结果。');
}

async function cmdFix() {
  console.log('一键修复流程启动...\n');
  console.log('第 1 步: 触发 Feed 重新抓取');
  await cmdRefetch();
  console.log('\n第 2 步: 等待 30 秒后检查状态...');
  await new Promise(r => setTimeout(r, 30000));
  console.log('\n第 3 步: 检查修复结果');
  await cmdStatus();
}

async function cmdReport() {
  const report = { timestamp: new Date().toISOString(), merchantId: getMID() };

  const acc = await mc('GET', `${CONTENT_API}/${getMID()}/accountstatuses/${getMID()}`);
  report.accountIssues = acc.data?.accountLevelIssues || [];

  const ps = await mc('GET', '/productstatuses?maxResults=250');
  report.productCount = (ps.data?.resources || []).length;
  report.problematicProducts = (ps.data?.resources || [])
    .filter(p => (p.itemLevelIssues || []).length > 0)
    .map(p => ({ id: p.productId, title: p.title, issues: p.itemLevelIssues }));

  const feeds = await mc('GET', '/datafeeds');
  report.feeds = (feeds.data?.resources || []).map(f => ({ id: f.id, name: f.name }));

  console.log(JSON.stringify(report, null, 2));
}

async function cmdFeeds() {
  console.log('Feed 列表:\n');
  const list = await mc('GET', '/datafeeds');
  const feeds = list.data?.resources || [];
  for (const f of feeds) {
    console.log(`  ID: ${f.id}`);
    console.log(`  名称: ${f.name}`);
    console.log(`  类型: ${f.contentType}`);
    console.log(`  抓取模式: ${f.fetchSchedule?.mode || 'manual'}`);
    console.log(`  URL: ${f.fetchSchedule?.fetchUri || 'N/A'}`);
    const fs = await mc('GET', `/datafeedstatuses/${f.id}`);
    if (fs.ok && fs.data?.datafeedStatus) {
      const s = fs.data.datafeedStatus;
      console.log(`  总数: ${s.itemsTotal}  通过: ${s.itemsValid}  错误: ${s.itemsInvalid}`);
      console.log(`  最后抓取: ${s.lastFetchDate || '未知'}`);
    }
    console.log('');
  }
}

async function cmdProducts() {
  console.log('产品级问题详情:\n');
  const ps = await mc('GET', '/productstatuses?maxResults=250');
  const all = ps.data?.resources || [];
  const problematic = all.filter(p => (p.itemLevelIssues || []).length > 0);
  if (problematic.length === 0) { console.log('✅ 所有产品均无问题！'); return; }
  for (const p of problematic) {
    console.log(`  ${p.productId}: ${p.title}`);
    for (const ili of p.itemLevelIssues || []) {
      console.log(`    [${ili.severity}] ${ili.code}: ${ili.description || ili.title}`);
    }
    console.log('');
  }
}

// ============ 主入口 ============
async function main() {
  loadEnv();
  const cmd = process.argv[2] || 'help';

  if (cmd === 'help' || cmd === '--help' || cmd === '-h') {
    console.log(`HousePlus Merchant Center 集中管理工具

用法:
  node scripts/merchant-center-manager.js <command>

命令:
  status     查看完整诊断（账号+Feed+产品）
  refetch    触发所有 Feed 重新抓取
  fix        一键修复（触发抓取+等待+复查）
  report     生成 JSON 诊断报告（适合自动化）
  feeds      查看 Feed 列表和状态
  products   查看产品级问题详情
  setup      打印一次性配置指引

环境变量:
  GOOGLE_SERVICE_ACCOUNT   Service Account JSON
  GOOGLE_MERCHANT_ID       Merchant Center ID`);
    return;
  }

  if (cmd === 'setup') return cmdSetup();

  // 其他命令需要认证
  if (!getSA() || !getMID()) {
    console.error('❌ 环境变量未配置。运行 setup 查看指引。');
    process.exit(1);
  }

  const commands = { status: cmdStatus, refetch: cmdRefetch, fix: cmdFix, report: cmdReport, feeds: cmdFeeds, products: cmdProducts };
  const fn = commands[cmd];
  if (!fn) { console.error('未知命令:', cmd); process.exit(1); }
  await fn();
}

main().catch(e => { console.error('错误:', e.message); process.exit(1); });
