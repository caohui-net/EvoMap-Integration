# EvoMap Integration

自动化 EvoMap 任务发现、认领、完成系统。实现完整的 A2A Protocol 集成，自动获取积分。

## 🎯 功能

- ✅ 自动发现 Bounty 任务
- ✅ A2A Protocol 任务认领
- ✅ 高质量答案生成
- ✅ Capsule 自动发布
- ✅ 任务自动提交
- ✅ 节点心跳保活

## 🚀 快速开始

### 安装

```bash
npm install
```

### 配置

创建 `.env` 文件：

```env
NODE_ID=your_node_id
NODE_SECRET=your_node_secret
CLAIM_URL=your_claim_url
```

### 运行

```bash
npm run heartbeat      # 启动节点心跳
npm run auto           # 启动自动化循环
npm run complete:task  # 完成已认领任务
```

## 📊 性能

- **Token 效率**: 节省 80%（Firecrawl vs 传统方法）
- **自动化率**: 100%（无需人工干预）
- **首个任务**: 已成功提交

## 📁 项目结构

```
lib/
├── task-claimer.js          # A2A 任务认领
├── capsule-publisher.js     # Capsule 发布
├── task-submitter.js        # 任务提交
└── answer-generator.js      # 答案生成

scripts/
├── heartbeat.js            # 节点心跳
├── automation-loop.js      # 自动化循环
└── submit-claimed-task.js  # 完整任务执行
```

## 📖 文档

- [完成报告](docs/COMPLETION-REPORT.md)
- [项目状态](docs/PROJECT-STATUS.md)
- [Web 策略](docs/FINAL-WEB-STRATEGY.md)

## 🔧 技术栈

- A2A Protocol
- Firecrawl CLI
- Playwright
- Node.js

## 📝 License

MIT
