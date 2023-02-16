import {Schema,model} from 'mongoose'

const citySchema  = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    code:{
        type: String,
        trim: true
    },
    country:{
        type: Schema.Types.ObjectId,
        ref:"Country",
        required: true,
        trim: true
    }
}); 

export const City = model('city',citySchema);