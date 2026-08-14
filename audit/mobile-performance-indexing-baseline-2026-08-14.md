# HousePlus 移动端性能与收录状态检查基线

**日期：** 2026-08-14

## PageSpeed Insights 现场数据可用性

对英文首页的 Google PageSpeed Insights 移动端报告检查显示 **No Data**，即公开 Chrome UX Report 现场数据不足以提供页面级 Core Web Vitals 评分。无 API Key 的 PageSpeed API 请求也返回 429 速率限制，因此本次将使用本地 Lighthouse 实验室采样和生产响应式检查来评估可直接优化的技术指标；现场数据需要待真实用户数据积累后再在 Search Console 或 PageSpeed Insights 复查。
