import express from "express";
import { addCategory, getAllCategory, getCategoryById, removeCategory, updateCategory } from "../controllers/category.controller.js";
import {body} from 'express-validator';
import { validationResultExpress } from "../middlewares/validationResultExpress.js";

//GET           "/api/v1/categories/all"    all categories
//GET           "/api/v1/categories/:id"   single category
//POST          "/api/v1/categories/add"   create category
//DELETE        "/api/v1/categories/:id"   remove category
//PATCH/PUT     "/api/v1/categories/:id"   update category


const router = express.Router();

router.get('/all',getAllCategory);
router.get('/:id',getCategoryById);
router.post('/add',[
    body('name', "Nombre no valido").trim().isLength({ min:4})],
    validationResultExpress,
    addCategory);
router.delete('/:id',removeCategory);
router.patch('/:id',[
    body('name', "Nombre no valido").trim().isLength({ min:4})],
    validationResultExpress,
    updateCategory);

export default router;
