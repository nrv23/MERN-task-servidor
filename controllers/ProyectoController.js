const Proyecto = require("../models/Proyecto");
const {validationResult} = require("express-validator");

const nuevoProyecto = async (req,res ) => {

    const errores = validationResult(req); // aqui lee los campos de la peticion

    if(!errores.isEmpty()){//sino viene vacío

        return res.status(400).json({
            errores: errores.array()
        })
    }


    try {
        const proyecto = new Proyecto(req.body);
        proyecto.creador = req.usuario.id;
        proyecto.save();

        res.status(201).json({
            msg: 'Se ha guardado el proyecto'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            err: 'Hubo un error en el servidor'
        })
    }
}

const obtenerProyectosPorIdUsuarios = async (req,res) => {

    try {
        const idusuario = req.usuario.id;

        const proyectos = await Proyecto.find({creador:idusuario});

        if(!proyectos || proyectos.length === 0) return res.status(404).json({ msg: 'No hay resultados'});

        res.json(proyectos);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            err: 'Hubo un error en el servidor'
        })
    }
}

const actualizarProyecto = async (req,res) => {


    const errores = validationResult(req); // aqui lee los campos de la peticion

    if(!errores.isEmpty()){//sino viene vacío

        return res.status(400).json({
            errores: errores.array()
        })
    }


    try {

        const {params:{id}} = req;
        const {body:{nombre}} = req;

        const objProyecto = {};

        if (nombre) {
            objProyecto.nombre = nombre;
        }

        const proyecto = await Proyecto.findById(id);

        if(!proyecto) return res.status(404).json({ msg: 'Proyecto no encontrado'});

        if(proyecto.creador.toString() !== req.usuario.id) return res.status(401).json({ msg: 'No Autorizado'});

        //actualizar el proyecto 

        proyecto = await Proyecto.findByIdAndUpdate({_id: id},{$set: objProyecto},{new: true}); // actualizar y devolver el proyecto actualizado

        res.status(200).json({
            proyecto
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            err: 'Hubo un error en el servidor'
        })
    }
}

const eliminarProyecto = async (req,res) => {

    try {

        const {params:{id}} = req;
        const proyecto = await Proyecto.findById(id);

        if(!proyecto) return res.status(404).json({ msg: 'Proyecto no encontrado'});

        if(proyecto.creador.toString() !== req.usuario.id) return res.status(401).json({ msg: 'No Autorizado'});

        const eliminado = await Proyecto.findOneAndRemove({_id:id});
        console.log(eliminado);
        if(!eliminado || eliminado.length === 0) {
            return res.status(400).json({
                msg: 'No se pudo eliminar el proyecto'
            })
        } else {

            return res.status(200).json({
                msg: 'Proyecto eliminado'
            });

            
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            err: 'Hubo un error en el servidor'
        })
    }
}

module.exports = {
    nuevoProyecto,
    obtenerProyectosPorIdUsuarios,
    actualizarProyecto,
    eliminarProyecto
}