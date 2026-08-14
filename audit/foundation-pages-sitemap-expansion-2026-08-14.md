# 基础页面四语言优化与 Sitemap 扩展验收

**日期：** 2026-08-14
**生产域名：** `https://www.houseplus-ch.com`

## 根因与修复

英文 sitemap 原有 109 条 URL，而 ES、DE、FR、AR 各有 93 条。差异来自首页及 15 组基础页面仅输出英文 sitemap 条目。非英语 URL 虽可访问，但此前共享英文回退内容或带有未核实商业陈述，因此被有意排除。

本次处理将基础页面更新为四语言、安全的 B2B 询盘内容，并从首页移除旧的工厂规模、客户数、国家数、保修、固定认证和固定 MOQ 等未经核实陈述。内部路由保持公开规范 URL 不变，并为每个非英语基础页面生成当前语言的标题、描述、canonical、hreflang、Open Graph、Twitter 元数据和 JSON-LD。

## 生产验收

| 项目 | 结果 |
|---|---:|
| 生产 sitemap 规范 URL | 545 |
| 每种语言 URL | 109 |
| 基础页面语言审计 | 64/64 可访问 |
| ES/DE/FR/AR HTML `lang` 不匹配 | 0 |
| AR `dir=rtl` 缺失 | 0 |
| 基础页面可见英文回退信号 | 0 |
| 全量 SEO/Schema 审计的技术错误 | 0 |
| 审计抓取超时 URL | 13，均以低并发重试返回 200 |

## 可复现检查

```bash
node scripts/audit-static-page-localization.mjs https://www.houseplus-ch.com /tmp/houseplus-static-page-localization
node scripts/audit-production-seo-schema.mjs https://www.houseplus-ch.com/sitemap.xml /tmp/houseplus-seo-schema-audit
```

后续新增基础页面时，应先提供 EN、ES、DE、FR、AR 的经审核标题、正文、元描述和可见 UI，再将该页面加入 sitemap。
