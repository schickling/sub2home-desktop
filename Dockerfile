FROM ubuntu:12.04

# base packages
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y python-software-properties wget
RUN add-apt-repository "deb http://archive.ubuntu.com/ubuntu precise universe"
RUN apt-get update

# node
RUN add-apt-repository -y ppa:chris-lea/node.js
RUN apt-get update && apt-get install -y nodejs

# phantomjs
RUN apt-get install -y phantomjs

# npm packages
RUN npm install -g grunt-cli bower
RUN npm config set unsafe-perm true

VOLUME ["/var/www"]
WORKDIR /var/www
EXPOSE 49000
CMD grunt server
