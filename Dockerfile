# 使用 Node.js 18 Alpine 映像作為基礎映像
FROM node:18-alpine

# 設定工作目錄為 /app
WORKDIR /app

# 將專案的 package.json 和 package-lock.json 複製到容器的 /app 目錄下
COPY package.json package-lock.json ./

# 安裝專案依賴
RUN npm install

# 將專案文件複製到容器的 /app 目錄下
COPY . .

# 暴露應用程式運行的端口，如果有需要的話
EXPOSE 5173

# 設置環境變量，用於熱重載
ENV CHOKIDAR_USEPOLLING=true

# 啟動 Vite 開發伺服器
CMD ["npm", "run", "dev"]
