//Uso de variables de entorno
import 'dotenv/config';
//Conexion base de datos
import "./database/connectdb.js";
import express from 'express';
import cors from 'cors';
import countryRouter from "./routes/country.route.js";
import cityRouter from "./routes/city.routes.js";
import squareRouter from "./routes/square.routes.js";
import warehouseRouter from "./routes/warehouse.routes.js";
import roleRouter from "./routes/role.routes.js";
import productRouter from "./routes/product.routes.js";
import partnerRouter from "./routes/partner.routes.js";
import placesRouter from "./routes/place.routes.js";
import postRouter from "./routes/post.routes.js";
import categryRouter from "./routes/category.routes.js";
import qualityRouter from "./routes/quality.routes.js";
import udmRouter from "./routes/udm.routes.js";
import orderRouter from "./routes/order.routes.js";
import transactionRouter from './routes/transaction.routes.js';
import imageRouter from './routes/images.routes.js'


import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const staticRoute = path.join(__dirname, '/imagesProducts')



const app = express();
app.use(cors());//Public back
app.use(express.urlencoded({extended:true}))
app.use(express.json());


//Static files 
app.use('/imagesProducts/',express.static(staticRoute))

//routes
app.use('/',imageRouter);
//use cors
// const whiteList = [process.env.ORIGIN1]
// app.use(cors({
//     origin: function(origin,callback){
//         if(whiteList.includes(origin)){
//             return callback(null,origin);
//         }
//         return callback(
//             "Error de CORS origin: "+origin+ " No autorizado!" 
//         );
//     }
// }));


app.use("/api/v1/countries",countryRouter);
app.use("/api/v1/cities", cityRouter);
app.use("/api/v1/squares", squareRouter);
app.use("/api/v1/warehouses", warehouseRouter);
app.use("/api/v1/roles", roleRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/partners", partnerRouter);
app.use("/api/v1/places",placesRouter);
app.use("/api/v1/posts",postRouter);
app.use("/api/v1/categories",categryRouter);
app.use("/api/v1/qualities",qualityRouter);
app.use("/api/v1/udm",udmRouter);
app.use("/api/v1/orders",orderRouter);
app.use("/api/v1/transactions",transactionRouter);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('servidor inicializado http://localhost:'+ PORT));

