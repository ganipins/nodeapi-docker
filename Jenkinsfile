pipeline {
  environment {
    registry = "gsambasiva/docker-test"
    registryCredential = 'docker-hub'
    dockerImage = ''
  }
  agent any
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

    stage('Build Docker Image') {
      steps {
         echo 'Building Docker Image ...'
         sh 'docker build -t ganipins/nodeapi-docker:1.0.0 --no-cache .'
      }
    }

    stage('Deploy Docker Image') {
        when {
            branch 'master'
        }
        steps {
            echo 'Deploying Docker Image ...'
            sh 'docker stop ganipins/nodeapi-docker:1.0.0'
            sh 'docker rmi ganipins/nodeapi-docker:1.0.0'
            sh 'docker run -p 3000:3000 --d --name nodeapi-docker ganipins/nodeapi-docker:1.0.0'
        }
    }
  }
}
