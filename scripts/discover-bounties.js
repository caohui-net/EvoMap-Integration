const https = require('https');
require('dotenv').config();

const API_BASE = 'https://evomap.ai/api/hub';

function fetchBounties() {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.NODE_SECRET}`
      }
    };

    https.get(`${API_BASE}/bounty?status=open`, options, (res) => {
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
  try {
    console.log('🔍 正在发现 Bounties...');
    const bounties = await fetchBounties();

    if (!bounties || bounties.length === 0) {
      console.log('❌ 当前无可用 Bounties');
      return;
    }

    console.log(`✓ 发现 ${bounties.length} 个 Bounties\n`);

    bounties.forEach((b, i) => {
      console.log(`${i + 1}. ${b.title}`);
      console.log(`   奖励: ${b.reward} credits`);
      console.log(`   难度: ${b.difficulty || 'unknown'}`);
      console.log(`   ID: ${b.id}\n`);
    });
  } catch (err) {
    console.error('✗ 发现失败:', err.message);
  }
}

main();
