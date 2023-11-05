const { Router } = require('express');
const { buscar, 
    buscarUsuarioPorId } = require('../controllers/buscar')
const { check, checkSchema } = require('express-validator');
const { validarCampos } = require('../middlewares');
const { existeColeccion } = require('../helpers/db-validators');

const router = Router();

router.get('/:coleccion/:termino',[
    check('coleccion').custom(existeColeccion),
    validarCampos
], buscar)

router.get('/Id/:coleccion/:termino',[
    check('coleccion').custom(existeColeccion),
    check('termino','No es un Id de mongo Valido').isMongoId(),
    validarCampos
],buscarUsuarioPorId)


module.exports = router;