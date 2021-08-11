const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");

const autenticarUsuario = async (req,res) => {

    try {

        const errores = validationResult(req); // aqui lee los campos de la peticion

        if(!errores.isEmpty()){//sino viene vacío

            return res.status(400).json({
                errores: errores.array()
            })
        }

        const {email, password} = req.body;

        let usuario = await Usuario.findOne({email});

        if(!usuario) return res.status(404).json({
            msg: 'Email no encontrado'
        });

        const passCorrecto = await bcryptjs.compare(password, usuario.password);

        if(passCorrecto) {

            const payload = {
                usuario: {
                    id: usuario._id,
                    nombre: usuario.nombre,
                    email: usuario.email
                }
            }

            jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn: '1h'
            },(err,token) => {

                if(err) {
                    throw err;
                }

                res.status(200).json({
                   token
                })
            })
        } else {
            res.status(400).json({
                msg: 'Email o password incorrectos'
            })  
        }

    } catch (error) {
     console.log(error);
     res.status(500).json({
         msg: 'Error al autenticar el usuario'
     })   
    }
}

module.exports = {
    autenticarUsuario
}