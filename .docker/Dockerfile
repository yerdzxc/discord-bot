FROM oven/bun:alpine AS base
# Set workdir
WORKDIR /app
RUN ln -s /usr/local/bin/bunx /usr/local/bin/npx && ln -s /usr/local/bin/bun /usr/local/bin/npm

# ============================
# 1. Prerequisite
# ============================
FROM base AS builder
WORKDIR /app

# Copy package.json
COPY package.json bun.lock .

# Optimize node_modules
RUN apk add --no-cache bash && bun install -p && \
    bunx clean-modules -y && \
    bunx node-prune

# ============================
# 2. App runner
# ============================
FROM base AS final

COPY --chown=bun:bun --from=builder   /app/node_modules                       ./node_modules
COPY . .

# Set environment variables (can also be passed during `docker run`)
ENV NODE_ENV=production
USER bun

# You may customize this depending on your app's entrypoint
# CMD ["bun", "start"] or similar
CMD ["sh", "./post-deploy.sh"]
