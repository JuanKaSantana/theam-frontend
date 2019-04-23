FROM node:8.7

WORKDIR /usr/src/theam-frontend

COPY package.json package-lock.json ./

RUN npm install

EXPOSE 80

CMD ["npm", "start"]
