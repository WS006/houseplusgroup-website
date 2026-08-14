# HousePlus 产品与文章联动审计及同步更新报告

**审计日期：**2026-08-15  
**发布提交：**`d54d1ca` — `Synchronize news discovery and add change-impact audits`

## 结论

本轮审计以近期产品、文章与零售/B2B 模式更新为范围，检查了五语言内容、规范 URL、新闻发现、RSS、图片站点地图、页面元数据、结构化数据、图片与搜索提交相关链路。已确认并修复的内容同步缺口均已通过自动化测试、生产构建与线上端点复测。

| 验证维度 | 生产或构建结果 | 结论 |
|---|---:|---|
| 规范 sitemap | 560 个 URL | 新增 3 篇文章 × 5 种语言已进入规范 URL 集合 |
| 产品 URL 与产品数据 | 63 / 63 | 无缺失数据、无遗漏 URL、本地化记录完整 |
| 文章系统 | 12 篇动态文章 + 17 篇静态文章 | 29 篇文章均已纳入新闻发现链路 |
| 新闻列表 | 17 篇静态文章均有卡片 | 4 篇此前未展示文章已补入五语言新闻列表 |
| RSS | 29 个 `<item>` | 已同时包含动态与静态文章 |
| 图片 sitemap | 97 个页面 URL、106 个图片条目 | 静态文章封面均使用现有 R2 媒体 URL |
| 多语言与 SEO | 560 URL 范围的既有审计通过 | 未发现标题、描述、canonical、hreflang 或 JSON-LD 阻断项 |
| 自动化测试 | 36 / 36 通过 | 覆盖新闻、产品、本地化、SEO、图片与新增联动审计 |
| 生产构建 | 通过 | Next.js 标准生产构建通过 |

## 本轮修复

此前有 3 篇已发布的静态文章没有出现在 `lib/urls.ts`。因此，这些文章虽可访问，但不会被主站五语言 sitemap 和批量 URL 提交逻辑自动覆盖。本轮已将以下文章纳入统一 URL 注册表，并为 sitemap 写入已知的最近修改日期：

| 文章 slug | 同步到的资产 |
|---|---|
| `appliance-energy-efficiency-vs-actual-consumption` | 五语言 sitemap、IndexNow URL 生成链路、新闻列表、RSS、图片 sitemap |
| `consumer-electronics-battery-life-testing` | 五语言 sitemap、IndexNow URL 生成链路、新闻列表、RSS、图片 sitemap |
| `solar-storage-efficiency-optimization-guide` | 五语言 sitemap、IndexNow URL 生成链路、新闻列表、RSS、图片 sitemap |

另外 4 篇可访问但未在新闻列表中出现的静态文章也已加入新闻卡片与图片 sitemap：`smart-home-appliances`、`solar-energy-storage-solutions`、`the-evolution-of-3c-electronics` 与 `the-future-of-solar-energy`。所有静态文章现由专用 RSS 清单覆盖，避免仅因其使用独立路由而从订阅与搜索发现通道中漏出。

## 长期防护

新增两项可重复执行的源代码审计。

| 命令 | 作用 |
|---|---|
| `pnpm run audit:change-impact` | 比对产品 URL、产品数据、产品本地化、动态/静态文章、新闻列表、图片 sitemap 与 RSS 的联动完整性 |
| `pnpm run audit:news-claims` | 扫描静态与动态文章中的认证、MOQ、交期、规模、区域仓与技术性能等需要证据确认的商业主张 |

> 建议将上述两个命令加入每次产品、文章、媒体或商业模式发布前的固定检查流程；只有 `blockingIssues: 0` 且 `syncWarnings: 0` 才提交更新。

## 生产复测

生产端点已确认输出新版资产。新增文章的非尾斜杠 URL 返回规范化 `308`，随后尾斜杠规范 URL 返回 `200`；页面包含 `BlogPosting`、FAQ、ImageObject 等相应 JSON-LD。生产 RSS 已返回 29 条文章，图片 sitemap 已增长为 97 个页面 URL 和 106 个图片条目。

## 仍需逐条内容证据治理的项目

文章商业主张审计仍识别到 **280 处**可能需要核验的陈述，分布于 29 个静态或动态文章源文件。该数量并不表示全部为错误；它表示这些陈述含有产品/型号特定认证、固定 MOQ、交期、规模、区域仓或性能数字，不能仅凭当前已授权企业事实自动确认。

| 类别 | 需核验次数 | 后续处理原则 |
|---|---:|---|
| 认证相关表述 | 180 | 仅在对应产品、型号或资料已确认时保留；其余改为“适用文件按产品和目的地确认” |
| MOQ、交期、区域仓等商业条款 | 34 | 改为按具体产品、数量、目的地和报价确认，除非有产品级授权数据 |
| 规模或性能数字 | 66 | 仅保留已授权的 `2010`、`20,000 m²`、`441+` 与 `53+` 企业事实；其他数字需来源证明或改为一般性说明 |

Merchant feed 仍暂不恢复为正式零售 feed，直至拥有每个零售 SKU 的真实价格、库存、购买链接、配送与退货数据。搜索监测面板已将其标记为“零售数据待就绪”，避免误判为普通 sitemap 故障。
