
  stages {
    stage('Build') {
      steps {
          // sh 'docker build -t french-backend -f Dockerfile .'
          // sh 'docker tag french-backend $DOCKER_FRENCH_BACK_END_IMAGE'
          withCredentials([file(credentialsId: 'db_config_file', variable: 'DB_CONFIG_FILE'), file(credentialsId: 'fb_service_account_file', variable: 'FB_SERVICE_ACCOUNT_FILE'), file(credentialsId: 'backend_env', variable: 'BACKEND_ENV')]) {
            script {
              def secretContents = readFile(env.DB_CONFIG_FILE).trim()
              echo "The results of reading are ${secretContents}"
              sh "docker build --build-arg db_arg='${secretContents}' -t french-backend -f Dockerfile ."
              sh 'docker tag french-backend $DOCKER_FRENCH_BACK_END_IMAGE'
            }
            // sh "docker run -d -v \$DB_CONFIG_FILE:/usr/src/app/config/config.json -v \$FB_SERVICE_ACCOUNT_FILE:/usr/src/app/config/fbServiceAccountKey.json  -v \$BACKEND_ENV:/usr/src/app/.env --network=french-network --name=french-backend -p 5000:5000 \$DOCKER_FRENCH_BACK_END_IMAGE"
        }
      }
    }
    // stage('Test') {
    //   steps {
    //     sh 'docker run my-flask-app python -m pytest app/tests/'
    //   }
    // }
    stage('Deploy') {
      steps {
        withCredentials([usernamePassword(credentialsId: "${DOCKER_REGISTRY_CREDS}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
          sh "echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin docker.io"
          sh 'docker push $DOCKER_FRENCH_BACK_END_IMAGE'
        }
      }
    }

    stage('Run'){
      steps {
        withCredentials([file(credentialsId: 'db_config_file', variable: 'DB_CONFIG_FILE'), file(credentialsId: 'fb_service_account_file', variable: 'FB_SERVICE_ACCOUNT_FILE'), file(credentialsId: 'backend_env', variable: 'BACKEND_ENV')]) {
          sh "docker run --network=french-network --name=french-backend -p 5000:5000 \$DOCKER_FRENCH_BACK_END_IMAGE"
        }
      }
    }
  }
  post {
    always {
      sh 'docker logout'
    }
  }
}
