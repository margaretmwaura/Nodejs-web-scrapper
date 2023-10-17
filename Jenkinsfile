pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        // fb_service_account_file
        withCredentials([file(credentialsId: 'db_config_file', variable: 'MY_DB_CONFIG_FILE')]) {
          // sh "cat $MY_DB_CONFIG_FILE"
          sh 'docker build --no-cache -t french-backend --build-arg DB_CONFIG_FILE=$MY_DB_CONFIG_FILE -f Dockerfile .'
          sh 'docker tag french-backend $DOCKER_FRENCH_BACK_END_IMAGE'
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
          sh "docker push $DOCKER_FRENCH_BACK_END_IMAGE"
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
