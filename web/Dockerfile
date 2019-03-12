FROM centos:centos6

# Install Node.js 4.2.1
RUN yum install -y wget
RUN wget --no-check-certificate https://nodejs.org/dist/v4.2.1/node-v4.2.1-linux-x64.tar.gz
RUN cd /usr/local
RUN tar --strip-components 1 -xzf node-v4.2.1-linux-x64.tar.gz && rm node-v4.2.1-linux-x64.tar.gz

# Install OS packages
RUN yum install -y git unzip rsyslog

# Install AppDynamics
RUN npm install appdynamics@4.3.7

RUN mkdir -p  SampleApp
ADD src /SampleApp/src
ADD package.json /SampleApp/package.json
RUN cd SampleApp && npm install

# Prepend appdynamics.js (require statement) to top of index.js and delete temp files
ADD appdynamics.js appdynamics.js
RUN cat appdynamics.js /SampleApp/src/server.js > /SampleApp/src/_server.js \
    && rm /SampleApp/src/server.js appdynamics.js \
    && mv /SampleApp/src/_server.js /SampleApp/src/server.js

CMD node /SampleApp/src/server.js

EXPOSE 3000
