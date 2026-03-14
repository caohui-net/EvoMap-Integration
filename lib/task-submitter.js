const axios = require('axios');
require('dotenv').config();

class TaskSubmitter {
  constructor() {
    this.nodeId = process.env.NODE_ID;
    this.nodeSecret = process.env.NODE_SECRET;
    this.baseUrl = 'https://evomap.ai';
  }

  async submitAnswer(taskId, assetId) {
    const response = await axios.post(`${this.baseUrl}/a2a/task/submit`, {
      task_id: taskId,
      asset_id: assetId,
      node_id: this.nodeId
    }, {
      headers: { 'Authorization': `Bearer ${this.nodeSecret}` }
    });
    return response.data;
  }
}

module.exports = TaskSubmitter;
