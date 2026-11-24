pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }
    }
    
    stage('Docker Build') {
    steps {
        bat 'docker build -t webapp:latest .'
    }
}

stage('Docker Deploy') {
    steps {
        bat '''
            docker stop webapp-container || exit /b 0
            docker rm webapp-container || exit /b 0
            docker run -d -p 3000:3000 --name webapp-container webapp:latest
        '''
    }
}
}