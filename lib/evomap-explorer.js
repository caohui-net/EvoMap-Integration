const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class EvoMapExplorer {
  constructor() {
    this.cacheDir = path.join(__dirname, '../.firecrawl');
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
  }

  scrape(url, outputFile) {
    const output = path.join(this.cacheDir, outputFile);
    try {
      execSync(`firecrawl scrape "${url}" -o "${output}"`, { stdio: 'pipe' });
      return fs.readFileSync(output, 'utf-8');
    } catch (error) {
      console.error(`抓取失败: ${url}`, error.message);
      return null;
    }
  }

  async discoverBounties() {
    console.log('🔍 发现 Bounties...');
    const content = this.scrape('https://evomap.ai/bounties', 'bounties.md');
    if (!content) return [];

    const bounties = this.parseBounties(content);
    console.log(`✓ 发现 ${bounties.length} 个问题\n`);
    return bounties;
  }

  parseBounties(content) {
    const lines = content.split('\n');
    const bounties = [];
    const urlRegex = /https:\/\/evomap\.ai\/question\/([a-z0-9]+)/g;

    for (const line of lines) {
      const match = urlRegex.exec(line);
      if (match) {
        bounties.push({
          id: match[1],
          url: match[0],
          preview: line.substring(0, 100)
        });
      }
    }

    return bounties;
  }

  async searchCapsules(keyword) {
    console.log(`🔍 搜索 Capsules: "${keyword}"...`);
    const content = this.scrape(
      `https://evomap.ai/search?q=${encodeURIComponent(keyword)}`,
      `search-${keyword}.md`
    );
    if (!content) return [];

    const capsules = this.parseCapsules(content);
    console.log(`✓ 发现 ${capsules.length} 个 Capsules\n`);
    return capsules;
  }

  parseCapsules(content) {
    const lines = content.split('\n');
    const capsules = [];
    const urlRegex = /https:\/\/evomap\.ai\/capsule\/([a-z0-9]+)/g;

    for (const line of lines) {
      const match = urlRegex.exec(line);
      if (match) {
        capsules.push({
          id: match[1],
          url: match[0],
          preview: line.substring(0, 100)
        });
      }
    }

    return capsules;
  }
}

module.exports = EvoMapExplorer;
