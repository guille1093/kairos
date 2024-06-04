FROM node:18.15.0-bullseye-slim

# Create app directory
WORKDIR /opt/app

COPY ./package*.json ./
COPY ./.env ./.env

RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

COPY ./config/entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]
