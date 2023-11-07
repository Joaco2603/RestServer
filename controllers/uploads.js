const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const fs = require('fs');
const path = require('path');

const colecciones = require('../models');

const cargarArchivo = async(req,res = response)=>
{
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

// const modificarArchivo = async(req,res = response)=>
// {
//     const { id,coleccion } = req.params;
//     const coleccionCapitalizada = coleccion.charAt(0).toUpperCase() + coleccion.slice(1);
    
//     const modelo = await colecciones[coleccionCapitalizada].findById(id);
//         if(!modelo)
//         {
//             return res.status(400).json({
//                 msg:"No existe este usuario o producto en base de datos"
//             })
//         }


//     //Limpiar imagenes previas

//     if( modelo.img )
//     {
//         //Borrar imagen del servidor
//         const pathImagen = path.join( __dirname, '../uploads' , coleccion, modelo.img );
//         if(fs.existsSync( pathImagen ))
//         {
//             fs.unlinkSync( pathImagen )
//         }
//     }


//     const nombre = await subirArchivo( req.files, coleccion );
//     modelo.img = nombre;

//     await modelo.save();

//     res.json({ id,coleccion,modelo });
// }


const mostrarImg = async(req,res = response)=>
{ 
    const { id,coleccion } = req.params;
    const coleccionCapitalizada = coleccion.charAt(0).toUpperCase() + coleccion.slice(1);
    
    const modelo = await colecciones[coleccionCapitalizada].findById(id);
        if(!modelo)
        {
            return res.status(400).json({
                msg:"No existe este usuario o producto en base de datos"
            })
        }

    //Limpiar imagenes previas

    if( modelo.img )
    {
        //Ver imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads' , coleccion, modelo.img );
        if(fs.existsSync( pathImagen ))
        {
            return res.sendFile( pathImagen );
        }
    }

    const pathImagen = path.join(__dirname, '../assets','no-image.jpg')

    res.sendFile( pathImagen );
}

const modificarArchivoCloudinary = async(req,res = response)=>
{
    const { id,coleccion } = req.params;
    const coleccionCapitalizada = coleccion.charAt(0).toUpperCase() + coleccion.slice(1);
    
    const modelo = await colecciones[coleccionCapitalizada].findById(id);
        if(!modelo)
        {
            return res.status(400).json({
                msg:"No existe este usuario o producto en base de datos"
            })
        }


    //Limpiar imagenes previas

    if( modelo.img )
    {
        const nombreArr = modelo.img.split('/');
        const nombre    = nombreArr[ nombreArr.length - 1]

        const [ public_id ] = nombre.split('.');

        await cloudinary.uploader.destroy(public_id)
    }

    const { tempFilePath } = req.files.archivo1;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    modelo.img = secure_url;
    
    await modelo.save();

    res.json( modelo );
}

module.exports = {
    cargarArchivo,
    // modificarArchivo,
    mostrarImg,
    modificarArchivoCloudinary
}