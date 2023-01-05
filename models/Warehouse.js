import {Schema,model} from 'mongoose'

const warehouseSchema  = new Schema({
    number:{
        type: Number,
        required: true,
        trim: true
    },
    code:{
        type: String,
        trim: true
    },
    square:{
        type: Schema.Types.ObjectId,
        ref:"Square",
        required: true,
        trim: true
    }
});

export const Warehouse = model('warehouse',warehouseSchema);