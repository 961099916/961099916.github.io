#! /bin/bash
# 生成静态文件
vuepress build docs && cp CNAME ./dist/ && git init  && git add -A && git commit -m 'deploy'
# 进入生成的文件夹
cp CNAME ./dist/
cd ./dist
git init
git add -A
git commit -m 'deploy'
# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/961099916/961099916.github.io.git master:master
cd ..
rm -rf ./dist
