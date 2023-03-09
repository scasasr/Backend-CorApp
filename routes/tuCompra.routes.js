import express from "express";

import {body} from 'express-validator';
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import { OpenURL,addData} from "../controllers/tuCompra.controller.js";
//POST          "/api/v1/testPagos/add"   



const router = express.Router();

// router.get('/all',getAllCategory);
// router.get('/:id',getCategoryById);
router.post('/TuCompra',OpenURL);
router.post('/Pagos',addData);
// router.delete('/:id',removeCategory);
// router.patch('/:id',[
//     body('name', "Nombre no valido").trim().isLength({ min:4})],
//     validationResultExpress,
//     updateCategory);

export default router;