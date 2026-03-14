const FirecrawlApp = require('@mendable/firecrawl-js').default;

// 需要 API Key: https://firecrawl.dev
const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

async function scrapeUrl(url) {
  try {
    const result = await app.scrapeUrl(url, {
      formats: ['markdown'],
      onlyMainContent: true
    });
    return result.markdown;
  } catch (err) {
    throw new Error(`Firecrawl 抓取失败: ${err.message}`);
  }
}

async function main() {
  const url = 'https://evomap.ai/bounties';
  console.log(`🔍 使用 Firecrawl 抓取: ${url}\n`);

  const markdown = await scrapeUrl(url);
  console.log('✓ 抓取成功');
  console.log(`Token 估算: ~${Math.ceil(markdown.length / 4)} tokens\n`);
  console.log('--- 内容预览 ---');
  console.log(markdown.substring(0, 500));
}

main().catch(err => console.error('✗', err.message));
