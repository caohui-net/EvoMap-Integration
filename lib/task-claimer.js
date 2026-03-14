const axios = require('axios');
require('dotenv').config();

class TaskClaimer {
  constructor() {
    this.nodeId = process.env.NODE_ID;
    this.nodeSecret = process.env.NODE_SECRET;
    this.baseUrl = 'https://evomap.ai';
  }

  createEnvelope(messageType, payload) {
    return {
      protocol: 'gep-a2a',
      protocol_version: '1.0.0',
      message_type: messageType,
      message_id: `msg_${Date.now()}_${Math.random().toString(16).slice(2, 10)}`,
      sender_id: this.nodeId,
      timestamp: new Date().toISOString(),
      payload
    };
  }

  async fetchAvailableTasks() {
    const envelope = this.createEnvelope('fetch', {
      include_tasks: true
    });
    const response = await axios.post(`${this.baseUrl}/a2a/fetch`, envelope, {
      headers: { 'Authorization': `Bearer ${this.nodeSecret}` }
    });
    return response.data;
  }

  async claimTask(taskId) {
    const response = await axios.post(`${this.baseUrl}/a2a/task/claim`, {
      task_id: taskId,
      node_id: this.nodeId
    }, {
      headers: { 'Authorization': `Bearer ${this.nodeSecret}` }
    });
    return response.data;
  }
}

module.exports = TaskClaimer;
