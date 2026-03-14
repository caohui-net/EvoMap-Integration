#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '../.omc/learning-loop-log.json');
const LEARNING_DURATION = 10 * 60 * 1000; // 10分钟学习
const CHECK_INTERVAL = 2 * 60 * 1000; // 2分钟检查一次

function log(message) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

function loadLog() {
  if (fs.existsSync(LOG_FILE)) {
    return JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
  }
  return {
    cycles: 0,
    totalCredits: 769,
    lastLearning: null,
    lastExecution: null,
    discoveries: []
  };
}

function saveLog(data) {
  fs.writeFileSync(LOG_FILE, JSON.stringify(data, null, 2));
}

async function learningPhase() {
  log('🎓 进入学习阶段...');
  const topics = [
    'bounties',
    'arena',
    'sandbox',
    'drift-bottle',
    'knowledge-graph'
  ];

  const topic = topics[Math.floor(Math.random() * topics.length)];
  log(`📚 探索主题: ${topic}`);

  try {
    execSync(`firecrawl scrape https://evomap.ai/${topic} -o .firecrawl/${topic}-${Date.now()}.md`, {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
    return { topic, success: true };
  } catch (error) {
    log(`❌ 学习失败: ${error.message}`);
    return { topic, success: false };
  }
}

async function executionPhase() {
  log('⚡ 进入执行阶段...');

  try {
    const result = execSync('node scripts/auto-execute.js', {
      cwd: path.join(__dirname, '..'),
      encoding: 'utf8'
    });

    log('✅ 执行完成');
    return { success: true, output: result };
  } catch (error) {
    if (error.message.includes('rate_limited')) {
      log('⏸️  遇到速率限制，返回学习模式');
      return { success: false, rateLimited: true };
    }
    log(`❌ 执行失败: ${error.message}`);
    return { success: false, rateLimited: false };
  }
}

async function main() {
  log('🚀 启动学习-执行循环');

  const logData = loadLog();
  let learningStartTime = Date.now();

  while (true) {
    logData.cycles++;

    // 学习阶段
    const learningResult = await learningPhase();
    logData.lastLearning = new Date().toISOString();
    if (learningResult.success) {
      logData.discoveries.push({
        topic: learningResult.topic,
        time: logData.lastLearning
      });
    }

    // 等待学习时间
    const elapsed = Date.now() - learningStartTime;
    if (elapsed < LEARNING_DURATION) {
      const waitTime = LEARNING_DURATION - elapsed;
      log(`⏳ 继续学习 ${Math.round(waitTime / 60000)} 分钟...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    // 执行阶段
    const execResult = await executionPhase();
    logData.lastExecution = new Date().toISOString();

    if (execResult.rateLimited) {
      log('🔄 速率限制，重新开始学习周期');
      learningStartTime = Date.now();
    } else if (execResult.success) {
      log('💰 积分已更新');
    }

    saveLog(logData);

    // 检查间隔
    log(`⏰ 等待 ${CHECK_INTERVAL / 60000} 分钟后继续...`);
    await new Promise(resolve => setTimeout(resolve, CHECK_INTERVAL));
  }
}

main().catch(console.error);
