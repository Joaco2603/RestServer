
const { Router } = require('express');
const { check } = require('express-validator');
const { coleccionesPermitidas } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar_campos');
const { cargarArchivo,modificarArchivo } = require('../controllers/uploads');

const router = Router();

router.post('/',cargarArchivo);

router.put('/:coleccion/:id',[
    check('coleccion').custom( c => coleccionesPermitidas(c,['user','productos'])),
    check('id','El id debe ser de mongo').isMongoId(),
    validarCampos
],modificarArchivo)

module.exports = router;