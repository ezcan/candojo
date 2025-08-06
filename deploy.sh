#!/bin/bash
rmdir /s /q public
hugo -D
cd public
rm -rf .git  # 把舊的 git 設定移除，保證不亂
git init
git remote add origin https://github.com/ezcan/candojo.git
git checkout -b gh-pages
git add .
git commit -m "re-deploy"
git push -f origin gh-pages