FROM node:16-alpine

WORKDIR /usr/apps/ticketing/client

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD ["npm","run","dev"]