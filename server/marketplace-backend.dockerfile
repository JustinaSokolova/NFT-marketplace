FROM node:lts-bullseye-slim as builder

WORKDIR /app

COPY package.json ./
COPY ./src/ ./src

RUN npm i

EXPOSE 3300

CMD npm run start