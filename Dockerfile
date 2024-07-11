FROM node:lts-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

USER node

RUN npm ci --omit=dev

#Copy application files
COPY --chown=node:node /src/ .

EXPOSE 8080

#ENV MONGO_URL="mongodb://root:something@mongo:27017"

CMD [ "node", "index.js" ]