const { v4: uuidv4 } = require('uuid');
const path = require('path');

const subirArchivo = (files = '', carpeta = '', extensionesValidas = ['png','jpg','jpeg'])=>
{

    return new Promise((res,rej)=>{
        const { archivo1 } = files;

        const nombreCortado = archivo1.name.split('.');
        const extension = nombreCortado[nombreCortado.length-1];
    
        if(!extensionesValidas.includes(extension))
        {
            return rej(`La extension ${extension} no es permitida`);
        }
    
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname,'../uploads/', carpeta ,nombreTemp)
       
    
        archivo1.mv(uploadPath, (err)=>{
            if(err){
                return rej(err);
            }
            res(nombreTemp);
        })
    })
}


module.exports = {
    subirArchivo
}