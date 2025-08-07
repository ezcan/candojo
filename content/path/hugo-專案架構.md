---
title: "認識 Hogo 的專案構造"
date: 2025-08-07
draft: false
tags: ["Hugo", "GitHub Pages", "部落格", "No-Code", "AI協作"]
summary: "帶你認識 Hugo 專案資料夾結構，以及 config.toml 能設定的功能，讓你在 PaperMod 主題下快速上手。"
---

### 我開始好奇 Hugo 背後的「骨架」了

前兩篇，我們用 5 分鐘把網站架起來、成功部署到 GitHub Pages，算是踏出了 Hugo 世界的第一步。  
接下來，應該來對這個專案一無所知的**內臟構造**進行探索 🤯

於是這篇，我決定來認識 Hugo 的專案架構，順便看看 `config.toml` 能玩出什麼花樣。  
不求一次看完全記住，但至少知道每個資料夾的功能、哪些設定是「一定要先改」的。

---

## 第一部分：Hugo 專案架構巡禮 🏗️

當你跑完 `hugo new site <專案名稱>` 之後，專案資料夾大概會長這樣：

```
專案名稱/
├── archetypes/      # 新文章的模板（front matter 預設值）
├── assets/          # SCSS、JS 原始檔（進階自訂用）
├── content/         # 你的文章內容（Markdown）
├── data/            # JSON/YAML/TOML 資料檔，可用於模板
├── layouts/         # 覆寫或新增版型（HTML 模板）
├── static/          # 靜態資源（圖片、CSS、JS）
├── themes/          # 主題（例如 PaperMod）
├── config.toml      # 設定檔（網站全局設定）
└── public/          # Hugo 輸出成品（部署用）
```

💡 **最常用的資料夾就是 `content/`、`static/`、`themes/` 和 `config.toml`**，其他資料夾等熟悉之後再慢慢玩。

---

## 第二部分：config.toml 可以設定什麼？

`config.toml` 是 Hugo 網站的大腦，負責定義網站標題、網址、語系、主題，還能開啟或關閉一些功能。

以下是AI推薦 **PaperMod 主題必改** 或 **很好用** 的設定項目：

```toml
baseURL = "https://ezcan.github.io/candojo/"
languageCode = "zh-TW"
title = "Candojo"
theme = "PaperMod"
enableInlineShortcodes = true
paginate = 10  # 每頁顯示文章數

[params]
  author = "你的名字"
  defaultTheme = "auto" # 預設主題模式 auto / light / dark
  ShowReadingTime = true
  ShowBreadCrumbs = true
  ShowPostNavLinks = true
  ShowToc = true
  TocOpen = false

[menu]
  [[menu.main]]
    name = "文章"
    url = "/posts/"
    weight = 1
  [[menu.main]]
    name = "關於"
    url = "/about/"
    weight = 2
```

---

### 常見設定分類 🔍

1. **網站基本資訊**  
   `baseURL`、`title`、`languageCode`、`theme`  
   （這些幾乎每個 Hugo 專案都會設定）

2. **功能開關（params）**  
   主題專屬的開關，例如顯示閱讀時間、是否開啟文章目錄、社群連結。

3. **選單（menu）**  
   控制頂部導覽列項目與排序。

4. **文章呈現細節**  
   每頁幾篇文章（`paginate`）、摘要長度（`summaryLength`）等。

5. **多語系（languages）**  
   想做雙語部落格時會用到，初期可以先略過。

---

## 第三部分：PaperMod 常用的小彩蛋 ✨

- **首頁自我介紹區塊**  
  在 `params` 裡加 `homeInfoParams`，可以讓首頁出現一句話簡介與連結。

```toml
[params.homeInfoParams]
  Title = "Hi，我是 Ezcan 👋"
  Content = "這裡紀錄我的 Hugo 架站、AI 協作筆記，以及一些興趣研究"
```

- **社群圖示**  
  讓你的 GitHub、Email、Twitter 直接顯示在頂部或底部。

```toml
[[params.socialIcons]]
  name = "github"
  url = "https://github.com/ezcan"
[[params.socialIcons]]
  name = "email"
  url = "mailto:your@email.com"
```

---

### 小結

今天我們拆解了 Hugo 的專案骨架，知道哪些資料夾最常用，還認識了 `config.toml` 能開哪些開關。  
下一篇，我會實際示範 **改 config.toml → 馬上看到首頁變化** 的過程，讓設定不再只是死板的文字，而是可視化的改造工具。

👉 **[敬請期待！]**
