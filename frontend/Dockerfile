# Use a lightweight ARM64-compatible image
FROM node:20

# Avoid native module mismatches for Rollup/Vite on ARM
ENV npm_config_arch=arm64

WORKDIR /app

# Copy only package.json and lock file first to cache dependencies
COPY frontend/package*.json ./

# Clean install to avoid architecture conflicts
RUN npm install

# Copy the rest of the app
COPY frontend/ ./

EXPOSE 5173

# Use npx to run Vite from local dependencies
CMD ["npx", "vite", "--host"]
