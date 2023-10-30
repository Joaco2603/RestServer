const { response, request } = require("express");
const { Categoria } = require('../models');


//ObtenerCategorias - paginado - total 
const obtenerCategorias = async(req=request,res=response)=>{

    const { limite = 5, desde = 0 } = req.query; 


    const [total,categoria] = await Promise.all([
        Categoria.countDocuments({ estado: true }),
        Categoria.find({ estado: true })
            .populate('usuario','nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.status(200).json({
        total,
        categoria
    })
}

//Obtener categoria por ID
const obtenerCategoriaPorID = async(req=request,res=response)=>{
    
    const { id } = req.params;
    const categoria = await Categoria.findById(id)
        .populate('usuario','nombre');

    res.json(categoria);

}


//Crear categoria
const crearCategoria = async(req = request, res = response)=>{

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        })
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );

    await categoria.save();

    res.status(201).json(categoria);

}


const actualizarCategoria = async(req,res=response)=>{

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id,data,{new:true});

    res.status(201).json(categoria);

}


const eliminarCategoria = async(req,res=response)=>{

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    
    const categoria = await Categoria.findByIdAndUpdate(id,{estado:false},{new: true});

    res.status(201).json(categoria);

}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaPorID,
    actualizarCategoria,
    eliminarCategoria
}