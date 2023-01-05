import express from "express";
import {body} from 'express-validator'
import { addRole,getRoles,getRoleById,removeRole,updateRole } from "../controllers/role.controller.js";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";

const router = express.Router();

//GET           "/api/v1/roles/all"      all countries
//GET           "/api/v1/roles/:id"      single country
//POST          "/api/v1/roles/add"      create country
//DELETE        "/api/v1/roles/:id"      remove country
//PATCH/PUT     "/api/v1/roles/:id"      update country


router.post("/add",[
    body('name', "Nombre no valido").trim().isLength({ min:4})],
    validationResultExpress,
    addRole
);
router.get("/all",getRoles);
router.get("/:id",getRoleById);
router.delete("/:id",removeRole);
router.patch("/:id",[
    body('name', "Nombre no valido").trim().isLength({ min:4})],
    validationResultExpress,
    updateRole
);

export default router;