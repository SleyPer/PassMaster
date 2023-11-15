FROM node:18 AS development

WORKDIR /app

COPY package*.json ./

RUN npm install -g node-pre-gyp
RUN npm install

EXPOSE 4200

CMD ["npm", "start"]
