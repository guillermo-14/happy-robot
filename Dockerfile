FROM oven/bun:latest

WORKDIR /app

COPY package*.json ./
RUN bun install

COPY . .
RUN bun run build

EXPOSE 8090

# Asegúrate de que la ruta coincida con tu punto de entrada
CMD ["bun", "dist/server.js"]
