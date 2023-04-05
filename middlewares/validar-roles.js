const { response, request } = require("express");
const role = require("../models/role");


const esAdmin = (req=request,res=response,next)=>{
    
     if( !req.usuario ){
        return res.status(500).json({
            msg:'Se quiere verificar el role sin validar el token'
        })
     }

     const {rol,nombre} = req.usuario;

     if( rol!== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg:'No eres administrador'
        })
     }

    next();
}


const tieneRole = (...roles)=>{
    return (req=request,res=response,next)=>{

        if( !req.usuario ){
            return res.status(500).json({
                msg:'Se quiere verificar el role sin validar el token'
            })
         }


        if( !roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg:'Se requiere un rol valido'
            })
        }

        next();
    }
}

module.exports = {
    esAdmin,
    tieneRole
}