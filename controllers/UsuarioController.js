const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");

const agregarUsuario = async (req,res) => {

    try {

        //validar si no hay errores 
        console.log(req.body);

        const errores = validationResult(req); // aqui lee los campos de la peticion

        if(!errores.isEmpty()){//sino viene vacío

            return res.status(400).json({
                errores: errores.array()
            })

        }

        const {body}=req;
        let usuario = Usuario.findOne({email: body.email});

        if(usuario.length > 0) return res.status(400).json({mensaje: 'EL correo ya existe'});

        usuario = new Usuario(body);

        //hashear la contraseña

        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(body.password,salt);
        const respuesta = await usuario.save();

        if(respuesta && respuesta._id ) {

            const payload = {
                usuario: {
                    id: respuesta._id,
                    nombre: respuesta.nombre,
                    email: respuesta.email
                }
            }

            jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn: '1h'
            },(err,token) => {

                if(err) {
                    throw err;
                }

                res.status(201).json({
                   token
                })
            })

           
        } else {
            res.status(400).json({
                mensaje: 'No se pudo agregar el usuario'
            })
        }
    } catch (error) {
        
        console.log(error);
        if(error.code === 11000) {
            return res.status(400).json({
                msg: 'El usuario que intenta ingresar ya existe'
            })
        }
        

        res.status(500).json({
            error: 'Error al agregar un usuario'
        })
    }
}

const obtenerUsuarioAutenticado = async (req,res) => {

    try {

        let usuario = await Usuario.findById(req.usuario.id).select('-password');
        //select('-password'); esa funcion es para decirle cuales campos quiero traer, al enviarle el guion,
        //le digo cuales campos no quiero
        console.log(usuario)
        //delete usuario["password"];
        //delete usuario["registro"];
        //console.log(usuario)
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error'
        })
    }
}
 

module.exports = {

    agregarUsuario,
    obtenerUsuarioAutenticado
}