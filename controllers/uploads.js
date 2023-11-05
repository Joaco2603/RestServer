const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const path = require('path');


const cargarArchivo = (req,res = response)=>
{

    if(!req.files || Object.keys(req.files).length === 0 || !req.files.archivo1)
    {
        res.status(400).json({msg:"Falta subir el archivo"})
        return;
    }

    const { archivo1 } = req.files;

    const nombreCortado = archivo1.name.split('.');
    const extension = nombreCortado[nombreCortado.length-1];

    //Validar la extension
    const extensionesValidas = ['png','jpg','jpeg']

    if(!extensionesValidas.includes(extension))
    {
        return res.status(400).json({
            msg: `La extension ${extension} no es permitida`
        })
    }

    const nombreTemp = uuidv4() + '.' + extension;
    const uploadPath = path.join(__dirname,'../uploads/',nombreTemp)
   

    archivo1.mv(uploadPath, (err)=>{
        if(err){
            return res.status(500).json({err});
        }

        res.json({msg:'File uploaded to ' + uploadPath});
    })
}


module.exports = {
    cargarArchivo
}