FROM --platform=linux/amd64 node:22-bullseye-slim

WORKDIR /opt/app

COPY ./package*.json ./

COPY ./.env-dev ./.env

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 5173

COPY ./entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]