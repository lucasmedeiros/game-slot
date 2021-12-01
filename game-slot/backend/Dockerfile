FROM node:14
WORKDIR /usr/src/api
COPY package*.json ./

RUN yarn
COPY . .
EXPOSE 5000
CMD [ "yarn", "start" ]
