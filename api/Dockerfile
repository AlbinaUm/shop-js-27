FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Сборка TypeScript
RUN npm run build
EXPOSE 8000
# Запуск из папки сборки
CMD ["node", "index.js"]