import mongoose from "mongoose";

//uso de variables de entorno
//encapsulacion de url mongo(en caso que se use un user)
try{
    await mongoose.connect(process.env.URI_MONGO)
    console.log('Connect DB ok')
}catch(error){
    console.log('Error de conexion a mongodb:' + error)
}
