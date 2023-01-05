import { Schema,model } from "mongoose";


const placeSchema = new Schema({
    name:{
        type:String,
        trim:true,
        require:true
    },
    latitude:{
        type:String,
        trim:true,
        require:true
    },
    longitude:{
        type:String,
        trim:true,
        require:true
    },
    geolocation:Object,
    is_bogota:{
        type:Boolean,
    },
    partner:{
        type:String,
        ref:'Partner',
        require:true
    },
    products:[Schema.Types.ObjectId],
    warehouse:{
        type:Schema.Types.ObjectId,
        ref:'Warehouse',
        require:true
    }

});

export const Place = model('Place',placeSchema);