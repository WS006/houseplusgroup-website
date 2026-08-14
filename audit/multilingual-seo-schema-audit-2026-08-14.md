# HousePlus 五语言 SEO 元标签与结构化数据审计

**审计日期：** 2026-08-14
**生产域名：** `https://www.houseplus-ch.com`
**审计范围：** 生产 sitemap 中全部 481 个规范 URL

| 语言 | 页面数 | 错误页面 | 警告页面 |
|---|---:|---:|---:|
| EN | 109 | 0 | 0 |
| ES | 93 | 0 | 0 |
| DE | 93 | 0 | 0 |
| FR | 93 | 0 | 0 |
| AR | 93 | 0 | 0 |
| **合计** | **481** | **0** | **0** |

## 检查项目

审计脚本逐页验证 HTML 语言与方向、页面标题、Meta Description、canonical、五语言 hreflang 与 `x-default`、Open Graph 标题/描述/URL/locale、Twitter Card 以及 JSON-LD 的页面类型与 `inLanguage` 一致性。

## 修复内容

1. 产品详情页和产品列表页新增语言化 `og:locale`、`og:locale:alternate`、Twitter `site`/`creator`。
2. 产品、FAQ、ItemList、文章主页面实体补齐 `inLanguage`；产品询盘 Schema 的目标 URL 与操作文本使用当前页面语言。
3. 九篇静态新闻向 Article Schema 显式传入语言化 URL，避免非英语文章的 `mainEntityOfPage` 被默认标记为英语。
4. 审计器将等价的有/无尾斜杠 URL 规范化后比较，避免错误报告 canonical 不一致。
5. 产品列表页 Meta Description 改为以产品资料、适用合规材料和按询盘确认的报价为核心，不再作未经核实的固定认证、MOQ 或订单承诺。

## 复查命令

```bash
node scripts/audit-production-seo-schema.mjs https://www.houseplus-ch.com/sitemap.xml /tmp/houseplus-seo-schema-audit
```
