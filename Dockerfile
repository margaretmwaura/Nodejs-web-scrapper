FROM node:16

ARG db_file_arg
ARG fb_file_arg
ARG env_file_arg

RUN echo ${db_file_arg}
# This is important for setting the time zone
ENV TZ=Africa/Nairobi
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

# COPY package.json ./
COPY . .

RUN echo $db_file_arg > ./config/config.json

RUN echo $fb_file_arg > ./config/fbServiceAccountKey.json

RUN echo "$env_file_arg" > ./.env

RUN npm install

RUN npm install graphql-iso-date --force

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source

EXPOSE 5000
CMD [ "node", "server.js" ]
