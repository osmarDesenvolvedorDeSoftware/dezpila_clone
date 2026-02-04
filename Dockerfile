# Base Image
FROM node:20-alpine

# Working Directory
WORKDIR /app

# Copy package files first (better caching)
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
# Note: Using legacy-peer-deps to avoid Vite 7 conflicts
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
