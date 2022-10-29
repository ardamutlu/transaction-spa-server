FROM node:alpine AS builder
WORKDIR /server-app
COPY package.json .
RUN npm install
COPY . .
ENV NODE_ENV production
RUN npm run build


CMD [ "node", "dist/main.js" ]
