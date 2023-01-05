import express from "express";
import {addCountry,getCountries, getCountryById, remove, update} from "../controllers/country.controller.js"
import {body} from 'express-validator'
import { validationResultExpress } from "../middlewares/validationResultExpress.js";


const router = express.Router();

//GET           "/api/v1/countries/all"      all countries
//GET           "/api/v1/countries/:id"      single country
//POST          "/api/v1/countries/add"      create country
//DELETE        "/api/v1/countries/:id"      remove country
//PATCH/PUT     "/api/v1/countries/:id"      update country

router.post("/add",[
    body('name', "Nombre no valido").trim().isLength({ min:4})],
    validationResultExpress,
    addCountry
);
router.get("/all",getCountries);
router.get("/:id",getCountryById);
router.delete("/:id",remove);
router.patch("/:id",[
    body('name', "Nombre no valido").trim().isLength({ min:4})],
    validationResultExpress,
    update
);

export default router;