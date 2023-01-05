import {Country} from "../models/Country.js"

export const addCountry = async(req, res) =>{
    const {name,code} = req.body
    try{
        
        let country = await Country.findOne({name});
        if(country) throw{code: 11000};

        country = new Country({name,code});
        await country.save();


        return res.status(201).json({ ok:true});
        

    }catch(error){
        console.log(error);
        if(error.code === 11000){
            return res.status(400).json({error: "Ya existe este país"});
        }
        
        return res.status(500).json({error: "Error de servidor"});
    }
};

export const getCountries = async (req, res) =>{
    try{
        const countries = await Country.find()
        return res.json(countries);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"});
    }
    
};

export const getCountryById =async (req,res) => {
    try{ 
        const ctry = await Country.findById(req.params.id)
        if (!ctry)return res.status(404).json({error:"No existe un país con este id"}); 
        return res.json(ctry);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }
};

export const remove = async (req, res) => {
    try{ 
        const ctry = await Country.findById(req.params.id)
        if (!ctry)return res.status(404).json({error:"No existe un país con este id"}); 
        await ctry.remove();
        return res.json(ctry);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }
}; 

export const update = async (req, res) =>{
    try{ 
        //Agregar verificacion de nombre en el cambio de nombre de documento
        const ctry = await Country.findById(req.params.id);
        const {name} = req.body;
        if (!ctry)return res.status(404).json({error:"No existe un país con este id"}); 
        //actualizar nombre 
        ctry.name = name;
        ctry.save();
        return res.json(ctry);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Error de servidor"}); 
    }
};

