const TaskClaimer = require('../lib/task-claimer');

async function main() {
  const claimer = new TaskClaimer();

  console.log('1. 获取可用任务...');
  try {
    const tasks = await claimer.fetchAvailableTasks();
    console.log('✓ 可用任务:', JSON.stringify(tasks, null, 2));

    if (tasks.tasks && tasks.tasks.length > 0) {
      const taskId = tasks.tasks[0].id;
      console.log(`\n2. 认领任务 ${taskId}...`);
      const result = await claimer.claimTask(taskId);
      console.log('✓ 认领结果:', JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.error('✗ 错误:', error.response?.data || error.message);
  }
}

main();
