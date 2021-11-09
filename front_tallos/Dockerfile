FROM node:14-alpine

RUN apk add --no-cache bash

RUN touch /home/node/.bashrc | echo "PS1='\w\$ '" >> /home/node/.bashrc

RUN yarn config set cache /home/node/app/.npm-cache global

USER node

WORKDIR /home/node/app