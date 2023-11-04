const { Router } = require('express');
const { check } = require('express-validator');


const { obtenerProductos,crearProducto,productoDelete, productoPut } = require('../controllers/productos.js');
const { existeProducto, existeProductoPorID } = require('../helpers/db-validators');
const {validarCampos,validarJWT,tieneRole} = require('../middlewares/index')


const router = Router();


//[check('/','Ingrese un numero').isNumeric(),validarCampos],

router.get('/',obtenerProductos)


router.put('/:id',[
    validarJWT,
    check('id').custom( existeProductoPorID ),
    validarCampos
],productoPut)



router.post('/',[
    validarJWT,
    check('ADMIN_ROLE').custom(tieneRole),
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    check('nombre').custom(existeProducto),
    check('usuario', "Es obligatorio el id del usuario").isMongoId(),
    check('precio', "El precio debe ser un numero").isNumeric(),
    check('categoria', "Es obligatorio la categoria").isMongoId(),
    validarCampos
],crearProducto)


router.delete('/:id',[
    validarJWT,
    // esAdmin,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
],productoDelete)


// router.patch('/',[
//     check('id','No es in ID valido').isMongoId(),
//     check('id').custom(existeproductoPorID),
//     validarCampos
// ],productoPatch)



module.exports = router;