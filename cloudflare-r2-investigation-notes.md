# Cloudflare R2 归属核查记录

## 2026-08-26

已打开第一个地址：`https://dash.cloudflare.com/affca529f7b55b7eb2b3770c954bd36d/r2/overview`。

当前浏览器页面标题为 `Cloudflare Dashboard | Manage Your Account`，页面仍显示空白/加载状态，尚未读取到 R2 桶列表或 Worker 绑定信息。下一步需要等待页面完成加载或改用第二个账户地址交叉核对。


## 第二次浏览器核查

已打开第二个地址：`https://dash.cloudflare.com/5cd2f2781f30e866504997ad801d7dbd/r2/overview`。

该地址最终跳转到 Cloudflare 登录页，当前沙箱浏览器没有登录第二个账户，因此无法直接读取该账户的 R2 桶列表。第一个地址此前只显示加载状态，也尚未取得桶列表。需要通过已授权的 Cloudflare API/MCP 或用户在本机登录后提供页面信息继续核对。


## Cloudflare API 交叉核查结论

1. 账户 `affca529f7b55b7eb2b3770c954bd36d` 的 R2 桶列表只有 `houseplus`。
2. 同一账户存在 Worker `houseplus-media-api`。其 Settings 返回的绑定为：`MEDIA_BUCKET`（R2）→ `houseplus`；`MEDIA_DB`（D1）→ `d62b9de7-c3c4-46de-8931-aba6b38773f1`；另有 `ADMIN_TOKEN` Secret。
3. 账户 `5cd2f2781f30e866504997ad801d7dbd` 的 R2 桶列表只有 `houseplus-images`。
4. 第二个账户没有名为 `houseplus-media-api` 的 Worker，只有 `houseplus-images-proxy`、`houseplus-search-monitor`、`houseplus-soho-hub` 等 Worker。`houseplus-images-proxy` Settings 返回 `bindings: []`，因此目前不能证明它直接连接 `houseplus-images`。
5. `houseplus` 与 `houseplus-images` 两个桶的 Cloudflare R2 Custom Domains API 返回均为空；`images.houseplus-ch.com` 因而更可能是 Worker/路由提供的公开媒体域名，而不是 R2 桶 Custom Domain 直接绑定。

当前可确认的事实：现有 `houseplus-media-api` 上传逻辑通过 `MEDIA_BUCKET` 写入账户 `affca...` 下的 `houseplus` 桶，不是用户指定的 `5cd2...` 账户下的 `houseplus-images`。要把新视频放入 `houseplus-images`，必须在第二个账户创建/部署一个带 `MEDIA_BUCKET → houseplus-images` 绑定的上传 Worker，或在现有媒体 Worker 中改绑并确认不影响现有图片；不能只修改 `ADMIN_TOKEN`。
