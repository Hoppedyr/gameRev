FROM node:14

COPY . /usr/src 
WORKDIR /usr/src

RUN ls -al

RUN npm install

ENV CAMUNDA_PORT 8080

RUN echo $CAMUNDA_PORT

CMD [ "npm", "run", "deploy:production" ]