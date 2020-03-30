#!/bin/bash
SCRIPT_DIR=$(readlink -f $(dirname "$0"))
ROOT_DIR=$(dirname ${SCRIPT_DIR})

docker build -t springlearn-fe-image -f ${SCRIPT_DIR}/Dockerfile ${ROOT_DIR} || exit 1
docker network create springlearn-net
docker run --rm -d --name springlearn-fe --network springlearn-net -p 80:80 springlearn-fe-image
