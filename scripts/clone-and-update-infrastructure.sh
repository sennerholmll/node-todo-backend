#!/usr/bin/env bash

set -e

if [ ${SHLVL} -gt 10 ]; then
    echo "To many tries"
    exit 1
fi

directory=`dirname $0`
source ${directory}/common.sh

gitref=${1:-noref}
version=${2:-latest}
path=${3:-terraform-infrastructure-live/gce_account/europe-west1/fast/todo-backend}
infrarepo=${4:-`echo $CIRCLE_REPOSITORY_URL | awk -F'/' '{print $1}'`/terraform-infrastructure-live.git}
githubaccount=${5:-`echo $CIRCLE_REPOSITORY_URL | awk -F'/' '{print $1}' | awk -F':' '{print $2}'`}

# Add github ssh key
if [ ! -d ~/.ssh ]; then
    mkdir ~/.ssh
fi
ssh-keyscan github.com >>~/.ssh/known_hosts
git clone ${infrarepo}
cd ${path}
echo version = ${version} > version.tfvars
sed -i s/?ref=.*\"/?ref=${gitref}\"/ terraform.tfvars
sed -i s/github.com\\/[^\\/]*\\//github.com\\/${githubaccount}\\// terraform.tfvars
if [ `git diff | wc -l` -gt 0 ]; then
    git config user.email "mikael+circleci@sennerholm.net"
    git config user.name "Circle CI"
    git commit -m"Automated Updated ${path} to image version ${version} and gitref ${gitref}" -a
    git push || (cd -; rm -rf terraform-infrastructure-live; $0 "$@")
fi


