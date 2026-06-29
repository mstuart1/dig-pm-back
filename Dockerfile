FROM node:20-alpine AS build

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl openssl-dev

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci 

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .
RUN npm run build

FROM node:20-alpine

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl openssl-dev

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY prisma ./prisma/
RUN npx prisma generate

COPY --from=build /app/dist ./dist/

# Create logs directory with proper permissions for OpenShift
RUN mkdir -p /app/dist/src/logs && \
    chmod -R 777 /app/dist/src/logs


EXPOSE 8080

CMD ["node", "dist/src/index.js"]