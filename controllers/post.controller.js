import {Post} from "../models/Post.js"
import { Product } from "../models/Product.js"
// import { Partner } from "../models/Partner.js"
import { Place } from "../models/Place.js"

export const getAllPosts = async (req, res) =>{
    try{
        const posts = await Post.find()
        return res.json(posts);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"});
    }

};

export const getAllByPlaceId = async (req, res) =>{
    try{
        const pid = req.params.pid;
        let place = await Place.findById(pid);
        if(!place)return res.status(400).json({error:"El id del puesto no coincide con ninguno registrado"});

        
        const posts = await Post.find({place:pid});
        return res.json(posts);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"});
    }

};

// export const getAllByPartnerId = async (req, res) =>{
//     try{
//         const pid = req.params.pid;
//         let partner = await Partner.findById(pid);
//         if(!partner)return res.status(400).json({error:"El id del puesto no coincide con ninguno registrado"});

        
//         const posts = await Post.find({partner:pid});
//         return res.json(posts);
//     }catch(error){
//         console.log(error)
//         return res.status(500).json({error:"Error de servidor"});
//     }

// };

export const getAllByProductId = async (req, res) =>{
    try{
        const pid = req.params.pid;
        let product = await Product.findById(pid);
        if(!product)return res.status(400).json({error:"El id del producto no coincide con ninguno registrado"});

        
        const posts = await Post.find({product:pid});
        return res.json(posts);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"});
    }

};

export const getByPostId = async (req, res) =>{
    try{ 
        const post = await Post.findById(req.params.id)
        if (!post)return res.status(404).json({error:"No existe un post con este id"}); 
        return res.json(post);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }

};

//Revisar el json que trae en cada get 

export const addPost = async (req, res) =>{
    const {price,date_aded,cut_date_aded,post,donation,photo,product,place} = req.body
 
    try{
        
        let pduct= await Partner.findById(product);
        if(!pduct)return res.status(400).json({error:"El id del producto no coincide con ninguno registrado"});

        let plce= await Place.findById(place);
        if(!plce)return res.status(400).json({error:"El id del puesto no coincide con ninguno registrado"});

        // let post= await Post.findOne({});
        // if(place && place.warehouse.toString() === warehouse) throw{code: 11000};

        //Ajustar verificacion de repeticion

        post= new Post({price,date_aded,cut_date_aded,post,donation,photo,product,place});
        await post.save();

        return res.status(201).json({ ok:true});
        
    }catch(error){
        console.log(error);
        if(error.code === 11000){
            return res.status(400).json({error: "Ya existe este puesto"});
        }
        
        return res.status(500).json({error: "Error de servidor"});
    }

};

export const removePost = async (req, res) =>{
    try{ 
        const post = await Post.findById(req.params.id)
        if (!post)return res.status(404).json({error:"No existe un post con este id"}); 
        await post.remove();
        return res.json(post);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }
};

export const updatePost = (req, res) =>{
    res.json({update:true})

};


