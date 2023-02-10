import { Quality } from "../models/Quality.js";

export const getAllQuality= async (req,res) =>{
    try{
        const qualities = await Quality.find();
        return res.json(qualities);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"});
    }

};

export const getQualityById = async (req,res) =>{
    try{ 
        const quality = await Quality.findById(req.params.id)
        if (!quality)return res.status(404).json({error:"No existe una calidad con este id"}); 
        return res.json(quality);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }

};

export const addQuality = async (req,res) =>{

    const {name} = req.body
 
    try{
        
        let quality = await Quality.findOne({name});
        if(quality) throw{code: 11000};

        quality= new Quality({name});
        await quality.save();

        return res.status(201).json({ ok:true});
        
    }catch(error){
        console.log(error);
        if(error.code === 11000){
            return res.status(400).json({error: "Ya existe esta calidad"});
        }
        
        return res.status(500).json({error: "Error de servidor"});
    }

};

export const removeQuality = async (req,res) =>{
    try{ 
        const quality = await Quality.findById(req.params.id)
        if (!quality )return res.status(404).json({error:"No existe una calidad con este id"}); 
        await quality .remove();
        return res.status(201).json(quality);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }

};

export const updateQuality = async (req,res) =>{

    try{ 
        //Agregar verificacion de nombre en el cambio de nombre de documento
        const quality = await Quality.findById(req.params.id);
        const {name} = req.body;
        if (!quality)return res.status(404).json({error:"No existe una calidad con este id"}); 
        //actualizar nombre 
        quality.name = name;
        quality.save();
        return res.status(201).json(quality);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Error de servidor"}); 
    }

};