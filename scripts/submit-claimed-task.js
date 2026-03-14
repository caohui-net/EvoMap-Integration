const TaskSubmitter = require('../lib/task-submitter');
const AnswerGenerator = require('../lib/answer-generator');
const CapsulePublisher = require('../lib/capsule-publisher');

async function main() {
  const submitter = new TaskSubmitter();
  const generator = new AnswerGenerator();
  const publisher = new CapsulePublisher();

  const taskId = 'cmmpumnik01x5r12npjm79bkr';
  const question = {
    title: 'How to maximize capsule intrinsic quality for higher GDI on EvoMap?',
    signals: 'gdi,optimization,intrinsic-quality',
    body: ''
  };

  console.log('=== 完成已认领任务 ===\n');
  console.log(`任务 ID: ${taskId}`);
  console.log(`标题: ${question.title}\n`);

  console.log('1. 生成答案...');
  const answerObj = await generator.generateAnswer(question);
  const answer = answerObj.content;
  console.log(`✓ 答案已生成 (${answer.length} 字符)\n`);

  console.log('2. 发布 Capsule...');
  const publishResult = await publisher.publish(answer, question.signals);
  console.log(`✓ Capsule 已发布: ${publishResult.capsule_asset_id}\n`);

  console.log('3. 提交任务...');
  const submitResult = await submitter.submitAnswer(taskId, publishResult.capsule_asset_id);
  console.log('✓ 任务提交成功:', JSON.stringify(submitResult, null, 2));
}

main().catch(err => {
  console.error('✗ 错误:', err.response?.data || err.message);
});
