import {Category} from '../models/Category.js'

export const getAllCategory = async (req,res) =>{
    try{
        const categories = await Category.find();
        return res.json(categories);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"});
    }

};

export const getCategoryById = async (req,res) =>{
    try{ 
        const category = await Category.findById(req.params.id)
        if (!category)return res.status(404).json({error:"No existe una categoria con este id"}); 
        return res.json(category);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }

};

export const addCategory = async (req,res) =>{

    const {name,subcategory} = req.body
 
    try{
        
        let category = await Category.findOne({name});
        if(category) throw{code: 11000};

        category= new Category({name,subcategory});
        await category.save();

        return res.status(201).json({ ok:true});
        
    }catch(error){
        console.log(error);
        if(error.code === 11000){
            return res.status(400).json({error: "Ya existe esta categoria"});
        }
        
        return res.status(500).json({error: "Error de servidor"});
    }

};

export const removeCategory = async (req,res) =>{
    try{ 
        const category = await Category.findById(req.params.id)
        if (!category )return res.status(404).json({error:"No existe una categoria con este id"}); 
        await category .remove();
        return res.json(category);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }

};

export const updateCategory = async (req,res) =>{

    try{ 
        //Agregar verificacion de nombre en el cambio de nombre de documento
        const category = await Category.findById(req.params.id);
        const {name} = req.body;
        if (!category)return res.status(404).json({error:"No existe una categoria con este id"}); 
        //actualizar nombre 
        category.name = name;
        category.save();
        return res.json(category);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Error de servidor"}); 
    }

};