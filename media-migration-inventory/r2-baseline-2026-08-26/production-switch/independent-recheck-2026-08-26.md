# HousePlus 媒体迁移独立复查记录

复查时间：2026-08-26 09:42–09:45 UTC。

## 生产流量与回滚链路

`images.houseplus-ch.com` 当前唯一 A 记录仍为 `76.76.21.21`，状态为 Cloudflare 代理。生产路由 `images.houseplus-ch.com/*` 的 Route ID 为 `5ccffe0e015646adab982ba50d266bc7`，且仅指向 `houseplus-media-v2`。回滚资料完整保留：DNS 记录 ID 为 `b9456a7bb8e3dfea3bf9cef6095d4f0b`，Route 删除和 DNS 恢复为 DNS only 的步骤见 `route-switch-record-2026-08-26.json`。

## 静态媒体、页面与视频

正式 `images` 域名上的 132 个已迁移静态生产资产全部通过 HTTP、ETag、Content-Type 与 `x-houseplus-media-origin: houseplus-media-v2` 复验，失败数为 0。关键 EN/ES/DE/FR/AR 产品页、移动 User-Agent、品牌页、新闻页、地区页、Next 图片优化端点和图片 Sitemap 复验全部通过。

两篇视频文章的 EN/ES/DE/FR/AR 共 10 个生产页面均返回正式视频、海报、VTT 描述轨道、`VideoObject` 与 `video/mp4` 源；所有页面的本次视频临时 `/manus-storage/` 标识均为 0。MP4 完整请求为 HTTP 200，内容类型 `video/mp4`，大小 40,534,308 bytes；`Range: bytes=0-2047` 请求为 HTTP 206，返回正确的 `Content-Range`。海报为 `image/jpeg`，字幕为 `text/vtt`。

## 存储与治理

旧源桶 `houseplus` 仍有 280 个对象、272,565,057 bytes。目标桶 `houseplus-images` 的隔离备份前缀仍有完全相同的 280 个对象和字节数；正式 `media-live-v1/objects/` 前缀有 135 个对象、271,394,691 bytes，其中包括 132 个生产图片资产和 3 个视频相关资产。v2 D1 当前有 135 个已批准资产、637 条翻译记录和 5 条刻意限定的文章级规范关系。

## 代码与部署

GitHub `WS006/houseplusgroup-website` 的 `main` 当前为 `3a17a5d`。Vercel 对应生产部署已为 `READY`，并使用该提交。复查时本地官网仓库仅因本次验证脚本更新两份生产审计 JSON，不含未提交的业务源码修改。

## 结论

本轮独立复查未发现生产媒体切换、视频迁移、五语言输出、SEO 媒体 URL、R2 存储、D1 数据、GitHub/Vercel 同步或回滚证据方面的遗漏。旧 Worker、旧源桶、隔离备份和 Vercel 原入口仍保留；在观察期结束且取得单独授权前不得删除。
