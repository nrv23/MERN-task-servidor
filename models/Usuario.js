const mongoose = require("mongoose");

const UsuariosSchema = mongoose.Schema({
    nombre: {
        type: String,
        unique: true, // que sea unico,
        required: true, //obligatorio
    },
    email: {
        type: String,
        unique: true, // que sea unico,
        required: true, //obligatorio
        trim: true //quitar espacios en blanco
    },
    password: {
        type: String,
        required: true, //obligatorio
        trim: true //quitar espacios en blanco
    },
    registro:{
        type: Date,
        default: Date.now() // cuando se agregue el usuario va agregar la fecha de registro
    }
});


module.exports = mongoose.model("Usuario",UsuariosSchema); // nombre de coleccion y estructura