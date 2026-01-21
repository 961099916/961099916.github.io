#!/bin/bash
# ============================================================
# 博客推送脚本 - 作者: jiuxialb, 创建时间: 2026-01-22
# 功能: Git推送 + 自动提交Sitemap到各搜索引擎
# ============================================================

# 配置区域 - 请填写你的信息
# ------------------------------------------------------------
SITE_URL="https://blog.jiuxialb.top"
SITEMAP_URL="${SITE_URL}/sitemap.xml"

# 百度站长平台API推送Token (在百度站长平台 -> 资源提交 -> API提交 获取)
# 格式: site=你的网站&token=你的token
BAIDU_TOKEN="site=https://blog.jiuxialb.top&token=WS4X0EpNPLfsjrGs"

# Bing站长平台API密钥 (在 Bing Webmaster Tools -> Settings -> API access 获取)
BING_API_KEY=""
# ------------------------------------------------------------

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}       九夏博客推送脚本 v1.0${NC}"
echo -e "${BLUE}============================================${NC}"

# 1. Git 推送
echo -e "\n${YELLOW}[1/4] Git 推送...${NC}"
git add .
if [ -z "$1" ]; then
    COMMIT_MSG="update: $(date '+%Y-%m-%d %H:%M:%S')"
else
    COMMIT_MSG="$1"
fi
git commit -m "$COMMIT_MSG"
git push origin main -f

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Git 推送成功${NC}"
else
    echo -e "${RED}✗ Git 推送失败${NC}"
    exit 1
fi

# 等待 GitHub Pages 部署 (可选)
echo -e "\n${YELLOW}[2/4] 等待 GitHub Pages 部署 (30秒)...${NC}"
sleep 30

# 2. 百度 Sitemap 推送
echo -e "\n${YELLOW}[3/4] 百度搜索引擎推送...${NC}"
if [ -n "$BAIDU_TOKEN" ]; then
    # 百度API主动推送
    BAIDU_RESULT=$(curl -s "http://data.zz.baidu.com/urls?${BAIDU_TOKEN}" \
        -H 'Content-Type:text/plain' \
        --data-binary "$SITEMAP_URL")
    echo -e "   百度API响应: $BAIDU_RESULT"
    
    # 百度sitemap更新通知
    curl -s "http://data.zz.baidu.com/ping?sitemap=${SITEMAP_URL}" > /dev/null 2>&1
    echo -e "${GREEN}   ✓ 百度推送完成${NC}"
else
    echo -e "${YELLOW}   ⚠ 百度Token未配置，跳过API推送${NC}"
    echo -e "   提示: 请在脚本中配置 BAIDU_TOKEN"
fi

# 3. Bing/必应 Sitemap 推送
echo -e "\n${YELLOW}[4/4] Bing/必应搜索引擎推送...${NC}"
if [ -n "$BING_API_KEY" ]; then
    BING_RESULT=$(curl -s "https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=${BING_API_KEY}" \
        -H "Content-Type: application/json" \
        -d "{\"siteUrl\":\"${SITE_URL}\",\"urlList\":[\"${SITEMAP_URL}\"]}")
    echo -e "   Bing API响应: $BING_RESULT"
    echo -e "${GREEN}   ✓ Bing推送完成${NC}"
else
    # Bing IndexNow 免费推送 (无需API Key)
    echo -e "   使用 IndexNow 协议推送..."
    curl -s "https://www.bing.com/indexnow?url=${SITEMAP_URL}&key=index" > /dev/null 2>&1
    echo -e "${GREEN}   ✓ Bing IndexNow推送完成${NC}"
fi

# Google Ping (Google会自动抓取sitemap，这里只是通知更新)
echo -e "\n${BLUE}[额外] Google Sitemap 通知...${NC}"
curl -s "https://www.google.com/ping?sitemap=${SITEMAP_URL}" > /dev/null 2>&1
echo -e "${GREEN}   ✓ Google通知完成${NC}"

echo -e "\n${GREEN}============================================${NC}"
echo -e "${GREEN}       全部完成！${NC}"
echo -e "${GREEN}============================================${NC}"
echo -e "Sitemap地址: ${SITEMAP_URL}"
echo -e "请到各站长平台查看收录情况"
