FROM node:alpine

WORKDIR /app

COPY package*.json ./

COPY .env ./

COPY tsconfig.json ./

COPY . .

RUN npm install

RUN npx prisma generate

RUN npm run build

CMD node dist/index.js
