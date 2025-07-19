FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Запуск тестов в headless режиме
CMD ["npm", "run", "codeceptjs:headless"]