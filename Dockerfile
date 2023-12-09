FROM node:20

WORKDIR /short

COPY package*.json ./

RUN npm install

COPY . .


ENV PORT=1333

EXPOSE 1333

CMD ["node", "index.js"]