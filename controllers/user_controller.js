
const { response, request } = require('express');
const Usuario = require('../models/user');
const bcryptjs = require('bcryptjs');
const { verificarEmail } = require('../helpers/db-validators');


const usuarioGet = async(req = request,res = response)=>{

    // const {q,nombre,apkey,page = 1, limit} = req.query;
    const { limite = 5, desde = 0 } = req.query; 


    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
        .skip(Number(desde))
        .limit(Number(limite))
    ])

        res.json({
            msg: 'get controller',
            total,
            usuarios
            // resp
        })
    
}

const usuarioPut = async(req,res = response)=>{

    //const {id} = req.parmas

    const {id} = req.params;
    const {_id, password, google,correo, ...resto}=req.body

    
    if( password ){
        //Hacer el hash de la contraseña o encriptarla
        const salt = bcryptjs.genSaltSync(15);
        resto.password = bcryptjs.hashSync( password ,salt )
    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto);
    
    res.json({
        msg: 'put controller',
        usuario
    })
}

const usuarioPost = async(req,res = response)=>{

    // const {nombre, edad} = req.body;
    // const {nombre, ...resto} = req.body;
    const { nombre,correo,password,rol} = req.body;
    const usuario = new Usuario( {nombre,correo,password,rol} );
    console.log(correo)
    verificarEmail(correo);

    //Hacer el hash de la contraseña o encriptarla
    const salt = bcryptjs.genSaltSync(15);
    usuario.password = bcryptjs.hashSync( password ,salt )
    

    //Guardar en DB
    await usuario.save();

    res.json({
        msg: 'post controller',
        usuario
    })
}

const usuarioDelete = async(req,res = response)=>{
    
    const { id } = req.params;
    
    //Eliminacion fisica
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});

    res.json(usuario)
}

const usuarioPatch = (req,res = response)=>{
    res.json({
        msg: 'patch controller'
    })
}


module.exports = {
    usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch
}