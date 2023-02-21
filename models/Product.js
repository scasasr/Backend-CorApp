import {Schema,model} from 'mongoose';

const productSchema = new Schema({
    name:{type:String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true},
    photo:{
        type:String
    },
    code:{type: String,
          trim: true},
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        require:true
    }
});

export const Product = model('product',productSchema);