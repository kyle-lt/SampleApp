#! /bin/bash

# ktully - removed/commented out all machine agent, db agent capabilities

checkEnv() {
  if [ -z ${CONTROLLER_URL} ]; then
    echo "Error: CONTROLLER_URL must be set in docker-compose.yml"
    exit
  fi
  if [ -z ${CONTROLLER_PORT} ]; then
    echo "Error: CONTROLLER_PORT must be set in docker-compose.yml"
    exit
  fi
  if [ -z ${CONTROLLER_ACCOUNT_NAME} ]; then
    echo "Error: CONTROLLER_ACCOUNT_NAME must be set in docker-compose.yml"
    exit
  fi
  if [ -z ${CONTROLLER_ACCESS_KEY} ]; then
    echo "Error: CONTROLLER_ACCESS_KEY must be set in docker-compose.yml"
    exit
  fi
  if [ -z ${AGENT_VERSION} ]; then
    echo "Error: AGENT_VERSION must be set in docker-compose.yml"
    exit
  fi
}

APPD_LOGIN_URL=https://login.appdynamics.com/sso/login/
VERSION=${AGENT_VERSION}
APPD_TEMP_DIR=.appd
USER_NAME=${PORTAL_USERNAME}
PASSWORD=${PORTAL_PASSWORD}
APP_AGENT_ZIP=AppServerAgent-$VERSION.zip
APPD_APP_NAME="SampleApp"
APPD_TIER_NAME="RestServices"
APPD_NODE_NAME="RestNode"

downloadInstallers() {

  mkdir -p ${APPD_TEMP_DIR}

  if [ "$USER_NAME" != "" ] && [ "$PASSWORD" != "" ];
  then
    
    # Login
    echo "Logging in..."
    curl -c cookies.txt -d "username=${PORTAL_USERNAME}&password=${PORTAL_PASSWORD}" https://login.appdynamics.com/sso/login/

    # Download Java Agent
    echo "Download Java Agent using https://download.appdynamics.com/download/prox/download-file/sun-jvm/$VERSION/AppServerAgent-$VERSION.zip"
    curl -L -O -b cookies.txt https://download.appdynamics.com/download/prox/download-file/sun-jvm/$VERSION/AppServerAgent-$VERSION.zip

  else
    echo "Username or Password missing"
    exit
  fi
}

installAppServerAgent() {
  echo "Installing App Server Agent to ${CATALINA_HOME}/appagent..."
  unzip -qo ${APP_AGENT_ZIP} -d ${CATALINA_HOME}/appagent && rm ${APP_AGENT_ZIP}
}

# Populate environment setup script with AppDynamics agent system properties
# This file should be included in all agent startup command scripts
setupAppdEnv() {
  echo "#! /bin/bash" > /env.sh

  echo export JAVA_AGENT_LOG_PATH="\"/tomcat/appagent/ver${VERSION}/logs/${APPD_NODE_NAME}"\" >> /env.sh

  echo export APP_SERVER_AGENT_JAVA_OPTS="\"-Dappdynamics.controller.hostName=${APPD_CONTROLLER} -Dappdynamics.controller.port=${APPD_PORT} -Dappdynamics.controller.ssl.enabled=${APPD_SSL} -Dappdynamics.agent.applicationName=${APPD_APP_NAME} -Dappdynamics.agent.tierName=${APPD_TIER_NAME} -Dappdynamics.agent.nodeName=${APPD_NODE_NAME} -Dappdynamics.agent.accountName=${APPD_ACCOUNT_NAME} -Dappdynamics.agent.accountAccessKey=${APPD_ACCESS_KEY}"\" >> /env.sh

  echo "AppDynamics Agent configuration saved to /env.sh"
}

cleanup() {
  rm -rf .appd
}
trap cleanup EXIT

checkEnv

if [ $# -eq 0 ]; then
echo "*****************************************************"
  echo "Using Controller properties from docker-compose.yml"
  APPD_CONTROLLER=${CONTROLLER_URL}
  APPD_PORT=${CONTROLLER_PORT}
  APPD_ACCOUNT_NAME=${CONTROLLER_ACCOUNT_NAME}
  APPD_ACCESS_KEY=${CONTROLLER_ACCESS_KEY}
fi

echo " Controller URL = ${APPD_CONTROLLER}"
echo " Controller Port = ${APPD_PORT}"
echo " Account Name = ${APPD_ACCOUNT_NAME}"
echo " Access Key = ${APPD_ACCESS_KEY}"

echo "*****************************************************"
downloadInstallers
echo "*****************************************************"
installAppServerAgent
echo "*****************************************************"
setupAppdEnv
echo "*****************************************************"
