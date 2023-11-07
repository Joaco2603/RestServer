
const { Router } = require('express');
const { check } = require('express-validator');
const { coleccionesPermitidas,validacionImagenIngresada  } = require('../helpers/img-validators')
const { validarCampos } = require('../middlewares/validar_campos');
const { cargarArchivo,mostrarImg,modificarArchivoCloudinary } = require('../controllers/uploads');
//modificarArchivo

const router = Router();


router.get('/:coleccion/:id',[
    check('coleccion').custom( c => coleccionesPermitidas(c,['User','Producto','user','producto'])),
    check('id','El id debe ser de mongo').isMongoId(),
],mostrarImg)

router.post('/',[
    validacionImagenIngresada,
    validarCampos
],cargarArchivo);


router.put('/:coleccion/:id',[
    validacionImagenIngresada,
    check('coleccion').custom( c => coleccionesPermitidas(c,['User','Producto','user','producto'])),
    check('id','El id debe ser de mongo').isMongoId(),
    validarCampos
],modificarArchivoCloudinary)
//modificarArchivo

module.exports = router;