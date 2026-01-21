/**
 * 生成部署时间戳脚本
 * 作者: jiuxialb
 * 创建时间: 2026-01-22
 * 用途: 在构建时生成部署时间，供推送脚本检测部署状态
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const deployTime = new Date().toISOString();
const deployData = {
    deployTime: deployTime,
    timestamp: Date.now(),
    version: process.env.npm_package_version || '2.0.0'
};

// 输出到 public 目录，构建后会自动复制到根目录
const publicDir = path.join(__dirname, '../src/.vuepress/public');
const outputPath = path.join(publicDir, 'deploy-info.json');

// 确保目录存在
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(deployData, null, 2));

console.log(`✅ 部署时间戳已生成: ${deployTime}`);
console.log(`   文件位置: ${outputPath}`);
