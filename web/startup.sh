#! /bin/bash

npm install appdynamics@next

$(cat /appdynamics/node-properties.txt /SampleApp/src/server.js > /SampleApp/src/_server.js && mv /SampleApp/src/_server.js /SampleApp/src/server.js)

node SampleApp/src/server.js
