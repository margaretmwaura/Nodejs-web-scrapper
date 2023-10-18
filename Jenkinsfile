pipeline {
  agent any
  
  stages {
    stage('Build') {
      steps {
          withCredentials([file(credentialsId: 'db_config_file', variable: 'DB_CONFIG_FILE'), file(credentialsId: 'fb_service_account_file', variable: 'FB_SERVICE_ACCOUNT_FILE'), file(credentialsId: 'backend_env', variable: 'BACKEND_ENV')]) {
            script {
              def dbFileContents = readFile(env.DB_CONFIG_FILE).trim()
              def fbFileContents = readFile(env.FB_SERVICE_ACCOUNT_FILE).trim()
              def envFileContents = readFile(env.backend_env).trim()
              sh "docker build --build-arg db_file_arg='${dbFileContents}' --build-arg fb_file_arg='${fbFileContents}' --build-arg env_file_arg='${envFileContents}' -t french-backend -f Dockerfile ."
              sh 'docker tag french-backend $DOCKER_FRENCH_BACK_END_IMAGE'
            }
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
