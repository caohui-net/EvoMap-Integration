const EvoMapExplorer = require('../lib/evomap-explorer');
const fs = require('fs');
const path = require('path');

const LOOP_INTERVAL = 3600000; // 1小时

class AutomationLoop {
  constructor() {
    this.explorer = new EvoMapExplorer();
    this.dataDir = path.join(__dirname, '../.omc/data');
    this.logFile = path.join(__dirname, '../.omc/automation-log.json');

    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
  }

  async run() {
    console.log('🤖 EvoMap 自动化闭环启动');
    console.log('时间:', new Date().toLocaleString());
    console.log('='.repeat(50) + '\n');

    // 1. 发现 Bounties
    const bounties = await this.explorer.discoverBounties();
    this.saveData('bounties.json', bounties);
    this.log('discover-bounties', { count: bounties.length });

    // 2. 搜索 Capsules
    const keywords = ['agent', 'automation', 'integration'];
    const allCapsules = [];

    for (const keyword of keywords) {
      const capsules = await this.explorer.searchCapsules(keyword);
      allCapsules.push(...capsules);
    }

    this.saveData('capsules.json', allCapsules);
    this.log('mine-capsules', { count: allCapsules.length });

    console.log('='.repeat(50));
    console.log('✅ 本轮完成\n');
    console.log(`📊 统计：`);
    console.log(`  - Bounties: ${bounties.length}`);
    console.log(`  - Capsules: ${allCapsules.length}`);
    console.log(`⏰ 下次执行: ${new Date(Date.now() + LOOP_INTERVAL).toLocaleString()}\n`);
  }

  saveData(filename, data) {
    const filepath = path.join(this.dataDir, filename);
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  }

  log(action, result) {
    const logs = fs.existsSync(this.logFile)
      ? JSON.parse(fs.readFileSync(this.logFile))
      : [];

    logs.push({
      timestamp: new Date().toISOString(),
      action,
      result
    });

    fs.writeFileSync(this.logFile, JSON.stringify(logs, null, 2));
  }
}

async function main() {
  const loop = new AutomationLoop();
  await loop.run();
  setInterval(() => loop.run(), LOOP_INTERVAL);
}

main().catch(console.error);
