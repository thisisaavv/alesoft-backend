FROM node:hydrogen-alpine

# Create app directory

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --production

# Bundle app source
COPY . /usr/src/app

# Expose port
EXPOSE 3000

# Run app
CMD [ "npm", "start" ]

