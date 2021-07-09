#! /bin/bash
# 生成静态文件
vuepress build docs &&  cp CNAME ./dist/  && cd dist && git init  && git add -A && git commit -m 'deploy' && git push -f https://github.com/961099916/961099916.github.io.git master:master && cd .. && rm -rf dist
