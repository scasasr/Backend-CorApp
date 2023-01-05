import {Schema,model} from 'mongoose'

const countrySchema = new Schema({
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
    }
});

export const Country = model('country',countrySchema);