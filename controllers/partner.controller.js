import { Partner } from "../models/Partner.js";
import {Role} from "../models/Role.js";
import bcryptjs from "bcryptjs";

//random value to account number in comprador and beneficiario partners 
const randomValue = () =>{
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1= ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < 15; i++ ) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result1;
}
//

export const getAllPartners= async (req,res) =>{
    try{
        const partners = await Partner.find()
        return res.json(partners);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"});
    }
};

export const getAllPartnersByRole= async (req,res) =>{
    try{
        const name_role = req.params.name_role;
        let role = await Role.findOne({name:name_role});
        if(!role)return res.status(400).json({error:"El role no coincide con ninguno registrado"});

        const partners = await Partner.find({role:role._id});
        return res.json(partners);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"});
    }
};

export const getPartnerById= async (req,res) =>{
    try{ 
        const partner = await Partner.findById(req.params.id)
        if (!partner)return res.status(404).json({error:"No existe un asociado con este id"}); 
        return res.json(partner);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }

};

export const getAllPartnerByEmail= async (req,res) =>{
    try{ 
        const partner = await Partner.find({email:req.params.email});
        if (!partner)return res.status(404).json({error:"No existe un asociado con este email"}); 
        return res.json(partner);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }
};

export const addPartner= async(req,res) =>{
    const {document_number,name,last_name,email,username,password,phone,role_name,document_type} = req.body
    console.log(req.body)
    try{
        
        let id_verification= await Partner.findOne({document_number});
        // console.log(id_verification);

        let email_verification= await Partner.findOne({email});
        // console.log(email_verification);
        console.log(id_verification)
        console.log(email_verification)
        if(id_verification || email_verification) throw{code: 11000};
        

        

        let rle = await Role.findOne({name:role_name});
        let role = rle.id;
    
        if(!rle)return res.status(400).json({error:"El role no coincide con ninguno registrado"});


        if(role_name === "beneficiario" || role_name === "comprador" || role_name === "admin"){
            const EPS = false;
            const ARL = false;
            const account_number = randomValue();
            const partner= new Partner({document_number,name,last_name,email,username,account_number,password,phone,role,document_type,ARL,EPS});
            await partner.save();
            return res.status(201).json({ ok:true});

        }else if(role_name === "vendedor"){
            const EPS = false;
            const ARL = false;
            const {account_number} = req.body
            const partner= new Partner({document_number,name,last_name,email,username,account_number,password,phone,role,document_type,ARL,EPS});
            await partner.save();
            return res.status(201).json({ vendedor:true});

        }else{
            
            const{ARL,EPS} =req.body;
            const account_number =randomValue();
            const partner= new Partner({document_number,name,last_name,email,username,account_number,password,phone,role,document_type,ARL,EPS});
            await partner.save();
            return res.status(201).json({ conductor_cargador:true});
            
        }

        
    }catch(error){
        console.log(error);
        console.log(error.code);
        if(error.code === 11000){
            return res.status(400).json({error: "Ya existe este usuario"});
        }
        
        return res.status(500).json({error: "Error de servidor"});
    }
};

export const loginPartner = async(req,res) =>{
    const {email,password} = req.body
  
    try {
        let partner= await Partner.findOne({email});
        if(partner){
            let password_verification = await bcryptjs.compare(password,partner.password)
            if(password_verification){
                let role = await Role.findById(partner.role)
                return res.status(201).json({partner,"role_name":role.name});
            }else{
                return res.status(400).json({error:"Contraseña incorrecta"});

            }

        }else{
            return res.status(400).json({error:"Correo incorrecto"})
        }
        
    } catch (error) {
        console.log(error);
        console.log(error.code);
        return res.status(500).json({error: "Error de servidor"});   
    }

};

export const removePartner= async (req,res) =>{
    try{ 
        const partner = await Partner.findById(req.params.id)
        if (!partner)return res.status(404).json({error:"No existe una asociado con este id"}); 
        await partner.remove();
        return res.status(201).json(partner);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }
};

export const updatePartner=async (req,res) =>{
    //Revisar necesidad de datos de ajuste
    try {
        const partner = await Partner.findById(req.params.id);
        if (!partner)return res.status(404).json({error:"No existe un asociado con este id"}); 
        const {name,last_name,document_number,email,phone,username} = req.body
        const rle = await Role.findById(partner.role)

        partner.name=name;
        partner.last_name=last_name;
        partner.document_number=document_number;
        partner.email=email;
        partner.phone=phone;
        partner.username=username;
        
        const role = rle.name
        
        if(role === 'vendedor'){
            const {account_number} = req.body
            partner.account_number=account_number;
            partner.save();
            return res.status(201).json({ ok:true});
        }
        partner.save();
        return res.status(201).json({ ok:true});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Error de servidor"}); 
    }
    
};