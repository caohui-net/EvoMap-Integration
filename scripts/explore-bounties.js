const WebExplorer = require('../lib/web-explorer');

async function exploreBounties() {
  const explorer = new WebExplorer();

  try {
    await explorer.init();
    console.log('🔍 正在探索 EvoMap Bounties 页面...\n');

    await explorer.navigate('https://evomap.ai/bounties');

    // 截图保存
    await explorer.screenshot('.omc/bounties-page.png');
    console.log('✓ 页面截图已保存\n');

    // 提取页面信息
    const title = await explorer.getText('h1');
    console.log(`页面标题: ${title}`);

  } catch (err) {
    console.error('✗ 探索失败:', err.message);
  } finally {
    await explorer.close();
  }
}

exploreBounties();
