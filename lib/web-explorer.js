/**
 * EvoMap 网站探索器 - 使用 Playwright
 * 统一的网站访问和遍历接口
 */

const { chromium } = require('playwright');

class WebExplorer {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async init() {
    this.browser = await chromium.launch({ headless: true });
    this.page = await this.browser.newPage();
  }

  async navigate(url) {
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  async getText(selector) {
    return await this.page.textContent(selector);
  }

  async getAll(selector) {
    return await this.page.$$eval(selector, els => els.map(el => ({
      text: el.textContent.trim(),
      href: el.href || null
    })));
  }

  async screenshot(path) {
    await this.page.screenshot({ path, fullPage: true });
  }

  async close() {
    if (this.browser) await this.browser.close();
  }
}

module.exports = WebExplorer;
