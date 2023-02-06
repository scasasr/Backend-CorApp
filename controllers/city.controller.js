import {City} from "../models/City.js";
import { Country } from "../models/Country.js";

export const getAllByCountryId = async (req,res) => { //all cities with the same country
    try{
        const cid = req.params.cid;
        let ctry = await Country.findById(cid);
        if(!ctry)return res.status(400).json({error:"El id del pais no coincide con ninguno registrado"});

        
        const cities = await City.find({country:cid});
        return res.json(cities);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"});
    }
};

export const getAllCities = async (req,res) => { 
    try{
        const cities = await City.find();
        return res.json(cities);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"});
    }
};


export const getByCityId = async (req,res) => {
    try{ 
        const city = await City.findById(req.params.id)
        if (!city)return res.status(404).json({error:"No existe una ciudad con este id"}); 
        return res.json(city);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }
};

export const addCity = async (req,res) => {
    // console.log(req.body.Country)
    const {name,code,country} = req.body
 
    try{
        
        let city = await City.findOne({name});
        if(city) throw{code: 11000};

        let ctry = await Country.findById(country);
        if(!ctry)return res.status(400).json({error:"El id del pais no coincide con ninguno registrado"});

        city= new City({name,code,country});
        await city.save();

        return res.status(201).json({ ok:true});
        
    }catch(error){
        console.log(error);
        if(error.code === 11000){
            return res.status(400).json({error: "Ya existe esta ciudad"});
        }
        
        return res.status(500).json({error: "Error de servidor"});
    }
};

export const removeCity = async (req,res) => {
    try{ 
        const city = await City.findById(req.params.id)
        if (!city )return res.status(404).json({error:"No existe una ciudad con este id"}); 
        await city.remove();
        return res.status(201).json(city);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }
};

export const updateCity= async (req,res) => {
    try{ 
        //Agregar verificacion de nombre en el cambio de nombre de documento
        const city = await City.findById(req.params.id);
        const {name,country,code} = req.body;
        if (!city)return res.status(404).json({error:"No existe una ciudad con este id"}); 
        //actualizar nombre 
        city.name = name;
        city.country = country;
        city.code = code;
        city.save();
        return res.status(201).json(city);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Error de servidor"}); 
    }
};