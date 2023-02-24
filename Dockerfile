
FROM node:18

WORKDIR /app

COPY  package*.json ./

RUN npm install 

COPY . .

ENV URI_MONGO=mongodb+srv://admin:Corap123@cluster0.j3sz7js.mongodb.net/CorApp
ENV URI_UPLOAD_IMAGES=http://3.144.130.111:4000/imagesProducts/
ENV ID_TUCOMPRA=jum96fe3r2j4xxsq

CMD ["npm","start"]

