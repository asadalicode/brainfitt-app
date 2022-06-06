def commitContainsSkip = 0

pipeline {

   environment {
        shouldBuild = "true"
     
    }

  agent {
        label 'Public_Cloud'
      }

  
  options {
    // Stop the build early in case of compile or test failures
    skipStagesAfterUnstable()
  }
  stages {
    
    stage('Init') {
            steps {
                script {
                    commitContainsSkip = sh(script: "git log -1 | grep '.*\\[start ci\\].*'", returnStatus: true)
                    commitContainsSkip = 0
                  }
                  sh "echo $commitContainsSkip"
            }
        }

    stage('Compile') {
      when {
          expression { commitContainsSkip == 0 }
     }
      agent {
        docker {
         args '-u root:root'
         image 'codesorbit/angular-ci:1.0'
         reuseNode true
       }
    }
      steps {


        sh "ls"
        //sh "npm cache clean --force"
        sh "npm install"
        sh "npm audit fix"
        sh "npm run build"
        
       
        sh "apt-get update && apt-get install ssh -y"
        sshagent(credentials: ['Test-server']) {
              sh '''
                [ -d ~/.ssh ] || mkdir ~/.ssh && chmod 0700 ~/.ssh
               ssh-keyscan -t rsa,dsa 135.125.246.130 >> ~/.ssh/known_hosts
                ssh ubuntu@135.125.246.130
               '''
            sh 'scp -r /mnt/disk/Jenkins/workspace/React/Brainfitt/build/* ubuntu@135.125.246.130:/mnt/disk/react_projects/Brainfitt/build/'
          sh 'pwd'
                
                    
               }
        sh "echo App is deployed"

      }
      
    }
    stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }
  }
 // post {
    //failure {
      // Notify developer team of the failure
     // mail to: 'tayyabqamrani@codesorbit.com', subject: 'Oops! HRM_Build Fail', body: "Build ${env.BUILD_NUMBER} failed; ${env.BUILD_URL}"
    //}
 // }
  
}

