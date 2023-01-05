import {Role} from "../models/Role.js"


export const addRole = async(req, res) =>{
    const {name,code} = req.body
    try{
        
        let role = await Role.findOne({name});
        if(role) throw{code: 11000};

        role = new Role({name,code});
        await role.save();


        return res.status(201).json({ ok:true});
        

    }catch(error){
        console.log(error);
        if(error.code === 11000){
            return res.status(400).json({error: "Ya existe este role"});
        }
        
        return res.status(500).json({error: "Error de servidor"});
    }
};

export const getRoles = async (req, res) =>{
    try{
        const roles = await Role.find()
        return res.json(roles);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"});
    }
    
};

export const getRoleById =async (req,res) => {
    try{ 
        const role = await Role.findById(req.params.id)
        if (!role)return res.status(404).json({error:"No existe un role con este id"}); 
        return res.json(role);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }
};

export const removeRole = async (req, res) => {
    try{ 
        const role = await Role.findById(req.params.id)
        if (!role)return res.status(404).json({error:"No existe un role con este id"}); 
        await role.remove();
        return res.json(role);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Error de servidor"}); 
    }
}; 

export const updateRole = async (req, res) =>{
    try{ 
        //Agregar verificacion de nombre en el cambio de nombre de documento
        const role= await Role.findById(req.params.id);
        const {name} = req.body;
        if (!role)return res.status(404).json({error:"No existe un role con este id"}); 
        //actualizar nombre 
        role.name = name;
        role.save();
        return res.json(role);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Error de servidor"}); 
    }
};
