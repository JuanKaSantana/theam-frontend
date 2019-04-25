FROM mhart/alpine-node:8.11.4

WORKDIR /usr/src/theam-frontend

COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]