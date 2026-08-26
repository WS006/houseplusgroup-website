# 生产视频页面视觉验收

验收时间：2026-08-26 09:18 UTC

已在生产 URL `https://www.houseplus-ch.com/en/news/portable-power-supply-solar-storage-b2b-guide/` 完成浏览器视觉核验。首屏和向下滚动后的页面均使用正式 `images.houseplus-ch.com/media/` 媒体地址；文章英雄海报正常显示，视频播放器加载了竖屏 HousePlus 海报，并显示 0:00 / 0:42 控件、播放按钮、音量和全屏控制。

验证页面包含新 MP4 `<source>`、正式海报与英文视觉描述轨道；未观察到本次视频所用的临时 `/manus-storage/` URL。播放器采用纵向媒体居中显示，周围留有深色侧栏，避免竖屏视频被裁切。

DOM 与 JSON-LD 核验结果如下：

- 播放器源：`https://images.houseplus-ch.com/media/houseplus-portable-power-supply-product-overview-video/`
- 海报：`https://images.houseplus-ch.com/media/houseplus-portable-power-supply-product-overview-poster/`
- 描述轨道：`https://images.houseplus-ch.com/media/houseplus-portable-power-supply-captions-en/`，`kind="descriptions"`，`srclang="en"`。
- 嵌套 JSON-LD 图中存在 `VideoObject`；其 `contentUrl`、`thumbnailUrl`、`caption`、`duration: PT42S`、`uploadDate: 2026-08-26` 和 `transcript` 与页面视频元数据一致。
