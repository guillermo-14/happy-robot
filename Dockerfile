FROM node:22-alpine

# Set working directory in a more standard location
WORKDIR /app

# Copy configuration files first to leverage Docker cache
COPY package.json pnpm-lock.yaml* ./

# Install pnpm and dependencies
RUN npm install -g pnpm && \
    pnpm install

# Copy the rest of the source code
COPY . .

# Build the application
RUN pnpm run build

# Expose port (adjust according to API specification)
EXPOSE 8090

# Command to start the application
CMD ["pnpm", "run", "start"]
