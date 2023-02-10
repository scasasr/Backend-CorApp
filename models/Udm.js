import {Schema,model} from 'mongoose'

const udmSchema = new Schema({
    name:{
        type:String,
        require:true,
        trim: true,
        unique: true,
        lowercase: true
    }
});


export const Udm = model('Udm',udmSchema)