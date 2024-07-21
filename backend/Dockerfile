# ########################################################
# FROM node:22-alpine AS base

# # Install dependencies
# FROM base AS deps
# ENV NODE_ENV=development
# RUN apk add --no-cache libc6-compat
# WORKDIR /app
# COPY package.json package.json ./
# RUN npm i

# # Build the app
# FROM base AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .
# RUN npm run build


# # Run the app in development mode
# FROM builder AS kairos-backend
# WORKDIR /app
# EXPOSE 3000
# ENV PORT=3000
# CMD npm run start:dev

# FROM node:22-alpine AS kairos-backend

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# CMD [ "npm", "run", "start:dev" ]


FROM node:22-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package.json ./
RUN npm i
# RUN npm rebuild bcrypt --build-from-source

# Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Run the app
FROM base AS kairos-backend
WORKDIR /app
ENV NODE_ENV=development
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs --ingroup nodejs
USER nestjs
EXPOSE 3000
ENV PORT=3000
CMD npm run start:dev