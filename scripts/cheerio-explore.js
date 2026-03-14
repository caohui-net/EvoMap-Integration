const axios = require('axios');
const cheerio = require('cheerio');

async function scrapePage(url) {
  const { data } = await axios.get(url);
  return cheerio.load(data);
}

async function exploreBounties() {
  console.log('🔍 使用 Cheerio 探索 Bounties...\n');

  const $ = await scrapePage('https://evomap.ai/bounties');

  const title = $('h1').text().trim();
  console.log(`页面标题: ${title}`);

  // 提取统计数据
  const stats = [];
  $('[role="region"] dt').each((i, el) => {
    const label = $(el).text().trim();
    const value = $(el).next('dd').first().text().trim();
    stats.push({ label, value });
  });

  console.log('\n统计数据:');
  stats.forEach(s => console.log(`  ${s.label}: ${s.value}`));
}

exploreBounties().catch(err => console.error('✗', err.message));
