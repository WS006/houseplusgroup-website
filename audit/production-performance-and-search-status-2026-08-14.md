# HousePlus 生产性能与搜索状态核验报告

**核验日期：**2026-08-14（GMT+8）  
**范围：**`www.houseplus-ch.com` 五语言站点、全部 545 个规范 URL，以及独立搜索监测器的 Google Search Console、Bing 与 IndexNow 数据。

## 执行结论

本轮验证确认，主站最近的响应式图片优化已经在生产环境生效；西班牙产品页的移动端性能提升明显，英文首页的 LCP 也有改善。针对德语长复合词导致的移动端横向滚动，已发布安全断词规则，并对 sitemap 内 **545 个规范页面**实施 390×844 视口终审，结果为 **0 个横向溢出或页面加载异常**。[1]

Google Search Console 的最新 30 天采集周期已获得真实数据，说明服务账号、API 与定时采集链路正常。Bing 数据亦已落库，但目前样本规模仍较小，尚不适合就排名趋势作出强结论。IndexNow 最近三次有状态提交均收到 Bing `200`、Yandex `200` 与 Google Search Console `204` 回执；这些状态证明接收成功，不等同于即时收录。[2]

## 本轮生产变更与回归结果

| 项目 | 已完成工作 | 生产核验结果 |
|---|---|---|
| 响应式图片 | 首页轮播、行业卡片与产品首图使用 Next Image；首张轮播图优先加载，其余延迟加载 | 已发布；西班牙产品页移动端 Lighthouse 分数为 **83** |
| 移动端性能 | 复测英文首页与西班牙产品页 | 首页：性能 **71**、LCP **3.309s**；产品页：性能 **83**、LCP **3.186s** |
| 德语移动端布局 | 修复关闭状态在线服务浮层的可收缩宽度；为移动端 `h1–h3` 增加 `overflow-wrap:anywhere` 与自动断词 | 全量 545 页 390px 视口审计：**0 个问题** |
| 自动化回归 | 扩展图片/移动端测试：服务浮层收缩与本地化长标题换行 | `npm run test`：**26/26 通过** |

> Lighthouse 是实验室环境采样，不应与真实用户现场数据混为一谈。它适合比较同一测试环境下的部署前后变化；持续用户体验应结合 Search Console 与后续真实用户指标观察。[3]

## Google Search Console 表现基线

监测器于 2026-08-14 02:00 UTC 完成定时采集，统计区间为 **2026-07-13 至 2026-08-11**。该周期记录 **864 次展示、7 次点击、0.81% CTR、平均排名 17.91**。这是一份可用于后续按 7/30/90 天比较的真实基线。[2]

| 优先页面或查询 | 展示 | 点击 | CTR | 平均排名 | 解读 |
|---|---:|---:|---:|---:|---|
| `/en/brand` | 318 | 0 | 0.00% | 8.87 | 已进入较高可见区，应优先优化品牌页标题、描述与首屏价值主张以改善 CTR。 |
| `/en` | 272 | 3 | 1.10% | 8.83 | 首页具备可见性基础，宜继续强化 B2B 厂商、品类与询盘价值表述。 |
| `houseplus co ltd` | 402 | 0 | 0.00% | 8.22 | 高品牌意图、零点击；应优先核对站点名称、组织 Schema、品牌页元描述与搜索片段。 |
| `houseplus` | 89 | 3 | 3.37% | 6.60 | 已带来点击，是最有效的品牌查询之一。 |
| `/de` | 46 | 0 | 0.00% | 41.70 | 德语首页已被发现，但可见性仍在早期，应持续观察本地化内容的收录与查询扩展。 |

建议的下一轮内容动作是：先围绕 **“houseplus co ltd”** 与 `/en/brand` 提升品牌实体信号和搜索摘要的可点击性，再观察 14 天以上的 CTR 变化。由于当前总点击量仍低，单日波动不应被误判为趋势。

## Bing 与 IndexNow 状态

| 渠道 | 当前状态 | 证据与建议 |
|---|---|---|
| Bing Webmaster | 已完成数据采集 | D1 中已采集 2026-01-17 至 2026-08-11 的累计 **304 次展示、8 次点击**。近期 2026-08-07 至 2026-08-11 有持续数据，说明连接可用；因样本有限，建议以周或月而非日为粒度评估。 |
| IndexNow → Bing | 接收成功 | 最近三次有状态批次均返回 `200`。 |
| IndexNow → Yandex | 接收成功 | 最近三次有状态批次均返回 `200`。 |
| IndexNow → Google Search Console | 接收成功 | 最近三次有状态批次均返回 `204`；此为接口接收状态，不表示即时索引完成。 |

## Sitemap 与 Feed 核验

以下端点已从生产站点直接复核。主 sitemap、图片 sitemap 与 RSS feed 当前均返回 `200`，可由爬虫获取。[1]

| URL | 当前 HTTP 状态 | Search Console 最近记录 | 处理结论 |
|---|---:|---|---|
| `/sitemap.xml` | 200 | 0 错误，已下载 | 保留，当前规范主 sitemap。 |
| `/image-sitemap.xml` | 200 | 0 错误，已下载 | 保留，继续用于图片发现。 |
| `/feed.xml` | 200 | 0 错误，已下载 | 保留。 |
| `/merchant-feed.xm` | 404 | 1 错误、待处理 | 这是少一个 `l` 的历史错误 URL，应从 Google Search Console 的已提交 sitemap 列表中移除。 |
| `/merchant-feed.xml` | 410 | 1 错误 | 当前为明确退役端点；若不计划恢复 Merchant feed，应从 Search Console 列表中移除，避免持续错误。 |
| `/news-sitemap.xml` | 404 | 非 www 历史条目有错误 | 当前新闻 URL 已由主 sitemap 覆盖；应清理该历史提交。 |
| `https://houseplus-ch.com/sitemap.xml` | 307 | 历史非 www 记录 | 站点应继续统一到 `https://www.houseplus-ch.com/sitemap.xml`。 |

> 清理 Search Console 中的错误 sitemap 提交属于平台后台状态整理，不会删除网站页面或已收录 URL。清理后保留唯一的 `www` 规范 sitemap 与可用图片 sitemap 即可。[4]

## 后续优先级

| 优先级 | 行动 | 预期作用 |
|---|---|---|
| P1 | 在 Google Search Console 移除 `merchant-feed.xm`、已退役 `merchant-feed.xml`、历史 `news-sitemap.xml` 与非 www sitemap 提交项 | 清除监测面板中持续出现的历史错误，避免将平台配置遗留误判为抓取阻塞。 |
| P1 | 用户在 Bing Webmaster Tools 中轮换曾暴露的 API Key，并将新值仅保存为 Cloudflare Worker Secret | 防止泄露凭据继续有效。 |
| P2 | 对 `/en/brand` 和 `/en` 的标题、描述及品牌实体表达做 CTR 导向微调；两周后对比 GSC 数据 | 利用已处于前 10 位附近的品牌可见性，提高点击率。 |
| P2 | 继续记录 7/30/90 天 Google 与 Bing 数据，并以同一周期对比变化 | 在样本量有限时减少短期波动带来的误判。 |
| P3 | 评估首页 logo 是否可提供 WebP/AVIF 源文件；Lighthouse 仍提示约 54KB 响应式字节和约 39KB 现代格式节省空间 | 进一步降低首页移动端图片传输量；不影响已验证的布局与产品页改进。 |

## 参考资料

[1]: https://www.houseplus-ch.com/sitemap.xml "HousePlus production sitemap"
[2]: https://monitor.houseplus-ch.com "HousePlus independent search performance monitor"
[3]: https://developer.chrome.com/docs/lighthouse/performance/performance-scoring "Lighthouse performance scoring documentation"
[4]: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap "Google Search Central: Build and submit a sitemap"
