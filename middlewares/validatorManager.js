import {param} from 'express-validator'
import { validationResultExpress } from "./validationResultExpress.js";

export const paramValidator = [
    param("_id", "Formato no valido (expressValidator)")
    .trim()
    .notEmpty()
    .escape(),
    validationResultExpress
]