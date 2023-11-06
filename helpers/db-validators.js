
const Role = require('../models/role')
const Usuario = require('../models/user');
const Categoria = require('../models/categoria');
const {Producto}  = require('../models');
const Colecciones = require('../models');


const esRoleValido = async(rol='') =>{
    const existeRol = await Role.findOne({rol});
    if( !existeRol ){
        throw new Error(`El rol ${rol} no esta regitrado en la base de datos`)
    }
}

//Verificar si el correo ya existe

const verificarEmail = async(correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo:${correo} ya está registrado`);
    }
}



//Verificar si el ID exite


const existeUsuarioPorID = async(id)=>{
    const existeID = await Usuario.findById(id);
    if( !existeID ){
    throw new Error(`El id:${id} no existe`)
    }
}


const existeProductoPorID = async(id)=>{
    const existeID = await Producto.findById(id);
    if( !existeID ){
    throw new Error(`El id:${id} no existe`)
    }
}



const existeCategoria = async(id)=>{

    const existeCategoria = await Categoria.findById(id)
    if(!existeCategoria){
        throw new Error(`Este id no es valido`);
    } 
}

const existeProducto = async(nombre='')=>{
    const existeProducto = await Producto.findOne({nombre})
    if(existeProducto){
        throw new Error(`Este producto ya fue asignado`);
    } 
}


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


module.exports = {
    esRoleValido,
    verificarEmail,
    existeUsuarioPorID,
    existeCategoria,
    existeProducto,
    existeProductoPorID,
    existeColeccion,
    coleccionesPermitidas
}