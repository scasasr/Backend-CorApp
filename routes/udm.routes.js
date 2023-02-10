import express from "express";
import { addUdm, getAllUdm, getUdmById, removeUdm, updateUdm } from "../controllers/udm.controller.js";
import {body} from 'express-validator';
import { validationResultExpress } from "../middlewares/validationResultExpress.js";

//GET           "/api/v1/udm/all"    all udm
//GET           "/api/v1/udm/:id"   single Udm
//POST          "/api/v1/udm/add"   create Udm
//DELETE        "/api/v1/udm/:id"   remove Udm
//PATCH/PUT     "/api/v1/udm/:id"   update Udm


const router = express.Router();

router.get('/all',getAllUdm);
router.get('/:id',getUdmById);
router.post('/add',[
    body('name', "Nombre no valido").trim().isLength({ min:4})],
    validationResultExpress,
    addUdm);
router.delete('/:id',removeUdm);
router.patch('/:id',[
    body('name', "Nombre no valido").trim().isLength({ min:4})],
    validationResultExpress,
    updateUdm);

export default router;
