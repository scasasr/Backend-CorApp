import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const partnerSchema = new Schema({
    _id:{type:String,
        required: true,
        trim: true,
        unique: true  
    },
    
    name:{
        type: String,
        required: true,
        trim: true},
    last_name:{
        type: String,
        required: true,
        trim: true},
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true  
    },
    username:{
        type: String,
        required: true,
        trim: true,
        unique: true  
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true},
    role:{
          type:Schema.Types.ObjectId,
          Ref:"Role",
          require:true},
    document_type:{
        type: String,
        required: true,
        trim: true
        },
    ARL:{
        type:Boolean,
        required:true
    },
    EPS:{
        type:Boolean,
        required:true
    }
    
},{strict: false});


partnerSchema.pre("save", async function(next){
    const partner = this;

    if (!partner.isModified('password')) return next();
    try {
        const salt = await bcryptjs.genSalt(10);
        partner.password= await bcryptjs.hash(partner.password, salt )
        next();
    } catch (error) {
        console.log(error);
        throw new Error('Fallo el hash de la contraseña')
    }

})
export const Partner = model('Partner',partnerSchema);