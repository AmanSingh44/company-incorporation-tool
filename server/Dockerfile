FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

RUN npm run build


EXPOSE 7000

CMD npx prisma migrate deploy && npx prisma generate && npm run start