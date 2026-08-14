# 315 个产品页五语言 SEO 与 JSON-LD 生产审计

**日期：** 2026-08-14

## 覆盖范围

审计逐页检查 63 个产品的 EN、ES、DE、FR、AR 版本，共 315 个生产产品页。

| 检查项 | 结果 |
|---|---:|
| 审计页面 | 315 |
| 通过页面 | 315 |
| 问题页面 | 0 |
| 抓取超时 | 0 |
| 产品数量 | 63 |
| 语言数量 | 5 |

## 逐页验证项目

每个产品页面验证标题、Meta Description、canonical、五语言 hreflang 与 `x-default`、Open Graph 标题/描述/URL/locale、Twitter Card、Product JSON-LD、FAQPage JSON-LD、产品 ImageObject、`inLanguage`、`mainEntityOfPage` 以及图片权利元数据。

## 审计器校正

初次扫描报告的 hreflang 与阿拉伯语 Open Graph locale 问题均为审计器解析假设错误：Next.js 在生产 HTML 中输出 `hrefLang` 属性，阿拉伯语 locale 为 `ar_SA`。审计器已按实际生产输出修正并重跑，最终 315/315 页面通过。

## 复查命令

```bash
npm run audit:product-seo -- https://www.houseplus-ch.com /tmp/houseplus-product-seo-schema-audit
```
