const { response } = require('express');
const Colecciones = require('../models');

const existeColeccion = async(coleccion)=>
{
    
    coleccion = coleccion[0].toUpperCase() + coleccion.slice(1);

    const coleccionEncontrada = ColeccionesEntrantesPermitidas(coleccion);

    if(!coleccionEncontrada){
        throw new Error("Esta no es una coleccion valida")
    }
}

const ColeccionesEntrantesPermitidas = (coleccion) =>
{
    const ColeccionesPermitidas = Object.keys(Colecciones);

    if(ColeccionesPermitidas.includes(coleccion)) return true;
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) =>
{
    const incluida = colecciones.includes(coleccion);
    if(!incluida)
    {
        throw new Error(`La coleccion ${coleccion} no es permitida, tiene que ser ${colecciones}`)
    }

    return true;
}


const validacionImagenIngresada = (req,res = response, next) =>
{
    if(!req.files || Object.keys(req.files).length === 0 || !req.files.archivo1)
    {
        return res.status(400).json({msg:"Falta subir el archivo"})
    }

    next();
}

module.exports={
    
    coleccionesPermitidas,
    existeColeccion,
    validacionImagenIngresada
}