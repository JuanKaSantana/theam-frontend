FROM node:9.5.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && yarn install

COPY . .

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]