import { Square } from "../models/Square.js";
import { City } from "../models/City.js";


export const getAllSquares = async (req,res) => { 
    try{
        const squares = await Square.find();
        return res.json(squares);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"});
    }
};

export const getAllByCityId = async (req,res) =>{
    try{
        const cid = req.params.cid;
        let city = await City.findById(cid);
        if(!city)return res.status(400).json({error:"El id de la ciudad no coincide con ninguna registrado"});

        
        const squares = await Square.find({city:cid});
        return res.json(squares);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"});
    }
};

export const getBySquareId = async (req,res) =>{
    try{ 
        const square = await Square.findById(req.params.id)
        if (!square)return res.status(404).json({error:"No existe una plaza con este id"}); 
        return res.json(square);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }
};

export const addSquare = async  (req,res) =>{
    const {name,code,city} = req.body
 
    try{
        
        let square= await Square.findOne({name});
        if(square) throw{code: 11000};

        let cty = await City.findById(city);
        if(!cty)return res.status(400).json({error:"El id de la ciudad no coincide con ninguna registrado"});

        square= new Square({name,code,city});
        await square.save();

        return res.status(201).json({ ok:true});
        
    }catch(error){
        console.log(error);
        if(error.code === 11000){
            return res.status(400).json({error: "Ya existe esta plaza"});
        }
        
        return res.status(500).json({error: "Error de servidor"});
    }
};

export const removeSquare= async (req,res) =>{
    try{ 
        const square = await Square.findById(req.params.id)
        if (!square )return res.status(404).json({error:"No existe una plaza con este id"}); 
        await square.remove();
        return res.json(square);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }
};

export const updateSquare = async (req,res) =>{
    try{ 
        //Agregar verificacion de nombre en el cambio de nombre de documento
        const square = await Square.findById(req.params.id);
        const {name} = req.body;
        if (!square)return res.status(404).json({error:"No existe una plaza con este id"}); 
        //actualizar nombre 
        square.name = name;
        square.save();
        return res.json(square);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Error de servidor"}); 
    }
};