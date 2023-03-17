
const { response, request } = require('express');
const Usuario = require('../models/user');
const encriptado = require('bcryptjs');


const usuarioGet = (req = request,res = response)=>{

    const {q,nombre,apkey} = req.query;

    res.json({
        msg: 'get controller',
        q,nombre,apkey
    })
}

const usuarioPut = (req,res = response)=>{

    //const {id} = req.parmas

    const id = req.params.id;

    res.json({
        msg: 'put controller',
        id
    })
}

const usuarioPost = async(req,res = response)=>{

    // const {nombre, edad} = req.body;
    // const {nombre, ...resto} = req.body;
    const { nombre,correo,password,rol} = req.body;
    const usuario = new Usuario( {nombre,correo,password,rol} );
    await usuario.save();

    res.json({
        msg: 'post controller',
        usuario
    })
}

const usuarioDelete = (req,res = response)=>{
    res.json({
        msg: 'delete controller'
    })
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