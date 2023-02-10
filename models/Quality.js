import {Schema,model} from 'mongoose'

const qualitySchema = new Schema({
    name:{
        type:String,
        require:true,
        trim: true,
        unique: true,
        lowercase: true
    }
});


export const Quality = model('quality',qualitySchema)