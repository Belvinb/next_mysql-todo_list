FROM node:13-alpine

RUN mkdir -p /home/app

COPY ./app /home/app

WORKDIR /home/app

RUN npm install

EXPOSE 8800

CMD ["node", "index.js"]