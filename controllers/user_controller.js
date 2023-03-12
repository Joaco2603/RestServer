
const { response, request } = require('express');


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

const usuarioPost = (req,res = response)=>{

    const {nombre, edad} = req.body;

    res.json({
        msg: 'post controller',
        nombre,
        edad
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