FROM node:16

# This is important for setting the time zone
ARG DB_CONFIG_FILE

RUN echo $DB_CONFIG_FILE

ENV TZ=Africa/Nairobi
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

COPY $DB_CONFIG_FILE ./config/

RUN npm install

RUN npm install graphql-iso-date --force

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 5000
CMD [ "node", "server.js" ]
