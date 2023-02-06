import { Warehouse } from "../models/Warehouse.js";
import { Square } from "../models/Square.js";




export const getAllWarehouse = async(req, res) =>{
    try{
        const warehouses = await Warehouse.find()
        return res.json(warehouses);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"});
    }
};

export const getAllBySquareId = async (req,res) => {
    try{
        const sid = req.params.sid;
        let square= await Square.findById(sid);
        if(!square)return res.status(400).json({error:"El id de la plaza no coincide con ninguno registrado"});

        
        const warehouses = await Warehouse.find({square:sid});
        return res.json(warehouses);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"});
    }
};

export const getByWarehouseId = async (req,res) => {
    try{ 
        const warehouse = await Warehouse.findById(req.params.id)
        if (!warehouse)return res.status(404).json({error:"No existe una bodega con este id"}); 
        return res.json(warehouse);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }
};

export const addWarehouse = async (req,res) => {
    const {number,code,square} = req.body
 
    try{
        
        let sqre= await Square.findById(square);
        if(!sqre)return res.status(400).json({error:"El id de la plaza no coincide con ninguna registrada"});

        let warehouse= await Warehouse.findOne({number});

        if(warehouse && warehouse.square.toString() === square) throw{code: 11000};

        warehouse= new Warehouse({number,code,square});
        await warehouse.save();

        return res.status(201).json({ ok:true});
        
    }catch(error){
        console.log(error);
        if(error.code === 11000){
            return res.status(400).json({error: "Ya existe esta bodega"});
        }
        
        return res.status(500).json({error: "Error de servidor"});
    }
};

export const removeWarehouse= async (req,res) => {
    try{ 
        const warehouse = await Warehouse.findById(req.params.id)
        if (!warehouse )return res.status(404).json({error:"No existe una bodega con este id"}); 
        await warehouse.remove();
        return res.status(201).json(warehouse);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }
};

export const updateWarehouse = async (req,res) => {
    try{ 
        //Agregar verificacion de numero en el cambio de nombre de documento
        const warehouse = await Warehouse.findById(req.params.id);
        const {number,square,code} = req.body;
        if (!warehouse)return res.status(404).json({error:"No existe una bodega con este id"}); 
        //actualizar numero de bodega
        warehouse.number = number;
        warehouse.square = square;
        warehouse.code = code;
        warehouse.save();
        return res.status(201).json(warehouse);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Error de servidor"}); 
    }
};
