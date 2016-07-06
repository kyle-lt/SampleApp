FROM centos:centos6
MAINTAINER alana.anderson@appdynamics.com

# Install Node.js 4.2.1
RUN yum install -y wget
RUN wget --no-check-certificate https://nodejs.org/dist/v4.2.1/node-v4.2.1-linux-x64.tar.gz
RUN cd /usr/local
RUN tar --strip-components 1 -xzf node-v4.2.1-linux-x64.tar.gz
RUN yum install -y vim
RUN yum install -y git
RUN yum install -y unzip rsyslog

RUN mkdir -p  SampleApp
ADD src /SampleApp/src
RUN cd SampleApp && npm install request
RUN cd SampleApp && npm install body-parser
RUN cd SampleApp && npm install express

ADD startup.sh /
RUN chmod +x /startup.sh

CMD tail -f /var/log/messages

EXPOSE 3000
