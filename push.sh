#!/bin/bash
# ============================================================
# 博客推送脚本 - 作者: jiuxialb, 创建时间: 2026-01-22
# 功能: Git推送 + 等待Cloudflare部署 + 自动提交Sitemap到各搜索引擎
# ============================================================

# 配置区域 - 请填写你的信息
# ------------------------------------------------------------
SITE_URL="https://blog.jiuxialb.top"
SITEMAP_URL="${SITE_URL}/sitemap.xml"
DEPLOY_INFO_URL="${SITE_URL}/deploy-info.json"

# 百度站长平台API推送Token (在百度站长平台 -> 资源提交 -> API提交 获取)
BAIDU_TOKEN="site=https://blog.jiuxialb.top&token=WS4X0EpNPLfsjrGs"

# Bing站长平台API密钥 (在 Bing Webmaster Tools -> Settings -> API access 获取)
BING_API_KEY=""

# 部署检测配置
MAX_WAIT_TIME=300      # 最大等待时间（秒）
CHECK_INTERVAL=10      # 检测间隔（秒）
# ------------------------------------------------------------

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}       九夏博客推送脚本 v2.0${NC}"
echo -e "${BLUE}============================================${NC}"

# 记录推送前的时间戳
PUSH_TIMESTAMP=$(date +%s)
echo -e "${CYAN}推送时间戳: ${PUSH_TIMESTAMP}${NC}"

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

# 2. 等待 Cloudflare Pages 部署完成
echo -e "\n${YELLOW}[2/4] 等待 Cloudflare Pages 部署完成...${NC}"
echo -e "   检测地址: ${DEPLOY_INFO_URL}"
echo -e "   最大等待: ${MAX_WAIT_TIME}秒"

WAIT_TIME=0
DEPLOY_COMPLETE=false

# 先等待15秒让Cloudflare开始构建
echo -e "   初始等待 15 秒..."
sleep 15
WAIT_TIME=15

while [ $WAIT_TIME -lt $MAX_WAIT_TIME ]; do
    # 获取部署信息
    DEPLOY_RESPONSE=$(curl -s "${DEPLOY_INFO_URL}" 2>/dev/null)
    
    if [ $? -eq 0 ] && [ -n "$DEPLOY_RESPONSE" ]; then
        # 提取部署时间戳
        DEPLOY_TIMESTAMP=$(echo "$DEPLOY_RESPONSE" | grep -o '"timestamp":[0-9]*' | grep -o '[0-9]*')
        
        if [ -n "$DEPLOY_TIMESTAMP" ]; then
            # 将毫秒转换为秒进行比较
            DEPLOY_TIMESTAMP_SEC=$((DEPLOY_TIMESTAMP / 1000))
            
            if [ $DEPLOY_TIMESTAMP_SEC -gt $PUSH_TIMESTAMP ]; then
                DEPLOY_COMPLETE=true
                DEPLOY_TIME=$(echo "$DEPLOY_RESPONSE" | grep -o '"deployTime":"[^"]*"' | cut -d'"' -f4)
                echo -e "\n${GREEN}✓ 检测到新部署完成！${NC}"
                echo -e "   部署时间: ${DEPLOY_TIME}"
                break
            fi
        fi
    fi
    
    # 显示等待进度
    REMAINING=$((MAX_WAIT_TIME - WAIT_TIME))
    echo -ne "\r   已等待 ${WAIT_TIME}秒，剩余 ${REMAINING}秒..."
    
    sleep $CHECK_INTERVAL
    WAIT_TIME=$((WAIT_TIME + CHECK_INTERVAL))
done

if [ "$DEPLOY_COMPLETE" = false ]; then
    echo -e "\n${YELLOW}⚠ 等待超时，继续进行 SEO 推送...${NC}"
fi

# 3. 百度 Sitemap 推送
echo -e "\n${YELLOW}[3/4] 百度搜索引擎推送...${NC}"
if [ -n "$BAIDU_TOKEN" ]; then
    # 百度API主动推送 - 推送首页和sitemap
    echo -e "   推送链接到百度..."
    URLS="${SITE_URL}\n${SITEMAP_URL}"
    BAIDU_RESULT=$(echo -e "$URLS" | curl -s "http://data.zz.baidu.com/urls?${BAIDU_TOKEN}" \
        -H 'Content-Type:text/plain' \
        --data-binary @-)
    echo -e "   百度API响应: $BAIDU_RESULT"
    
    # 百度sitemap更新通知
    curl -s "http://data.zz.baidu.com/ping?sitemap=${SITEMAP_URL}" > /dev/null 2>&1
    echo -e "${GREEN}   ✓ 百度推送完成${NC}"
else
    echo -e "${YELLOW}   ⚠ 百度Token未配置，跳过API推送${NC}"
fi

# 4. Bing/必应 Sitemap 推送
echo -e "\n${YELLOW}[4/4] Bing/必应搜索引擎推送...${NC}"
if [ -n "$BING_API_KEY" ]; then
    BING_RESULT=$(curl -s "https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=${BING_API_KEY}" \
        -H "Content-Type: application/json" \
        -d "{\"siteUrl\":\"${SITE_URL}\",\"urlList\":[\"${SITE_URL}\",\"${SITEMAP_URL}\"]}")
    echo -e "   Bing API响应: $BING_RESULT"
    echo -e "${GREEN}   ✓ Bing推送完成${NC}"
else
    # Bing IndexNow 免费推送 (无需API Key)
    echo -e "   使用 IndexNow 协议推送..."
    curl -s "https://www.bing.com/indexnow?url=${SITE_URL}&key=indexnow" > /dev/null 2>&1
    curl -s "https://www.bing.com/indexnow?url=${SITEMAP_URL}&key=indexnow" > /dev/null 2>&1
    echo -e "${GREEN}   ✓ Bing IndexNow推送完成${NC}"
fi

# Google Ping
echo -e "\n${BLUE}[额外] Google Sitemap 通知...${NC}"
curl -s "https://www.google.com/ping?sitemap=${SITEMAP_URL}" > /dev/null 2>&1
echo -e "${GREEN}   ✓ Google通知完成${NC}"

# 完成
echo -e "\n${GREEN}============================================${NC}"
echo -e "${GREEN}       全部完成！${NC}"
echo -e "${GREEN}============================================${NC}"
echo -e "网站地址: ${SITE_URL}"
echo -e "Sitemap: ${SITEMAP_URL}"
echo -e "部署信息: ${DEPLOY_INFO_URL}"
echo -e "\n请到各站长平台查看收录情况:"
echo -e "  - 百度: https://ziyuan.baidu.com/linksubmit/index"
echo -e "  - Bing: https://www.bing.com/webmasters"
echo -e "  - Google: https://search.google.com/search-console"
