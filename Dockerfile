
FROM node:8 as react-build
RUN mkdir /usr/src/theam-frontend
WORKDIR /usr/src/theam-frontend
COPY . ./
RUN yarn
RUN yarn build