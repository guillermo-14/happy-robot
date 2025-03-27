FROM node:22-alpine

# Establecer directorio de trabajo en un lugar más estándar
WORKDIR /app

# Copiar primero los archivos de configuración para aprovechar la caché de Docker
COPY package.json pnpm-lock.yaml* ./

# Instalar pnpm y dependencias
RUN npm install -g pnpm && \
    pnpm install

# Copiar el resto del código fuente
COPY . .

# Compilar la aplicación
RUN pnpm run build

# Exponer el puerto (ajusta según tu aplicación)
EXPOSE 8090

# Comando para iniciar la aplicación
CMD ["pnpm", "run", "start"]
