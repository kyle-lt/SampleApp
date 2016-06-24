## SampleApp
Self-Service Sample Application with Java REST server, MySQL database and Node.js frontend.

### Build Instructions
1. Clone the project
2. Download AppServerAgent.zip from your controller Getting Started Wizard - Java.
3. Go to Getting Started Wizard - Node.js, give the app same name as your Java application. Copy the controller configuration to a node-properties.txt and put in project root. For example:
```
// node-properties.txt
require("appdynamics").profile({
 controllerHostName: 'xxx.xxx.xx.xx',
 controllerPort: 8090, 
   accountName: 'your-account-name',
 accountAccessKey: 'your-access-key',
 applicationName: 'SampleApp',
 tierName: 'NodeTier',
 nodeName: 'process' // The controller will automatically append the node name with a unique number
});
```

### Build and run containers with docker-compose:
```
// node-properties.txt
require("appdynamics").profile({
 controllerHostName: 'xxx.xxx.xx.xx',
 controllerPort: 8090, 
   accountName: 'your-account-name',
 accountAccessKey: 'your-access-key',
 applicationName: 'SampleApp',
 tierName: 'NodeTier',
 nodeName: 'process' // The controller will automatically append the node name with a unique number
});
```

### Build and run containers with docker-compose:
```
docker-compose up
```

## Check Terminal Output
Check for the following output from Tomcat startup:
```

Creating db
Creating rest
Creating sample-app
Attaching to db, rest, sample-app
db            | Initializing database
db            | 2016-06-24T19:20:26.636027Z 0 [Warning] InnoDB: New log files created, LSN=45790
db            | 2016-06-24T19:20:26.661596Z 0 [Warning] InnoDB: Creating foreign key constraint system tables.
...
sample-app    | appdynamics@4.2.2 node_modules/appdynamics
sample-app    | ├── appdynamics-native@4.2.2
sample-app    | ├── appdynamics-zmq@2.13.0
sample-app    | ├── appdynamics-protobuf@0.8.7
sample-app    | ├── appdynamics-proxy@4.2.2
sample-app    | └── appdynamics-jre@1.7.0
sample-app    | Node Server Started
...
rest          | Jun 24, 2016 7:20:53 PM org.apache.catalina.startup.HostConfig deployDirectory
rest          | INFO: Deployment of web application directory /tomcat/webapps/docs has finished in 45 ms
rest          | Jun 24, 2016 7:20:53 PM org.apache.coyote.AbstractProtocol start
rest          | INFO: Starting ProtocolHandler ["http-nio-8080"]
rest          | Jun 24, 2016 7:20:53 PM org.apache.coyote.AbstractProtocol start
rest          | INFO: Starting ProtocolHandler ["ajp-nio-8009"]
rest          | Jun 24, 2016 7:20:53 PM org.apache.catalina.startup.Catalina start
rest          | INFO: Server startup in 17081 ms
```

### See App Running
* Java app is running on [192.168.99.100:8080/SampleApp/products](http://192.168.99.100:8080/SampleApp/products)
* Node.js web app is running on [192.168.99.100:3000](http://192.168.99.100:3000/#)

Once your app is running,  you will see this:

![alt tag](https://github.com/Appdynamics/SampleApp/blob/sample-app/src/public/img/sampleapp.png)
