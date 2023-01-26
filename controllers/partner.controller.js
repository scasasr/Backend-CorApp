import { Partner } from "../models/Partner.js";
import {Role} from "../models/Role.js";
import bcryptjs from "bcryptjs";

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
        const rid = req.params.rid;
        let role = await Role.findById(rid);
        if(!role)return res.status(400).json({error:"El id del role no coincide con ninguno registrado"});

        
        const partners = await Partner.find({role:rid});
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
    const {document_number,name,last_name,email,username,password,phone,role,document_type} = req.body
    // console.log(req.body)
    try{
        
        let id_verification= await Partner.findOne({document_number});
        // console.log(id_verification);

        let email_verification= await Partner.findOne({email});
        // console.log(email_verification);

        if(id_verification || email_verification) throw{code: 11000};
        

        

        let rle = await Role.findById(role);
        if(!rle)return res.status(400).json({error:"El id del role no coincide con ninguno registrado"});

        const role_name=rle.name;


        if(role_name === "beneficiario" || role_name === "comprador"){
            const EPS = false;
            const ARL = false;
            const account_number = "Nn";
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
            const account_number = "Nn";
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
        return res.json(partner);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }
};

export const updatePartner= (req,res) =>{
    //Revisar necesidad de datos de ajuste
    res.json({updatePartner:true});
};