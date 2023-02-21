import multer from "multer";
import storage from "../middlewares/multerConfig.js";
import express from "express";

const router = express.Router();

const uploader = multer({storage});

router.post('/uploadImages',uploader.single('file'),(req,res) =>{
    res.status(200).json({ok:true})
});

export default router;