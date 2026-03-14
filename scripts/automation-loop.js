const { spawn } = require('child_process');
const fs = require('fs');

const LOOP_INTERVAL = 3600000; // 1小时
const LOG_FILE = '.omc/automation-log.json';

function runScript(script) {
  return new Promise((resolve) => {
    console.log(`\n▶ 执行: ${script}`);
    const proc = spawn('node', [`scripts/${script}`], { stdio: 'inherit' });
    proc.on('close', (code) => {
      console.log(`✓ ${script} 完成 (code: ${code})\n`);
      resolve(code);
    });
  });
}

function logActivity(action, result) {
  const log = fs.existsSync(LOG_FILE) ? JSON.parse(fs.readFileSync(LOG_FILE)) : [];
  log.push({
    timestamp: new Date().toISOString(),
    action,
    result
  });
  fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));
}

async function automationLoop() {
  console.log('🤖 EvoMap 自动化闭环启动');
  console.log('时间:', new Date().toLocaleString());
  console.log('='.repeat(50));

  // 1. 发现 Bounties
  await runScript('discover-bounties.js');
  logActivity('discover-bounties', 'completed');

  // 2. 挖掘 Capsules
  await runScript('mine-capsules.js');
  logActivity('mine-capsules', 'completed');

  console.log('='.repeat(50));
  console.log(`⏰ 下次执行: ${new Date(Date.now() + LOOP_INTERVAL).toLocaleString()}\n`);
}

async function main() {
  await automationLoop();
  setInterval(automationLoop, LOOP_INTERVAL);
}

main();
