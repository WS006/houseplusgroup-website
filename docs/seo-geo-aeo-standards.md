# HousePlus Website SEO / GEO / AEO 综合优化标准

> 版本: 2026-07-14
> 适用范围: 所有文章页面、产品页面、着陆页
> GEO = Generative Engine Optimization (生成引擎优化)

---

## 一、SEO 技术标准 (Search Engine Optimization)

### 1.1 Meta 标签规范

| 元素 | 要求 | 示例 |
|------|------|------|
| **Title** | 50-60字符，含核心关键词前置 | `Solar Storage Efficiency: 95% Round-Trip Guide \| HousePlus` |
| **Description** | 150-160字符，含数字吸引点击 | `LiFePO4 batteries achieve 92-96% round-trip efficiency. 80% DOD extends life 2.3x. Technical guide with quantified data.` |
| **Keywords** | 8-12个，逗号分隔 | `solar storage efficiency, round-trip efficiency, LiFePO4 battery` |
| **Canonical** | 必须唯一，带语言路径 | `https://www.houseplus-ch.com/en/news/article-slug` |
| **Robots** | `index, follow, max-image-preview:large` | 允许图片大预览 |

### 1.2 Open Graph 标签

```
og:title: 同页面Title（可稍长）
og:description: 同Meta Description
og:image: 1200x630px, 小于8MB, JPEG/PNG
og:image:alt: 图片alt文本（必须）
og:type: article（文章）/ website（页面）
og:locale: en_US / es_ES / de_DE / fr_FR / ar_SA
og:site_name: HousePlus
```

### 1.3 结构化数据 (Schema.org)

每页必须包含的Schema类型：

| 页面类型 | 必需Schema | 可选Schema |
|----------|-----------|-----------|
| 文章页 | `Article` + `BreadcrumbList` | `FAQPage`, `ImageObject` |
| 产品页 | `Product` + `BreadcrumbList` | `ImageObject`, `Offer` |
| 服务页 | `Service` + `BreadcrumbList` | `LocalBusiness` |
| 首页 | `Organization` + `WebSite` | `LocalBusiness` |

### 1.4 多语言Hreflang

```html
<link rel="alternate" hreflang="en" href="https://www.houseplus-ch.com/en/news/slug" />
<link rel="alternate" hreflang="es" href="https://www.houseplus-ch.com/es/news/slug" />
<link rel="alternate" hreflang="x-default" href="https://www.houseplus-ch.com/en/news/slug" />
```

### 1.5 Sitemap规范

- **页面Sitemap**: `sitemap.xml` - 包含所有页面URL、lastmod、priority、changefreq
- **图片Sitemap**: `image-sitemap.xml` - 必须包含图片URL、标题、说明（见下文图片收录问题）
- **News Sitemap**: `news-sitemap.xml` - 新闻文章专用，含publication date

---

## 二、GEO 内容标准 (Generative Engine Optimization)

> GEO针对的是ChatGPT、Claude、Gemini、Perplexity等AI搜索引擎的内容引用优化

### 2.1 AI可直接引用的内容结构

**核心结论段（必须）**
- 位置：文章最后一段
- 长度：50字以内
- 格式：直接陈述结论，不含"我们认为""建议"等模糊词
- 示例：`80% DOD, 20-30°C thermal control, and 0.5C charging achieve 95% efficiency and 6000+ cycles.`

**分论点结构（每个H2段落）**
```
结论(15字) + 数据(15字) + 解释(15字)

示例：
"80% DOD Extends Battery Life 2.3x
Limiting depth of discharge to 80% yields 6000 cycles vs 2600 cycles at 100% DOD. 
DOD management is the most impactful factor for long-term solar storage system value."
```

### 2.2 量化参数要求

每个分论点必须包含至少1个量化参数：

| 参数类型 | 示例 |
|----------|------|
| 数字/数值 | `92-96%`, `6000 cycles`, `25-30%` |
| 比例/倍数 | `2.3x longer`, `3x more`, `15-20% drop` |
| 阈值/标准 | `80% capacity`, `0.5C rate`, `25°C ±2°C` |
| 时间周期 | `18-25% annual ROI`, `2-3% yearly loss` |
| 行业标准 | `IEC 62660`, `UL 1642`, `CE/FCC/RoHS` |

### 2.3 删除无信息话术

必须删除的词汇/句式：
- "我们很好" / "品质第一" / "行业领先"
- "值得信赖的合作伙伴"
- "致力于..." / "专注于..."（无数据支撑时）
- "联系我们了解更多"
- 纯营销形容词堆砌

### 2.4 FAQ区块（GEO关键）

- 数量：5-8条
- 每条长度：问题+答案共40字内
- 格式：自然问答，非营销口吻
- 覆盖：长尾关键词、用户真实疑问
- Schema标记：使用`FAQPage`结构化数据

### 2.5 文章长度与可读性

| 指标 | 标准 |
|------|------|
| 总字数 | 800-1500字（中文）/ 500-1000词（英文） |
| 段落数 | 6-8个分论点 + 1个核心结论 |
| 每段字数 | 40-60字（中文）/ 25-40词（英文） |
| 句子长度 | 不超过25词/句 |
| 可读性分数 | Flesch-Kincaid Grade 8-12 |

---

## 三、AEO 语音搜索标准 (Answer Engine Optimization)

> AEO针对的是语音助手和直接答案框（Featured Snippet）优化

### 3.1 问题式H2标题

将H2改为问题形式，匹配搜索查询：

```
❌ "Temperature Impact on Storage Performance"
✅ "What Is the Optimal Battery Temperature for Solar Storage?"

❌ "EMS Scheduling Benefits"
✅ "How Much ROI Can Smart EMS Load Shifting Deliver?"
```

### 3.2 直接回答格式

每个H2下的第一段必须以直接答案开头：

```
Q: What is good round-trip efficiency for LiFePO4?
A: LiFePO4 batteries deliver 92-96% round-trip efficiency at 0.5C rate.

Q: How does DOD affect battery life?
A: 80% DOD yields 2.3x longer cycle life than 100% DOD in LiFePO4 batteries.
```

### 3.3 列表/步骤格式

使用有序/无序列表增强Featured Snippet机会：

```
To optimize solar storage efficiency:
1. Limit DOD to 80% (extends life 2.3x)
2. Maintain 20-30°C operating temperature
3. Charge at 0.5C rate (reduces heat 45%)
4. Use monthly capacity testing (detects 2-3% annual loss)
```

### 3.4 定义段落

文章首段明确定义主题：

```
Round-trip efficiency measures the percentage of electrical energy 
retained through a complete charge-discharge cycle in a battery 
storage system. Modern LiFePO4 batteries achieve 92-96% efficiency 
at 0.5C rate under standard test conditions.
```

### 3.5 比较表格

使用数据对比表格：

| Parameter | 50% DOD | 80% DOD | 100% DOD |
|-----------|---------|---------|----------|
| Cycle Life | 1500 | 6000 | 2600 |
| Usable Capacity | 50% | 80% | 100% |
| Annual Degradation | 1.5% | 2% | 3% |

---

## 四、图片SEO标准

### 4.1 图片文件规范

| 项目 | 要求 | 当前问题 |
|------|------|----------|
| **自托管** | 图片必须托管在自有域名 | ❌ 全部使用Unsplash外链 |
| **文件名** | 描述性文件名，含关键词 | ❌ 随机photo ID |
| **格式** | WebP优先，JPEG备选 | ⚠️ 仅配置支持，未生成 |
| **尺寸** | 最大1200px宽，单张<500KB | ⚠️ Unsplash尺寸不可控 |
| **Alt文本** | 描述性，含关键词，<125字符 | ⚠️ 部分存在 |

### 4.2 图片结构化数据

```json
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "contentUrl": "https://www.houseplus-ch.com/images/solar-lifepo4-battery-800x600.webp",
  "name": "LiFePO4 Solar Battery Storage System",
  "description": "High-efficiency LiFePO4 battery bank for industrial solar storage with 6000 cycle life",
  "caption": "LiFePO4 battery system achieving 95% round-trip efficiency",
  "width": 800,
  "height": 600,
  "author": {
    "@type": "Organization",
    "name": "HousePlus Group"
  },
  "license": "https://www.houseplus-ch.com/terms"
}
```

### 4.3 图片Sitemap

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://www.houseplus-ch.com/en/news/solar-storage-efficiency-optimization-guide</loc>
    <image:image>
      <image:loc>https://www.houseplus-ch.com/images/solar-lifepo4-battery-800x600.webp</image:loc>
      <image:title>LiFePO4 Solar Battery Storage System</image:title>
      <image:caption>Industrial solar storage achieving 95% round-trip efficiency</image:caption>
      <image:license>https://www.houseplus-ch.com/terms</image:license>
    </image:image>
  </url>
</urlset>
```

---

## 五、CTA 转化标准

### 5.1 文章CTA规范

位置：FAQ区块之后，"返回新闻"链接之前
格式：渐变背景卡片，居中对齐

**必须包含的元素：**
1. **标题**：行业相关问题/价值主张（20字内）
2. **描述**：具体数据支撑的价值点（含MOQ、认证、效率参数）
3. **主按钮**：跳转产品页（高对比色）
4. **次按钮**：跳转联系页（描边样式）

**示例：**
```
[蓝色渐变卡片]
标题: Need Solar Storage Solutions for Your Business?
描述: Get customized LiFePO4 system design. 95% efficiency, 6000+ cycles, 
      OEM/ODM available. MOQ from 100 units.
[Explore Solar Products] [Request a Quote]
```

### 5.2 CTA设计原则

| 原则 | 说明 |
|------|------|
| 上下文相关 | CTA内容与文章主题100%匹配 |
| 数据驱动 | 描述中包含文章中的量化参数 |
| 低摩擦 | 明确MOQ、认证，降低决策门槛 |
| 双选项 | 产品浏览（低意向）+ 询盘（高意向） |

---

## 六、技术检查清单

### 发布前必须检查

- [ ] Meta Title 唯一，60字符内
- [ ] Meta Description 唯一，160字符内
- [ ] H1只有一个，含核心关键词
- [ ] 每个H2含关键词变体
- [ ] 核心结论段50字内，放最后
- [ ] 每个分论点含1+量化参数
- [ ] 无营销空话
- [ ] FAQ 5-8条，每条40字内
- [ ] Schema结构化数据完整
- [ ] Hreflang标签正确
- [ ] Canonical URL正确
- [ ] og:image 1200x630
- [ ] 图片alt文本描述性
- [ ] CTA区块包含双按钮
- [ ] 内链2-3个相关文章
- [ ] 日期随机（非批量同一天）

---

## 七、AI爬虫友好配置

### robots.txt 关键规则

```
# 允许主要AI爬虫（GEO优化必需）
User-agent: GPTBot
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /
```

### llms.txt 文件

根目录 `llms.txt` 文件帮助AI理解网站结构：
```
# HousePlus Group - llms.txt

HousePlus Group is a vertically integrated manufacturer of solar energy systems, 
home appliances, and 3C electronics, operating since 2010 from Zhongshan, China.

## Products
- Solar Panels & Energy Storage
- Home Appliances (refrigerators, washing machines, kitchen appliances)
- 3C Electronics (headphones, smartwatches, power banks, cables)

## Services
- OEM/ODM Manufacturing
- Private Label Branding
- Global Wholesale Distribution

## Certifications
CE, FCC, RoHS, ISO 9001

## Contact
Website: https://www.houseplus-ch.com
Email: jack@houseplus-ch.com
WhatsApp: +86-155-7811-9543
```

---

## 八、区域化SEO (GEO定位)

### 目标市场优化

| 市场 | 关键词变体 | 内容侧重 |
|------|-----------|----------|
| 非洲 | solar power Africa, off-grid solar Nigeria | 离网方案、价格敏感 |
| 东南亚 | home appliances wholesale SEA | 家电批发、热带气候适配 |
| 欧洲 | CE certified solar panels EU | 认证合规、能效标准 |
| 中东 | solar energy UAE, 3C electronics Dubai | 高端产品、快速交付 |

### 结构化数据区域标记

```json
{
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "23.1291",
    "longitude": "113.2644"
  },
  "areaServed": ["Worldwide", "Africa", "Southeast Asia", "Europe", "Middle East"]
}
```

---

*本文档与代码同步维护，更新日期: 2026-07-14*
