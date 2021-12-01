FROM node:10.13.0-alpine
WORKDIR /usr/src/site
COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 8080
CMD [ "yarn", "start" ]
