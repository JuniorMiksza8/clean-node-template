FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run generate

RUN npm run build

EXPOSE 80
CMD node dist/index.js
