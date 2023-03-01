import { Order } from "../models/Order.js";
import { Partner } from "../models/Partner.js";
import { Transaction } from "../models/Transaction.js";

export const getAllOrder = async(req,res) => {
    try{
        const orders = await Order.find();
        return res.json(orders);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"});
    }

}

export const getAllOrderByBuyer = async(req,res) => {
    try{
        const partner = await Partner.findById(req.params.id)
        if (!partner)return res.status(404).json({error:"No existe un usuario con este id"}); 

        const orders = await Order.find({buyer:req.params.id});
        return res.status(201).json(orders);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"});
    }
    
}


export const getOrderById = async(req,res) => {
    try{ 
        const order= await Order.findById(req.params.id)
        if (!order)return res.status(404).json({error:"No existe una orden con este id"}); 
        return res.json(order);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }

    
}


export const addOrder = async(req,res) => {
    const {buyer,address,latitude,longitude,details,transaction,products,total} = req.body
 
    try{
        
        let user = await Partner.findById(buyer);
        if (!user)return res.status(404).json({error:"No existe un usuario con este id"});

        let trans = await Transaction.findById(transaction);
        if (!trans){
            transaction = "0000000000";
            var transactionState = "0";
        }else{
            var transactionState = trans.state; 
        }

        let order= new Order({buyer,address,latitude,longitude,details,transaction,transactionState,products,total});
        await order.save();

        return res.status(201).json(order._id);
        
    }catch(error){
        console.log(error);        
        return res.status(500).json({error: "Error de servidor"});
    }

    
}


export const removeOrder = async(req,res) => {
    try{ 
        const order = await Order.findById(req.params.id)
        if (!order )return res.status(404).json({error:"No existe una categoria con este id"}); 
        await order.remove();
        return res.status(201).json(order);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }

    
}

export const updateOrder = () => {
    console.log({update:true})
    
}