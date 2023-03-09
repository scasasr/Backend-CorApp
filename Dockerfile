
FROM node:18

WORKDIR /app

COPY  package*.json ./

RUN npm install 

COPY . .


ENV URI_MONGO=mongodb+srv://CorApp-Admin:CorApp9320@cluster0.7unrfqx.mongodb.net/CorApp-Prod
ENV URI_UPLOAD_IMAGES=http://18.116.86.229:4000/imagesProducts/
ENV ID_TUCOMPRA=jum96fe3r2j4xxsq

CMD ["npm","start"]

