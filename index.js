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
import roleRouter from "./routes/role.routes.js"
import productRouter from "./routes/product.routes.js"
import partnerRouter from "./routes/partner.routes.js"
import placesRouter from "./routes/place.routes.js"
import postRouter from "./routes/post.routes.js"


const app = express();
app.use(express.json());

const whiteList = [process.env.ORIGIN1]
app.use(cors({
    origin: function(origin,callback){
        if(whiteList.includes(origin)){
            return callback(null,origin);
        }
        return callback(
            "Error de CORS origin: "+origin+ " No autorizado!" 
        );
    }
}));

app.use("/api/v1/countries",countryRouter);
app.use("/api/v1/cities", cityRouter);
app.use("/api/v1/squares", squareRouter);
app.use("/api/v1/warehouses", warehouseRouter);
app.use("/api/v1/roles", roleRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/partners", partnerRouter);
app.use("/api/v1/places",placesRouter);
app.use("/api/v1/posts",postRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('servidor inicializado http://localhost:'+ PORT));

