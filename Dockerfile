
FROM node:18

WORKDIR /app

COPY  package*.json ./

RUN npm install 

COPY . .

ENV URI_MONGO=mongodb+srv://admin:Corap123@cluster0.j3sz7js.mongodb.net/CorApp

CMD ["npm","start"]

