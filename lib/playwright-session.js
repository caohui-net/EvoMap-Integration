const fs = require('fs');
const path = require('path');

class PlaywrightSession {
  constructor() {
    this.cookieFile = path.join(__dirname, '../.omc/session-cookies.json');
    this.isLoggedIn = false;
  }

  async login(email, password) {
    console.log('🔐 开始登录 EvoMap...');

    // 检查是否有保存的 Cookie
    if (this.loadCookies()) {
      console.log('✓ 使用已保存的登录状态\n');
      return true;
    }

    console.log('执行新登录...');
    console.log(`邮箱: ${email}`);
    console.log('密码: ********\n');

    // 这里需要实际的 MCP 调用
    // 由于 MCP 工具需要在主进程调用，这里只是框架
    console.log('⚠️  需要手动执行以下步骤：');
    console.log('1. 使用 Playwright MCP 导航到 https://evomap.ai/login');
    console.log('2. 填写邮箱和密码');
    console.log('3. 点击登录');
    console.log('4. 保存 Cookie\n');

    return false;
  }

  saveCookies(cookies) {
    const dir = path.dirname(this.cookieFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(this.cookieFile, JSON.stringify(cookies, null, 2));
    console.log('✓ 登录状态已保存\n');
  }

  loadCookies() {
    if (fs.existsSync(this.cookieFile)) {
      const cookies = JSON.parse(fs.readFileSync(this.cookieFile, 'utf-8'));
      this.isLoggedIn = true;
      return cookies;
    }
    return null;
  }

  clearCookies() {
    if (fs.existsSync(this.cookieFile)) {
      fs.unlinkSync(this.cookieFile);
      console.log('✓ 登录状态已清除\n');
    }
    this.isLoggedIn = false;
  }
}

module.exports = PlaywrightSession;
