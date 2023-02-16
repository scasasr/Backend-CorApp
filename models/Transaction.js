import {Schema,model} from 'mongoose'

const transactionSchema = new Schema({
    reference:{
        type:String,
        required:true
    },
    buyer:{
        type: Schema.Types.ObjectId,
        ref:"Partner",
        required: true,
        trim: true
    },
    order:{
        type:Schema.Types.ObjectId,
        ref:'Order',
        required:true,
        unique:true
    },
    state:{
        type:String,
        required:true,
        trim:true
    },
    products:{
        type:[String],
        required:true 
    },//array de posts
    total:{
        type:String,
        trim:true,
        require:true
    }


});
//test commit

export const Transaction = model('transaction',transactionSchema)