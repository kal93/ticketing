# Specify base image
FROM node:16-alpine

# set working directory
WORKDIR /usr/apps/ticketing/auth

# copy package.json first
COPY ./package.json ./

# Install deps
RUN npm install --only=prod

# copy rest of the app files
COPY ./ ./

# run default startup command for container
CMD [ "npm", "start" ]
