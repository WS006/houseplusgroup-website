# HousePlus Search Console 技术审计记录（2026-08-16）

## 采样与证据

本记录基于 `sc-domain:houseplus-ch.com` 的服务账号 URL Inspection 抽样报告（120 个 URL）以及生产站点即时响应和浏览器性能条目。抽样报告的采集时间为 2026-08-16T14:35:13.555Z。

| 项目 | 结果 | 说明 |
|---|---:|---|
| 已提交且已编入索引 | 58 / 120 | 这些 URL 可被抓取且与用户指定规范 URL 一致。 |
| 已发现但尚未编入索引 | 25 / 120 | 主要集中在 8 月 11 日新增的家电产品页及部分新本地化路由；Google 尚未抓取，不应误判为 robots 阻止。 |
| 已抓取但尚未编入索引 | 7 / 120 | 包含 `/en/news/`、`/en/service/`、`/en/support/` 及部分英文产品页，需要在统一内容更新后重新提交。 |
| Google 选择其他规范 URL | 9 / 120 | 存在较早抓取时产生的跨语言规范选择；其中已确认 Sitemap 使用无尾斜杠 URL、生产路由则以 308 强制到尾斜杠，是可直接修复的信号冲突。 |
| 请求超时 | 12 / 120 | 属于 URL Inspection API 调用超时，不能视为网页错误，需小批重试。 |
| URL 尚未被 Google 识别 | 8 / 120 | 主要是近期扩展产品页，需保持在规范 Sitemap 中并建立足够内部链接。 |

## URL 规范化结论

生产环境确认：`/en`、`/en/about-us` 与 `/en/products/gas-stove-4-burner` 均返回 `308` 并重定向至尾斜杠 URL。已渲染页面的 `<link rel="canonical">` 与五种语言的 `hreflang` 均使用尾斜杠。

当前问题在于 `lib/urls.ts`、`app/sitemap.ts` 与 `app/image-sitemap.xml/route.ts` 的页面 URL 仍可能输出无尾斜杠形式，从而把搜索引擎的 Sitemap 抓取预算导向重定向 URL。下一步应将所有站点地图与 URL 提交批次统一为尾斜杠形式。

## 富媒体基线

| Search Console / Inspection 检测类型 | 已在抽样中发现 | 判断 |
|---|---:|---|
| Breadcrumbs | 40 / 120 | 已有效触发，应继续保持每个可索引页面的 BreadcrumbList。 |
| Product snippets | 20 / 120 | 已有效触发，说明 Product Schema 的基本商品字段可被识别。 |
| Merchant listings | 20 / 120 | 已有效触发；仅应在存在真实可购买报价时继续提供 Offer，禁止虚构价格或库存。 |
| Image Metadata | 2 / 120 | 相较此前未出现的状态，现已出现，是 R2 图片迁移、alt/OG 图和图片 Sitemap 组合信号开始被识别的正向变化；仍需扩大主图与文章图的 ImageObject 关联、确保图片 Sitemap 页 URL 规范。 |

潜在但尚未在此 120 URL 抽样中返回的报告类型包括 Article、FAQ 和 Organization 相关展示。其出现由 Google 的资格判断和实际搜索需求决定，部署 Schema 并不保证在 Search Console 报告中立即出现。视频、评价星级、价格下降等不应在缺少真实视频、真实评价或真实零售价格历史的情况下人为构造。

## 首屏性能基线

公开 PageSpeed Insights 接口返回配额耗尽（HTTP 429），因此本次未将实验室分数作为结论。浏览器在生产首页 `/en/` 的一次新加载中记录：HTML 首响应约 2,269 ms、DOM Content Loaded 约 4,310 ms、load 约 4,359 ms，LCP 候选为首张太阳能轮播图，约 4,340 ms。

首屏三张轮播图均在初始加载：首图约 92.98 KB、第二张约 79.89 KB、第三张约 54.64 KB；首图为预加载资源。优化优先级是只预加载活动首张首屏图，并将其余两张轮播图延后加载，保持显式图像尺寸以避免 CLS。该值仅为单次浏览器测量，必须在部署后用 CrUX 或 Search Console Core Web Vitals 长期观察确认。

## 部署后复验

生产版本已发布至 GitHub `main` 的提交 `0b47aad`。生产 XML Sitemap 与图片 Sitemap 已验证：所有抽样页面 `<loc>` 和 hreflang URL 均带尾斜杠；产品详情 HTML 同时输出尾斜杠 canonical、`ImageObject` 和 `primaryImageOfPage`。

服务账号已于 2026-08-16 14:51 UTC 重新提交 `sitemap.xml`、`image-sitemap.xml` 和 `feed.xml`。Search Console API 随后返回三个 Sitemap 均为 `processed`，且每个均为 0 warnings、0 errors。历史 `ja`、`da` 等非发布语言 URL 目前在生产环境返回 HTTP 404；报告中遗留的旧语言曝光和过往 canonical 选择将待 Google 重新抓取后自然出清。

更新后在浏览器中重新加载首页时，LCP 仍为首张太阳能英雄图，但记录约为 2,444 ms；第二、第三张轮播图分别在约 5,754 ms 和 10,754 ms 才创建图片请求，不再与首屏 LCP 图同时竞争。该测量来自单次缓存条件下的浏览器采样，说明加载策略已生效，但不能替代 Search Console 的 28 天真实用户 Core Web Vitals 评估。
