const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const Colecciones = require('../models');



const ColeccionesEntrantesPermitidas = (coleccion) =>
{
    const ColeccionesPermitidas = Object.keys(Colecciones);

    if(ColeccionesPermitidas.includes(coleccion)) return true;
}


const buscar = (req,res = response)=>{

    let {coleccion,termino} = req.params;

    coleccion = coleccion[0].toUpperCase() + coleccion.slice(1);
    termino = termino[0].toUpperCase() + termino.slice(1);

    const coleccionEncontrada = ColeccionesEntrantesPermitidas(coleccion);

    if(!coleccionEncontrada){
        return res.status(400).json({
            "No existe la coleccion":coleccion
        })
    }

    res.status(201).json({
        coleccion,
        termino
    })

}

module.exports = {
    buscar
}