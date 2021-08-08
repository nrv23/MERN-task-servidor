const mongoose = require("mongoose");

const TareaSchema = mongoose.Schema({
    nombre: {
        type: String,
        unique: true, // que sea unico,
        required: true, //obligatorio
        trim: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    creado:{
        type: Date,
        default: Date.now() // cuando se agregue el usuario va agregar la fecha de registro
    },
    proyectoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto'
    }
});


module.exports = mongoose.model("Tarea",TareaSchema); // nombre de coleccion y estructura