import express from "express";
import { getAllOrder,getAllOrderByBuyer,getOrderById,addOrder,removeOrder,updateOrder } from "../controllers/order.controller.js";
import {body} from 'express-validator';
import { validationResultExpress } from "../middlewares/validationResultExpress.js";


//GET           "/api/v1/orders/all"      all orders
//GET           "/api/v1/orders/all/:id"  all orders by buyer
//GET           "/api/v1/orders/:id"      single order by id
//POST          "/api/v1/orders/add"      create order
//DELETE        "/api/v1/orders/:id"      remove order
//PATCH/PUT     "/api/v1/orders/:id"      update order


const router = express.Router();

router.get('/all',getAllOrder);
router.get('/all/:id',getAllOrderByBuyer);
router.get('/:id',getOrderById);
router.post('/add', addOrder);
router.delete('/:id',removeOrder);
router.patch('/:id',updateOrder);

export default router;