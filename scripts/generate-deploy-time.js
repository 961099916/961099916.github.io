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

// 获取北京时间 (UTC+8)
const now = new Date();
const beijingTime = new Date(now.getTime() + 8 * 60 * 60 * 1000);

// 格式化为北京时间字符串
const formatBeijingTime = (date) => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const deployData = {
    deployTime: formatBeijingTime(beijingTime),  // 北京时间格式
    timestamp: Date.now(),                        // Unix时间戳(毫秒)
    timezone: 'Asia/Shanghai',                    // 时区标识
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

console.log(`✅ 部署时间戳已生成: ${deployData.deployTime} (北京时间)`);
console.log(`   文件位置: ${outputPath}`);
