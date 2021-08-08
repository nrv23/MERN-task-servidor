const { agregarTarea,obtenerTareasPorProyecto,actualizarTarea,actualizarEstadoTarea,eliminarTarea } = require("../controllers/TareaController");
const router = require("express").Router();
const {check} = require("express-validator");
const validarToken = require("../middleware/auth");
module.exports = () => {

    router.post('/tarea',
        validarToken,
        [
            check('nombre','El nombre de la tarea es requerido').not().isEmpty()
        ],
        agregarTarea    
    )

    router.get('/tareas/:idproyecto',
        validarToken,
        obtenerTareasPorProyecto
    );

    router.put('/tarea/:id',
        validarToken,
        [
            check('nombre','El nombre de la tarea es requerido').not().isEmpty()
        ],
        actualizarTarea
    );

    router.put('/tarea/estado/:id',
        validarToken,
        actualizarEstadoTarea
    );

    router.delete('/tarea/:id',
        validarToken,
        eliminarTarea
    );


    return router;
}