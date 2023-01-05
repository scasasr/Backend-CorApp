import {Schema,model} from 'mongoose';

const productSchema = new Schema({
    name:{type:String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true},
    code:{type: String,
          trim: true},
    price:{type:Schema.Types.Decimal128,
           required: true}
});

export const Product = model('product',productSchema);