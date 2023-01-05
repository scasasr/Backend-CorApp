import express from "express";
import { addProduct,getProducts,getProductById,removeProduct,updateProduct } from "../controllers/product.controller.js";
import {body} from 'express-validator'
import { validationResultExpress } from "../middlewares/validationResultExpress.js";


const router = express.Router();

//GET           "/api/v1/products/all"      all products
//GET           "/api/v1/products/:id"      single product
//POST          "/api/v1/products/add"      create product
//DELETE        "/api/v1/products/:id"      remove product
//PATCH/PUT     "/api/v1/products/:id"      update product

router.post("/add",[
    body('name', "Nombre no valido").trim().isLength({ min:2})],
    validationResultExpress,
    addProduct
);
router.get("/all",getProducts);
router.get("/:id",getProductById);
router.delete("/:id",removeProduct);
router.patch("/:id",[
    body('name', "Nombre no valido").trim().isLength({ min:2})],
    validationResultExpress,
    updateProduct
);

export default router;