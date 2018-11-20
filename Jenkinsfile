#!/usr/bin/env groovy

pipeline {

  agent any

  options {
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }

  environment {
    registry = "gsambasiva/docker-test"
    registryCredential = 'docker-hub'
    dockerImage = ''
  }
  
  tools {nodejs 'localNode' }

  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/ganipins/nodeapi-docker.git'
      }
    }

    stage('Setup Environment') {
       steps {
           echo "env PATH is: ${env.PATH}"
           echo "Starting Build, triggered by ${env.BRANCH_NAME}";
           echo "Building ${env.BUILD_ID}";
           echo "Running ${env.BUILD_ID} on ${env.JENKINS_URL}"
           echo "Job: ${env.JOB_NAME} with buildnumber ${env.BUILD_NUMBER}"

           sh 'git --version'
           sh 'docker -v'
           sh 'node -v'
           sh 'npm -v'
           sh 'printenv'
       }
    }

    stage('Build') {
       steps {
         sh 'npm install'
       }
    }

    stage('Docker clean-up') {
       steps {
         echo 'Docker clean-up ...'
                script {
                    try {
                        echo 'stoping docker container'
                        sh 'docker stop nodeapi-docker'
                    }
                    catch (exc) {
                        echo 'stoping docker container failed!'
                    }
                }
                script {
                    try {
                        echo 'removing docker container'
                        sh 'docker container rm nodeapi-docker'
                    }
                    catch (exc) {
                        echo 'removing docker container failed!'
                    }
                }
          
                script {
                    try {
                        echo 'removing docker image'
                        sh 'docker rmi -f ganipins/nodeapi-docker:1.0.0'
                    }
                    catch (exc) {
                        echo 'removing docker image failed!'
                    }
                }
       }
    }

    stage('Build Docker Image') {
      steps {
         echo 'Building Docker Image ...'
         sh "docker build -t ganipins/nodeapi-docker:1.0.0 --no-cache ."
         withDockerRegistry([ credentialsId: "docker-hub", url: "" ]) {
             //sh 'docker push ganipins/nodeapi-docker:1.0.0'
         }
      }
    }

    stage('Deploy Docker Image') {
          steps {
                script {
                    try {
                        echo 'create docker container'
                        sh "docker run -d --rm -p 3000:3000 --name nodeapi-docker ganipins/nodeapi-docker:1.0.0"
                    }
                    catch (exc) {
                        echo 'create docker container failed!'
                    }
                }
          }
    }
  }
  post {
     always {
          cleanWs()
	        echo 'Pipeline finished'
     }
  }
}
