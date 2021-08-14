const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

const agregarTarea = async (req,res) => {

    try {

        const errores = validationResult(req); // aqui lee los campos de la peticion

        if(!errores.isEmpty()){//sino viene vacío

            return res.status(400).json({
                errores: errores.array()
            })
        }

        const {proyectoId} = req.body;

        const proyecto = await Proyecto.findById(proyectoId);

        if(!proyecto || proyecto.length === 0) {
            return res.status(404).json({ msg: 'Está haciendo referencia a un proyecto que no existe'})
        }

        if(proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({
                msg: 'Permiso denegado'
            });
        }
        
        const tarea = new Tarea(req.body);
        const response = await tarea.save();

        if(!response || response.length === 0) {
            return res.status(400).json({
                msg: 'No se pudo agregar la tarea'
            })
        } else {
            return res.status(201).json({
                tarea: response
            })
        }

    } catch (error) {
        console.log(error);

        if(error.code === 11000) {
            return res.status(400).json({
                msg: 'La tarea que intenta ingresar ya existe'
            })
        }
        
        res.status(500).json({
            err: 'Hubo un error en el servidor'
        })
    }
}

const obtenerTareasPorProyecto = async (req,res) => {

    try {
        
        const {idproyecto} = req.params;
        
        const proyecto = await Proyecto.findById(idproyecto);

        if(!proyecto || proyecto.length === 0) {
            return res.status(404).json({ msg: 'Está haciendo referencia a un proyecto que no existe'})
        }

        if(proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({
                msg: 'Permiso denegado'
            });
        }

        const tareas = await Tarea.find({ proyectoId: idproyecto });

        res.status(200).json({
            tareas
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: 'Hubo un error en el servidor'
        })
    }
}

const actualizarTarea = async (req,res) => {

    try {

        const {id} = req.params;
        const {nombre} = req.body;

        const tarea =  await Tarea.findById(id);

        if(!tarea || tarea.length === 0){
            return res.status(404).json({
                msg :'No hay resultados'
            })
        }

        const proyecto = await Proyecto.findById(tarea.proyectoId);
    
        if(proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({
                msg: 'Permiso denegado'
            });
        }

        tarea.nombre = nombre;

        await tarea.save();

        res.status(200).json({
            tarea
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: 'Hubo un error en el servidor'
        })
    }
}

const actualizarEstadoTarea = async (req,res) => {

    try {
        const {id} = req.params;

        const tarea =  await Tarea.findById(id);

        if(!tarea || tarea.length === 0){
            return res.status(404).json({
                msg :'No hay resultados'
            })
        }

        const proyecto = await Proyecto.findById(tarea.proyectoId);
    
        if(proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({
                msg: 'Permiso denegado'
            });
        }

        tarea.estado = !tarea.estado;

        await tarea.save();

        res.status(204).json();

    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: 'Hubo un error en el servidor'
        })
    }
}

const eliminarTarea = async (req,res) => {

    try {
        
        const {id} = req.params;

        const tarea =  await Tarea.findById(id);

        if(!tarea || tarea.length === 0){
            return res.status(404).json({
                msg :'No hay resultados'
            })
        }

        const proyecto = await Proyecto.findById(tarea.proyectoId);
    
        if(proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({
                msg: 'Permiso denegado'
            });
        }

        const eliminado = await tarea.delete();

        if(!eliminado || eliminado.length === 0) {
            return res.status(400).json({
                msg: 'No se pudo eliminar la tarea'
            })
        } else {

            return res.status(200).json({
                msg: 'Tarea eliminada'
            });
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: 'Hubo un error en el servidor'
        })
    }
}

module.exports = {

    agregarTarea,
    obtenerTareasPorProyecto,
    actualizarTarea,
    actualizarEstadoTarea,
    eliminarTarea
}