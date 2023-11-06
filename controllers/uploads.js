const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");


const cargarArchivo = async(req,res = response)=>
{

    if(!req.files || Object.keys(req.files).length === 0 || !req.files.archivo1)
    {
        res.status(400).json({msg:"Falta subir el archivo"})
        return;
    }

    try
    {
        // const nombre = await subirArchivo( req.files,'textos' );
        const nombre = await subirArchivo( req.files );

        res.status(200).json({
            nombre 
        })
    }catch(msg)
    {
        res.status(400).json({
            msg
        })
    }
}


module.exports = {
    cargarArchivo
}