# HousePlus 自托管图片清单（待执行）

> 状态: 待 Phase 2 执行
> 创建日期: 2026-07-14
> 目标: 将所有 Unsplash 外链图片替换为自托管图片

---

## 一、目录结构建议

```
public/
└── images/
    ├── products/          # 已有：产品图片
    └── articles/          # 新增：文章配图
        ├── solar/
        │   ├── solar-lifepo4-battery-storage-1200x675.webp
        │   ├── mppt-charge-controller-40a-800x600.webp
        │   ├── solar-panels-2026-installation-800x600.webp
        │   ├── future-solar-energy-technology-800x600.webp
        │   ├── solar-energy-storage-solutions-overview-800x600.webp
        │   └── industrial-solar-storage-manufacturing-800x600.webp
        ├── appliances/
        │   ├── appliance-energy-rating-vs-actual-1200x675.webp
        │   ├── refrigerator-energy-consumption-test-800x600.webp
        │   ├── home-appliances-2026-showcase-800x600.webp
        │   ├── smart-home-appliances-2026-guide-800x600.webp
        │   ├── energy-efficiency-standards-compliance-800x600.webp
        │   ├── advanced-appliance-manufacturing-line-800x600.webp
        │   ├── global-appliance-wholesale-guide-800x600.webp
        │   ├── smart-home-appliances-integration-800x600.webp
        │   └── future-smart-home-appliances-800x600.webp
        ├── electronics/
        │   ├── battery-cycle-life-test-equipment-1200x675.webp
        │   ├── lithium-ion-capacity-retention-curve-800x600.webp
        │   ├── 3c-electronics-2026-lineup-800x600.webp
        │   └── evolution-3c-electronics-800x600.webp
        └── service/
            ├── oem-odm-manufacturing-process-800x600.webp
            └── houseplus-warehouse-global-800x600.webp
```

---

## 二、待下载和处理的图片清单

### 2.1 太阳能类（6张）

| 文件名 | 当前URL | 目标尺寸 | 大小目标 |
|--------|---------|---------|----------|
| solar-lifepo4-battery-storage-1200x675.webp | Unsplash photo-1509391366360 | 1200x675 | <300KB |
| mppt-charge-controller-40a-800x600.webp | (新) | 800x600 | <200KB |
| solar-panels-2026-installation-800x600.webp | Unsplash photo-1509391366360 | 800x600 | <200KB |
| future-solar-energy-technology-800x600.webp | Unsplash photo-1509391366360 | 800x600 | <200KB |
| solar-energy-storage-solutions-overview-800x600.webp | Unsplash photo-1509391366360 | 800x600 | <200KB |
| industrial-solar-storage-manufacturing-800x600.webp | Unsplash photo-1509391366360 | 800x600 | <200KB |

### 2.2 家电类（9张）

| 文件名 | 当前URL | 目标尺寸 | 大小目标 |
|--------|---------|---------|----------|
| appliance-energy-rating-vs-actual-1200x675.webp | Unsplash photo-1558618666-fcd25c85cd64 | 1200x675 | <300KB |
| refrigerator-energy-consumption-test-800x600.webp | (新) | 800x600 | <200KB |
| home-appliances-2026-showcase-800x600.webp | Unsplash photo-1558618666-fcd25c85cd64 | 800x600 | <200KB |
| smart-home-appliances-2026-guide-800x600.webp | Unsplash photo-1600585154340-be6161a56a0c | 800x600 | <200KB |
| energy-efficiency-standards-compliance-800x600.webp | Unsplash photo-1558618666-fcd25c85cd64 | 800x600 | <200KB |
| advanced-appliance-manufacturing-line-800x600.webp | Unsplash photo-1558618666-fcd25c85cd64 | 800x600 | <200KB |
| global-appliance-wholesale-guide-800x600.webp | Unsplash photo-1558618666-fcd25c85cd64 | 800x600 | <200KB |
| smart-home-appliances-integration-800x600.webp | Unsplash photo-1600585154340-be6161a56a0c | 800x600 | <200KB |
| future-smart-home-appliances-800x600.webp | Unsplash photo-1600585154340-be6161a56a0c | 800x600 | <200KB |

### 2.3 3C电子类（4张）

| 文件名 | 当前URL | 目标尺寸 | 大小目标 |
|--------|---------|---------|----------|
| battery-cycle-life-test-equipment-1200x675.webp | Unsplash photo-1620714223084-8fcacc6dfd8d | 1200x675 | <300KB |
| lithium-ion-capacity-retention-curve-800x600.webp | (新) | 800x600 | <200KB |
| 3c-electronics-2026-lineup-800x600.webp | Unsplash photo-1556656793-08538906a9f8 | 800x600 | <200KB |
| evolution-3c-electronics-800x600.webp | Unsplash photo-1556656793-08538906a9f8 | 800x600 | <200KB |

### 2.4 服务类（2张）

| 文件名 | 当前URL | 目标尺寸 | 大小目标 |
|--------|---------|---------|----------|
| oem-odm-manufacturing-process-800x600.webp | (新) | 800x600 | <200KB |
| houseplus-warehouse-global-800x600.webp | (新) | 800x600 | <200KB |

---

## 三、图片处理规范

### 3.1 推荐工具

- **格式转换**: cwebp (Google WebP工具) 或 squoosh.app
- **批量处理**: sharp (Node.js库) 或 ImageMagick
- **质量控制**: WebP quality 80-85, JPEG quality 75-85

### 3.2 命令行示例

```bash
# 单张转换
cwebp -q 80 input.jpg -o output.webp

# 批量转换
for f in *.jpg; do cwebp -q 80 "$f" -o "${f%.jpg}.webp"; done

# 检查文件大小
ls -la *.webp | awk '{print $5, $9}' | sort -n
```

### 3.3 图片优化检查项

- [ ] 格式: WebP（主） / JPEG（备）
- [ ] 尺寸: 符合上述清单
- [ ] 大小: 单张 <500KB（hero <300KB）
- [ ] 质量: 视觉无损
- [ ] 命名: 含核心关键词
- [ ] Alt文本: 已在页面中配置

---

## 四、执行步骤

### Step 1: 下载图片
- 来源: Unsplash 公开图库
- 工具: 浏览器批量下载 + 验证许可

### Step 2: 处理图片
```bash
mkdir -p public/images/articles/{solar,appliances,electronics,service}
# 下载并重命名
# 转换格式
# 调整尺寸
```

### Step 3: 上传
- 推送到GitHub仓库
- Vercel自动部署并分发

### Step 4: 替换引用
- 更新所有 page.tsx 中的 `heroImage` 字段
- 保留现有文件名（已优化为描述性命名）

### Step 5: 验证
- 访问 `/image-sitemap.xml` 确认图片已列出
- Google Search Console 提交图片Sitemap
- 等待 1-2 周后检查 Google 图片搜索

---

## 五、Unsplash许可说明

Unsplash 许可（Unsplash License）：
- ✅ 允许免费用于商业和非商业用途
- ✅ 允许修改、复制、分发
- ⚠️ 不允许将图片单独转售（即不允许把Unsplash图片作为素材库再分发）
- ✅ HousePlus 自托管使用符合许可

**保留要求**：保留图片归属信息可在版权页面注明（可选）。

---

## 六、完成度检查

- [ ] 太阳能类6张图片已处理并上传
- [ ] 家电类9张图片已处理并上传
- [ ] 3C电子类4张图片已处理并上传
- [ ] 服务类2张图片已处理并上传
- [ ] 所有 page.tsx 文件已更新引用
- [ ] image-sitemap.xml 验证可访问
- [ ] Google Search Console 提交新Sitemap
- [ ] 等待1-2周后验证Google图片索引数量

**总计：21张图片待处理**

---

*创建日期: 2026-07-14*
*执行优先级: Phase 2（短期 1-2周内）*
