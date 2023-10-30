const { Router } = require('express');
const { check } = require('express-validator');


const { obtenerProductos,crearProducto,productoDelete, productoPatch } = require('../controllers/productos.js');
const { esRoleValido,verificarEmail,existeProducto,existeUsuarioPorID, existeProductoPorID } = require('../helpers/db-validators');
const {validarCampos,validarJWT,esAdmin,tieneRole} = require('../middlewares/index')


const router = Router();


//[check('/','Ingrese un numero').isNumeric(),validarCampos],

router.get('/',obtenerProductos)


// router.put('/:id',[
//     check('id','No es in ID valido').isMongoId(),
//     check('id').custom(existeproductoPorID),
//     check('rol').custom( esRoleValido ),
//     validarCampos
// ],productoPut)



router.post('/',[
    validarJWT,
    tieneRole('ADMIN_ROLE'),
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