# 🌍 免费翻译 API 完整对比

## 📊 所有免费方案对比

| 方案 | API | 费用 | 信用卡 | 限制 | 质量 | 推荐度 |
|------|-----|------|--------|------|------|--------|
| **Langbly** | 在线 API | 免费 | ❌ 不需要 | 50万字符/月 | ⭐⭐⭐⭐⭐ | 🥇 **强烈推荐** |
| **LibreTranslate** | 开源 API | 免费 | ❌ 不需要 | 无限制 | ⭐⭐⭐ | 🥈 **备选方案** |
| **MyMemory** | 在线 API | 免费 | ❌ 不需要 | 1000次/天 | ⭐⭐ | 🥉 **备用** |

---

## 🥇 方案 1：Langbly（强烈推荐）

### 为什么选择 Langbly？

- ✅ **每月 50 万字符免费**（永久有效）
- ✅ **无需信用卡**（只需邮箱注册）
- ✅ **AI 驱动翻译质量高**
- ✅ **100+ 种语言支持**
- ✅ **使用简单**：只需注册获取 API Key

### 使用方法

**第一步：注册（30秒）**
1. 访问 [https://langbly.com/](https://langbly.com/)
2. 使用邮箱注册（免费！）
3. 获取 API Key

**第二步：本地使用**
```bash
export LANGBLY_API_KEY="your-key"
node scripts/auto-translate-langbly.js
```

**第三步：GitHub 自动翻译**
- 在 GitHub Secrets 添加 `LANGBLY_API_KEY`
- 编辑 `locales/en.json` 推送到 GitHub
- 系统自动创建 Pull Request

### 适用场景
- ✅ 中大型网站
- ✅ 需要稳定高质量翻译
- ✅ 希望自动化工作流

---

## 🥈 方案 2：LibreTranslate（备选方案）

### 为什么选择 LibreTranslate？

- ✅ **完全免费开源**
- ✅ **无需 API Key**
- ✅ **无使用限制**
- ✅ **可自托管**（保护隐私）
- ✅ **支持 50+ 种语言**

### 工作原理

LibreTranslate 使用**公开的 API 服务器**：
1. [https://libretranslate.com](https://libretranslate.com)
2. [https://translate.argosopentech.com](https://translate.argosopentech.com)
3. [https://translate.terraprint.co](https://translate.terraprint.co)

如果一个服务器失败，会自动尝试下一个。

### 使用方法

**本地使用（无需任何配置）**
```bash
node scripts/auto-translate-libretranslate.js
```

**GitHub 自动翻译**
- 系统已配置好工作流
- 无需添加任何 Secrets
- 直接推送即可自动翻译

### 优点
- ✅ **零配置**：无需注册、无需 API Key
- ✅ **无限使用**：没有请求次数限制
- ✅ **隐私保护**：可自托管，数据不外泄
- ✅ **开源透明**：代码可审计

### 缺点
- ⚠️ **依赖公开服务器**：可能不稳定
- ⚠️ **翻译质量一般**：不如 DeepL/Google
- ⚠️ **速度较慢**：需要轮询多个服务器

### 适用场景
- ✅ 小型网站或测试
- ✅ 预算极度紧张
- ✅ 对隐私要求极高
- ✅ 想要零配置快速体验

### 进阶：自托管 LibreTranslate

如果您有服务器，可以自己部署 LibreTranslate：

```bash
# 使用 Docker 部署
docker run -d \
  --name libretranslate \
  -p 5000:5000 \
  libretranslate/libretranslate

# 然后修改脚本使用您的服务器
# 编辑 scripts/auto-translate-libretranslate.js
# 将 LIBRE_TRANSLATE_SERVERS 改为您的服务器地址
```

自托管优势：
- 🚀 **速度更快**
- 🔒 **完全隐私**
- ⚙️ **可自定义模型**

---

## 🥉 方案 3：MyMemory（备用）

### 为什么选择 MyMemory？

- ✅ **无需注册**
- ✅ **无需信用卡**
- ✅ **直接可用**

### 限制
- ⚠️ **每日 1000 次请求**（约 30,000 字符）
- ⚠️ **适合小型更新**

### 使用方法

```bash
node scripts/auto-translate-mymemory.js
```

### 适用场景
- ✅ 极小型网站
- ✅ 测试翻译功能
- ✅ 偶尔少量更新

---

## 🎯 方案选择建议

### 根据您的需求选择：

| 您的需求 | 推荐方案 |
|---------|---------|
| **想要稳定好用** | 🥇 Langbly |
| **预算紧张/想零配置** | 🥈 LibreTranslate |
| **偶尔小更新** | 🥉 MyMemory |
| **需要最高质量** | 💎 付费 DeepL |
| **想要完全自控** | 🔧 LibreTranslate 自托管 |

### 推荐工作流

**小型更新（< 50 字符串）**
```bash
node scripts/auto-translate-libretranslate.js
```

**中大型更新（> 50 字符串）**
```bash
# 设置 Langbly API Key
export LANGBLY_API_KEY="your-key"
node scripts/auto-translate-langbly.js
```

**重要营销内容**
1. 先用 API 翻译
2. 人工审核
3. 提交到 GitHub

---

## 📈 成本-效益分析

| 方案 | 月度成本 | 月度字符 | 每百万字符成本 |
|------|---------|---------|--------------|
| Langbly | $0 | 500,000 | $0 |
| LibreTranslate | $0 | 无限制 | $0 |
| MyMemory | $0 | ~900,000 | $0 |
| DeepL | $20 | 无限 | $20+ |

---

## 🔧 GitHub Actions 自动翻译配置

所有方案都已配置好 GitHub Actions 工作流：

| 方案 | 工作流文件 | 需要 Secret |
|------|----------|-----------|
| Langbly | `auto-translate-langbly.yml` | ✅ `LANGBLY_API_KEY` |
| LibreTranslate | `auto-translate-libretranslate.yml` | ❌ 无需配置 |
| MyMemory | `auto-translate-free.yml` | ❌ 无需配置 |

**启用自动翻译：**
1. Langbly：添加 `LANGBLY_API_KEY` 到 GitHub Secrets
2. LibreTranslate/MyMemory：无需任何配置

---

## 💡 最佳实践

### 翻译质量优先级

1. **关键页面**：About Us、首页横幅、手册下载页
   → 建议人工翻译或使用 Langbly 后人工审核

2. **产品页面**：产品描述、规格参数
   → 可使用 Langbly 或 LibreTranslate

3. **UI 界面**：按钮文本、导航、错误信息
   → 可使用任何免费 API

4. **新闻/博客**：营销内容
   → 建议人工翻译或使用付费服务

### 翻译审核流程

```
英文内容编辑
    ↓
选择翻译方案
    ↓
API 自动翻译
    ↓
人工审核（重要内容必须）
    ↓
合并到主分支
    ↓
自动部署
```

---

## 🎉 总结建议

### 对于您的 B2B 外贸网站：

**推荐方案组合：**

1. **日常 UI 翻译** → 使用 **LibreTranslate**（零配置）
2. **重要内容翻译** → 使用 **Langbly**（高质量）
3. **人工审核** → 关键页面和营销文案

**立即开始：**

方案 A（推荐，想要稳定高质量）：
```bash
# 1. 注册 Langbly: https://langbly.com/
# 2. 设置 API Key
export LANGBLY_API_KEY="your-key"
# 3. 运行翻译
node scripts/auto-translate-langbly.js
```

方案 B（零配置快速体验）：
```bash
# 直接运行，无需任何配置
node scripts/auto-translate-libretranslate.js
```

---

## 📚 更多信息

- [Langbly 官网](https://langbly.com/)
- [LibreTranslate GitHub](https://github.com/LibreTranslate/LibreTranslate)
- [MyMemory API](https://mymemory.translated.net/doc/spec.php)

需要我帮您做其他的优化吗？
