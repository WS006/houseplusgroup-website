# HousePlus 五语言与 SEO/Schema 终审

**日期：** 2026-08-14

## 覆盖范围

终审覆盖生产 sitemap 的 545 个规范 URL，其中 EN、ES、DE、FR、AR 各 109 个。可见内容审计覆盖全部 436 个非英语页面；SEO 和 JSON-LD 审计覆盖全部 545 个 URL。

## 结果

| 检查项 | 结果 |
|---|---:|
| 非英语页面 HTML `lang` 不匹配 | 0 |
| 阿拉伯语 RTL 缺失 | 0 |
| 非英语页面可见英文 UI 回退 | 0 |
| SEO 元标签/Schema 警告 | 0 |
| SEO 元标签/Schema 实际技术错误 | 0 |
| 并发审计暂时抓取失败 | 5，低并发重试均返回 200 |
| 自动化回归测试 | 18/18 通过 |

## 本轮确认并修复的问题

移动端首页截图显示右侧在线服务标签可能压到主视觉 CTA 的可点击右缘。组件现已在移动端移至底部安全区域，并在桌面端继续使用垂直居中位置。德语和法语服务标签也已改为本地化文本。

## 复查命令

```bash
node scripts/audit-visible-localization.mjs https://www.houseplus-ch.com/sitemap.xml /tmp/houseplus-visible-localization-audit
node scripts/audit-production-seo-schema.mjs https://www.houseplus-ch.com/sitemap.xml /tmp/houseplus-seo-schema-audit
```

新增或改动多语言页面后，应先运行上述两项检查，再进行代表性移动端视觉复查。
