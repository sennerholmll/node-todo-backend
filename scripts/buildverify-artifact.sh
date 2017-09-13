#!/usr/bin/env bash

set -e

imagename=${IMAGENAME:-todo}
version=${GO_PIPELINE_LABEL:-dev}

# docker build
docker build -t ${imagename}:${version} .

# docker run tests
docker run --rm ${imagename}:${version} ./runtest
