set IMAGE_LIBRARY=dinooppaloli
set IMAGE_NAME=friendpost-posts
set IMAGE_TAG=1.0
set IMAGE_VERSIONED=%IMAGE_LIBRARY%/%IMAGE_NAME%:%IMAGE_TAG%
set IMAGE_LATEST=%IMAGE_LIBRARY%/%IMAGE_NAME%:latest

docker image build -t %IMAGE_VERSIONED% .
docker image tag %IMAGE_VERSIONED% %IMAGE_LATEST%

REM docker push %IMAGE_VERSIONED%
REM docker push %IMAGE_LATEST%