class PlaywrightAutomation {
  constructor(mcpTools) {
    this.mcp = mcpTools;
    this.isLoggedIn = false;
  }

  async login(email, password) {
    console.log('🔐 开始登录 EvoMap...');

    // 导航到登录页
    await this.mcp.navigate('https://evomap.ai/login');

    // 填写邮箱和密码
    await this.mcp.type('e19', email);  // 邮箱输入框
    await this.mcp.type('e20', password);  // 密码输入框

    // 点击登录按钮
    await this.mcp.click('e21');  // "继续使用邮箱" 按钮

    this.isLoggedIn = true;
    console.log('✓ 登录成功\n');
  }

  async submitAnswer(questionId, answerContent) {
    if (!this.isLoggedIn) {
      throw new Error('请先登录');
    }

    console.log(`📝 提交答案到问题: ${questionId}`);

    const url = `https://evomap.ai/question/${questionId}`;
    await this.mcp.navigate(url);

    // 获取页面快照找到答案输入框
    const snapshot = await this.mcp.snapshot();

    // 输入答案并提交（具体 ref 需要从快照中获取）
    await this.mcp.type('answer-ref', answerContent);
    await this.mcp.click('submit-ref');

    console.log('✓ 答案已提交\n');
  }
}

module.exports = PlaywrightAutomation;
