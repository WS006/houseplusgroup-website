# HousePlus 全量媒体迁移：迁移前准备状态

日期：2026-08-26

## 已完成且不影响生产的工作

已只读抓取 `https://www.houseplus-ch.com/sitemap.xml` 覆盖的 600 个生产页面，页面抓取错误为 0。已从图片标签、响应式 `srcset`、Open Graph、Twitter Card、JSON-LD、CSS 内联背景、视频 Poster/Source、字幕 Track 和原始 HTML 中建立当前媒体引用基线。

本次清单包含 17,505 条页面/来源引用记录，归并后得到 239 个唯一媒体 URL。其中 223 个 URL 使用 `images.houseplus-ch.com`，235 个 URL 使用 `/media/` 路径，4 个 URL 使用临时 `/manus-storage/` 路径。临时路径涉及视频文章的 MP4、Poster 和 VTT 字幕，已标记为待迁移和待修复项目。

已生成以下审计文件：

- `media-migration-inventory/sitemap-urls.txt`：生产 Sitemap 页面清单
- `media-migration-inventory/pages.tsv`：每个页面的抓取状态
- `media-migration-inventory/media-references.jsonl`：每个媒体引用、页面位置、来源属性和可见属性
- `media-migration-inventory/media-assets.jsonl`：按唯一媒体 URL 聚合的页面和来源
- `media-migration-inventory/summary.json`：统计摘要
- `media-migration-inventory/errors.json`：页面抓取异常清单，目前为空

## 当前不能执行的操作

还不能复制源 R2 文件、读取旧媒体 D1 元数据或写入目标 R2，因为这需要源账户 `houseplus` 的 Object Read 凭据和目标账户 `houseplus-images` 的 Object Read & Write 凭据。还不能删除旧 Worker/R2 或切换 DNS。

## 下一步

用户准备好两个最小权限 R2 Token 和独立备份位置后，先执行源资产清单、D1 元数据导出、文件哈希备份，再执行目标桶的独立迁移前缀写入和逐项校验。
