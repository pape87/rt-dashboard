FROM node:10-alpine

WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . .
EXPOSE 3080
RUN npm run build
CMD [ "node", "./dist/server.js" ]