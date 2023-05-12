FROM node:latest

RUN mkdir -p /server/
WORKDIR /server

COPY ./package.json /server/
RUN npm install

COPY . /app/

EXPOSE 4000


CMD npm run server