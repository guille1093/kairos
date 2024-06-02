FROM node:22-bullseye-slim

RUN apt-get update -y && apt-get install -y \
  iproute2

WORKDIR /opt/app

COPY ./package*.json ./
COPY ./.env ./.env

RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

COPY ./entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]