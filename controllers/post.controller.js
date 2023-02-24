import {Post} from "../models/Post.js"
import { Product } from "../models/Product.js"
import { Partner } from "../models/Partner.js"
import {Warehouse} from "../models/Warehouse.js"
import {Square} from "../models/Square.js"
import {Udm} from "../models/Udm.js"
import {Quality} from "../models/Quality.js"
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

export const getAllPostsAvailables = async (req, res) =>{
    try{
        const posts = await Post.find({available:true, donation:false})
        return res.json(posts);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"});
    }

};

export const getAllPostsDonation = async (req, res) =>{
    try{
        const posts = await Post.find({available:true,donation:true})
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


export const getByPostIdExtend = async (req, res) =>{
    try{ 
        const post = await Post.findById(req.params.id)
        if (!post)return res.status(404).json({error:"No existe un post con este id"}); 

        let product = await Product.findById(post.product);
        if(!product)return res.status(400).json({error:"El id del producto no coincide con ninguno registrado"});

        let place = await Place.findById(post.place);
        if(!place)return res.status(400).json({error:"El id del puesto no coincide con ninguno registrado"});
        
        let warehouse = await Warehouse.findById(place.warehouse);
        if(!warehouse)return res.status(400).json({error:"El id de la bodega no coincide con ninguno registrado"});

        let square = await Square.findById(warehouse.square);
        if(!square  )return res.status(400).json({error:"El id de la bodega no coincide con ninguno registrado"});

        let partner = await Partner.findById(place.partner);
        if(!partner)return res.status(400).json({error:"El id del vendedor no coincide con ninguno registrado"});

        let udm = await Udm.findById(post.udm);
        console.log(post.udm)
        if(!udm)return res.status(400).json({error:"El id de la unidad de medida no coincide con ninguno registrado"});

        let quality = await Quality.findById(post.quality);
        if(!quality)return res.status(400).json({error:"El id de la calidad no coincide con ninguno registrado"});


        return res.json({post,"product_name":product.name,"latitude":place.latitude,"longitude":place.longitude,
                                    "partner_name":partner.name+" "+partner.last_name,"place_name":place.name,"warehouse_number":warehouse.number,
                                    "quality_name":quality.name,"udm_name":udm.name,"square_name":square.name});
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }

};
//Revisar el json que trae en cada get 

export const addPost = async (req, res) =>{
    const {price,description,donation,udm,quality,product,place,available,is_promo} = req.body

    let now= new Date();
    const date_added = now;
    const cut_date_added = date_added.substring(0,9);
 
    try{
        
        let pduct= await Product.findById(product);
        if(!pduct)return res.status(400).json({error:"El id del producto no coincide con ninguno registrado"});

        let plce= await Place.findById(place);
        if(!plce)return res.status(400).json({error:"El id del puesto no coincide con ninguno registrado"});

        let udm_= await Udm.findById(udm);
        if(!udm_)return res.status(400).json({error:"El id de la unidad de medida no coincide con ninguno registrado"});

        let quality_ = await Quality.findById(quality);
        if(!quality_)return res.status(400).json({error:"El id de la calidad no coincide con ninguno registrado"});
        
        const photo = pduct.photo

        // let post= await Post.findOne({});
        // if(place && place.warehouse.toString() === warehouse) throw{code: 11000};

        //Ajustar verificacion de repeticion

        let post= new Post({price,date_aded,cut_date_aded,description,donation,udm,quality,product,photo,place,available,is_promo});
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


