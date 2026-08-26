# HousePlus 媒体迁移独立复核报告

日期：2026-08-26

## 已确认事实

生产首页、产品列表、新闻列表和视频文章 HTML 均能读取。四个页面合计发现 467 个 `images.houseplus-ch.com` 引用。首页和产品列表没有 `/manus-storage/`，视频文章仍包含 MP4、海报和 VTT 的 `/manus-storage/` 地址；这些地址目前返回 404。

`images.houseplus-ch.com` 的 DNS A 记录为 `76.76.21.21`，DNS only；公开响应为 Vercel，且可返回图片 200。该事实只说明访问入口/缓存层，不说明文件源位于 Vercel。

Cloudflare 账户 `affca529f7b55b7eb2b3770c954bd36d` 下的 `houseplus-media-api` 绑定 `MEDIA_BUCKET → houseplus` 和 `MEDIA_DB → d62b9de7-c3c4-46de-8931-aba6b38773f1`。其 Worker 代码的 `/media/*` 使用 `MEDIA_DB` 查找 `r2_key`，再从 `MEDIA_BUCKET` 读取对象，因此旧媒体 API 管理的文件源是该账户的 R2 `houseplus`。

Cloudflare 账户 `5cd2f2781f30e866504997ad801d7dbd` 下存在 R2 `houseplus-images`，并且桶中有真实的 `articles/`、`electronics/` 等对象。该账户没有同名 `houseplus-media-api`；`houseplus-images-proxy` 的 Settings 返回空 `bindings`，因此不能把它当作已绑定 `houseplus-images` 的上传 Worker。

## 当前异常

`houseplus-media-api/health` 返回 200，但一次按公开 slug 查询资产的 `/v1/assets` 请求返回 Cloudflare Worker 1101/HTTP 500。这说明旧媒体 API 的健康检查不能代表 D1 查询和资产列表功能完全正常。迁移前必须先修复或解释该异常，并完成分页清单核对。

## 安全边界

在以下条件全部满足前，不删除旧 Worker，不删除旧 R2，不切换生产 DNS：源桶全量对象清单可导出；媒体数据库及多语言 SEO 元数据已备份；每个对象已用大小和哈希校验；目标桶写入后可读取；旧 slug 和 URL 映射可回放；首页、产品页、文章页、图片 Sitemap、Open Graph 和视频 Schema 均通过生产验收；旧 URL 至少保留一个回滚观察周期。

## 结论

目前不能承诺“立即统一迁移后没有后顾之忧”，因为旧媒体 API 的资产查询出现 500，且视频资源仍为 404 临时地址。可以安全推进的是先建立只读备份和迁移清单；不能安全推进的是删除旧链路或在未取得跨账户 R2 对象读写凭据前宣称迁移完成。
