FROM ubuntu:12.04
MAINTAINER Johannes Schickling "schickling.j@gmail.com"

ENV DEBIAN_FRONTEND noninteractive

# base packages
RUN apt-get update
RUN apt-get install -y python-software-properties git fontconfig

# set timezone to Europe/Berlin
RUN ln -sf /usr/share/zoneinfo/Europe/Berlin /etc/localtime

# node
RUN add-apt-repository -y ppa:chris-lea/node.js && apt-get update
RUN apt-get install -y nodejs

# npm packages
RUN npm install -g grunt-cli bower

# add ssh key
ADD docker/.id_rsa /root/.ssh/id_rsa
RUN chmod 700 /root/.ssh/id_rsa
RUN echo "Host github.com\n\tStrictHostKeyChecking no\n" >> /root/.ssh/config

# configure git
RUN git config --global user.name "Johannes Schickling"
RUN git config --global user.email schickling.j@gmail.com

# clone repo
RUN git clone git@github.com:schickling/sub2home-desktop.git /var/www/desktop

# build
RUN cd /var/www/desktop && npm install && bower install --allow-root

VOLUME ["/var/www/desktop"]
WORKDIR /var/www/desktop

EXPOSE 8888

CMD ["grunt", "server"]
