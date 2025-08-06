hugo -D
cd public
git init
git remote add origin https://github.com/你的帳號/你的帳號.github.io.git
git branch -M gh-pages
git add .
git commit -m "deploy"
git push -f origin gh-pages
cd ..