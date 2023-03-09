import express from "express";
import { getAllTransaction,getTransactionById,addTransaction,addTuCompraData,removeTransaction,updateTransaction } from "../controllers/transaction.controller.js";
import {body} from 'express-validator';
import { validationResultExpress } from "../middlewares/validationResultExpress.js";


//GET           "/api/v1/transactions/all"      all transactions
//GET           "/api/v1/transactions/:id"      single transaction by id
//POST          "/api/v1/transactions/add"      create transaction
//POST          "/api/v1/transactions/TuCompra" add TuCompra response 
//DELETE        "/api/v1/transactions/:id"      remove transaction
//PATCH/PUT     "/api/v1/transactions/:id"      update transaction


const router = express.Router();

router.get('/all',getAllTransaction);
router.get('/:id',getTransactionById);
router.post('/add', addTransaction);
router.post('/Tucompra', addTuCompraData);
router.delete('/:id',removeTransaction);
router.patch('/:id',updateTransaction);

export default router;