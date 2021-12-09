FROM node:14-alpine

LABEL Rafael Cavalcante

WORKDIR /home/node/app

COPY . .

RUN apk add --no-cache bash

RUN yarn add global @nestjs/cli

USER node