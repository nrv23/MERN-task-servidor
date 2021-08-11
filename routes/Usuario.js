const { agregarUsuario,obtenerUsuarioAutenticado } = require("../controllers/UsuarioController");
const router = require("express").Router();
const {check} = require("express-validator");
const validarToken = require("../middleware/auth");

module.exports = () => {

    router.post('/usuario',
        [
            check('nombre','El nombre es obligatorio').not().isEmpty(),
            check('email','Agrega un email válido').isEmail(),
            check('password','La contraseña debe contener al menos 6 caracteres').isLength({min: 6}),
        ]
        ,agregarUsuario);
    router.get('/usuario',
        validarToken,
        obtenerUsuarioAutenticado
    )

    return router;
}