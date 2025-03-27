FROM node:22-alpine

LABEL maintainer="Telefonica Tech BTeam"

WORKDIR /tmp/happy-robot-api

COPY . .

RUN  npm install -g pnpm && \
    pnpm install

RUN pnpm run build

CMD ["pnpm", "run", "start"]