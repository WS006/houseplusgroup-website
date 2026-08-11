# 首页轮播图片核验记录

核验日期：2026-08-11（GMT+8）。

当前仓库中的 `public/images/carousel/` 图片文件名与其实际画面内容不一致。`carousel-solar-energy.jpg` 实际为智能手表、手机、笔记本电脑等 3C 电子产品画面；`carousel-home-appliances.jpg` 实际为太阳能光伏板画面。结合线上首页中“家电—3C 图、太阳能—家电图、3C—太阳能图”的循环错配表现，可判断三张轮播素材在此前导入时被错误命名或错误映射。

修复方案不应继续依赖这些存在误导性名称的文件。首页将直接使用语义正确、已自托管的产品图片：太阳能使用 `solar-panel-500w.jpg`，家电使用 `induction-cooktop-2000w.jpg`，3C 使用 `3c-electronics-banner.jpg`。同时，首页将不再被 CMS 中已发布的旧轮播配置覆盖，以确保代码仓库的正确配置在部署后真实生效。

## 生产预览复核

在本地生产构建中，首页已经按代码输出了正确的轮播顺序和图片 URL；第一张轮播引用 ` /images/products/solar-panel-500w.jpg`，第二张引用 ` /images/products/induction-cooktop-2000w.jpg`，第三张引用 ` /images/products/3c-electronics-banner.jpg`。但是，直接访问 `solar-panel-500w.jpg` 后确认该 JPEG 本身并非真实产品图片，而是带有“**The image is generating… Please refresh page to preview.**”文字的占位图。

因此，图片未真实显示的根本原因已确认：多个被引用的本地静态图片文件实际保存的是生成中的占位内容，而不是可展示的产品照片。下一步需要以经核验的真实商品图片替换这些占位文件，并重新检查所有首页引用资源。

已验证可直接复用的真实本地素材包括：`solar-panel-1.jpg`（屋顶太阳能板安装现场，1200×800）和 `induction-cooktop-2000w.jpg`（独立电磁炉产品图，2240×1680）。它们均为有效的可展示图片，未包含生成中提示。

## AI 实物图片替换结果

已生成并加入三张 2560×1440 的横向专业实物图：太阳能（光伏板、逆变器与储能电池）、家电（电磁炉、空气炸锅与电热水壶）及 3C（耳机、智能手表、耳机盒、移动硬盘与 Type-C 线缆）。它们均保留左侧低细节暗区以适配首页标题叠加，并且不含文字、商标、水印或生成中占位提示。

本地生产预览已验证：英文首页的首张轮播图能够真实显示太阳能实物场景，图片地址为 `/images/carousel/houseplus-solar-hero.jpg`，不再出现“Image is generating”提示；首页 HTML 同时输出三张新的正确轮播资源。行业区的太阳能图片也已由占位文件改为已验证的真实安装现场图片 `solar-panel-1.jpg`。
