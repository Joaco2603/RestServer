
const Role = require('../models/role')


const esRoleValido = async(rol='') =>{
    const existeRol = await Role.findOne({rol});
    if( !existeRol ){
        throw new Error(`El rol ${rol} no esta regitrado en la base de datos`)
    }
}



module.exports = {
    esRoleValido
}