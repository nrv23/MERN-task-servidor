const express = require("express");
const http = require("http");
const cors = require("cors");
const conectarDB = require("./config/db");

const app = express();
conectarDB();

// el la configuracion del cors debe cargarse antes que las rutas para poder proteger todas las rutas y
// middlewares del servidor 
const listaBlanca = ['http://localhost:3001']; // con este arreglo se puede pasar todas las urls que
const corsOptions = {
    origin: (origin, callback) => { // el parametro origin es la ip que trata de hacer 
        //un request al servidor
        console.log({origin})
        const existe = listaBlanca.some(dominio => dominio === origin); // si la ip entrante existe 
        //en la lista blanca, some indica si existe

        if (existe) {
            callback(null, true); // el primer parametro es un error, en este caso es null 
            //porque la ip es permitida, el segundo parametro es si el valor es permitido y 
            //en este caso va el true
        } else { //error generado por cors al no dar acceso a la API
            callback('No permitido por cors',false);
        }
    }
}

//habilitar cors para dar acceso remoto a clientes que van a consumir la api
app.use(cors(corsOptions));
//app.use(cors({ origin: true }));
//app.use(cors())
//habilitar express.json para peticiones de tipo POST
app.use(express.json({ // habilitando este middleware se debe enviar el header como application/json
    extended: true
}))

//IMPortar las rutas del servidor
const usuarioRoutes = require("./routes/Usuario");
const authRoutes = require("./routes/Auth");
const proyectoRoutes = require("./routes/Proyecto");
const tareasRoutes = require("./routes/Tarea");

//

app.use('/api/v1',usuarioRoutes());
app.use('/api/v1',authRoutes());
app.use('/api/v1',proyectoRoutes());
app.use('/api/v1',tareasRoutes());

//habilitar cors
//definir los dominios donde voy a van a recibir peticiones el servidor

// el servidor va aceptar

const Server = http.createServer(app);
const PORT = process.env.PORT || 8000;
Server.listen(PORT,() => {
    console.log("Servidor escuchando en puerto "+PORT)
})