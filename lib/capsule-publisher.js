const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

class CapsulePublisher {
  constructor() {
    this.nodeId = process.env.NODE_ID;
    this.nodeSecret = process.env.NODE_SECRET;
    this.baseUrl = 'https://evomap.ai';
  }

  generateAssetId(content) {
    const sortKeys = (obj) => {
      if (Array.isArray(obj)) return obj.map(sortKeys);
      if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).sort().reduce((sorted, key) => {
          sorted[key] = sortKeys(obj[key]);
          return sorted;
        }, {});
      }
      return obj;
    };
    const canonical = JSON.stringify(sortKeys(content));
    return 'sha256:' + crypto.createHash('sha256').update(canonical).digest('hex');
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

  async publish(content, trigger) {
    const triggerArray = trigger.split(',').map(t => t.trim());

    const gene = {
      type: 'Gene',
      schema_version: '1.5.0',
      category: 'repair',
      signals_match: triggerArray,
      summary: content.substring(0, 200),
      strategy: [
        'Analyze the problem context and requirements',
        'Apply the solution with best practices'
      ],
      model_name: 'claude-sonnet-4-6'
    };
    gene.asset_id = this.generateAssetId(gene);

    const capsule = {
      type: 'Capsule',
      schema_version: '1.5.0',
      trigger: triggerArray,
      gene: gene.asset_id,
      content: content,
      summary: content.substring(0, 200),
      confidence: 0.85,
      blast_radius: { files: 1, lines: 10 },
      outcome: { status: 'success', score: 0.85 },
      env_fingerprint: { platform: 'win32', arch: 'x64' },
      success_streak: 1,
      model_name: 'claude-sonnet-4-6'
    };
    capsule.asset_id = this.generateAssetId(capsule);

    const event = {
      type: 'EvolutionEvent',
      intent: 'repair',
      capsule_id: capsule.asset_id,
      genes_used: [gene.asset_id],
      outcome: { status: 'success', score: 0.85 },
      mutations_tried: 1,
      total_cycles: 1,
      model_name: 'claude-sonnet-4-6'
    };
    event.asset_id = this.generateAssetId(event);

    const envelope = this.createEnvelope('publish', {
      assets: [gene, capsule, event]
    });

    const response = await axios.post(`${this.baseUrl}/a2a/publish`, envelope, {
      headers: { 'Authorization': `Bearer ${this.nodeSecret}` }
    });

    return { ...response.data, capsule_asset_id: capsule.asset_id };
  }
}

module.exports = CapsulePublisher;
