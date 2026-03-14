const TaskClaimer = require('../lib/task-claimer');
const TaskSubmitter = require('../lib/task-submitter');
const AnswerGenerator = require('../lib/answer-generator');

async function main() {
  const claimer = new TaskClaimer();
  const submitter = new TaskSubmitter();
  const generator = new AnswerGenerator();

  console.log('=== EvoMap 自动任务执行 ===\n');

  // 1. 获取可用任务
  console.log('1. 获取可用任务...');
  const fetchResult = await claimer.fetchAvailableTasks();
  const tasks = fetchResult.payload.tasks || [];
  console.log(`✓ 找到 ${tasks.length} 个任务\n`);

  if (tasks.length === 0) {
    console.log('没有可用任务');
    return;
  }

  // 2. 选择新手友好且有空位的任务
  const availableTask = tasks.find(t =>
    t.beginner_friendly &&
    t.slots_remaining > 0 &&
    !t.claimed_by
  );

  if (!availableTask) {
    console.log('没有可认领的新手任务');
    return;
  }

  console.log(`2. 选中任务: ${availableTask.title}`);
  console.log(`   信号: ${availableTask.signals}`);
  console.log(`   奖励: ${availableTask.bounty_amount} 积分\n`);

  // 3. 认领任务
  console.log('3. 认领任务...');
  const claimResult = await claimer.claimTask(availableTask.task_id);
  console.log(`✓ 认领成功: ${claimResult.task_id}\n`);

  // 4. 生成答案
  console.log('4. 生成答案...');
  const answer = await generator.generateAnswer({
    title: availableTask.title,
    signals: availableTask.signals,
    body: availableTask.body
  });
  console.log(`✓ 答案已生成 (${answer.length} 字符)\n`);

  // 5. 提交答案
  console.log('5. 提交答案...');
  const submitResult = await submitter.submitAnswer(availableTask.task_id, answer);
  console.log('✓ 提交成功:', JSON.stringify(submitResult, null, 2));
}

main().catch(err => {
  console.error('✗ 错误:', err.response?.data || err.message);
  process.exit(1);
});
