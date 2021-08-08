const {Router} = require("express");
const router = Router();
const {check} = require("express-validator");
const { autenticarUsuario } = require("../controllers/AuthController");

module.exports = () =>  {

    router.post('/login/', [
        check('email','Agrega un email válido').isEmail(),
        check('password','La contraseña debe contener al menos 6 caracteres').isLength({min: 6})
    ],
    autenticarUsuario);

    return router;
}