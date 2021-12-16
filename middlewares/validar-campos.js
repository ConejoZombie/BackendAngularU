const { response } = require("express");
const { validationResult } = require("express-validator");

//un middleware es una funcion que resive req, res y el next para indicar que siga ejecutando el siguente.
const validarCampos = (req, res = response, next) => {

    //se ejecuta en caso de un error.
    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });        
    }

    next(); //indica que continue al siguiente middleware
}








module.exports = {
    validarCampos
}