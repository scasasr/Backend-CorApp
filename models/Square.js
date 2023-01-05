import {Schema,model} from 'mongoose'

const squareSchema  = new Schema({
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
    city:{
        type: Schema.Types.ObjectId,
        ref:"City",
        required: true,
        trim: true
    }
});

export const Square = model('square',squareSchema);