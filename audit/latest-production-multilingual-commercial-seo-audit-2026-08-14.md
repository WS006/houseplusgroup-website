# HousePlus 最新生产五语言、商业资料与 SEO/Schema 复审

**日期：** 2026-08-14

## 覆盖范围

本次复审针对最新生产版本的 545 个 sitemap URL。五种语言各 109 个页面；可见内容、语言属性和 RTL 审计覆盖全部 436 个非英语页面。

## 生产结果

| 审计项目 | 结果 |
|---|---:|
| 非英语页面 HTML `lang` 不匹配 | 0 |
| 阿拉伯语 RTL 缺失 | 0 |
| 非英语页面可见英文 UI 回退 | 0 |
| SEO/Schema 审计 URL | 545 |
| SEO/Schema 错误 | 0 |
| SEO/Schema 警告 | 0 |
| 产品固定商业资料审计页面 | 225 |
| 产品固定商业资料缺失展示 | 0 |
| 自动化回归测试 | 19/19 通过 |

## 商业资料边界

已确认资料的 45 个产品在五种语言中展示各自已有的 MOQ、交期、保修和适用认证。没有固定资料的 18 个产品仍保持报价确认模式，不推断或复制其他型号数值。企业级固定事实显示为生产面积 20,000 m²、始于 2010 年、441+ 批发客户和 53+ 国家/市场。

## 可复现审计

```bash
node scripts/audit-visible-localization.mjs https://www.houseplus-ch.com/sitemap.xml /tmp/houseplus-visible-localization-audit
node scripts/audit-production-seo-schema.mjs https://www.houseplus-ch.com/sitemap.xml /tmp/houseplus-seo-schema-audit
node scripts/audit-production-commercial-terms.mjs https://www.houseplus-ch.com /tmp/houseplus-commercial-terms-audit
```
