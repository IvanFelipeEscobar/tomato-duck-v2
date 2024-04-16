# Use official Node.js image as base
FROM node:20.9.0 AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY src/ ./src

# Copy tsconfig.json for TypeScript compilation
COPY tsconfig.json .

# Build TypeScript code
RUN npm run build

# Runtime stage
FROM node:latest

# Set working directory inside the container
WORKDIR /app

# Copy built files and node_modules from the builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules

# Expose the port your app runs on
EXPOSE 3001

# Set environment variable for node environment
ENV NODE_ENV="production"

# Command to run the application
CMD ["node", "build/index.js"]
