# 非产品页面五语言 SEO 与 JSON-LD 生产审计

**日期：** 2026-08-14

## 范围

当前生产 sitemap 含 545 个规范 URL。已完成的产品页专项审计覆盖 315 个 URL；本次复查聚焦其余 230 个非产品 URL，包括首页、基础页面、分类页、地区页、新闻、服务与法律页面的五语言版本。

## 结果

| 检查项 | 结果 |
|---|---:|
| 全站 sitemap URL | 545 |
| 产品页 URL | 315 |
| 非产品 URL | 230 |
| 生产抓取成功 URL | 545 |
| SEO/Schema 错误 | 0 |
| SEO/Schema 警告 | 0 |
| 各语言页面数 | EN、ES、DE、FR、AR 各 109 |

全量审计逐页检查标题、Meta Description、canonical、hreflang 与 `x-default`、Open Graph、Twitter Card、JSON-LD 类型和语言一致性。由于产品页专项审计和本次全量审计均为零问题，非产品页面没有发现独立的元标签或结构化数据异常。

## 复查命令

```bash
node scripts/audit-production-seo-schema.mjs https://www.houseplus-ch.com/sitemap.xml /tmp/houseplus-nonproduct-seo-schema-audit
```
