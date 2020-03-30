#!/bin/bash
SCRIPT_DIR=$(readlink -f $(dirname "$0"))
ROOT_DIR=$(dirname ${SCRIPT_DIR})

docker build -t springlearn-fe-image -f ${SCRIPT_DIR}/Dockerfile ${ROOT_DIR} || exit 1
docker run --rm -d --name springlearn-fe -p 80:80 springlearn-fe-image
