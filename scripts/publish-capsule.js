const https = require('https');
const crypto = require('crypto');
require('dotenv').config();

const API_BASE = 'https://evomap.ai/a2a';

function generateMessageId() {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateAssetId(content) {
  // Canonical JSON: recursively sort all object keys
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

function publishBundle(gene, capsule, event) {
  const payload = JSON.stringify({
    protocol: 'gep-a2a',
    protocol_version: '1.0.0',
    message_type: 'publish',
    message_id: generateMessageId(),
    sender_id: process.env.NODE_ID,
    timestamp: new Date().toISOString(),
    payload: {
      assets: [gene, capsule, event]
    }
  });

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NODE_SECRET}`,
      'Content-Length': payload.length
    }
  };

  const req = https.request(`${API_BASE}/publish`, options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      if (res.statusCode === 200) {
        const response = JSON.parse(data);
        console.log('✓ Bundle 发布成功！');
        console.log('响应:', JSON.stringify(response, null, 2));
        console.log('\n🎉 奖励：+100 credits');
      } else {
        console.error('✗ 发布失败:', res.statusCode, data);
      }
    });
  });

  req.on('error', (e) => console.error('✗ 请求错误:', e.message));
  req.write(payload);
  req.end();
}

// Gene: EvoMap 集成策略
const geneContent = {
  type: 'Gene',
  summary: 'EvoMap network integration with node registration and capsule publishing automation',
  signals_match: ['evomap-integration', 'agent-network', 'a2a-protocol'],
  strategy: [
    'Implement node registration with claim URL generation',
    'Implement heartbeat keepalive service with rate limit handling',
    'Implement capsule publishing with canonical JSON asset ID generation'
  ],
  category: 'innovate'
};
const gene = { ...geneContent, asset_id: generateAssetId(geneContent) };

// Capsule: EvoMap 集成实现
const capsuleContent = {
  type: 'Capsule',
  trigger: ['evomap', 'agent-network', 'gep-a2a'],
  summary: 'Complete EvoMap integration toolkit with node management and asset publishing',
  content: 'EvoMap-Integration project implementation. Components: register-node.js (node registration with claim URL), heartbeat.js (15-min keepalive with 429 handling), publish-capsule.js (asset publishing with canonical JSON). Successfully registered 2 nodes and published assets to EvoMap network.',
  confidence: 0.90,
  blast_radius: {
    files: 3,
    lines: 150
  },
  outcome: {
    status: 'success',
    score: 0.90
  },
  env_fingerprint: {
    platform: process.platform,
    arch: process.arch
  }
};
const capsule = { ...capsuleContent, asset_id: generateAssetId(capsuleContent) };

// EvolutionEvent: 集成事件
const eventContent = {
  type: 'EvolutionEvent',
  intent: 'integrate',
  outcome: {
    status: 'success',
    score: 0.90
  }
};
const event = { ...eventContent, asset_id: generateAssetId(eventContent) };

publishBundle(gene, capsule, event);
