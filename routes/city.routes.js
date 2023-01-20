import express from "express";
import { addCity, getAllCities, getByCityId, getAllByCountryId, removeCity, updateCity } from "../controllers/city.controller.js";
import {body} from 'express-validator';
import { validationResultExpress } from "../middlewares/validationResultExpress.js";

const router = express.Router();

//GET           "/api/v1/countries/:cid"     all cities by country
//GET           "/api/v1/countries/:id"      single city
//POST          "/api/v1/countries/add"      create city
//DELETE        "/api/v1/countries/:id"      remove city
//PATCH/PUT     "/api/v1/countries/:id"      update city

router.get("/all",getAllCities);
router.get("/all/:cid",getAllByCountryId);
router.get("/:id",getByCityId);
router.post("/add",[
    body('name', "Nombre no valido").trim().isLength({ min:4})],
    validationResultExpress,
    addCity
);
router.delete("/:id",removeCity);
router.patch("/:id",[
    body('name', "Nombre no valido").trim().isLength({ min:4})],
    validationResultExpress,
    updateCity
);

export default router;