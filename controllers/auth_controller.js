const { response } = require("express")
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/user');
const { generarJWT } = require("../helpers/generarjwt");
const { googleVerify } = require("../helpers/google-verify");


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


const googleSignIn = async(req,res=response) =>{
    
    const {id_token}= req.body;

    try {
        const {nombre,img,correo} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});


        if(!usuario){
            //Tengo que crearlo
            const data = {
                nombre,
                correo,
                password:':P',
                img,
                google:true,
                rol:'USER_ROLE'
            }
            usuario = new Usuario( data );
            await usuario.save();
        }
        //Si el usuario en DB
        if(!usuario.estado){
            return res.status(401).json({
                msg:'Hable con el administrador, usuario bloqueado'
            })
        }

        //Generar JWT
        const token = await generarJWT(usuario.id)


        res.json({
            msg:'Todo bien',
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok:false,
            msg:'El token no se pudo verificar'
        })
    }

}

const renovarJWT = async( req, res = response ) =>{

    const { usuario } = req;

    // Generar el JWT
    const token = await generarJWT( usuario.id );

    res.json({
        usuario,
        token
    })
}


module.exports = {
    login,
    googleSignIn,
    renovarJWT
}