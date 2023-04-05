
const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/user')

const validarJWT = async( req=request,res=response,next)=>{

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        })
    }
    try{
        
        const {uid} = jwt.verify(token,process.env.SECRECTPROVATEKEY);

        //Leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg: 'Usuario eliminado'
            })
        }

        //Verificar si el uid tiene estado en tr
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Usuario eliminado'
            })
        }



        req.usuario = usuario;
        next();
    }catch(err){
        console.log(err)
        res.status(401).json({
            msg:'No hay token en la peticion'
        })
    }
    

}


module.exports = {
    validarJWT
}