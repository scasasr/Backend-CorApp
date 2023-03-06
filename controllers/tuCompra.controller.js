import { TuCompra } from "../models/TuCompra.js";
import { Partner } from "../models/Partner.js";
import 'dotenv/config';
import axios from "axios";
import qs from "qs";



export const addData= async(req,res) =>{

  
    try{
        
        const tuCompra= new TuCompra(req.body);
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

    const {bill,total,description,userId,address} = req.body
    const user = Partner.findById(userId)
    // console.log(user)
    console.log(req.body)
    const document_number =user.document_number;
    const document_type = user.document_type;
    const name = user.name;
    const last_name = user.last_name;
    const email = user.email;
    const phone = user.phone
    console.log(document_number,document_type,name,last_name,email)
    var data = qs.stringify({
        'usuario':process.env.ID_TUCOMPRA,
        'factura': bill,
        'valor': total,
        'descripcionFactura': description,
        'documentoComprador':document_number,
        'tipoDocumento':document_type,
        'nombreComprador':name,
        'apellidoComprador':last_name,
        'correoComprador':email,
        'paisComprador':"Colombia",
        'direccionComprador':address,
        'celularComprador':phone

      });
      console.log(data)
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


