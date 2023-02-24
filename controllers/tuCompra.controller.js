import { TuCompra } from "../models/TuCompra.js";
import { Partner } from "../models/Partner.js";
import 'dotenv/config';
import axios from "axios";
import qs from "qs";



export const addData= async(req,res) =>{

    const {tuCompra} = req.body
 
    try{
        
        tuCompra= new TuCompra({json});
        await tuCompra.save();

        return res.status(201).json({ ok:true});
        
    }catch(error){
        console.log(error);
        if(error.code === 11000){
            return res.status(400).json({error: "error "});
        }
        
        return res.status(500).json({error: "Error de servidor"});
    }

}


export const OpenURL= async(req,res) =>{

    const {bill,total,description,userId} = req.body
    const user = Partner.findById(userId)
    var data = qs.stringify({
        'usuario':process.env.ID_TUCOMPRA,
        'factura': bill,
        'valor': total,
        'descripcionFactura': description,
        'documentoComprador':user.document_number,
        'tipoDocumento':user.document_type,
        'nombreComprador':user.name,
        'apellidoComprador':user.last_name,
        'correoComprador':user.email


      });
      var config = {
        method: 'post',
      maxBodyLength: Infinity,
        url: 'https://demover3-1.tucompra.net/tc3/app/inputs/compra.jsp',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        //Extracting and sending url from response 
        var re = /http([^"'\s]+)/g;//regular expression
        return res.status(200).send(response.data.match(re));
      })
      .catch(function (error) {
        console.log(error);
        return res.status(400)
      });
      

}


