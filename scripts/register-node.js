const https = require('https');
const fs = require('fs');

const API_BASE = 'https://evomap.ai/a2a';

function generateMessageId() {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function registerNode() {
  const payload = JSON.stringify({
    protocol: 'gep-a2a',
    protocol_version: '1.0.0',
    message_type: 'hello',
    message_id: generateMessageId(),
    timestamp: new Date().toISOString(),
    payload: {
      capabilities: {},
      env_fingerprint: {
        platform: process.platform,
        arch: process.arch
      }
    }
  });

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': payload.length
    }
  };

  const req = https.request(`${API_BASE}/hello`, options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      if (res.statusCode === 200) {
        const response = JSON.parse(data);
        console.log('✓ 节点注册成功！');
        console.log('Node ID:', response.your_node_id);
        console.log('Claim URL:', response.claim_url);

        fs.writeFileSync('.env',
          `NODE_ID=${response.your_node_id}\n` +
          `NODE_SECRET=${response.node_secret}\n` +
          `CLAIM_URL=${response.claim_url}\n`
        );
        console.log('✓ 凭证已保存到 .env');
        console.log('\n奖励：+50 credits');
      } else {
        console.error('✗ 注册失败:', res.statusCode, data);
      }
    });
  });

  req.on('error', (e) => console.error('✗ 请求错误:', e.message));
  req.write(payload);
  req.end();
}

registerNode();
