import {Schema,model} from 'mongoose'

const categorySchema = new Schema({
    name:{
        type:String,
        require:true,
        trim: true,
        unique: true,
        lowercase: true
    },
    subcategory:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    }
});


export const Category = model('category',categorySchema)