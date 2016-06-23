FROM centos:centos6
MAINTAINER alana.anderson@appdynamics.com

# Install Oracle Java JDK8
ENV JDK8_VERSION 92
#RUN yum install -y wget
#ENV JDK_DOWNLOAD_PATH 8u${JDK8_VERSION}-b14/jdk-8u${JDK8_VERSION}-linux-x64.rpm
#RUN wget --no-check-certificate --no-cookies --header "Cookie: oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/${JDK_DOWNLOAD_PATH} -O jdk-linux-x64.rpm
ADD jdk-8u${JDK8_VERSION}-linux-x64.rpm /jdk-linux-x64.rpm
RUN yum install -y jdk-linux-x64.rpm
RUN rm jdk-linux-x64.rpm
ENV JAVA_HOME /usr/java/jdk1.8.0_${JDK8_VERSION}
ENV PATH $JAVA_HOME/bin:$PATH

# set timezone to UTC
RUN mv /etc/localtime /etc/localtime.bak
RUN ln -s /usr/share/zoneinfo/Etc/UTC /etc/localtime

# Environment vars: Tomcat
ENV TOMCAT_MAJOR_VERSION 8
ENV TOMCAT_MINOR_VERSION 8.0.14
ENV CATALINA_HOME /tomcat

# Install Tomcat
RUN curl -O -k https://archive.apache.org/dist/tomcat/tomcat-${TOMCAT_MAJOR_VERSION}/v${TOMCAT_MINOR_VERSION}/bin/apache-tomcat-${TOMCAT_MINOR_VERSION}.tar.gz \
    && curl -O -k https://archive.apache.org/dist/tomcat/tomcat-${TOMCAT_MAJOR_VERSION}/v${TOMCAT_MINOR_VERSION}/bin/apache-tomcat-${TOMCAT_MINOR_VERSION}.tar.gz.md5 \
    && md5sum apache-tomcat-${TOMCAT_MINOR_VERSION}.tar.gz.md5 \
    && tar zxf apache-tomcat-*.tar.gz \
    && rm apache-tomcat-*.tar.gz* \
    && mv apache-tomcat-${TOMCAT_MINOR_VERSION} tomcat
RUN cd ${CATALINA_HOME}/bin;chmod +x *.sh

# Install Maven
RUN yum -y install wget
RUN wget http://repos.fedorapeople.org/repos/dchen/apache-maven/epel-apache-maven.repo -O /etc/yum.repos.d/epel-apache-maven.repo
RUN sed -i s/\$releasever/6/g /etc/yum.repos.d/epel-apache-maven.repo
RUN yum install -y apache-maven
RUN mvn --version

# Build sample project
ENV PROJECT_NAME SampleApp
ENV PROJECT_HOME https://github.com/appdynamics
ENV APP_NAME SampleApp

RUN mkdir ${APP_NAME}
ADD pom.xml /${APP_NAME}/
ADD src /${APP_NAME}/src/
RUN cd /${APP_NAME}; mvn clean install

# Copy war file to Tomcat
RUN cp ${PROJECT_NAME}/target/${APP_NAME}.war ${CATALINA_HOME}/webapps/
RUN yum install -y unzip

ADD startup.sh /
RUN chmod +x /startup.sh

CMD /startup.sh
EXPOSE 8080
