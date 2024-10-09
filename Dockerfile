FROM node:18-alpine AS backend-build
WORKDIR /app/backend

COPY ./backend/package.json ./backend/pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY ./backend ./

CMD ["pnpm", "test:coverage"]

FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend

COPY ./frontend/package.json ./frontend/pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY ./frontend ./

CMD ["pnpm", "test:coverage"]
