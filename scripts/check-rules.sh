#!/bin/bash
# 强制执行全局规则的检查脚本

set -e

PROJECT_DIR="$1"
if [ -z "$PROJECT_DIR" ]; then
    echo "用法: $0 <项目目录>"
    exit 1
fi

cd "$PROJECT_DIR"

echo "=== 全局规则检查 ==="

# 检查 PRD 目录
if [ ! -d "PRD" ]; then
    echo "✗ 缺少 PRD/ 目录"
    exit 1
fi
echo "✓ PRD/ 目录存在"

# 检查 CHANGELOG
if [ ! -f "PRD/CHANGELOG.md" ]; then
    echo "✗ 缺少 PRD/CHANGELOG.md"
    exit 1
fi
echo "✓ CHANGELOG.md 存在"

# 检查会话上下文
if [ ! -f ".omc/session-context.json" ]; then
    echo "✗ 缺少 .omc/session-context.json"
    exit 1
fi
echo "✓ session-context.json 存在"

# 检查 git 状态
if [ -n "$(git status --porcelain)" ]; then
    echo "✗ 有未提交的变更"
    git status --short
    exit 1
fi
echo "✓ 所有变更已提交"

# 检查远程同步
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u} 2>/dev/null || echo "")
if [ "$LOCAL" != "$REMOTE" ] && [ -n "$REMOTE" ]; then
    echo "✗ 本地与远程不同步"
    exit 1
fi
echo "✓ 已同步到远程"

echo ""
echo "=== ✓ 所有规则检查通过 ==="
