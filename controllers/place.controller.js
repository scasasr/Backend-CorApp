import {Place} from "../models/Place.js"
import {Partner} from "../models/Partner.js"
import {Warehouse} from "../models/Warehouse.js"
import {Product} from "../models/Product.js"
import mongoose from "mongoose"

export const getAllPlaces = async (req, res) =>{
    try{
        const places = await Place.find()
        return res.json(places);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"});
    }
};


export const getAllByWarehouseId = async (req, res) =>{
    try{
        const wid = req.params.wid;
        let warehouse = await Warehouse.findById(wid);
        if(!warehouse)return res.status(400).json({error:"El id de la bodega no coincide con ninguno registrado"});

        
        const places = await Place.find({warehouse:wid});
        return res.json(places);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"});
    }
};


export const getAllByPartnerId = async (req, res) =>{
    try{
        const pid = req.params.pid;
        let partner = await Partner.findById(pid);
        if(!partner)return res.status(400).json({error:"El id del asociado no coincide con ninguno registrado"});

        
        const places = await Place.find({partner:pid});
        return res.json(places);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"});
    }
};


export const getByPlaceId = async (req, res) =>{
    try{ 
        const place = await Place.findById(req.params.id)
        if (!place)return res.status(404).json({error:"No existe un puesto con este id"}); 
        return res.json(place);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }
   
};


export const addPlace = async (req, res) =>{
    const {name,latitude,longitude,is_bogota,partner,warehouse} = req.body
 
    try{
        
        let ptner= await Partner.findById(partner);
        if(!ptner)return res.status(400).json({error:"El id del asociado no coincide con ninguno registrado"});

        let whouse= await Warehouse.findById(warehouse);
        if(!whouse)return res.status(400).json({error:"El id de la bodega no coincide con ninguno registrado"});

        // for(const product of products){
        //     let pduct = await Product.findById(product);
        //     if(!pduct)return res.status(400).json({error:"El id del producto "+product+" no coincide con ninguno registrado"});
        // }

        let place= await Place.findOne({name});

        if(place && place.warehouse.toString() === warehouse) throw{code: 11000};

        place= new Place({name,latitude,longitude,is_bogota,partner,warehouse});
        await place.save();

        return res.status(201).json({ ok:true});
        
    }catch(error){
        console.log(error);
        if(error.code === 11000){
            return res.status(400).json({error: "Ya existe este puesto"});
        }
        
        return res.status(500).json({error: "Error de servidor"});
    }
};

export const removePlace = async (req, res) =>{
    try{ 
        const place = await Place.findById(req.params.id)
        if (!place)return res.status(404).json({error:"No existe un puesto con este id"}); 
        await place.remove();
        return res.status(201).json(place);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }
};

export const updatePlace = async (req, res) =>{
    //Revisar necesidad de datos de ajuste
    return res.status(201).json({update:true});
};


