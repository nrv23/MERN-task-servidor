const mongoose = require("mongoose");
require("dotenv").config({ path: 'variables.env'});//leer las variables de entorno

const connDB = async () => {

    try {
        //aqui se va conectar a mongo
        const url = `${process.env.DB_CONN}/${process.env.DB_NAME}`
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });

        console.log("Ha conectado con la bd");
    } catch (error) {
        console.log("error al intentar conectar ",error);

        process.exit(1); //detener la aplicacion
    }

}


module.exports = connDB;