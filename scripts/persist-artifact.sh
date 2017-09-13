#!/usr/bin/env bash

set -e

imagename=${IMAGENAME:-todo}
version=${GO_PIPELINE_LABEL:-dev}

repository_prefix=${REPOSITORY_PREFIX}

# Retag image
docker tag ${imagename}:${version} ${repository_prefix}/${imagename}:${version}

# Push image
gcloud docker -- push ${repository_prefix}/${imagename}:${version}

# Delete local image
docker rmi ${imagename}:${version} ${repository_prefix}/${imagename}:${version}