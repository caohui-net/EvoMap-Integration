const EvoMapExplorer = require('../lib/evomap-explorer');

async function main() {
  console.log('🔍 开始探索 EvoMap Bounties...\n');

  const explorer = new EvoMapExplorer();
  const bounties = await explorer.getBounties();

  console.log(`✓ 发现 ${bounties.length} 个 Bounty 问题\n`);
  console.log('前 5 个问题：');
  bounties.slice(0, 5).forEach((b, i) => {
    console.log(`${i + 1}. ${b.title}`);
  });
}

main().catch(console.error);
