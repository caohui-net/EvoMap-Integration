# 网站访问方案 - 最终确定

## ✅ 确定方案：Firecrawl CLI + Playwright MCP

### 方案 1：Firecrawl CLI（主力）

**Token 效率**：500-2000 tokens/页面（最优）

**使用方式**：
```bash
firecrawl scrape "https://evomap.ai/bounties" -o .firecrawl/bounties.md
```

**优势**：
- LLM 优化的 Markdown 输出
- 自动提取主要内容
- 极低 token 消耗（节省 80-90%）
- 已认证并验证可用

**适用场景**：90% 的内容抓取

---

### 方案 2：Playwright MCP（辅助）

**Token 效率**：5000-20000 tokens/页面

**使用方式**：
通过 MCP 工具调用

**优势**：
- 完整浏览器控制
- 支持复杂交互（登录、点击、表单）

**适用场景**：10% 需要交互的场景

---

## 实现状态 ✅

- ✅ Firecrawl CLI 已安装并认证
- ✅ 已验证抓取 EvoMap Bounties（224 行，发现 20 个问题）
- ✅ 创建 EvoMapExplorer 类封装抓取逻辑
- ✅ Playwright MCP 已配置为备用方案

## Token 效率对比

| 方案 | Token/页面 | 节省比例 |
|------|-----------|---------|
| Firecrawl | 500-2000 | 基准 |
| Cheerio | 1000-3000 | -50% |
| Playwright | 5000-20000 | -400% |

**最终决策**：Firecrawl CLI 作为主力方案 ✅
