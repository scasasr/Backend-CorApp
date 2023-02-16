import { Transaction } from "../models/Transaction.js";


 export const getAllTransaction = async(req, res) =>{
    try{
        const transactions = await Transaction.find();
        return res.json(transactions);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"});
    }

 }

 export const getTransactionById = async (req, res) =>{
    try{ 
        const transaction = await Transaction.findById(req.params.id)
        if (!transaction)return res.status(404).json({error:"No existe registro de una transacción con este id"}); 
        return res.json(transaction);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }
 }

 export const addTransaction = () =>{
    console.log({Add:true})
 }

 export const addTuCompraData = async (req, res) =>{
    console.log(req.body)
    return res.status(201)
    
 }

 export const removeTransaction= async (req,res) =>{
    try{ 
        const transaction = await Transaction.findById(req.params.id)
        if (!transaction )return res.status(404).json({error:"No existe registro de una transacción con este id"}); 
        await transaction .remove();
        return res.status(201).json(transaction);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }
    
 }

 export const updateTransaction= () =>{
    console.log({update:true})
 }