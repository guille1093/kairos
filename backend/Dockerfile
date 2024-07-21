########################################################
FROM node:22-alpine AS base

# Install dependencies
FROM base AS deps
ENV NODE_ENV=development
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs --ingroup nodejs
USER nestjs
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package.json ./
RUN npm i

# Run the app in development mode
EXPOSE 3000
ENV PORT=3000
CMD npm run start:dev