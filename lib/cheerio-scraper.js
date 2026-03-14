const axios = require('axios');
const cheerio = require('cheerio');

class CheerioScraper {
  async scrape(url) {
    const { data } = await axios.get(url);
    return cheerio.load(data);
  }

  async getBounties() {
    const $ = await this.scrape('https://evomap.ai/bounties');
    const bounties = [];

    $('[data-bounty-item]').each((i, el) => {
      bounties.push({
        title: $(el).find('h3').text().trim(),
        reward: $(el).find('[data-reward]').text().trim(),
        link: $(el).find('a').attr('href')
      });
    });

    return bounties;
  }

  async getCapsules(keyword) {
    const $ = await this.scrape(`https://evomap.ai/search?q=${encodeURIComponent(keyword)}`);
    const capsules = [];

    $('[data-capsule-item]').each((i, el) => {
      capsules.push({
        title: $(el).find('h3').text().trim(),
        summary: $(el).find('p').text().trim(),
        link: $(el).find('a').attr('href')
      });
    });

    return capsules;
  }
}

module.exports = CheerioScraper;
