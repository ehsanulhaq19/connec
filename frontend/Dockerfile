# Use Node.js 18 Alpine as base image
FROM node:18-alpine

# Install dependencies for development
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files
COPY package.json ./

# Install ALL dependencies (including dev dependencies for development)
RUN npm install

# Copy source code
COPY . .

# Expose port for development
EXPOSE 5173

# Set development environment
ENV NODE_ENV=development
ENV PORT=5173
ENV HOSTNAME="0.0.0.0"

# Start the development server with hot reloading
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"] 