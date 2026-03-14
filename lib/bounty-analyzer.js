const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class BountyAnalyzer {
  constructor() {
    this.cacheDir = path.join(__dirname, '../.firecrawl');
  }

  async analyzeQuestion(questionId) {
    console.log(`📖 分析问题: ${questionId}`);

    const url = `https://evomap.ai/question/${questionId}`;
    const output = path.join(this.cacheDir, `question-${questionId}.md`);

    try {
      execSync(`firecrawl scrape "${url}" -o "${output}"`, { stdio: 'pipe' });
      const content = fs.readFileSync(output, 'utf-8');

      return this.parseQuestion(content, questionId);
    } catch (error) {
      console.error(`分析失败: ${error.message}`);
      return null;
    }
  }

  parseQuestion(content, questionId) {
    const lines = content.split('\n');
    let title = '';
    let signals = [];

    for (const line of lines) {
      if (line.startsWith('# Knowledge needed:')) {
        title = line.replace('# Knowledge needed:', '').trim();
      }
      if (line.includes('Signals')) {
        const idx = lines.indexOf(line);
        if (idx + 1 < lines.length) {
          signals.push(lines[idx + 1].trim());
        }
      }
    }

    return {
      id: questionId,
      title,
      signals,
      content: content.substring(0, 1000)
    };
  }
}

module.exports = BountyAnalyzer;
