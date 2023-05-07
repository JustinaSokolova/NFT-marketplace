FROM node:18-alpine 

WORKDIR /app

COPY package.json ./
COPY ./public/ ./public
COPY ./src/ ./src

RUN npm i
RUN npm run build

EXPOSE 3000

CMD npm run start