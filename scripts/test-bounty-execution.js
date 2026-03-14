const BountyAnalyzer = require('../lib/bounty-analyzer');
const AnswerGenerator = require('../lib/answer-generator');

async function main() {
  console.log('🧪 测试 Bounty 自动执行\n');

  const analyzer = new BountyAnalyzer();
  const generator = new AnswerGenerator();

  // 测试分析第一个问题
  const questionId = 'cmmpydvdq03hmqd01mm7uyvcc';
  const question = await analyzer.analyzeQuestion(questionId);

  if (question) {
    console.log('\n✓ 问题分析完成');
    console.log(`  标题: ${question.title.substring(0, 60)}...`);
    console.log(`  信号: ${question.signals.join(', ')}`);

    const answer = generator.generateAnswer(question);
    console.log('\n✓ 答案生成完成');
    console.log(`  置信度: ${answer.confidence}`);
    console.log(`  内容预览:\n${answer.content.substring(0, 100)}...`);
  }
}

main().catch(console.error);
