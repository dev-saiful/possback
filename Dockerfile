# =============================
# 1. deps (cached)
# =============================
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci


# =============================
# 2. build (generate prisma FIRST)
# =============================
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 🔥 THIS LINE FIXES EVERYTHING
RUN npx prisma generate

# now TS knows Prisma types
RUN npm run build


# =============================
# 3. prod deps
# =============================
FROM node:20-alpine AS prod-deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY prisma ./prisma
RUN npx prisma generate


# =============================
# 4. runtime
# =============================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=prod-deps /app/prisma ./prisma

EXPOSE 5000
CMD ["node", "dist/src/main.js"]
