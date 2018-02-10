#!/usr/bin/env bash

set -e

directory=`dirname $0`
source ${directory}/common.sh

gitref=${1:-noref}
version=${2:-latest}
path=${3:-terraform-infrastructure-live/gce_account/europe-west1/fast/todo-backend-fast}
infrarepo=${4:-git@github.com:sennerholm/terraform-infrastructure-live.git}


git clone ${infrarepo}
cd ${path}
echo version = ${version} > version.tfvars
sed -i s/?ref=.*\"/?ref=${gitref}\"/ terraform.tfvars
git commit -m"Automated Updated ${path} to image version ${version} and gitref ${gitref}" -a
git push


