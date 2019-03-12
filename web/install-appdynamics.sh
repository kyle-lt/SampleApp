#! /bin/bash

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
  if [ -z ${APP_ID} ]; then
    echo "Warning: APP_ID is empty. You won't be able to access AppDynamics controller through SampleApp."
  fi
}

APPD_SSL="false"
APPD_APP_NAME="SampleApp"
APPD_TIER_NAME="WebServices"
APPD_NODE_NAME="WebNode"

installAppd() {
	echo "Installing AppDynamics:"
	# Install AppDynamics node.js agent
	npm install appdynamics@4.3
}

checkSSL() {
  if [ "$APPD_PORT" == "443" ]; then
    echo "Turning on SSL"
    APPD_SSL="true"
  else
    echo "SSL is off"
  fi
}

env_config() {
	echo "require(\"appdynamics\").profile({
		controllerHostName: '${APPD_CONTROLLER}',
		controllerPort: '${APPD_PORT}', 
		controllerSslEnabled: ${APPD_SSL}, 
		accountName: '${APPD_ACCOUNT_NAME}',
		accountAccessKey: '${APPD_ACCESS_KEY}',
		applicationName: '${APPD_APP_NAME}',
                libagent: 'true',
		tierName: '${APPD_TIER_NAME}',
		nodeName: '${APPD_NODE_NAME}' // The controller will automatically append the node name with a unique number
	});" > node-properties.txt

	cat /node-properties.txt /SampleApp/src/server.js > /SampleApp/src/_server.js && mv /SampleApp/src/_server.js /SampleApp/src/server.js
}

controllerURL() {
  if [ -z ${APP_ID} ]; then
    APP_ID=0;
  fi
  echo "angular.module('constants', [])
      .constant('CONTROLLER_URL', '${APPD_CONTROLLER}')
      .constant('CONTROLLER_PORT', '${APPD_PORT}')
      .constant('CONTROLLER_SSL', '${APPD_SSL}')
      .constant('CONTROLLER_ACCOUNT_NAME', '${APPD_ACCOUNT_NAME}')
      .constant('APP_ID', '${APP_ID}');" > /SampleApp/src/public/js/appd-controller.js
}

showUsage() {
  echo "Usage: docker exec -it web install-appdynamics"
  echo "OR:    docker exec -it web install-appdynamics <controller-url> <controller-port> <account-name> <access-key>"
  echo "Commandline properties override environment variables from docker-compose.yml"
}

if [ $# -eq 0 ]; then
  echo "Using Controller properties from docker-compose.yml"
  APPD_CONTROLLER=${CONTROLLER_URL}
  APPD_PORT=${CONTROLLER_PORT}
  APPD_ACCOUNT_NAME=${CONTROLLER_ACCOUNT_NAME}
  APPD_ACCESS_KEY=${CONTROLLER_ACCESS_KEY}
elif [ $# -ne 4 ]; then
  showUsage
  exit 1
else
  echo "Using Controller properties:"
  APPD_CONTROLLER=$1
  APPD_PORT=$2
  APPD_ACCOUNT_NAME=$3
  APPD_ACCESS_KEY=$4
fi

echo " Controller URL = ${APPD_CONTROLLER}"
echo " Controller Port = ${APPD_PORT}"
echo " Account Name = ${APPD_ACCOUNT_NAME}"
echo " Access Key = ${APPD_ACCESS_KEY}"

checkEnv
installAppd
checkSSL
env_config
controllerURL
