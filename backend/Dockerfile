FROM node:18

WORKDIR /app

COPY package.json pnpm-lock.yaml /app/

RUN npm install -g pnpm && pnpm install

COPY . /app/

RUN pnpm build

EXPOSE 3000

CMD ["node", "dist/index.js"]
