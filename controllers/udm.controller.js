import {Udm} from '../models/Udm.js'

export const getAllUdm = async (req,res) =>{
    try{
        const udms = await Udm.find();
        return res.json(udms);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"});
    }

};

export const getUdmById = async (req,res) =>{
    try{ 
        const udm = await Udm.findById(req.params.id)
        if (!udm)return res.status(404).json({error:"No existe una unidad de medida con este id"}); 
        return res.json(udm);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }

};

export const addUdm = async (req,res) =>{

    const {name} = req.body
 
    try{
        
        let udm = await Udm.findOne({name});
        if(udm) throw{code: 11000};

        udm= new Udm({name});
        await udm.save();

        return res.status(201).json({ ok:true});
        
    }catch(error){
        console.log(error);
        if(error.code === 11000){
            return res.status(400).json({error: "Ya existe esta unidad de medida"});
        }
        
        return res.status(500).json({error: "Error de servidor"});
    }

};

export const removeUdm = async (req,res) =>{
    try{ 
        const udm = await Udm.findById(req.params.id)
        if (!udm )return res.status(404).json({error:"No existe una unidad de medida con este id"}); 
        await udm .remove();
        return res.status(201).json(udm);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }

};

export const updateUdm = async (req,res) =>{

    try{ 
        //Agregar verificacion de nombre en el cambio de nombre de documento
        const udm = await Udm.findById(req.params.id);
        const {name} = req.body;
        if (!udm)return res.status(404).json({error:"No existe una unidad de medida con este id"}); 
        //actualizar nombre 
        udm.name = name;
        udm.save();
        return res.status(201).json(udm);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Error de servidor"}); 
    }

};