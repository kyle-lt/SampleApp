#! /bin/bash
source /env.sh

cd ${CATALINA_HOME}/bin
#echo "Starting Tomcat and Java Agent with system properties: ${APP_SERVER_AGENT_JAVA_OPTS}"
#nohup java -javaagent:${CATALINA_HOME}/appagent/javaagent.jar ${APP_SERVER_AGENT_JAVA_OPTS} -cp ${CATALINA_HOME}/bin/bootstrap.jar:${CATALINA_HOME}/bin/tomcat-juli.jar org.apache.catalina.startup.Bootstrap </dev/null &>/dev/null &


echo "Starting Tomcat w/o instrumentation"
nohup java -cp ${CATALINA_HOME}/bin/bootstrap.jar:${CATALINA_HOME}/bin/tomcat-juli.jar org.apache.catalina.startup.Bootstrap </dev/null &>/dev/null &

echo "To view App Server Agent log output: docker exec -it rest tail-java-agent"

exit 0
