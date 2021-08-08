const {nuevoProyecto,
    obtenerProyectosPorIdUsuarios,
    actualizarProyecto,
    eliminarProyecto
} = require("../controllers/ProyectoController");
const router = require("express").Router();
const {check} = require("express-validator");
const validarToken = require("../middleware/auth");
module.exports = () => {

    router.post('/proyecto/',
        validarToken,
        [
            check('nombre','El nombre es obligatorio').not().isEmpty(),
        ],
        nuevoProyecto);

    router.get('/proyectos/',
        validarToken,
        obtenerProyectosPorIdUsuarios
    );

    router.put('/proyecto/:id',
        validarToken,
        [
            check('nombre','El nombre es obligatorio').not().isEmpty(),
        ],
        actualizarProyecto
    );

    router.delete('/proyecto/:id',
        validarToken,
        eliminarProyecto
    );

    return router;
}