
const Role = require('../models/role')
const Usuario = require('../models/user');

const esRoleValido = async(rol='') =>{
    const existeRol = await Role.findOne({rol});
    if( !existeRol ){
        throw new Error(`El rol ${rol} no esta regitrado en la base de datos`)
    }
}

//Verificar si el correo ya existe

const verificarEmail = async(correo='')=>{
        const existeEmail = await Usuario.findOne({correo});
        if( existeEmail ){
        // return res.status(400).json({
        //     err: "El correo ya esta registrado"
        // })
        throw new Error(`El correo:${correo} ya esta registrado`)
    }
}


//Verificar si el ID exite


const existeUsuarioPorID = async(id)=>{
    const existeID = await Usuario.findById(id);
    if( !existeID ){
    // return res.status(400).json({
    //     err: "El correo ya esta registrado"
    // })
    throw new Error(`El id:${id} no existe`)
    }
}



module.exports = {
    esRoleValido,
    verificarEmail,
    existeUsuarioPorID
}