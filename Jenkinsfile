node {
   stage('Preparation') {
      git 'https://bitbucket.org/af-ekosystem/job-tech-dev.git'
   }
   stage('Build') {
        nodejs('EkoNode') {
            sh 'npm install'
        }
   }
}