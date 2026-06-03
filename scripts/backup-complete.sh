#!/bin/bash

# 完整项目备份脚本
# 使用方法: ./backup-complete.sh

set -e

BACKUP_DIR="../houseplusgroup-website-full-backup"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_FILENAME="houseplusgroup-website-full-$TIMESTAMP"

echo "=========================================="
echo "🏗️  完整项目备份脚本"
echo "=========================================="
echo ""

# 创建备份目录
mkdir -p "$BACKUP_DIR"

# 1. Git 完整备份
echo "📦 步骤 1: Git 完整仓库备份..."
cd ..
if [ -d "houseplusgroup-website" ]; then
    cd houseplusgroup-website
    git bundle create "$BACKUP_DIR/$BACKUP_FILENAME.gitbundle" --all
    echo "✅ Git 仓库已备份: $BACKUP_FILENAME.gitbundle"
    cd ..
fi

# 2. 完整源码备份（包含所有）
echo "📁 步骤 2: 完整源码备份..."
cd houseplusgroup-website
tar --exclude='node_modules' --exclude='.next' -czf "$BACKUP_DIR/$BACKUP_FILENAME-source.tar.gz" .
echo "✅ 源码已备份: $BACKUP_FILENAME-source.tar.gz"

# 3. 配置文件单独备份
echo "⚙️  步骤 3: 配置文件备份..."
cp -f package.json "$BACKUP_DIR/" 2>/dev/null || true
cp -f pnpm-lock.yaml "$BACKUP_DIR/" 2>/dev/null || true
cp -f package-lock.json "$BACKUP_DIR/" 2>/dev/null || true
cp -f next.config.js "$BACKUP_DIR/" 2>/dev/null || true
cp -f .env.example "$BACKUP_DIR/" 2>/dev/null || true
cp -f .gitignore "$BACKUP_DIR/" 2>/dev/null || true
echo "✅ 配置文件已备份"

# 4. 文档备份
echo "📄 步骤 4: 文档备份..."
cp -f README.md "$BACKUP_DIR/" 2>/dev/null || true
cp -f BACKUP_REPORT.md "$BACKUP_DIR/" 2>/dev/null || true
cp -f SITEMAP_OPTIMIZATION_REPORT.md "$BACKUP_DIR/" 2>/dev/null || true
echo "✅ 文档已备份"

# 5. 创建备份清单
echo "📋 步骤 5: 创建备份清单..."
cat > "$BACKUP_DIR/backup-manifest-$TIMESTAMP.txt" <<EOF
==========================================
🏗️  HousePlusGroup Website 完整备份
==========================================
备份时间: $(date '+%Y-%m-%d %H:%M:%S')
备份时间戳: $TIMESTAMP

==========================================
📦 备份文件列表
==========================================

1. $BACKUP_FILENAME.gitbundle
   - 类型: Git 完整仓库
   - 描述: 包含所有分支、标签、历史记录
   - 恢复命令: git clone $BACKUP_FILENAME.gitbundle

2. $BACKUP_FILENAME-source.tar.gz
   - 类型: 完整源码压缩包
   - 描述: 不含 node_modules 和 .next
   - 解压: tar -xzf $BACKUP_FILENAME-source.tar.gz

3. 配置文件
   - package.json
   - pnpm-lock.yaml
   - next.config.js
   - .env.example
   - .gitignore

4. 文档
   - README.md
   - BACKUP_REPORT.md
   - SITEMAP_OPTIMIZATION_REPORT.md

==========================================
🔄 恢复步骤
==========================================

方法 1: 从 Git Bundle 恢复
------------------------------------------
git clone $BACKUP_FILENAME.gitbundle
cd houseplusgroup-website
pnpm install
pnpm dev

方法 2: 从源码压缩包恢复
------------------------------------------
tar -xzf $BACKUP_FILENAME-source.tar.gz
cd houseplusgroup-website
pnpm install
pnpm dev

==========================================
📊 项目信息
==========================================
项目名称: HousePlusGroup Website
备份日期: $(date '+%Y-%m-%d %H:%M:%S')
EOF

echo "✅ 备份清单已创建"

# 完成
echo ""
echo "=========================================="
echo "✅ 完整备份完成！"
echo "=========================================="
echo ""
echo "📁 备份位置: $BACKUP_DIR"
echo ""
ls -lh "$BACKUP_DIR"
echo ""
echo "💡 提示: 请将备份文件保存到安全位置！"
