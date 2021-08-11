const jwt = require("jsonwebtoken");

const validarToken = (req,res,next) => {

    //leer el token del header x-auth-token

    

    try {
        const token = req.header('x-auth-token');
        if(!token) return res.status(401).json({ msg: 'Sesión no válida'});
        const cifrado = jwt.verify(token,process.env.JWT_SECRET);
        req.usuario = cifrado.usuario;
        
        return next();
    
    } catch (error) {
        console.log(error)
        return res.status(401).json({ msg: 'Acceso denegado'});
    }
}

module.exports = validarToken