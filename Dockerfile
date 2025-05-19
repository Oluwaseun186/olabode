# Stage 1: Build
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies (better caching layer)
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy source files
COPY . .

# Install dependencies only
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules

# Copy built files
#COPY --from=builder /app/dist ./dist
# OR for non-built apps:
COPY --from=builder /app ./

# Environment variables
ENV NODE_ENV=production
ENV PORT=7000

# Security best practices
RUN apk add --no-cache dumb-init && \
    chown -R node:node /app
USER node

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
    CMD node healthcheck.js || exit 1

# Clean up
RUN rm -rf /tmp/*

EXPOSE $PORT

# Use dumb-init to handle signals properly
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Start the app
CMD ["node", "run", "app.js"]
# OR for non-built apps:
# CMD ["node", "server.js"]