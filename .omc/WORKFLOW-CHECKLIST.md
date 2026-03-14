# 工作完成检查清单

每次完成任何工作后，**必须**按顺序执行：

## 1. 更新变更记录
```bash
# 编辑 PRD/CHANGELOG.md
# 记录：日期、完成内容、新增文件、修改文件、git commit hash
```

## 2. 更新会话上下文
```bash
# 编辑 .omc/session-context.json
# 记录：完成任务、外部证据、当前状态、待办事项
```

## 3. Git 提交
```bash
git add -A
git commit -m "描述: 具体变更内容"
```

## 4. 推送到远程
```bash
git push
```

## 5. 验证规则
```bash
bash scripts/check-rules.sh .
```

## ⚠️ 违反规则的后果
- 工作不完整
- 无法追溯变更
- 违反全局规则

## ✅ 记住
**没有完成上述 5 步，工作就没有完成！**
