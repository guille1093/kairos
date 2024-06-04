# Etapa de construcción
FROM node:18 AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm rebuild bcrypt --build-from-source
RUN npm run build

# Etapa de producción
FROM node:18
WORKDIR /app
COPY --from=build /app /app
CMD [ "npm", "run", "start:dev" ]
