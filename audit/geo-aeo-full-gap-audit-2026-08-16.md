# HousePlus GEO/AEO 全量缺口审计与执行记录

**审计日期：** 2026-08-16  
**范围：** `www.houseplus-ch.com` 的品牌实体、产品、内容、五语言页面、结构化数据、AI 抓取入口、Sitemap、AI 来源监测及站外权威信号。  
**结论：** 站内可控 GEO/AEO 基础已补齐；后续影响 AI 推荐与引用率的主要瓶颈转为 Google/AI 引擎重新抓取、真实商业资料与独立第三方提及。

## 1. 已验证的站内基础

| 能力层 | 审计结果 | 当前状态 |
|---|---|---|
| 品牌实体 | Organization、Brand、Logo、PostalAddress、ContactPoint、OfferCatalog 和经过官网页脚核验的 `sameAs` 已关联 | 已完成 |
| 多语言实体 | EN、ES、DE、FR、AR 具备规范 URL、hreflang 和本地化品牌/产品内容 | 已完成 |
| 产品可引用性 | 63 个产品、5 种语言、共 315 个生产产品页的 Product、FAQPage、ImageObject、HowTo 审计通过 | 已完成 |
| 图片与媒体 | 产品主图关联 ImageObject、权利元数据、图片 Sitemap 和 R2 规范媒体 URL | 已完成 |
| AI 检索抓取 | GPTBot、OAI-SearchBot、PerplexityBot、ClaudeBot、Claude-SearchBot、Claude-User 等公开资源规则明确允许 | 已完成 |
| AI 来源观测 | 已接入无个人标识的 `ai_referral_landing` 事件，记录 AI 来源主机和落地路径 | 已完成 |
| 机器可读入口 | `llms.txt`、Sitemap、图片 Sitemap、RSS、robots.txt 和产品 Feed 均已公开 | 已完成 |

## 2. 本轮直接实施的可控修复

| 修复项 | 实施内容 | 解决的缺口 |
|---|---|---|
| OpenAI 搜索发现 | 明确添加 `OAI-SearchBot` 规则，并开放品牌、产品、新闻、服务、`llms.txt` 和图片 Sitemap | 防止 ChatGPT Search 的检索机器人因策略不明而降低可发现性 |
| Claude 搜索发现 | 明确添加 `Claude-SearchBot` 与 `Claude-User` 规则；保留 ClaudeBot 规则 | 覆盖 Anthropic 的搜索索引与用户触发检索入口 |
| 可引用事实边界 | 从 `llms.txt` 移除未在确认资料中固化的团队人数和起订量表述，改为产品/订单级报价确认原则 | 避免 AI 引擎放大未经核实的商业事实 |
| 多语言权威来源 | 在 `llms.txt` 列出五种语言的 Brand 与 Products 规范入口 | 帮助区域语言查询匹配到本地化来源 |
| 产品更新发现 | 主 Sitemap 为首页、品牌、核心实体页和所有产品详情设置 `2026-08-16` 的更新信号 | 促使搜索引擎重新发现实体、规格和采购流程更新 |
| 结构化数据告警 | 为 HowTo 的 `mainEntityOfPage` 增加 `inLanguage` | 消除多语言页面中 WebPage 语言字段缺失的审计告警 |
| AI 流量测量 | 新增 AI 来源事件，不收集查询内容、Cookie 或个人标识 | 让 Vercel Analytics 可查看 ChatGPT、Perplexity、Copilot、Claude 和 Gemini 的实际推荐流量 |

## 3. 不能用代码“直接触发”的剩余缺口

| 类别 | 当前缺口 | 所需真实条件 | 后续动作 |
|---|---|---|---|
| 独立第三方引用 | AI 泛品类推荐仍更倾向于大型目录、行业媒体和已有权威来源 | 真实的行业目录资料、协会/展会信息、客户案例或媒体报道 | 以一致的 HousePlus Group 实体、官网 URL、工厂地址和已核验产品范围提交到可信渠道 |
| Merchant opportunities | 不应为所有 B2B 产品展示零售购物信号 | 真实且持续维护的价格、库存、结账链接、运费与退货政策 | 仅对确有零售交易能力的 SKU 同步 Merchant Center / Shopify 数据 |
| 评价富媒体 | 当前没有可验证的第一方或第三方客户评价数据 | 真实、可追溯、获授权的客户评价 | 建立合规收集与展示流程；不得编造评分、评价或案例 |
| Core Web Vitals | 需要足够真实用户样本才会形成 GSC URL 组结论 | CrUX 真实访问数据 | 持续观察 Mobile / Desktop 报告；优化以真实 LCP、INP、CLS 问题为准 |
| AI 答案引用 | Schema 和机器人许可只提供资格，不保证模型必然提及 | 引擎抓取、检索相关性、外部信任信号和买家查询需求 | 每月固定 Prompt 测试并对比品牌提及、官网引用和落地页来源 |

## 4. 持续运营路线

| 周期 | 应执行事项 | 验收方式 |
|---|---|---|
| 每次发布产品或新闻 | 复核 canonical、hreflang、Product/Article/ImageObject 和可见内容一致性；更新 Sitemap | 自动化测试、生产 URL Inspection、Sitemap 处理状态 |
| 每周 | 查看 GSC Page indexing、Core Web Vitals、Breadcrumbs、Image Metadata、Product snippets、Merchant listings | 新增索引数、覆盖错误、增强项有效 URL 变化 |
| 每月 | 使用固定采购 Prompt 测试 ChatGPT Search、Perplexity、Google AI 搜索、Bing/Copilot 与 Claude 搜索 | 记录品牌提及、官网引用、引用落地页、事实准确性和竞品来源 |
| 每季度 | 审核 `sameAs`、第三方目录、真实案例、认证文件、零售数据和品牌事实 | 只保留可验证、仍然有效的实体和商业信息 |

## 5. 官方依据与边界

OpenAI 说明 `OAI-SearchBot` 用于让网站出现在 ChatGPT 搜索功能中，且与训练用途的 GPTBot 独立管理。[1] Anthropic 说明 Claude-SearchBot 用于提升用户搜索结果相关性，Claude-User 用于用户触发的网页访问，二者均遵守 robots.txt 规则。[2] Google 的结构化数据文档说明结构化数据提供富媒体资格而不保证展示，因此本次实现以事实可验证、页面可见一致和可重抓取为准，而不承诺必然获得 AI 引用或富媒体展示。[3]

## References

[1]: https://developers.openai.com/api/docs/bots "OpenAI crawler documentation"

[2]: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler "Anthropic crawler documentation"

[3]: https://developers.google.com/search/docs/appearance/structured-data/search-gallery "Google Search structured data gallery"
