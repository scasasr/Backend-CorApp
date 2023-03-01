import {Schema,model} from 'mongoose'

const orderSchema = new Schema({
    buyer:{
        type: Schema.Types.ObjectId,
        ref:"Partner",
        required: true,
        trim: true
    },
    address:{
        type:String,
        required:true
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
    details:{
        type:String,
    },
    transaction:{
        type:Schema.Types.ObjectId,
        ref:'Transaction',
        require:true
    },
    transactionState:{
        type:String,
        required:true
    },
    products:{
        type:[String],
        required:true 
    },
    total:{
        type:String,
        trim:true,
        require:true
    },
    // delivery:{
    //     type:String,
    //     require:true
    // },
    // deliveryState:{
    //     type:String,
    //     required:true    
    // },


});
//test commit

export const Order = model('order',orderSchema)