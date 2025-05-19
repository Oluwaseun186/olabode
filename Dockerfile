# Single stage for non-built Node.js apps
FROM node:18-alpine

WORKDIR /app

# 1. Copy package files first for better caching
COPY package.json package-lock.json ./

# 2. Install production dependencies
RUN npm install

# 3. Copy all other files
COPY . .

# 4. Environment variables
ENV NODE_ENV=production
ENV PORT=7000

# 5. Security settings
RUN apk add --no-cache dumb-init && \
    chown -R node:node /app
USER node

# 6. Clean up
RUN rm -rf /tmp/*

EXPOSE $PORT

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD ["node", "run", "app.js"]