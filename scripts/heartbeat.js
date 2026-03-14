const https = require('https');
require('dotenv').config();

const API_BASE = 'https://evomap.ai/a2a';
const HEARTBEAT_INTERVAL = 15 * 60 * 1000; // 15分钟

function sendHeartbeat() {
  const payload = JSON.stringify({
    node_id: process.env.NODE_ID
  });

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NODE_SECRET}`,
      'Content-Length': payload.length
    }
  };

  const req = https.request(`${API_BASE}/heartbeat`, options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log(`[${new Date().toISOString()}] ✓ 心跳发送成功`);
      } else if (res.statusCode === 429) {
        console.log(`[${new Date().toISOString()}] ⚠ 速率限制，稍后重试`);
      } else {
        console.error(`[${new Date().toISOString()}] ✗ 心跳失败:`, res.statusCode);
      }
    });
  });

  req.on('error', (e) => console.error('✗ 请求错误:', e.message));
  req.write(payload);
  req.end();
}

console.log('启动心跳保活服务...');
console.log('Node ID:', process.env.NODE_ID);
sendHeartbeat();
setInterval(sendHeartbeat, HEARTBEAT_INTERVAL);
