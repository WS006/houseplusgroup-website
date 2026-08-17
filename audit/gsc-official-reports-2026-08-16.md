# Google Search Console 官方报告路径参考（2026-08-16）

Google 官方总览和报告目录：
- https://support.google.com/webmasters/answer/7451491?hl=en
- https://support.google.com/webmasters/topic/9456557?hl=en
- https://developers.google.com/search/docs/monitor-debug/search-console-start

用户提供的 Breadcrumbs 直接入口：
- https://search.google.com/search-console/r/breadcrumbs?resource_id=sc-domain%3Ahouseplus-ch.com

官方报告目录确认的模块：Overview、Performance reports、Page indexing、Video indexing、Sitemaps、Removals、Core Web Vitals、HTTPS、Rich results reports、Manual actions、Security issues、Links、Settings、Recommendations、Search Console annotations；Shopping 模块在条件满足时包含 Merchant opportunities、Product snippets、Merchant listings，Shipping and returns 位于 Settings > Shopping。

官方说明：
- Core Web Vitals 路径为 Search Console > Experience > Core Web Vitals，使用真实用户数据，指标为 LCP、INP、CLS。
- URL Inspection 可查看具体 URL 的索引状态、Google-selected canonical、抓取和结构化数据/增强项，但 URL on Google 不保证一定展示。
- Shopping reports 路径为 Shopping > Product snippets、Merchant listings、Merchant opportunities；是否显示取决于 Google 是否识别站点为 online merchant 和是否发现有效商品结构化数据。
- Google Search structured data gallery： https://developers.google.com/search/docs/appearance/structured-data/search-gallery
- Google Search Console data anomalies： https://support.google.com/webmasters/answer/6211453?hl=en
- Google 官方数据异常页显示，FAQ rich results 自 2026-05-07 起不再出现在 Google Search，应避免把 FAQ 报告作为当前 KPI。
- Google 生成式 AI 表现报告公告： https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports；该报告正在向部分网站逐步开放。

注意：`/r/...` 具体内部路由名称可能因 Google UI 版本、资源资格和账号权限变化；最稳妥的方式是先在 Search Console 左侧进入目标报告，再复制浏览器地址。资源参数必须使用 URL 编码的 `sc-domain%3Ahouseplus-ch.com`。
