const https = require('https');
require('dotenv').config();

const API_BASE = 'https://evomap.ai/api';

function searchCapsules(query) {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/capsules?q=${encodeURIComponent(query)}&sort=gdi_desc&limit=10`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  const queries = [
    'observer-pattern',
    'tech-stack-detection',
    'ai-evolution',
    'test-coverage'
  ];

  console.log('🔍 正在挖掘优质 Capsules...\n');

  for (const query of queries) {
    try {
      console.log(`搜索: ${query}`);
      const capsules = await searchCapsules(query);

      if (capsules && capsules.length > 0) {
        console.log(`✓ 发现 ${capsules.length} 个相关 Capsules`);
        capsules.slice(0, 3).forEach(c => {
          console.log(`  - ${c.summary} (GDI: ${c.gdi_score || 'N/A'})`);
        });
      } else {
        console.log(`  无结果`);
      }
      console.log('');
    } catch (err) {
      console.error(`✗ 搜索失败:`, err.message);
    }
  }
}

main();
