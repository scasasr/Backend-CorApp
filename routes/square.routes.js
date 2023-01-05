import express from "express";
import {body} from 'express-validator';
import { addSquare, getAllByCityId, getBySquareId, removeSquare, updateSquare } from "../controllers/square.controller.js";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";

const router = express.Router();

//GET           "/api/v1/squares/:cid"     all squares by city
//GET           "/api/v1/squares/:id"      single square
//POST          "/api/v1/squares/add"      create square
//DELETE        "/api/v1/squares/:id"      remove square
//PATCH/PUT     "/api/v1/squares/:id"      update square

router.get("/all/:cid",getAllByCityId);
router.get("/:id",getBySquareId);
router.post("/add",[
    body('name', "Nombre no valido").trim().isLength({ min:4})],
    validationResultExpress,
    addSquare
);
router.delete("/:id",removeSquare);
router.patch("/:id",[
    body('name', "Nombre no valido").trim().isLength({ min:4})],
    validationResultExpress,
    updateSquare
);

export default router;