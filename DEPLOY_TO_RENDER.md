# 部署到 Render 的步驟

## 方法一：透過 Render Dashboard（推薦）

1. 前往 [Render Dashboard](https://dashboard.render.com/)
2. 點擊 "New +" 按鈕，選擇 "Static Site"
3. 連接您的 GitHub 帳號（如果尚未連接）
4. 選擇 repository: `JoeyVIP/space-cat-cafe-v4`
5. 設定以下參數：
   - **Name**: `space-cat-cafe-v4`（或自訂名稱）
   - **Branch**: `main`
   - **Build Command**: 留空或輸入 `echo "Build complete"`
   - **Publish Directory**: `.` (當前目錄)
6. 點擊 "Create Static Site"
7. 等待部署完成（通常 1-2 分鐘）
8. 取得 Render 網址（格式：`space-cat-cafe-v4.onrender.com`）

## 方法二：使用 render.yaml 自動配置

本專案已包含 `render.yaml` 配置檔，Render 會自動讀取此檔案進行配置。

您只需要：
1. 前往 Render Dashboard
2. 選擇 "New" > "Blueprint"
3. 連接 GitHub repository
4. Render 會自動使用 render.yaml 的設定

## 重要資訊

- **GitHub Repository**: https://github.com/JoeyVIP/space-cat-cafe-v4
- **建議的 Site Name**: space-cat-cafe-v4
- **Publish Directory**: `.` (根目錄)
- **Build Command**: 無需執行（靜態網站）

## 自動部署

設定完成後，每次推送到 main branch 都會自動觸發重新部署。

## 預期結果

部署成功後，您的網站將可通過以下網址訪問：
- https://space-cat-cafe-v4.onrender.com

（實際網址可能因名稱可用性而有所不同）
