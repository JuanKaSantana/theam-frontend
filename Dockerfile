
FROM node:8 as react-build
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY . ./
RUN yarn
RUN yarn build