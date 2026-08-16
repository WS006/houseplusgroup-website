# Google Search Console 索引与体验基线

> 来源：用户提供的 Google Search Console「Page indexing」截图，页面显示的最后更新时间为 **2026-08-07**。该截图为分析输入，不代表实时 API 数据。

| 指标 | 截图值 | 说明 |
|---|---:|---|
| 已编入索引 | 307 | Google 已确认编入索引的 URL 数量 |
| 未编入索引 | 542 | 共显示 10 类原因；需在 Search Console 明细中逐项分类，不能仅凭汇总数推断原因 |
| 已知页面 | 849 | 由上述两类汇总得出 |
| 增强项 | Breadcrumbs、Image Metadata | 左侧导航表明已启用并需要检查是否存在警告 |
| Shopping | Product snippets、Merchant listings、Merchant opportunities | 需基于真实价格、库存与商品落地页数据补齐，不能虚构零售数据 |

## 已确认能力边界

- 当前独立 Search Monitor 可读取 Google Search Console 的搜索表现与站点地图状态，但其界面明确不估算 API 未提供的索引总数或覆盖原因。
- Google Search Console 的 Indexing/Coverage 报告需要从已登录后台读取具体「未编入索引的原因」和样例 URL；截图显示的 10 类原因尚未取得明细。

## 服务账号 API 基线（2026-08-16）

| 项目 | 结果 |
|---|---|
| Search Analytics 时间范围 | 2026-07-17 至 2026-08-13（最终化数据） |
| 展示 / 点击 / CTR / 平均排名 | 878 / 8 / 0.91% / 18.64 |
| 规范 Sitemap | `sitemap.xml`、`image-sitemap.xml`、`feed.xml`，均已处理、0 警告、0 错误 |
| 清理的错误历史提交 | `merchant-feed.xm`、`merchant-feed.xml`、旧非 www 的 `news-sitemap.xml` / `sitemap.xml` / 根 URL |
| URL Inspection 分层抽样 | 120 个规范 Sitemap URL：58 个“Submitted and indexed”、25 个“Discovered - currently not indexed”、7 个“Crawled - currently not indexed”、9 个“Google chose different canonical”、8 个“URL is unknown to Google”、1 个重定向；另有 12 个 API 请求超时/失败，需要重试 |
| 富媒体发现 | Breadcrumbs 40、Product snippets 20、Merchant listings 20、Image Metadata 2 |

## Google 官方规则摘要

- Google 明确指出：页面索引报告不要求 100% URL 被索引，应重点确保重要的规范 URL 被索引；重复页、替代页与重定向页不被索引通常是正常现象。来源为「网站」的问题优先修复。[Page indexing report](https://support.google.com/webmasters/answer/7440203?hl=en)
- Product snippets 适用于不能直接购买的产品页面；Merchant listings 适用于可在站内直接购买的页面。Merchant listings 的价格、库存、运输和退货等数据必须真实，不能为了获得报告而虚构。[Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product)
- Image Metadata 代表 Google 已发现页面图片相关信号。图片优化仍应使用 HTML `img`、图片 Sitemap、真实且描述性的 Alt 文本、相关页面上下文、`primaryImageOfPage` / `og:image` 与高质量图片。[Google Images SEO](https://developers.google.com/search/docs/appearance/google-images)
- Core Web Vitals 的推荐目标为 LCP ≤ 2.5 秒、INP < 200 毫秒、CLS < 0.1；Search Console 使用真实用户体验数据汇总，而不是单次实验室测试。[Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)
