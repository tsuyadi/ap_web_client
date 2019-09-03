#!/bin/sh

#
# software deployment script -- run via jenkins or from the command line
#
# usage: deploy.sh server.name
#

SCRIPT=`readlink -f $0`
DIRNAME=`dirname $SCRIPT`
STARTDIR=`dirname $DIRNAME`

##################################################################################
# Get config
##################################################################################

if [ $# -ne 1 ]; then
    echo "usage: $0 servername"
    exit 1
fi
TARGET=$1

cd $STARTDIR
if [ ! -f deploy/$TARGET.conf ]; then
    echo "No config file available: deploy/${TARGET}.conf"
    exit 1
fi

cd $STARTDIR
. deploy/${TARGET}.conf
echo "Deploying to ${TARGETUSER}@${TARGETSERVER}:${TARGETDIR}"

. deploy/sources.conf
echo "Deploying ${SOURCES}"

if [ ! -z $WEBCLUSTERNAME ]; then
    echo "WEBCLUSTERNAME config exist. Using $WEBCLUSTERNAME as root and deploy source"
    TARGET=${WEBCLUSTERNAME}
fi

##################################################################################
# Build server infrastructure directories
##################################################################################

#
# Check user account
#
cd $STARTDIR
echo "Checking ${TARGETUSER} account and creating if required"
ssh root@${TARGETSERVER} "
    if [ ! -d /home/${TARGETUSER} ]; then
        adduser -c 'Web site owner' ${TARGETUSER} -G ${WEBGROUP}
        mkdir /home/${TARGETUSER}/.ssh
        cp /root/.ssh/id_dsa /home/${TARGETUSER}/.ssh/
        cp /root/.ssh/id_dsa.pub /home/${TARGETUSER}/.ssh/
        cp /root/.ssh/authorized_keys /home/${TARGETUSER}/.ssh/
        chown -R ${TARGETUSER}:${TARGETUSER} /home/${TARGETUSER}
    fi
"

#
# Set up deployment directories
#
echo "Setting up target directories $TARGETDIR"
ssh root@${TARGETSERVER} "
    mkdir -p $TARGETDIR
    chown -R ${TARGETUSER}:${TARGETUSER} $TARGETDIR
"

##################################################################################
# Deploy web site software
##################################################################################

#
# Make a backup before starting
#
#if [ "$TARGETDEPLOYDB" != "new" ]; then
#    echo "Backing up existing web files and database on $TARGETSERVER"
#    BACKDATE=`date '+%Y%m%d_%H%M'`
#    DIR=`basename $TARGETDIR`
#    BACKDIR=${BACKDATE}_${DIR}
#    ssh root@${TARGETSERVER} "
#        cd $TARGETDIR
#        cd ..
#        mkdir -p backups
#        cp -a $TARGETDIR backups/$BACKDIR
#    "
#fi

#
# Deploy web software files
#
cd $STARTDIR
echo "Syncing web files to $TARGETDIR"
rsync -vazR --delete $SOURCES ${TARGETUSER}@${TARGETSERVER}:${TARGETDIR}/public

#
# Deploy modified config files
#
#echo "Deploying config files in ${STARTDIR}/deploy/${TARGET}"
#cd ${STARTDIR}/deploy/${TARGET}
#for file in *; do
#    TARGETFILE=`echo $file | sed -e 's;+;/;g' -e 's/DOT/\./g'`
#    echo "Copying $file to ${TARGETSERVER}:${TARGETDIR}/${TARGETFILE}"
#    scp $file ${TARGETUSER}@${TARGETSERVER}:${TARGETDIR}/${TARGETFILE}
#done

#
# Install root config files.
#
echo "Installing root configuration files on ${TARGETSERVER}"
cd ${STARTDIR}/deploy/root/${TARGET}
for file in *; do
    TARGETFILE=`echo $file | sed 's;+;/;g'`
    echo "Copying $file to ${TARGETSERVER}:/${TARGETFILE}"
    scp $file root@${TARGETSERVER}:/${TARGETFILE}
done

#
# Reset permissions
#
echo "Fixing permissions"
ssh root@${TARGETSERVER} "
    chown -R ${TARGETUSER}:${WEBGROUP} ${TARGETDIR}
    chmod -R 775 ${TARGETDIR}
    find ${TARGETDIR} -type d -exec chmod 2775 {} \;
"

#
# Reload nginx and uwsgi
#
echo "Reloading nginx"
ssh root@${TARGETSERVER} "
    service nginx reload > /dev/null 2>&1
"
