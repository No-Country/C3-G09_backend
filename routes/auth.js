const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const {
  signUp,
  signIn,
  verify,
  verified,
} = require("../controllers/authController");
const { isAValidRol, isAValidEmail, isAValidUsername } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");





router.post("/signin", signIn);

// check es un middleware que revisa un campo del body que queremos validar
//check almacena los posibles errores y se los pasa al request
router.post("/signup", [
  check('username', 'El nombre de usuario no puede estar vacio').not().isEmpty(),
  check('username', 'Usuario ya existe').custom(isAValidUsername),
  check('name', 'El nombre no puede estar vacio').not().isEmpty(),
  check('surname', 'El apellido no puede estar vacio').not().isEmpty(),
  check('password', 'El password es obligatorio y mas debe tener 6 caracteres').isLength({min:6}),  
  check('email', 'El email no es valido').isEmail(),
  check('email', 'El email no es valido').custom(isAValidEmail),
  check('roles','El rol no es valido').custom(isAValidRol),
  validarCampos
], signUp);

router.get("/verify/:uid", verify);
router.get("/verified", verified);

module.exports = router;


    