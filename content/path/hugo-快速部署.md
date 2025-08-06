---
title: "5分鐘架設 Hugo 及上架"
date: 2025-08-06
draft: false
tags: ["Hugo", "GitHub Pages", "部落格", "No‑Code", "AI協作"]
summary: "本篇目標：完成 Hugo + GitHub Pages 架設流程，並為日後在 Mac 撰寫 Markdown 文章打好基礎。"
---

### 好啦，我真的動手了！目標是在 5 分鐘內把網站跑起來

上一篇文章我說我決定靠 AI 來幫我實現部落格夢，這一篇就實際來動手試試看：  
**能不能用最快速度，把 Hugo 架起來、套好主題、部署到 GitHub Pages，然後開啟新文章寫 Markdown？**

雖然標題寫「5分鐘」，但老實說中間還是有一些卡關時間（尤其是 Hugo 和 GitHub Pages 之間有些愛恨情仇），但如果你也想照著做，這篇可以當成懶人包，幾乎照貼照做就能成功 ✅

---

## 第一步：工具先裝好（MacOS 篇）

如果你用的是 Mac，這些東西請先裝好（如果之前已裝可略過）：

```bash
brew install hugo
brew install git
```

再來，建立一個新的 Hugo 專案：

```bash
hugo new site <網站名稱>
cd <網站名稱>
```

我直接選用AI推薦我的PaperMod主題

```bash
git init
git submodule add https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
```

然後記得編輯 config.toml（或 hugo.toml），加上以下這些基本設定：

```
baseURL = 'https://你的帳號.github.io/' 
languageCode = 'zh-TW'
title = 'Candojo'
theme = 'PaperMod'
```

也可以多加一些參數讓主題變得更完整，但這個我們之後再說～

---

## 第二步：建立 GitHub Pages 倉庫

這裡是 Hugo 的經典搭配：

:::info
⚙️ Hugo 負責產出靜態頁面 → GitHub Pages 幫你把它上網
:::

步驟如下：

1. 打開 GitHub，建立一個新倉庫（建議命名為 你的帳號.github.io）
2. 不勾選 README（我們會從本機 push 上去）
3. 記下這個倉庫網址，例如 https://github.com/ezcan/ezcan.github.io

---

## 第三步：本地測試不能少

如果你不想馬上部署，就可以先在本地看看網站長得怎樣？
```bash
hugo server -D
```

預設會跑在 ```http://localhost:1313```直接打開瀏覽器輸入這串網址，就可以看到網站囉！

---

## 第四步：加一個懶人部署腳本 deploy.sh

每次部署都打一堆指令太麻煩，請AI幫忙輸出一個小腳本來部署：

```bash
hugo -D
cd public
git init
git remote add origin https://github.com/你的帳號/你的帳號.github.io.git
git branch -M gh-pages
git add .
git commit -m "deploy"
git push -f origin gh-pages
cd ..
```

然後記得到 GitHub Repo → Settings → Pages → 選 gh-pages 分支作為網站來源。基本上就大功告成啦！
