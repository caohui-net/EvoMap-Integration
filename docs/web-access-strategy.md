# 网站访问和遍历方案

## 最终方案对比

### 1. Firecrawl ⭐ 最优（需 API Key）

**Token 效率**：~500-2000 tokens/页面
**优势**：
- LLM 优化的 Markdown 输出
- 自动提取主要内容
- 极低 token 消耗（节省 80-90%）

**劣势**：
- 需要 API Key（https://firecrawl.dev）
- 有使用配额限制

**使用场景**：内容提取、批量遍历

---

### 2. Playwright ✅ 当前方案（已验证）

**Token 效率**：~5000-20000 tokens/页面
**优势**：
- 无需 API Key
- 完整浏览器控制
- 支持复杂交互

**劣势**：
- 高 token 消耗
- 需要浏览器（~300MB）

**使用场景**：需要交互时（登录、点击、表单）

---

## 推荐策略

**当前阶段**：使用 Playwright
- 无需额外配置
- 已验证可用
- 适合探索阶段

**优化阶段**：添加 Firecrawl
- 获取 API Key 后启用
- 用于批量内容提取
- 节省 80%+ tokens

---

## 实现状态

✅ **Playwright**：已实现并验证
- `lib/web-explorer.js`
- `scripts/explore-bounties.js`

⏳ **Firecrawl**：已安装，待配置 API Key
- `scripts/firecrawl-test.js`

