const { response } = require("express")
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/user');
const { generarJWT } = require("../helpers/generarjwt");


const login = async(req,res = response)=>{

    const {correo,password} = req.body;

    try {
        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: ' Usuario / password no son correctos - correo'
            })
        }

        //Si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: ' Usuario / password no son correctos - estado'
            })
        }

        //Verificar la contraña 
        const validPassword = bcryptjs.compareSync( password , usuario.password);
        if( !validPassword ){
            return res.status(400).json({
                msg: ' Usuario / password no son correctos - password'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id)
        // const token = await generarJWT( usuario.id );
        res.json({
            usuario,
            token
        })
    } catch (err) {
        console.log(err)
         res.status(500).json({
            msg:'Hable con el administrador'
        })  
    }
}


module.exports = {
    login
}