const { Router } = require('express');
const { check, checkSchema } = require('express-validator');

const { validarCampos, validarJWT, esAdmin } = require('../middlewares');
const { crearCategoria, obtenerCategorias, obtenerCategoriaPorID, actualizarCategoria, eliminarCategoria } = require('../controllers/categorias');
const { existeCategoria, esRoleValido } = require('../helpers/db-validators');

const router = Router();

//Obtener todas las categorias
router.get('/',obtenerCategorias)


//Obtener una categoria por id - publico
router.get('/:id',[
    check('id','No es un Id de mongo Valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],obtenerCategoriaPorID)


//Crear categoria - privado - cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)


//Actualizar - privado - cualquiera con token valido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoria),
    validarCampos
],actualizarCategoria)

//Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdmin,
    check('id','No es un Id de mongo Valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],eliminarCategoria)


module.exports = router;