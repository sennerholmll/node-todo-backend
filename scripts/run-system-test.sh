#!/usr/bin/env bash

set -e
set -x
imagename=${IMAGENAME:-todo}
version=${GO_PIPELINE_LABEL:-dev}

repository_prefix=${REPOSITORY_PREFIX}

full_imagename=${repository_prefix}/${imagename}:${version}

mode="--fast"
if [ $# -eq 1 ]; then
    mode=$1
fi

# Fetch the image
gcloud docker -- pull ${full_imagename}

# Instant
if [ "${mode}" = "--fast" ]; then
#    docker run --rm --mount type=bind,src=${GOOGLE_APPLICATION_CREDENTIALS},dst=${GOOGLE_APPLICATION_CREDENTIALS} -e GOOGLE_APPLICATION_CREDENTIALS=${GOOGLE_APPLICATION_CREDENTIALS} ${full_imagename} ./runtest --fast
    docker run --rm -v ${GOOGLE_APPLICATION_CREDENTIALS}:${GOOGLE_APPLICATION_CREDENTIALS} -e GOOGLE_APPLICATION_CREDENTIALS=${GOOGLE_APPLICATION_CREDENTIALS} ${full_imagename} ./runtest --fast
fi