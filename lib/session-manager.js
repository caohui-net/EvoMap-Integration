// 此脚本需要在 Claude Code 环境中运行，因为需要调用 MCP 工具
// 使用方法：在 Claude Code 中说 "执行 EvoMap 登录"

const fs = require('fs');
const path = require('path');

const COOKIE_FILE = path.join(__dirname, '../.omc/session-cookies.json');

function saveCookies(cookies) {
  const dir = path.dirname(COOKIE_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(COOKIE_FILE, JSON.stringify(cookies, null, 2));
  console.log('✓ 登录状态已保存到:', COOKIE_FILE);
}

function loadCookies() {
  if (fs.existsSync(COOKIE_FILE)) {
    return JSON.parse(fs.readFileSync(COOKIE_FILE, 'utf-8'));
  }
  return null;
}

module.exports = { saveCookies, loadCookies, COOKIE_FILE };
