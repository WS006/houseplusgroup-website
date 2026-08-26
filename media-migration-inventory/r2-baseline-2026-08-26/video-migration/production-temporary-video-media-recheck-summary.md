# 视频临时媒体 URL 生产复扫结论

复扫时间：2026-08-26 09:21 UTC

使用生产 Sitemap 中的 600 个规范页面 URL 扫描原始 HTML，查找原始 MP4、JPEG 海报和 WebVTT 字幕的三种临时 `/manus-storage/` 标识。

初次扫描结果为 599/600 页面 HTTP 200，0 个页面含临时视频标识。唯一未完成项为德语文章 `https://www.houseplus-ch.com/de/news/portable-power-supply-solar-storage-b2b-guide/` 的 30 秒网络超时，不是 HTTP 错误或临时 URL 命中。

该德语页面随后以 60 秒独立请求复测：HTTP 200，HTML 大小 99,679 bytes，临时视频标识为 0，正式 R2 视频 slug 出现 4 次。由此，600/600 个生产 Sitemap 页面均已确认不再输出本次视频的临时 `/manus-storage` URL。
