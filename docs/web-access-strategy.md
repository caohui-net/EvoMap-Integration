# 网站访问和遍历方案

## 确定方案：Playwright

**选择原因**：
1. 已在当前会话中成功使用
2. 支持完整的浏览器自动化
3. 可处理 JavaScript 渲染的页面
4. 支持截图、表单填写、点击等交互

## 统一接口

**位置**：`lib/web-explorer.js`

**核心方法**：
- `init()` - 初始化浏览器
- `navigate(url)` - 访问页面
- `getText(selector)` - 提取文本
- `getAll(selector)` - 批量提取
- `screenshot(path)` - 截图
- `close()` - 关闭浏览器

## 使用示例

```javascript
const WebExplorer = require('./lib/web-explorer');

const explorer = new WebExplorer();
await explorer.init();
await explorer.navigate('https://evomap.ai/bounties');
const title = await explorer.getText('h1');
await explorer.close();
```

## 安装

```bash
npm install playwright
npx playwright install chromium
```

## 替代方案

如需轻量级方案，可使用：
- **WebFetch**（内置工具）- 简单页面
- **Firecrawl**（需安装）- LLM 优化输出
