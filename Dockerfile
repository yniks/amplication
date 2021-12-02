# Use node 14.15.1 as the base image
FROM node@sha256:bac289a6f393990e759c672d5f567553c697255d1fb858e2c62d086a2dfae44a AS node
FROM node

FROM node as base
RUN npm i -g npm@7.3.0

# This stage creates a skeleton with package*.json to /app/
FROM base as package-sources
ARG NPM_LOG_LEVEL=silent
RUN mkdir /app
COPY lerna.json /app/
COPY package*.json /app/
COPY packages packages
RUN cp --parents packages/*/package*.json /app/
WORKDIR /app
RUN npm ci --loglevel=${NPM_LOG_LEVEL} --production

FROM package-sources AS build
ARG NPM_LOG_LEVEL=silent

# hide open collective funding messages
ENV OPENCOLLECTIVE_HIDE=1

#install all node_nodules in '/app/packages'
RUN npm run bootstrap -- --loglevel=${NPM_LOG_LEVEL} --scope @amplication/server --scope @amplication/client --include-dependencies

#copy the content (code) from packages to /app/packages (node_modules folders stay in place)
# is this nesesery
COPY packages packages 

# generate the prisma orm in the server
RUN npm run prisma:generate

# prepare all the build/dist folders unders /app/packages
RUN npm run build -- --scope @amplication/server --scope @amplication/client --include-dependencies

# prune all the devDependecies from all packages
RUN npm run prune:dev

# Copy entrypoint script
COPY docker-entrypoint.sh /entrypoint.sh

# Give entrypoint script access permission
RUN chmod 755 /entrypoint.sh

EXPOSE 3000

ENTRYPOINT [ "/entrypoint.sh" ]

CMD [ "node", "packages/amplication-server/dist/src/main"]
