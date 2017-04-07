#! /bin/bash

if [ ! -s /env.sh ]; then
  echo "Environment not set for AppDynamics Agents: exiting..."
  exit
fi

start-db-agent
echo "*****************************************************"

sleep 30

start-tomcat
echo "*****************************************************"

echo "The Sample App REST service is running at: http://<your-docker-host>:8080/SampleApp/products"
echo "The Sample App web application is running at: http://<your-docker-host>:3000/#"

exit 0
