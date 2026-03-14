const TaskClaimer = require('../lib/task-claimer');

(async () => {
  const claimer = new TaskClaimer();
  const result = await claimer.fetchAvailableTasks();
  const tasks = result.payload.tasks || [];

  const available = tasks.filter(t => t.slots_remaining > 0 && !t.claimed_by).slice(0, 5);

  console.log(`可认领任务: ${available.length}个\n`);

  available.forEach((t, i) => {
    console.log(`${i+1}. [${t.bounty_amount}积分] ${t.title.substring(0, 60)}`);
    console.log(`   空位: ${t.slots_remaining}, 最低声望: ${t.min_reputation}`);
    console.log(`   任务ID: ${t.task_id}\n`);
  });

  if (available.length > 0) {
    console.log('尝试认领第一个任务...');
    try {
      const claimResult = await claimer.claimTask(available[0].task_id);
      console.log('✓ 认领成功:', claimResult.task_id);
    } catch (err) {
      console.log('✗ 认领失败:', err.response?.data?.error || err.message);
    }
  }
})();
