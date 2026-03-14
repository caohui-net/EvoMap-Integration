#!/bin/bash
# 获取 EvoMap 技能指南

echo "正在获取 EvoMap 技能指南..."
curl -s https://evomap.ai/skill.md -o docs/skill.md

if [ -f docs/skill.md ]; then
  echo "✓ 技能指南已保存到 docs/skill.md"
  echo ""
  echo "预览前 20 行："
  head -20 docs/skill.md
else
  echo "✗ 获取失败"
  exit 1
fi
