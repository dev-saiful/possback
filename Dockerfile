# =========================
# Stage 1: Dependencies
# =========================
FROM node:20-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package.json only (monorepo doesn't have lockfile in backend)
COPY package.json ./
RUN npm install --omit=dev && npm cache clean --force

# Install all dependencies for build
FROM node:20-alpine AS dev-deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json ./
RUN npm install && npm cache clean --force

# =========================
# Stage 2: Builder
# =========================
FROM node:20-alpine AS builder

WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build NestJS app
RUN npm run build

# =========================
# Stage 3: Runner
# =========================
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Install necessary packages for Prisma
RUN apk add --no-cache libc6-compat

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nestjs

# Copy production dependencies
COPY --from=deps --chown=nestjs:nodejs /app/node_modules ./node_modules

# Copy built application
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nestjs:nodejs /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder --chown=nestjs:nodejs /app/package.json ./package.json

# Copy Prisma generated client from builder
COPY --from=builder --chown=nestjs:nodejs /app/generated ./generated

USER nestjs

EXPOSE 5000
ENV PORT=5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:5000/ || exit 1

CMD ["node", "dist/main"]