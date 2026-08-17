# HousePlus 专属生成式引擎优化 (GEO) 与问答引擎优化 (AEO) 实战策略手册

## 一、 引言与核心目标
随着全球 B2B 采购商越来越多地通过 ChatGPT Search、Perplexity、Google AI Overviews 与 Bing Copilot 获取供应商推荐和行业洞察，传统的纯 SEO 已经不足以保证品牌在 AI 生成结果中占据领先地位。本手册针对 HousePlus（太阳能系统、家电、3C 电子垂直制造）当前的实际 AI 搜索基线，制定了一套系统、可落地的分层 GEO/AEO 优化策略。

---

## 二、 四大核心优化策略

### 1. 品牌实体加固与知识图谱对齐 (Entity SEO & Schema Hardening)
* **目标**：确保当买家或 AI 检索“HousePlus Group”或“HousePlus solar and appliance manufacturer”时，AI 能够建立高置信度的实体认知。
* **具体落地**：
  - **结构化数据升级**：在全站 Organization Schema 中完整闭环 `sameAs`、`logo`、`foundingDate`、`address` 与 `contactPoint`。
  - **厂房与资质实体绑定**：在关于我们和工厂页明确输出“20,000 m² ISO 9001 certified factory in Guangdong, China”等硬核实体参数，使大模型将其作为确定性事实（Ground Truth）收录。

### 2. AEO 问答与结构化参数重构 (Answer Engine Optimization)
* **目标**：使产品页和新闻页契合 RAG（检索增强生成）机制，让 AI 引擎在回答“谁能供应具有 ISO 认证的 5kW 锂电池与空气炸锅”时，能够直接提取 HousePlus 的参数。
* **具体落地**：
  - **结论前置与 Q&A 模块**：在产品与服务页增加买家高频提问的直接解答（例如：MOQ、交期、质保、认证），并采用表格与 Bullet points 对比呈现。
  - **严守真实数据边界**：所有商业条款（如 MOQ 100-500 件、24 个月质保）严格基于真实合规数据，绝不虚构零售价格或未授权评分。

### 3. 多语言 AI 检索区域对齐 (Multilingual GEO)
* **目标**：提升 HousePlus 在英语、西班牙语、德语、法语和阿拉伯语生成式搜索中的引用权重。
* **具体落地**：
  - 确保五种语言路由中的 `hreflang` 与规范链接 100% 对应，避免大模型因多语言版本抓取混乱而降低权威评分。
  - 在法语、德语、西语和阿拉伯语的独立页面中，针对当地买家常用的工业与家电采购词汇进行语义对齐。

### 4. 外部全网提及与第三方信源扩张 (External Brand Mentions)
* **目标**：打破“仅有官网在自我宣传”的局限，增加全网独立第三方对 HousePlus 的引用。
* **具体落地**：
  - 在国际制造黄页、Verified B2B Directory、LinkedIn 行业群组中规范发布工厂实景、产能报告和产品参数。
  - 通过新闻中心发布基于行业事实的供应链趋势文章，吸引外部行业媒体和资讯聚合站点引用。

---

## 三、 阶段实施路线图

| 阶段 | 核心任务 | 周期 | 验收标准 |
|---|---|---|---|
| **第一阶段** | 实体 Schema 与多语言规范复核 | 第 1 周 | 全站 JSON-LD 校验通过，无规范 URL 冲突 |
| **第二阶段** | 核心产品与新闻页 AEO 参数矩阵重构 | 第 2-3 周 | 关键采购问答与规格表格全部上线并被 Sitemap 索引 |
| **第三阶段** | 外部行业提及与多语言区域对齐 | 第 4 周起持续 | 第三方平台品牌提及增加，监控 AI 检索命中率 |
| **第四阶段** | Search Console 生成式 AI 表现持续追踪 | 长期滚动 | 评估 AI Overviews 与生成式 AI 展现与点击趋势 |
