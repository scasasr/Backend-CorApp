import express from "express";
import {body} from 'express-validator';
import {getAllWarehouse,getAllBySquareId,getByWarehouseId,addWarehouse,removeWarehouse,updateWarehouse} from "../controllers/warehouse.controller.js"


const router = express.Router();

//GET           "/api/v1/warehouses/:cid"     all warehouses by square
//GET           "/api/v1/warehouses/:id"      single warehouse
//POST          "/api/v1/warehouses/add"      create warehouse
//DELETE        "/api/v1/warehouses/:id"      remove warehouse
//PATCH/PUT     "/api/v1/warehouses/:id"      update warehouse

router.get("/all",getAllWarehouse);
router.get("/all/:sid",getAllBySquareId);
router.get("/:id",getByWarehouseId);
router.post("/add",addWarehouse);
router.delete("/:id",removeWarehouse);
router.patch("/:id", updateWarehouse);

export default router;