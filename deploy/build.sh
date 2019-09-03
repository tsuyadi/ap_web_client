#!/bin/sh

#
# Server build script -- run once per server
#
# Designed to run on a CentOS 6 minimal install
#

PWD=`pwd`
STARTDIR=$PWD

##################################################################################
#
# Common section
#
##################################################################################

#
# Install a few useful basic RPMs
#
echo "Install some useful basic RPMs"
yum -y install sysstat wget ntp bind-utils zip unzip rsync openssh-clients mlocate telnet xz wget zlib-devel openssl-devel sqlite-devel bzip2-devel
yum groupinstall -y 'Development Tools'
chmod +x /etc/cron.daily/mlocate.cron

echo "Updates and upgrades"
#
# Install all updates
#
yum -y update

#
# Do a package list
#
yum list all > /root/yum.list.all


# Date/time should now be accurate
date

#
# Install and enable the EPEL and Webtatic repos.
#
echo "Install EPEL and Webtatic repos"
rpm -Uvh http://dl.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
rpm -Uvh https://mirror.webtatic.com/yum/el6/latest.rpm
yum -y upgrade ca-certificates --disablerepo=epel
yum clean all
yum makecache

##################################################################################
#
# Web Server Section
#
# Only run this on a web server -- i.e. not on a server that is going to be a
# standalone database server.
#
##################################################################################

#
# Install nginx and initialise the cache
#
yum -y install nginx18
mkdir -p /var/lib/nginx/cache /etc/nginx/ssl
chown nginx.nginx /var/lib/nginx/cache /etc/nginx/ssl
chmod 700 /var/lib/nginx/cache /etc/nginx/ssl
chkconfig nginx on

##################################################################################
#
# NPM and bower installation
#
##################################################################################

yum -y install rubygems ruby-devel
yum -y install git npm
npm install --global bower
npm install --global yo
gem install compass
