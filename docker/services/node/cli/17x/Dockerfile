FROM node:17-alpine

RUN apk update && \
    apk upgrade && \
    apk add --no-cache ffmpeg && \
    apk add git

COPY entrypoint.sh /entrypoint.sh
RUN chmod 755 /entrypoint.sh

COPY entrypoint-cmd-node.sh /entrypoint-cmd-node.sh
RUN chmod 755 /entrypoint-cmd-node.sh

COPY entrypoint-cmd-npm.sh /entrypoint-cmd-npm.sh
RUN chmod 755 /entrypoint-cmd-npm.sh

USER root
RUN mkdir /.npm
RUN chmod 755 /.npm

RUN npm set unsafe-perm true

ENTRYPOINT ["/entrypoint.sh"]

WORKDIR /workspace

# Configure timezone
ARG DOCKER_TIMEZONE=UTC
RUN echo $DOCKER_TIMEZONE > /etc/timezone;
