# tests/Dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Запуск тестов headless
CMD ["npm", "run", "codeceptjs:headless"]
