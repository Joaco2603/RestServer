
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn,renovarJWT } = require('../controllers/auth_controller');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares');

const router = Router();

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password', 'La contraña es obligatoria').not().isEmpty(),
    validarCampos
],login)

router.post('/google',[
    check('id_token','El token es necesario').not().isEmpty(),
    validarCampos
],googleSignIn)


router.get('/',[
validarJWT
],renovarJWT);


module.exports = router;