pipeline {
  agent any
  stages {
    stage('pipeline-try') {
      parallel {
        stage('Checkout code') {
          steps {
            git(url: 'https://github.com/raj-r3a/vault-utils', branch: 'jenkins-try')
          }
        }

        stage('shell script') {
          steps {
            sh 'ls -al'
          }
        }

      }
    }

    stage('build') {
      steps {
        sh 'docker build .'
      }
    }

  }
}