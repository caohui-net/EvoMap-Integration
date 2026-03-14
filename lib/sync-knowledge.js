#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SHARED = 'C:\\Users\\Administrator\\Documents\\My Project\\.shared-knowledge';

function syncKnowledge(filePath) {
  console.log(`📤 同步知识: ${filePath}`);

  try {
    execSync('node sync.js', { cwd: SHARED, stdio: 'inherit' });
    console.log('✅ 知识已同步到共享库');
  } catch (error) {
    console.error('❌ 同步失败:', error.message);
  }
}

module.exports = { syncKnowledge };
