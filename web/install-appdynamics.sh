#! /bin/bash

# Install AppDynamics node.js agent
npm install appdynamics@next

APPD_CONTROLLER=$1
APPD_PORT=$2
APPD_ACCOUNT_NAME=$3
APPD_ACCESS_KEY=$4
APPD_APP_NAME="SampleApp"
APPD_TIER_NAME="WebServices"
APPD_NODE_NAME="WebNode"

echo "require(\"appdynamics\").profile({
	controllerHostName: '${APPD_CONTROLLER}',
	controllerPort: '${APPD_PORT}', 
	accountName: '${APPD_ACCOUNT_NAME}',
	accountAccessKey: '${APPD_ACCESS_KEY}',
	applicationName: '${APPD_APP_NAME}',
	tierName: '${APPD_TIER_NAME}',
	nodeName: '${APPD_NODE_NAME}' // The controller will automatically append the node name with a unique number
});" > node-properties.txt

cat /node-properties.txt /SampleApp/src/server.js > /SampleApp/src/_server.js && mv /SampleApp/src/_server.js /SampleApp/src/server.js
