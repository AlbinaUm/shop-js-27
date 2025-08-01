# Используем Node.js с Debian (нужен apt для установки Puppeteer-зависимостей)
FROM node:22-slim

# Устанавливаем системные зависимости, нужные для Chromium
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends \
 && rm -rf /var/lib/apt/lists/*

# Рабочая директория
WORKDIR /tests

# Копируем только тестовую папку
COPY ./tests .

# Установка зависимостей
RUN npm ci --legacy-peer-deps --no-audit --no-fund --verbose

# Включаем headless-режим через ENV (если используешь)
ENV HEADLESS=true

# Запуск тестов
CMD ["npm", "run", "codeceptjs:headless"]
