

const { Router } = require('express');
const { check } = require('express-validator');


const { usuarioGet,usuarioPut,usuarioPost,usuarioDelete, usuarioPatch } = require('../controllers/user_controller');
const { esRoleValido,verificarEmail,existeUsuarioPorID } = require('../helpers/db-validators');


// const { validarCampos } = require('../middlewares/validar_campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdmin,tieneRole } = require('../middlewares/validar-roles');

const {validarCampos,validarJWT,esAdmin,tieneRole} = require('../middlewares/index')


const router = Router();


//[check('/','Ingrese un numero').isNumeric(),validarCampos],

router.get('/',usuarioGet)


router.put('/:id',[
    check('id','No es in ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    check('rol').custom( esRoleValido ),
    validarCampos
],usuarioPut)



router.post('/',[
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    check('password', "Es obligatorio y debe tener 6 caracteres").isLength({min:6}),
    // check('correo', "El correo no es valido").isEmail(),
    check('correo').custom( verificarEmail ),
    // check('rol',"No es un rol permitido").isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos
],usuarioPost)


router.delete('/:id',[
    validarJWT,
    // esAdmin,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos
],usuarioDelete)


router.patch('/',[
    check('id','No es in ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos
],usuarioPatch)


module.exports = router;