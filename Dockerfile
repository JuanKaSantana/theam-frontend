FROM node:6.3.1

# Create theam-frontend directory
RUN mkdir -p /src/theam-frontend
WORKDIR /src/theam-frontend

# Install theam-frontend dependencies
COPY package.json /src/theam-frontend/
RUN npm install

# Bundle theam-frontend source
COPY . /src/theam-frontend

# Build and optimize react theam-frontend
RUN npm run build

EXPOSE 3000

# defined in package.json
CMD [ "npm", "start" ]