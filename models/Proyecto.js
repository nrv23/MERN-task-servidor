const mongoose = require("mongoose");

const ProyectoSchema = mongoose.Schema({
    nombre: {
        type: String,
        unique: true, // que sea unico,
        required: true, //obligatorio
        trim: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId, // a cual usuario pertenece el proyecto
        ref: 'Usuario' //nombre del modelo que hace referencia
    },
    
    creado:{
        type: Date,
        default: Date.now() // cuando se agregue el usuario va agregar la fecha de registro
    }
});


module.exports = mongoose.model("Proyecto",ProyectoSchema); // nombre de coleccion y estructura