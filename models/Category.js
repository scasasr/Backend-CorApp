import {Schema,model} from 'mongoose'

const categorySchema = new Schema({
    name:{
        type:String,
        require:true,
        trim: true,
        unique: true,
        lowercase: true
    }
});


export const Category = model('category',categorySchema)