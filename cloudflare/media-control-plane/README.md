# HousePlus Media Control Plane

`houseplus-media-v2` production 是 HousePlus 媒体基础设施的唯一 Cloudflare 目标。生产账户为 `5cd2f2781f30e866504997ad801d7dbd`，R2 生产桶为 `houseplus-images`。旧账户、旧 `houseplus-media-api` Worker 和旧 `houseplus` R2 桶仅用于观察期内回滚，不得作为新部署目标。

## 发布原则

部署前必须先确认 Worker 源码、D1 schema、R2 绑定和 Secret 清单属于同一个版本。部署脚本不会自动生成管理员令牌，也不会猜测 D1 数据库 ID；必须通过环境变量提供 `HOUSEPLUS_MEDIA_DB_ID`，并在受限文件 `/home/ubuntu/.houseplus_media_admin_token` 中预置已批准的 `ADMIN_TOKEN`。默认目标为 `houseplus-media-v2` 与 `houseplus-images`，如需改变目标必须显式设置环境变量并经过代码审查。

示例环境变量如下，值不应提交到 Git：

```text
HOUSEPLUS_CF_ACCOUNT_ID=5cd2f2781f30e866504997ad801d7dbd
HOUSEPLUS_MEDIA_WORKER_NAME=houseplus-media-v2
HOUSEPLUS_MEDIA_BUCKET=houseplus-images
HOUSEPLUS_MEDIA_DB_ID=<production D1 database id>
```

## 变更与回滚

所有 Worker 变更必须先在本地运行完整测试和构建，再生成部署请求；部署后先检查 `/health`、无凭证访问的 `401` 保护、少量资产读取和一张真实图片的 `HEAD` 响应。批量 Alt 任务必须幂等、可暂停、可重试，并在 D1 中记录每个资产的状态和最后错误。未经单独书面授权，不删除旧 Worker、旧 R2 桶或旧 URL 映射。

主站 SEO 代码通过 GitHub Actions 的 `HousePlus Quality Gate` 进行测试和生产构建门禁。该门禁会拒绝旧 Cloudflare 账户/Worker 的可执行配置，防止部署脚本再次把版本发布到错误资源。
