import express from "express";
import { addQuality, getAllQuality, getQualityById, removeQuality, updateQuality } from "../controllers/quality.controller.js";
import {body} from 'express-validator';
import { validationResultExpress } from "../middlewares/validationResultExpress.js";

//GET           "/api/v1/qualities/all"    all qualities
//GET           "/api/v1qualities/:id"   single quality
//POST          "/api/v1/qualities/add"   create quality
//DELETE        "/api/v1/qualities/:id"   remove quality
//PATCH/PUT     "/api/v1/qualities/:id"   update quality


const router = express.Router();

router.get('/all',getAllQuality);
router.get('/:id',getQualityById);
router.post('/add',[
    body('name', "Nombre no valido").trim().isLength({ min:4})],
    validationResultExpress,
    addQuality);
router.delete('/:id',removeQuality);
router.patch('/:id',[
    body('name', "Nombre no valido").trim().isLength({ min:4})],
    validationResultExpress,
    updateQuality);

export default router;
