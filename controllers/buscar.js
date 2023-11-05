const { response } = require('express');
const Colecciones = require('../models');



const buscarUsuarioPorId = async(req = '',res = response)=>
{

    let {coleccion, termino} = req.params;
    let usuarioBusqueda;

    coleccion = coleccion[0].toUpperCase() + coleccion.slice(1);


    switch (coleccion) {
        case "Producto":
                usuarioBusqueda = await Colecciones[coleccion].findById(termino).populate('usuario','nombre').populate('categoria','nombre').exec();
            break;
        case "Categoria":
                usuarioBusqueda = await Colecciones[coleccion].findById(termino).populate('usuario','nombre');
            break;
        case "Roles":
            usuarioBusqueda = "ADMIN_ROLE o USER_ROLE"
            break;
        case "User":
            usuarioBusqueda = await Colecciones[coleccion].findById(termino);
            break;
        default:
            break;
    }

    if(usuarioBusqueda == null)
    {
        return res.status(401).json({
            "Usuario":"Este producto o usuario no existe"
        })
    }

    return res.status(200).json({
        usuarioBusqueda
    })
}



const buscar = async(req = '',res = response)=>{

    let {coleccion,termino} = req.params;

    coleccion = coleccion[0].toUpperCase() + coleccion.slice(1);
    termino = termino.toUpperCase();


    const usuario = await Colecciones[coleccion].find({nombre:termino});

    if (!Array.isArray(usuario) || usuario.length === 0) {
        // Si 'usuario' no es un arreglo o está vacío, retorna un error 401
        return res.status(401).json({
            "error": "No existe este producto o usuario"
        });
    }

    res.status(201).json({
        usuario
    })

}

module.exports = {
    buscar,
    buscarUsuarioPorId
}