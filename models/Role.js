import {Schema,model} from 'mongoose';

const roleSchema = new Schema({
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

export const Role = model('role',roleSchema);