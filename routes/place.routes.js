import express from "express";
import {body} from 'express-validator';
import {getAllPlaces,getAllByWarehouseId,getAllByPartnerId,getByPlaceId,addPlace,removePlace,updatePlace } from "../controllers/place.controller.js";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";

const router = express.Router();

//GET           "/api/v1/places/all"                  all places 
//GET           "/api/v1/places/all/warehouse/:wid"   all places by warehouse
//GET           "/api/v1/places/all/partner/:pid"     all places by partner0
//GET           "/api/v1/places/:id"                  single place
//POST          "/api/v1/places/add"                  create place
//DELETE        "/api/v1/places/:id"                  remove place
//PATCH/PUT     "/api/v1/places/:id"                  update place

router.get("/all",getAllPlaces);
router.get("/all/warehouse/:wid",getAllByWarehouseId);
router.get("/all/partner/:pid",getAllByPartnerId);
router.get("/:id",getByPlaceId);
router.post("/add",[
    body('name', "Nombre no valido").trim().isLength({ min:4})],
    validationResultExpress,
    addPlace
);
router.delete("/:id",removePlace);
router.patch("/:id",[
    body('name', "Nombre no valido").trim().isLength({ min:4})],
    validationResultExpress,
    updatePlace
);

export default router;