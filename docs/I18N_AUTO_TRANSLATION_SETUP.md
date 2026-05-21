# 🌍 多语言自动化翻译系统使用指南

## 🎉 好消息：完全免费，无需信用卡！

本项目提供**多个完全免费**的自动翻译方案，**无需信用卡**：

| 方案 | API | 每月限制 | 是否需要信用卡 | 推荐度 |
|------|-----|---------|-------------|--------|
| **方案 1** | MyMemory | 30,000 字符/天 | ❌ 不需要 | ⭐⭐ (额度小) |
| **方案 2** | Langbly | **500,000 字符/月** | ❌ 不需要 | ⭐⭐⭐⭐⭐ (强烈推荐) |

**强烈推荐使用方案 2（Langbly）**，额度充足、只需邮箱注册！

---

## 🚀 方案 2：Langbly（强烈推荐）

### 为什么选择 Langbly？

- ✅ **每月 50 万字符免费**（永久有效）
- ✅ **无需信用卡**（只需邮箱注册）
- ✅ AI 驱动的翻译质量
- ✅ 100+ 种语言支持
- ✅ Google Translate v2 兼容

### 第一步：注册 Langbly（30秒）

1. 访问 [https://langbly.com/](https://langbly.com/)
2. 点击 **"Get Started Free"**
3. 使用邮箱注册（完全免费！）
4. 登录后进入 Dashboard
5. 复制您的 **API Key**（Bearer token 格式）

### 第二步：在 GitHub 添加 Secret

1. 进入您的 GitHub 仓库 Settings
2. 点击 **Secrets and variables** → **Actions** → **New repository secret**
3. 名称：`LANGBLY_API_KEY`
4. 值：粘贴您复制的 API Key
5. 点击 **Add secret**

### 第三步：使用翻译

**本地使用：**
```bash
# 设置环境变量
export LANGBLY_API_KEY="your-api-key-here"

# 运行翻译（所有语言）
node scripts/auto-translate-langbly.js

# 或者只翻译特定语言
node scripts/auto-translate-langbly.js es de
```

**GitHub 自动翻译：**
- 编辑 `locales/en.json`
- 推送到 GitHub
- 系统自动翻译并创建 Pull Request
- 审核后合并

---

## 🔧 方案 1：MyMemory API（备选）

如果 Langbly 不可用，可以使用这个备选方案。

### 使用方法

**本地使用：**
```bash
# 直接运行，无需任何配置
node scripts/auto-translate-mymemory.js
```

**GitHub 自动翻译：**
- 系统已配置好 `auto-translate-free.yml`
- 无需任何配置即可使用

**限制：**
- ⚠️ 每日只有 1000 次请求
- ⚠️ 适合小规模更新

---

## 📊 免费翻译 API 对比

| 特性 | MyMemory | Langbly | DeepL |
|------|----------|---------|-------|
| **费用** | 免费 | **免费（永久）** | $20/月 |
| **信用卡** | ❌ 不需要 | ❌ **不需要（只需邮箱）** | ✅ 需要 |
| **月度限制** | ~30,000 字符/天 | **500,000 字符/月** | 500,000 字符/月 |
| **翻译质量** | 一般 | **AI 驱动，优秀** | 最佳 |
| **语言数量** | 100+ | 100+ | 33 |
| **API 稳定性** | 一般 | 良好 | 企业级 |

---

## 🎯 推荐工作流程

### 对于小型更新（< 100 个字符串）

使用 **MyMemory**：
```bash
node scripts/auto-translate-mymemory.js
```

### 对于中大型更新（> 100 个字符串）

使用 **Langbly**：
```bash
export LANGBLY_API_KEY="your-api-key"
node scripts/auto-translate-langbly.js
```

### 对于重要内容（营销文案）

建议：
1. 先用 API 翻译
2. 人工审核
3. 根据需要调整

---

## 📁 翻译文件位置

| 语言 | 文件路径 | 说明 |
|------|---------|------|
| 英文（源） | `locales/en.json` | 编辑此文件触发翻译 |
| 西班牙文 | `locales/es.json` | 自动生成 |
| 德文 | `locales/de.json` | 自动生成 |
| 法文 | `locales/fr.json` | 自动生成 |
| 阿拉伯文 | `locales/ar.json` | 自动生成 |

---

## 🔧 自定义配置

### 添加新语言

1. 在 `locales/` 创建新语言文件（如 `it.json`）
2. 更新脚本中的 `TARGET_LOCALES` 数组
3. 更新 GitHub Actions 中的语言列表

### 修改目标语言

编辑工作流文件中的 `LANGS` 数组：
```yaml
LANGS=("es" "de" "fr" "ar" "it" "pt")
```

---

## ⚠️ 常见问题

### Langbly 错误

**错误 1: "Unauthorized"**
```
解决方案：检查 LANGBLY_API_KEY 是否正确设置
```

**错误 2: "Quota exceeded"**
```
解决方案：
1. 检查月度使用量
2. 等待下个月配额重置
3. 或者使用 MyMemory 作为备选
```

### MyMemory 错误

**错误: "TOO_MANY_REQUESTS"**
```
原因：每日 1000 次请求已用完
解决方案：
1. 等待 24 小时
2. 使用 Langbly（推荐）
```

---

## 📞 获取帮助

- [Langbly 官网](https://langbly.com/)
- [Langbly 文档](https://langbly.com/docs)
- [MyMemory API 文档](https://mymemory.translated.net/doc/spec.php)
- [GitHub Actions 文档](https://docs.github.com/actions)

---

## 🎉 总结

现在您拥有了**真正免费的自动翻译系统**！

**主要优势：**
- 🌍 支持 5 种语言（en, es, de, fr, ar）
- 🤖 自动翻译节省 90% 的翻译工作量
- 💰 **完全免费，无需信用卡！**
- ✅ Langbly 每月 50 万字符（强烈推荐）
- ✅ 人工审核确保翻译质量
- 🔄 实时同步更新
- 📈 SEO 友好，每个语言版本独立优化

**立即行动：**
推荐使用 Langbly，只需 30 秒注册即可享受每月 50 万字符的免费翻译！

```bash
# 1. 访问 https://langbly.com/
# 2. 使用邮箱注册（免费）
# 3. 获取 API Key
# 4. 设置环境变量并运行翻译
```

需要我帮您做其他的优化吗？
