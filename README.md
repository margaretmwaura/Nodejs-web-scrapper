# Nodejs-web-scrapper

The project serves as the backend for https://github.com/margaretmwaura/webscrapper-frontend. It utilizes the db from https://github.com/margaretmwaura/French-Learning-DB. 
The project runs a cron every 12 am and scraps audio files from https://www.rocketlanguages.com/french/lessons/french-alphabet . This audio files are what the students use to learn
how to speak french.
The cron is run every day at 5, this was implemented with the vision that there might be new teachers who might have better pronounciaition whom the students can 
use to better their french.

## Technologies Used

The project is built on Nodejs, Sequelize , Apollo Server, GraphQL and docker.

## Getting Started

### Requirements
- Ensure you have docker installed on your local machine
- Fill the .env with the relevant data based on the variables in the .env.example

 ``` cp .env.example .env ```
 
- Fill the config.json in the config folder with the sequelize config data
  Remember the env variables used in the setting up of the db container are needed in the setting up of the sequelize config file
  Go through this article to understand how to setup the config.json https://dev.to/nedsoft/build-api-with-graphql-node-js-and-sequelize-5e8e
- Get a firebase config file and use in the config folder in the fbServiceAccountKey.json file
  Follow this guide to learn how to setup firebase sdk for your project
  https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments

### Setting Up

- Ensure the db container is setup . Here is the code repository https://github.com/margaretmwaura/French-Learning-DB
- Also ensure there is a network to be used across all the containers. If not create one and also ensure the db uses it

1. Creating a network

``` docker network create french-network ```

2. Build the image

``` docker build -t french-backend -f Dockerfile .  ``` 

3. Create the container and run it

``` docker run --network=french-network --name=french-backend -it -p 5000:5000  french-backend ```

A container by the name french-backend should be running

## Deployment

The app is hosted on AWS EC2 instance on docker. 
There is a CI/CD pipeline setup using jenkins and github webhooks in place.
Once changes are made and merged to the dev branch, the image is rebuilt and pushed to the docker hub repository using jenkins.
There is a watchtower container in the AWS EC2 instance that checks for changes in the docker images of the container every hour and if there are changes it brings down the container and brings it back up with the new image from the docker hub repository.

The env file is saved in the jenkins credentials and it is added to the docker image during the build stage in jenkins

## Contribution

Bug reports and Pull Requests are welcomed.
