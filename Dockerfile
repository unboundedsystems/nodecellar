FROM node:8.10-alpine

COPY . /src

WORKDIR /src

EXPOSE 3000

RUN \
    npm install && \
    npm run build --unsafe-perm && \
    npm prune --production

ENTRYPOINT [ \
    "/bin/sh", \
    "/src/docker-init.sh", \
    "/usr/local/bin/node", \
    "dist/index.js" \
    ]

