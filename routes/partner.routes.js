import express from "express";
import {body} from 'express-validator';
import { addPartner, getAllPartnerByEmail, getAllPartnerById, getAllPartners, getAllPartnersByRole, removePartner, updatePartner } from "../controllers/partner.controller.js";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";

const router = express.Router();

//GET           "/api/v1/partners/all          all partners
//GET           "/api/v1/partners/all/:rid"    all partners with the same role id
//GET           "/api/v1/partners/:id"         single partner
//GET           "/api/v1/partners/:email"      single partner
//POST          "/api/v1/partners/add"         create partner
//DELETE        "/api/v1/partners/:id"         remove partner
//PATCH/PUT     "/api/v1/partners/:id"         update partner

router.get('/all',getAllPartners);
router.get('/all/:rid',getAllPartnersByRole);
router.get('/:id',getAllPartnerById);
router.get('/email/:email',getAllPartnerByEmail);
router.post('/add',
            [body("email", "formato de email incorrecto").trim().isEmail()],
            [body("password", "formato de password incorrecto").trim().isStrongPassword()],
            // Minimum password requirements
            //     -minLengthy : 8
            //     -minLowercase : 1
            //     -minUppercase : 1
            //     -minNumber: 1
            //     -minSymbols : 1 
            validationResultExpress,
            addPartner);
router.delete('/:id',removePartner);
router.patch('/:id',updatePartner);

export default router;
