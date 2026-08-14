# 基础页面多语言与 Sitemap 差异审计

**日期：** 2026-08-14

## 发现

生产 sitemap 当前列出 EN 109 页，ES、DE、FR、AR 各 93 页。每种非英语语言少 16 页：首页及 About Us、Brand、Careers、Case Studies、Certifications、Contact、Factory、FAQ、News、OEM/ODM、Products、Regions、Service、Support、Team。

根因位于 `app/sitemap.ts`：基础静态页面调用 `buildUrlEntry(..., ['en'])`，源码注释说明这是为了避免索引仍依赖英文源文本的非英语回退页。

## 非英语基础页审计

已抓取 16 组页面的 ES、DE、FR、AR 版本，共 64 个 URL：全部返回 200，HTML `lang` 均与 URL 语言一致，阿拉伯语 `dir="rtl"` 正确。

但每种非英语版本有 9 个页面存在可见英文 UI 信号，涉及 `Get in Touch`、`Our Factory`、`Our Products`、`Request a Quote`、`View Details`、`Learn More` 或 `Wholesale Solutions`。基础页面的元标签还存在旧版未经核实的工厂面积、客户数、MOQ、交期、保修或认证承诺。

## 安全索引策略

在完整清理四语言可见正文、CTA、图片文字与元描述前，基础页面应继续排除在非英语 sitemap 外。不得仅因路径可访问或 HTML `lang` 正确而将英文回退页加入索引。

完成真实翻译和商业表述核验后，将 `app/sitemap.ts` 的基础静态页目标语言从 `['en']` 扩展为 `locales`；届时 sitemap 应为 545 条规范 URL，即每种语言 109 条。
