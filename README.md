Self-Service Sample Application with Java REST server, MySQL database and Node.js frontend.

### Project Setup

1. Clone the project
2. Navigate to project root folder, then build and run the containers in the background: `docker-compose up -d`
3. Now your containers are started. Check your running containers by command: `docker ps`
4. Add instrumentation with Java, DB and Machine agents and then start the REST service: `docker exec -it rest install-appdynamics <controller-url> <controller-port> <account-name> <access-key>; docker exec rest start-all`
5. Instrument Node.js agent and start the web service: `docker exec -it web install-appdynamics <controller-url> <controller-port> <account-name> <access-key>; docker exec web start-all`

### Running from DockerHub

1. Copy [docker-compose.yml](https://github.com/Appdynamics/SampleApp/blob/master/docker-compose.yml) and add your AppDynamics Controller/Account information (and Appdynamics Portal credentials if you wish)
2. Start the containers using `docker-compose up -d` (this will pull the container images from the AppDynamics public registry on DockerHub)
3. Add instrumentation and start the REST service: `docker exec -it rest install-appdynamics; docker exec rest start-all`
4. Add instrumentation and start the web service: `docker exec -it web install-appdynamics; docker exec web start-all`

### See App Running
* Java app is running on [192.168.99.100:8080/SampleApp/products](http://192.168.99.100:8080/SampleApp/products)
* Node.js web app is running on [192.168.99.100:3000](http://192.168.99.100:3000/#)

Once your app is running,  you will see this:

![alt tag](https://github.com/Appdynamics/SampleApp/blob/master/web/src/public/img/sampleapp.png)
