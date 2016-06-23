## SampleApp
Self-Service Sample Application

## Build Instructions
Build and run containers with docker-compose:
```
docker-compose up
```

Check for the following output from Tomcat startup:

```
INFO: Starting Servlet Engine: Apache Tomcat/8.0.14
Jun 22, 2016 5:41:30 AM org.apache.catalina.startup.HostConfig deployWAR
INFO: Deploying web application archive /tomcat/webapps/SampleApp.war
Jun 22, 2016 5:41:40 AM org.apache.catalina.util.SessionIdGeneratorBase createSecureRandom
INFO: Creation of SecureRandom instance for session ID generation using [SHA1PRNG] took [6,992] milliseconds.
Jun 22, 2016 5:41:40 AM org.hibernate.jpa.internal.util.LogHelper logPersistenceUnitInformation
INFO: HHH000204: Processing PersistenceUnitInfo [
	name: product
	...]
Jun 22, 2016 5:41:40 AM org.hibernate.Version logVersion
INFO: HHH000412: Hibernate Core {5.1.0.Final}
Jun 22, 2016 5:41:40 AM org.hibernate.cfg.Environment <clinit>
INFO: HHH000206: hibernate.properties not found
Jun 22, 2016 5:41:40 AM org.hibernate.cfg.Environment buildBytecodeProvider
INFO: HHH000021: Bytecode provider name : javassist
Jun 22, 2016 5:41:41 AM org.hibernate.annotations.common.reflection.java.JavaReflectionManager <clinit>
INFO: HCANN000001: Hibernate Commons Annotations {5.0.1.Final}
Jun 22, 2016 5:41:42 AM org.hibernate.dialect.Dialect <init>
INFO: HHH000400: Using dialect: org.hibernate.dialect.MySQLDialect
Hibernate: drop table if exists hibernate_sequence
Hibernate: drop table if exists Product
Hibernate: create table hibernate_sequence (next_val bigint)
Hibernate: insert into hibernate_sequence values ( 1 )
Hibernate: create table Product (id integer not null, name varchar(255), stock integer, primary key (id))
Jun 22, 2016 5:41:43 AM org.hibernate.tool.schema.internal.SchemaCreatorImpl applyImportSources
INFO: HHH000476: Executing import script 'org.hibernate.tool.schema.internal.exec.ScriptSourceInputNonExistentImpl@7d143290'
Jun 22, 2016 5:41:43 AM com.sun.jersey.guice.spi.container.GuiceComponentProviderFactory register
INFO: Registering com.appdynamics.sample.resource.ProductResource as a root resource class
Jun 22, 2016 5:41:43 AM com.sun.jersey.server.impl.application.WebApplicationImpl _initiate
INFO: Initiating Jersey application, version 'Jersey: 1.19.1 03/11/2016 02:08 PM'
Jun 22, 2016 5:41:44 AM com.sun.jersey.guice.spi.container.GuiceComponentProviderFactory getComponentProvider
INFO: Binding com.appdynamics.sample.resource.ProductResource to GuiceManagedComponentProvider with the scope "PerRequest"
Jun 22, 2016 5:41:45 AM org.apache.catalina.startup.HostConfig deployWAR
INFO: Deployment of web application archive /tomcat/webapps/SampleApp.war has finished in 14,079 ms
```
## An Example

```
$ curl -X POST -H "Content-Type:application/json" localdocker:8080/SampleApp/products -d '{"name":"iPad", "stock":1 }'
$ curl -X POST -H "Content-Type:application/json" localdocker:8080/SampleApp/products -d '{"name":"iPhone", "stock":1 }'
$ curl -s localdocker:8080/SampleApp/products | python -mjson.tool
[
    {
        "id": 1,
        "name": "iPad",
        "stock": 1
    },
    {
        "id": 2,
        "name": "iPhone",
        "stock": 1
    }
]
```
