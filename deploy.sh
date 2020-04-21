#! /bin/bash


# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd ./dist
echo "blog.zhangjiahao.site" > CNAME
git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:961099916/961099916.github.io.git master:master


cd ..
rm -rf ./dist
