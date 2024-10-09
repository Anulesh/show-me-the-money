FROM node:18

WORKDIR /app

COPY package.json pnpm-lock.yaml /app/

RUN npm install -g pnpm && pnpm install

COPY . /app/

CMD ["pnpm", "start"]

