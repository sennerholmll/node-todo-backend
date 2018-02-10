#!/usr/bin/env bash

set -e

directory=`dirname $0`
source ${directory}/common.sh

gitref=${1:-noref}
version=${2:-latest}
path=${3:-terraform-infrastructure-live/gce_account/europe-west1/fast/todo-backend-fast}
infrarepo=${4:-git@github.com:sennerholm/terraform-infrastructure-live.git}

# Add github ssh key
if [ ! -d ~/.ssh ]; then
    mkdir ~/.ssh
fi
ssh-keyscan github.com >>~/.ssh/known_hosts
git clone ${infrarepo}
cd ${path}
echo version = ${version} > version.tfvars
sed -i s/?ref=.*\"/?ref=${gitref}\"/ terraform.tfvars

git config --global user.email "mikael+circleci@sennerholm.net"
git config --global user.name "Circle CI"
git commit -m"Automated Updated ${path} to image version ${version} and gitref ${gitref}" -a
git push


