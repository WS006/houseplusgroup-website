# HousePlus 产品图片 SEO 优化方案

## 一、现状问题

| 问题 | 影响 | 严重度 |
|------|------|--------|
| 产品图片使用 Unsplash 通用图 | 品牌辨识度低，用户信任度下降 | 🔴 高 |
| 缺少 alt 文本或 alt 为空 | 图片无法被搜索引擎索引，错失 Google Images 流量 | 🔴 高 |
| 图片文件过大（未压缩） | 页面加载速度下降，Core Web Vitals 受影响 | 🟡 中 |
| 图片命名不规范（如 `img001.jpg`） | 搜索引擎无法从文件名理解图片内容 | 🟡 中 |
| 缺少结构化数据中的多角度图片 | 搜索结果中无图片富摘要展示机会 | 🟡 中 |
| 无 WebP/AVIF 现代格式 | 错失 30-50% 图片体积优化空间 | 🟠 中低 |

---

## 二、图片命名规范

### 命名公式

```
{brand}-{product-category}-{product-model}-{angle/feature}.{ext}
```

### 示例

| 旧命名 | 新命名 | 说明 |
|--------|--------|------|
| `img001.jpg` | `houseplus-solar-panel-hp500w-front.jpg` | 太阳能板正面图 |
| `photo_2.png` | `houseplus-solar-inverter-hp3000ui-dashboard.jpg` | 逆变器面板图 |
| `unsplash-abc.jpg` | `houseplus-air-conditioner-split-hp12000-detail.jpg` | 空调细节图 |
| `banner.jpg` | `houseplus-smart-home-system-overview.jpg` | 智能家居系统概览 |

### 命名规则细则

- 全小写，单词间用连字符 `-` 分隔
- 使用英文关键词（避免中文拼音）
- 包含品牌名 `houseplus` 前缀
- 包含产品类别和型号
- 末尾用角度/特征描述（front, side, detail, installed, packaging）

---

## 三、Alt 文本规范

### Alt 文本公式

```
{Brand} {Product Category} {Model} - {Key Feature/Scene Description}
```

### 示例对照表

| 页面位置 | Alt 文本 | 字符数 |
|----------|----------|--------|
| 产品主图 | `HousePlus 500W Monocrystalline Solar Panel HP-500W - front view with aluminum frame` | 78 |
| 产品详情图 | `HousePlus Solar Inverter HP-3000UI LCD display showing real-time power output` | 74 |
| 应用场景图 | `HousePlus solar system installed on residential rooftop in Southeast Asia` | 76 |
| 包装/物流图 | `HousePlus wholesale solar panel packaging ready for international shipping` | 68 |
| 认证图片 | `HousePlus CE FCC RoHS certification marks on solar panel product label` | 65 |

### Alt 文书写规则

1. **描述性优先**：说明图片内容，不要堆砌关键词
2. **控制在 80-125 字符**：Google 通常展示前 125 字符
3. **包含核心关键词**：产品类别 + 型号至少出现一次
4. **避免**："image of"、"picture of"、"click here" 等无意义前缀
5. **装饰性图片**：使用空 alt `alt=""` 并添加 `role="presentation"`

---

## 四、技术优化方案

### 4.1 图片压缩策略

```bash
# 使用 Sharp (Node.js) 进行自动化批量压缩
# 安装: npm install sharp

# 压缩脚本 logic:
const sharp = require('sharp');

async function optimizeImage(input, output) {
  await sharp(input)
    .resize(800, 800, { // 产品图最大尺寸
      fit: 'inside',
      withoutEnlargement: true
    })
    .webp({ quality: 80 }) // WebP 格式，80% 质量
    .toFile(output);
}

// 批量处理所有产品图片
// 产品主图: 800x800px → WebP 80%
// 产品缩略图: 400x400px → WebP 75%
// 详情大图: 1200x900px → WebP 85%
```

### 4.2 响应式图片 (srcset)

```jsx
// Next.js Image 组件最佳实践
import Image from 'next/image';

export function ProductImage({ src, alt, product }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={800}
      // 响应式断点
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      // 提供多尺寸源
      srcSet={`${src}-400w.webp 400w, ${src}-800w.webp 800w, ${src}-1200w.webp 1200w`}
      // 加载优先级
      priority={true}
      // 懒加载占位
      placeholder="blur"
      blurDataURL={product.thumbnailBase64}
    />
  );
}
```

### 4.3 Next.js next.config.js 图片域名配置

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['houseplus-ch.com', 'cdn.houseplus-ch.com'],
    formats: ['image/webp', 'image/avif'], // 启用现代格式
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

### 4.4 图片优化中间件（自动化处理）

```typescript
// src/middleware/image-optimizer.ts
// 在图片上传时自动执行：

interface ImageOptimizationConfig {
  maxWidth: number;
  maxHeight: number;
  quality: number;
  format: 'webp' | 'avif' | 'jpeg';
}

const PRODUCT_IMAGE_CONFIGS: Record<string, ImageOptimizationConfig> = {
  'thumbnail': { maxWidth: 400, maxHeight: 400, quality: 75, format: 'webp' },
  'main':      { maxWidth: 800, maxHeight: 800, quality: 80, format: 'webp' },
  'detail':    { maxWidth: 1200, maxHeight: 900, quality: 85, format: 'webp' },
  'zoom':      { maxWidth: 2000, maxHeight: 1500, quality: 90, format: 'webp' },
};

// 上传流程:
// 1. 接收原始图片
// 2. 自动生成 4 个尺寸变体
// 3. 自动生成 WebP + JPEG 双格式
// 4. 自动生成 base64 缩略图（用于 blur placeholder）
// 5. 上传至 CDN
// 6. 返回各尺寸 URL 供前端使用
```

---

## 五、产品图片拍摄/素材清单

### 每个产品必需图片（最少 5 张）

| 序号 | 图片类型 | 尺寸建议 | 用途 | Schema 标记 |
|------|----------|----------|------|-------------|
| 1 | 产品正面主图 | 800x800px | 列表页/搜索结果 | `image` (第一个) |
| 2 | 产品侧面/背面 | 800x800px | 产品详情页 | `image` |
| 3 | 细节/接口特写 | 800x800px | 详情页展示品质 | `image` |
| 4 | 安装/使用场景 | 1200x800px | 应用场景说明 | `image` |
| 5 | 包装/配件全家福 | 800x600px | 交货标准说明 | `image` |

### 可选增强图片

| 图片类型 | 说明 | SEO 价值 |
|----------|------|----------|
| 认证标志合集 | CE/FCC/RoHS 等标识清晰展示 | 增强信任信号 |
| 与竞品对比图 | 实物并排对比 | 高搜索意图匹配 |
| 工厂产线图 | 展示制造实力 | B2B 采购决策影响 |
| 客户安装案例 | 真实项目案例图 | 长尾关键词覆盖 |

---

## 六、图片 Schema 集成

### 更新 Product Schema 的 image 字段

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "HousePlus 500W Monocrystalline Solar Panel",
  "image": [
    "https://houseplus-ch.com/images/products/hp500w-front-800.webp",
    "https://houseplus-ch.com/images/products/hp500w-side-800.webp",
    "https://houseplus-ch.com/images/products/hp500w-detail-800.webp",
    "https://houseplus-ch.com/images/products/hp500w-installed-1200.webp",
    "https://houseplus-ch.com/images/products/hp500w-packaging-800.webp"
  ],
  "thumbnailUrl": "https://houseplus-ch.com/images/products/hp500w-front-400.webp"
}
```

### Open Graph 图片标签

```html
<!-- 产品详情页 head 中添加 -->
<meta property="og:image" content="https://houseplus-ch.com/images/products/hp500w-front-1200.webp" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="HousePlus 500W Monocrystalline Solar Panel HP-500W - wholesale pricing available" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://houseplus-ch.com/images/products/hp500w-front-1200.webp" />
```

---

## 七、Google Images 专项优化

### 7.1 图片站点地图

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://houseplus-ch.com/en/products/solar-panel-hp500w</loc>
    <image:image>
      <image:loc>https://houseplus-ch.com/images/products/hp500w-front-800.webp</image:loc>
      <image:title>HousePlus 500W Solar Panel Front View</image:title>
      <image:caption>Monocrystalline solar panel with aluminum frame and IP65 junction box</image:caption>
    </image:image>
    <image:image>
      <image:loc>https://houseplus-ch.com/images/products/hp500w-installed-1200.webp</image:loc>
      <image:title>HousePlus Solar Panel Installation Example</image:title>
      <image:caption>500W solar panel system installed on residential rooftop</image:caption>
    </image:image>
  </url>
</urlset>
```

### 7.2 面包屑导航（配合图片搜索）

确保每个产品页有面包屑结构，帮助 Google 理解图片所属的产品类别层级：

```
Home > Products > Solar Energy Systems > Solar Panels > HP-500W 500W Monocrystalline Panel
```

---

## 八、实施优先级与时间线

| 阶段 | 任务 | 工时 | 优先级 |
|------|------|------|--------|
| Week 1 | 制定图片命名规范，批量重命名现有图片 | 2h | 🔴 高 |
| Week 1 | 为所有产品图添加规范 alt 文本 | 3h | 🔴 高 |
| Week 2 | 配置 Sharp/Next.js 自动压缩管道 | 4h | 🔴 高 |
| Week 2 | 生成图片站点地图 | 1h | 🟡 中 |
| Week 3 | 拍摄/收集产品实物图替换 Unsplash 图 | 持续 | 🔴 高 |
| Week 3 | 添加 OG/Twitter 图片 meta 标签 | 2h | 🟡 中 |
| Week 4 | 更新 Product Schema image 数组 | 1h | 🟡 中 |
| Week 4 | 启用 AVIF 格式（渐进增强） | 2h | 🟠 低 |

---

## 九、预期效果

| 指标 | 优化前 | 优化后（预估） | 提升幅度 |
|------|--------|----------------|----------|
| 平均图片体积 | ~500KB | ~80KB (WebP) | -84% |
| LCP (Largest Contentful Paint) | ~4.2s | ~2.1s | -50% |
| Google Images 索引图片数 | ~12 张 | ~200+ 张 | +1500% |
| 图片搜索流量占比 | <2% | ~15-20% | +10x |
| 页面整体加载速度 | ~5.8s | ~2.5s | -57% |
