# HousePlus：基于 Cloudflare R2 的媒体库、图片 SEO 与生成式引擎 GEO 实施方案

**修订结论：** HousePlus 已经使用 Cloudflare R2，因此不建议把原图批量迁移到 Storyblok、WordPress 或 Cloudinary。应继续以 **R2 作为原始资产和公开媒体 URL 的唯一存储层**，并在其上增加一个可视化的“媒体控制台（Media Control Plane）”。该控制台负责资产卡片、元数据、标签、审核、焦点裁切、页面引用与 SEO/GEO 发布；Cloudflare Images 用于动态缩放、压缩和裁切，Next.js/Vercel 继续负责网站前台、图片站点地图与结构化数据。

> **SEO** 是 Search Engine Optimization（搜索引擎优化）；**GEO** 是 Generative Engine Optimization（面向生成式搜索与 AI 问答引擎的内容可理解、可引用和可验证优化）。本方案不把 GEO 简化为图片地理标签或关键词堆砌。

## 一、为什么应以 R2 为中心，而不是重新迁移媒体

Cloudflare R2 是 S3 兼容的对象存储，可由 AWS S3 SDK 和标准工具访问；在自定义域名下可以启用缓存、安全控制和机器人管理。[1] [2] 它适合保存原图、派生图、PDF、证书、视频以及未来持续增长的媒体资产。HousePlus 当前图片资产的运营问题并不在于“缺少对象存储”，而在于 R2 的对象键、页面引用、SEO 文案和审批信息尚未组成一个可视化、可搜索的资产管理体系。

因此，R2 应继续保留为**文件真源**。需要补齐的是一个“资产元数据真源”，建议用 Cloudflare D1 保存，而不是把 alt 文本、焦点、产品关联和版权信息散落在 Next.js 代码、Excel 或对象名中。R2 内的对象只负责二进制文件，D1 负责检索、审核、语言、引用关系和发布状态；两者通过不可变 `asset_id` 与对象键关联。

Cloudflare Images 可直接对包括 R2 在内的任意 origin 图片进行边缘动态缩放、优化与裁切，无须预先为桌面、移动、列表卡片、社媒图各存一份完整文件。[3] 这能从根本上避免此前文章封面原图过大、卡片加载慢和裁切不一致的问题。

## 二、推荐目标架构

| 层级 | 推荐组件 | 核心责任 | 是否迁移现有图片 |
| --- | --- | --- | --- |
| 原始文件层 | **Cloudflare R2** | 存储原图、证书、PDF、视频与派生文件；保持稳定对象键 | 否，保留并整理现有桶。 |
| 媒体管理控制层 | **Cloudflare Workers + D1 + R2** | 可视化资产库、搜索、标签、审核、页面引用、语言化 alt、版权与焦点 | 否，只索引现有对象并逐步补齐元数据。 |
| 图片交付层 | **Cloudflare Images（R2 origin）** | 动态 WebP/AVIF、宽度变体、质量、焦点裁切、缓存 | 不复制原图；由 URL 规则动态处理。 |
| 前台展示层 | **现有 Next.js / Vercel 网站** | 从媒体 API 读取 Approved 资产及元数据，渲染图片与页面 | 保持现有路由与 UI。 |
| SEO/GEO 发布层 | **Next.js sitemap/schema/llms 路由 + 媒体 API** | 生成图片站点地图、`ImageObject`、`primaryImageOfPage`、`og:image`、页面主图和实体关联 | 自动从已批准资产生成。 |
| 权限层 | **Cloudflare Access / Workers 鉴权** | 仅授权运营人员管理、上传和发布素材 | 后台不公开。 |

可以把该方案理解为“WordPress Media Library 的工作体验 + R2 的存储弹性 + Cloudflare 的图片交付 + Next.js 的前台性能”，而不是再建立一个会与现有网站竞争的 CMS。

## 三、媒体控制台应具备的可视化能力

建议建立独立的内部入口，例如 `media.houseplus-ch.com` 或现有网站的受保护 `/admin/media`。第一个版本不需要复杂设计，但必须具备你截图中最关键的日常操作：网格浏览、拖拽上传、批量选择、搜索、筛选、详情面板、替代文本、标题、说明、版权、文件 URL 和引用页面。

| 功能区 | 需要呈现的字段或操作 | 对 SEO/GEO 的价值 |
| --- | --- | --- |
| 资产网格 | 缩略图、状态、文件名、分类、最近使用页面、最后修改时间 | 快速发现重复、错误、过期或不相关图片。 |
| 详情面板 | EN/ES/DE/FR/AR alt、title、caption、描述、原始来源、版权、许可证、到期日 | 使每张图片的文字语义有出处、可审核、可多语言发布。 |
| 页面关联 | 产品 SKU、文章 slug、页面 URL、主图角色、Open Graph 角色 | 防止一张图片被错误用于多个无关页面；支持正确 ImageObject 与图片站点地图。 |
| 构图管理 | 焦点坐标、推荐比例、桌面/移动预览、Hero/卡片/产品/社媒变体 | 保证主体在 16:9、1:1、4:5 和移动端裁切中完整可见。 |
| 发布状态 | Draft、Needs Review、Approved、Deprecated、Archived | 只有 Approved 且已经关联公开页面的图片进入站点地图和结构化数据。 |
| 质量与去重 | 宽高、大小、哈希、相似图候选、缺少 alt、缺少版权、未引用资产 | 防止上传重复图、超大图与无语义图片。 |
| 批量操作 | 批量标签、批量补全语言、导入 CSV、替换资产、重新生成变体 | 将现有资产盘点从代码修改转为运营动作。 |

## 四、建议的 R2 对象结构与 D1 元数据模型

R2 的对象键应具有稳定、可读、业务含义清晰的分区。对象键不是最终 SEO 文案，但可避免 `IMG_0001.jpg` 一类无意义文件。

```text
r2://houseplus-media/
  originals/
    products/solar/HP-SP500/2026-08/solar-panel-hp-sp500-front.jpg
    articles/2026/how-to-choose-solar-panel-manufacturer/hero.jpg
    factory/quality-control/solar-inverter-inspection.jpg
  derivatives/
    article-covers/{asset_id}/w1600.webp
    article-covers/{asset_id}/w960.webp
  documents/
    certifications/ce/HP-SP500-ce-certificate.pdf
```

D1 中建议使用至少四张表：`assets` 保存资产卡片，`asset_translations` 保存多语言 alt/title/caption，`asset_relations` 保存资产与产品/文章/页面实体的关系，`asset_versions` 保存替换与审核历史。`assets` 的核心字段应包括 `asset_id`、`r2_key`、`status`、`asset_type`、`topic`、`focal_x`、`focal_y`、`copyright_owner`、`source_url`、`license_scope`、`seo_indexable`、`original_width`、`original_height`、`content_hash`、`created_at` 和 `approved_at`。

这样做的关键收益是：图片元数据不再绑定某一处页面代码。文章主图替换时，运营人员只需在控制台变更关联资产并发布；系统再自动触发对应页面刷新、Open Graph 更新、图片 sitemap 重建和缓存失效。

## 五、图片 SEO 与 GEO 的强制发布规则

Google 指出，图片可通过标准 HTML 图片元素和图片站点地图被发现；图片所在页面、周边文本、描述性文件名、相关的 alt 文本、结构化数据和性能都会影响图片的理解与展现。[4] 因此，媒体控制台必须建立以下“不可绕过”的发布规则。

| 发布规则 | 实现方式 | 原因 |
| --- | --- | --- |
| 页面有且仅有一个代表性主图 | `asset_relations.role = primary_image` | 让 `og:image`、`primaryImageOfPage` 与 Article/Product 的 `image` 指向同一资产。 |
| 公共图片必须有审核后的英文 alt | `status=Approved` 前校验 | alt 描述“主体 + 与页面的关联”，不能关键词堆砌。[4] |
| 可索引图片必须有关联落地页 | `seo_indexable=true` 时要求 `asset_relations` 存在 | 图片 sitemap 的发现路径应对应真实、相关、可访问的网页。 |
| 每张文章封面唯一 | 对 `relation_type=article_hero` 加唯一约束 | 防止新闻列表出现相同或无关图片。 |
| 需要裁切的图片必须设置焦点 | Hero、文章封面和团队图设置 `focal_x/y` | 由 Cloudflare Images 生成不同宽高比时保留主体。 |
| 公开图片必须有权利来源 | `copyright_owner` 与 `license_scope` 必填 | 避免客户图、供应商图或摄影图片被无授权复用。 |
| 图片地图只包含已批准资产 | sitemap 查询 `status=Approved AND seo_indexable=true` | 避免把草稿、无关素材或不公开资产告知搜索引擎。 |

Google 当前图片站点地图要求的核心是 `<image:image>` 和 `<image:loc>`；`image:caption`、`image:geo_location`、`image:title` 与 `image:license` 已从该文档的推荐标签中移除。[5] 所以这些业务字段仍值得在媒体库保留，但 SEO 发布应把它们同步到页面可见文字、ImageObject、Product/Article JSON-LD 和 Open Graph，而不是依赖已弃用的 sitemap 标签。

对于 GEO，资产卡片应记录**可验证实体关系**，而不是产生夸张的图片关键词。例如，`HP-SP500` 的图片应关联具体产品 URL、SKU 和规格；工厂图片应关联公开的 Factory 页面；文章封面应关联对应文章。`llms.txt` 继续说明公司事实、产品范围与引用边界，媒体 API 则让页面、结构化数据和图片地图使用相同的资产真源。

## 六、Cloudflare Images 在本方案中的角色

Cloudflare Images 不是完整的媒体运营后台，也不应取代 R2 的原始资产管理；它是一个图像处理和分发层。其“bring your own storage”模式可对 R2 图片在边缘进行动态 resize、优化、格式转换和裁切。[3] 建议预设以下输出规则：

| 使用场景 | 输出规格 | 裁切策略 |
| --- | --- | --- |
| 新闻精选主图 | 1600×900，WebP/AVIF | 16:9，使用资产焦点。 |
| 新闻卡片 | 960×540，WebP/AVIF | 16:9，使用同一焦点。 |
| 产品卡片 | 800×800，WebP/AVIF | 1:1，产品主体优先。 |
| 产品详情主图 | 1400×1400，WebP/AVIF | 1:1，保留完整产品。 |
| 社媒 Open Graph | 1200×630，JPEG/WebP | 1.91:1，需独立预览审核。 |
| 移动端 Hero | 960×720，WebP/AVIF | 4:3，主体居中或自定义焦点。 |

Cloudflare Images 也支持托管图片和 API 级 `meta` 字段筛选，但如果现有素材已在 R2，首期不必再建立第二个 Cloudflare Images 原图副本。应优先采用 R2 原图 + Cloudflare Images 变换；只有当团队强烈需要 Cloudflare Images 自带托管媒体库的 UI，且接受新增资产副本/迁移时，才评估其托管模式。[3] [6]

## 七、实施路线图

### 第一阶段：R2 资产盘点与媒体控制台 MVP（1–2 周）

首先通过 Cloudflare R2 API 列出对象，建立 D1 资产清单。对现有图片执行哈希、尺寸、体积、文件名、引用页面、是否出现在图片 sitemap、是否存在 alt、是否有重复的审计。接着完成内部媒体库 MVP：资产网格、上传、详情编辑、搜索、状态、英文 alt/title、分类、页面关联和焦点设置。

此阶段应使用最小权限 R2 API Token：仅指定 bucket 的 Object Read & Write 权限；Cloudflare 官方也建议创建作用域到指定 bucket 的令牌。[2] 管理后台通过 Worker 获取临时上传 URL，浏览器不应直接持有 R2 密钥。

### 第二阶段：网站实时接入与 SEO/GEO 自动发布（2–3 周）

Next.js 新增 `media` 适配层。产品、文章、工厂、团队和品牌页面从媒体 API 获取 Approved 资产，而不是硬编码 `/images/...` 路径。发布 Approved 资产或替换主图时，Worker 触发 Vercel revalidation；图片 sitemap、JSON-LD `ImageObject`、Article/Product `image`、`og:image` 和多语言 alt 同步更新。

此时 Search Console 与 Bing Webmaster Tools 应成为运营看板数据源。关键 KPI 应包括：有效图片 landing page 数、Google Images impressions、Google Images clicks、图片 sitemap 抓取错误、核心产品主图被索引率、缺少 alt/版权/页面关联的资产数量。仅凭图片 sitemap 条目数不能证明实际收录。

### 第三阶段：审核、批量与增长功能（长期）

第三阶段加入 AI 生成 alt/标签建议但保持人工审核、相似图检测、批量 CSV 导入、版权到期提醒、经销商素材集合、多语言翻译队列和审批记录。如果视频、客户素材包、复杂营销审核和跨团队协作显著增加，再评估 Cloudinary DAM 或 Cloudflare Images 托管库；避免在第一阶段同时建立多个“资产真源”。

## 八、明确决策建议

**推荐选择：R2 + Workers + D1 媒体控制台 + Cloudflare Images + 现有 Next.js。** 这条路线保留现有存储投资，满足 WordPress Media Library 级别的日常可视化管理，同时把图片 SEO/GEO 从手工代码工作变成可审核、可查询、可持续的数据工作流。

**不推荐选择：仅使用 Cloudflare Dashboard 的 R2 对象列表。** 它可以浏览对象和管理桶，但无法提供 HousePlus 所需的页面引用、审核状态、多语言 alt、版权、焦点、产品关系、SEO 发布规则和内容质量看板。

**不推荐选择：仅为获得媒体库而迁移到 WordPress 或把所有原图复制到另一个 DAM。** 这会带来多份资产、URL 变更、同步复杂度和维护成本。应先以 R2 为文件真源，把运营能力补在其上。

## References

[1]: [Cloudflare R2 — Public buckets and custom domains](https://developers.cloudflare.com/r2/buckets/public-buckets/)

[2]: [Cloudflare R2 — S3-compatible API and scoped credentials](https://developers.cloudflare.com/r2/get-started/s3/)

[3]: [Cloudflare Images — Bring your own storage and image optimization](https://developers.cloudflare.com/images/)

[4]: [Google Search Central — Google image SEO best practices](https://developers.google.com/search/docs/appearance/google-images)

[5]: [Google Search Central — Image sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps)

[6]: [Cloudflare Images API — List images and metadata filtering](https://developers.cloudflare.com/api/resources/images/subresources/v2/methods/list/)
