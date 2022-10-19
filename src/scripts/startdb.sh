#!/bin/bash
set -e

CONTAINER="nestlabDBContainer";
PASSWORD="nestlab123";
DB="nestlabDB";

echo "echo restarting fresh container $CONTAINER";
(docker kill $CONTAINER || :) && \
(docker rm $CONTAINER || :) && \
docker run -d --name $CONTAINER -e POSTGRES_PASSWORD=$PASSWORD  -e POSTGRES_DB=$DB -e POSTGRES_USER=postgres -p 5432:5432 postgres
echo "waiting for container to start...";