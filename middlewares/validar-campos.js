const { validationResult } = require("express-validator");

exports.validarCampos = (req,res, next) => {

    //next es lo que se va a llamar si la validacion fue correcta

    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
}

