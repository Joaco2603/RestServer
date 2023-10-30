const { response, request } = require("express");
const { Producto } = require('../models');


//ObtenerProductos - paginado - total 
const obtenerProductos = async(req=request,res=response)=>{

    const { limite = 5, desde = 0 } = req.query; 


    const [total,producto] = await Promise.all([
        Producto.countDocuments({ estado: true }),
        Producto.find({ estado: true })
            .populate('usuario','nombre')
            .populate('categoria','nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.status(200).json({
        total,
        producto
    })
}

//Obtener Producto por ID
const obtenerProductoPorID = async(req=request,res=response)=>{
    
    const { id } = req.params;
    const Producto = await Producto.findById(id)
        .populate('usuario','nombre');

    res.json(Producto);

}


//Crear Producto
const crearProducto = async(req = request, res = response)=>{

    const nombre = req.body.nombre.toUpperCase();

    const ProductoDB = await Producto.findOne({ nombre });

    if(ProductoDB){
        return res.status(400).json({
            msg: `El Producto ${ProductoDB.nombre} ya existe`
        })
    }

    const {...data} = req.body;

    const producto = new Producto( data );

    await producto.save();

    res.status(201).json(producto);

}


const actualizarProducto = async(req,res=response)=>{

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const Producto = await Producto.findByIdAndUpdate(id,data,{new:true});

    res.status(201).json(Producto);

}


const productoDelete = async(req,res=response)=>{

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    
    const producto = await Producto.findByIdAndUpdate(id,{estado:false},{new: true});

    res.status(201).json(producto);

}


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorID,
    actualizarProducto,
    productoDelete
}