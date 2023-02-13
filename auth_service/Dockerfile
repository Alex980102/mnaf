FROM node:16

# Create app directory
WORKDIR /usr/src/auth_service

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3999
CMD [ "npm", "start" ]