# HousePlus Vercel Fast Origin Transfer 优化检查

日期：2026-09-07

## 结论

Vercel Usage 截图显示本计费周期 Fast Origin Transfer 为 **8.08GB / 10GB**，其中 **Outgoing 约 98.8%**，截图所示 9 月 7 日单日仍有 **525.04MB** 出站流量。该结构不是由多语言文章文本或 SEO 元标签造成的，主要风险来自生产页面资源请求，尤其是浏览器审计触发的图片/静态资源加载、Vercel `/_next/image` 首次生成的图片变体、缓存未命中，以及普通访客和搜索引擎流量。

本次检查确认：GitHub Actions 的移动端审计在每次 `push` 和 `pull_request` 上打开 Sitemap 中全部 600 个生产页面；Puppeteer 默认会加载页面媒体资源，因此会主动制造一批生产图片和静态资源请求。该审计只需要检查 viewport、溢出和 HTML 元数据，没有必要下载图片、字体和视频。

## 已实施的低风险优化

1. `scripts/audit-mobile-layout.mjs` 新增 `--max-urls=N`，支持确定性的均匀抽样，保证 Sitemap 中不同位置的路由仍被覆盖。
2. 移动布局审计阻断 `image`、`font`、`media` 请求，仅保留 HTML、CSS 和 JavaScript，用于维持布局脚本的有效性。图片尺寸和图片 SEO 仍由专门审计、图片 Sitemap 审计和 Web Vitals 审计负责。
3. `.github/workflows/houseplus-quality-gate.yml` 增加手动 `workflow_dispatch` 参数 `full_mobile_audit`。普通 push/PR 改为只审计 48 个均匀分布页面；需要全量审计时手动启用该参数。
4. `next.config.js` 移除了已废弃的 `houseplus-media-api.jack006hu.workers.dev` remote pattern，避免新旧媒体配置混淆。生产媒体域名仍为 `images.houseplus-ch.com`。

这些变更不修改：页面正文、标题、描述、canonical、hreflang、Open Graph、Twitter Card、JSON-LD、图片 Alt/Title、图片 Sitemap、索引策略或公开 URL，因此不会削弱 SEO。

## 验证结果

- 移动审计脚本通过 Node 语法检查。
- 生产 Sitemap 抽样运行：`checked: 2`, `available: 600`, `issueCount: 0`。
- Next.js 生产构建成功；公开页面继续以 Static/SSG 输出。
- 旧媒体 Worker URL 已从运行时图片配置移除。
- 完整 `pnpm test` 当前有一个与本次 FOT 优化无关的既有断言失败：测试要求视频播放器包含 `label="English visual descriptions"`，当前播放器代码未匹配该字符串。其余测试均通过；该问题应单独修复后再作为发布门禁。

## 仍需关注的主要风险

### 1. `next/image` 仍通过 Vercel 图片代理

生产 HTML 的图片 URL 仍是 `www.houseplus-ch.com/_next/image?...`。这意味着 Cloudflare `houseplus-media-v2` 并非浏览器的唯一图片交付链路。缓存命中时问题较小，但每个新宽度、格式或质量组合首次生成时，Vercel 仍可能产生源站传输。

抽样结果：同一 Hero 图片在浏览器 Accept 下的 Vercel AVIF 缓存响应约 50KB；Cloudflare Worker 直接 WebP 响应约 122KB。不能仅按单张文件大小决定切换，因为 Vercel AVIF 更小；是否切换应以 Vercel Usage 的图片请求/源站传输实际数据为准。

### 2. Middleware

Middleware matcher 已排除 `/_next/static`、`/_next/image`、Sitemap、robots 和 favicon，未发现它直接处理图片代理请求。公开语言页仍会经过 Middleware，主要用于安全响应头、旧 URL 永久重定向和语言请求头。当前没有证据表明它是本周期 8GB 的主要来源，不建议为省流量删除重定向或语言结构。

### 3. 自动化审计

移动布局审计是本次最明确的可控消耗源。Web Vitals 只覆盖首页、产品页和一篇文章页，规模合理；HTML/SEO 审计主要请求文档，不会像 Puppeteer 一样加载整页图片。全量移动审计仍应保留为手动或低频任务。

## 后续 P1 建议

1. 在 Vercel Usage 的 Projects/Regions/Direction 视图记录每天 Outgoing 数值，并与 GitHub Actions 运行时间对齐。没有这一步，无法把 8.08GB 精确归因到图片、审计或真实访客。
2. 比较两种图片方案：继续使用 Vercel `/_next/image`，或为 `images.houseplus-ch.com` 统一封装 HousePlus 图片 loader，浏览器直接访问 `houseplus-media-v2`。切换前必须比较 LCP、AVIF/WebP、响应式尺寸、缓存命中率和移动端 CLS。
3. 若采用直出 Cloudflare，先只在一个非 LCP 文章封面和一个首页次要图片做灰度验证，不要一次性把 Hero 全部切换。
4. 为 Cloudflare Worker 增加明确的响应指标采集，例如 `x-houseplus-cache` 命中/未命中计数，以及统一宽度变体，避免把所有设备都返回同一个大图。
5. 暂不修改 SEO 相关的 `alt`、`title`、图片 Schema、图片 Sitemap 和公开 URL；这些不是当前出站流量的主要来源。

## 不建议的做法

- 不要删除图片 Sitemap。
- 不要把图片全部退回没有尺寸的原生 `<img>`。
- 不要为了省 FOT 删除首页首屏图片或改变 legacy Hero URL。
- 不要把 600 页面移动审计从 CI 完全删除；抽样 + 手动全量更适合长期维护。
- 不要仅凭一次 Usage 截图就全量切换图片 CDN；先用 Vercel Usage 和 Cloudflare 命中数据做对照。
