import { Product } from "../models/Product.js"; 
import {Category} from "../models/Category.js";

export const addProduct = async(req, res) =>{
    const {name,category,code,price} = req.body
    try{
        const catgry= await Category.findById(category)
        if (!catgry)return res.status(404).json({error:"No existe una categoria con este id"});

        let product = await Product.findOne({name});
        if(product) throw{code: 11000};

        product = new Product({name,category,code,price});
        await product.save();


        return res.status(201).json({ ok:true});
        

    }catch(error){
        console.log(error);
        if(error.code === 11000){
            return res.status(400).json({error: "Ya existe este producto"});
        }
        
        return res.status(500).json({error: "Error de servidor"});
    }
};

export const getAllProducts = async (req, res) =>{
    try{
        const products = await Product.find()
        return res.json(products);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"});
    }
    
};

export const getProductById =async (req,res) => {
    try{ 
        const product = await Product.findById(req.params.id)
        if (!product)return res.status(404).json({error:"No existe un producto con este id"}); 
        return res.json(product);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }
};

export const getProductsByCategory =async (req,res) => {
    
    try{ 
        const category = await Category.findById(req.params.cid)
        if (!category)return res.status(404).json({error:"No existe una categoria con este id"});
        const products = await Product.find({category:req.params.cid})
        return res.json(products);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }
};

export const removeProduct = async (req, res) => {
    try{ 
        const product = await Product.findById(req.params.id)
        if (!product)return res.status(404).json({error:"No existe un producto con este id"}); 
        await product.remove();
        return res.json(product);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }
}; 

export const updateProduct = async (req, res) =>{
    try{ 
        //Agregar verificacion de nombre en el cambio de nombre de documento
        const product = await Product.findById(req.params.id);
        const {name} = req.body;
        if (!product)return res.status(404).json({error:"No existe un producto con este id"}); 
        //actualizar nombre 
        product.name = name;
        product.save();
        return res.json(product);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Error de servidor"}); 
    }
};