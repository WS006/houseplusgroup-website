# Project TODO

- [x] 提交 Image Metadata 结构化数据修复。
- [x] 部署主站并在生产产品页核验 creditText、copyrightNotice、creator 与 acquireLicensePage。
- [ ] 在 Google Search Console 对 Image Metadata 报告发起验证修复。
- [x] 审计所有可索引页面的重复标题与 Meta Description，并区分真正重复和多语言或分页变体。
- [x] 修复确认存在的重复元数据，部署后在 Bing Webmaster Tools 重新检查建议项。
- [ ] 将遗留 `eu` 地区 URL 改为明确的 301 永久重定向，并保持站点地图仅列出规范 URL。
- [ ] 从主站中间件移除明文管理员凭据，改为仅使用部署环境变量并在发布前进行回归验证。
- [ ] 在不中断现有 `ADMIN_PASSWORD` 生产鉴权的前提下完成环境变量兼容迁移，并验证后续凭据轮换路径。
