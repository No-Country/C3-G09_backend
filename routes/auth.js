const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const {
  signUp,
  signIn,
  verify,
  verified,
} = require("../controllers/authController");
const { validarCampos } = require("../middlewares/validar-campos");
const  Role  = require("../models/Role");




router.post("/signin", signIn);

// check es un middleware que revisa un campo del body que queremos validar
//check almacena los posibles errores y se los pasa al request
router.post("/signup", [
  check('username', 'El nombre de usuario no puede estar vacio').not().isEmpty(),
  check('name', 'El nombre no puede estar vacio').not().isEmpty(),
  check('surname', 'El apellido no puede estar vacio').not().isEmpty(),
  check('password', 'El password es obligatorio y mas debe tener 6 caracteres').isLength({min:6}),  
  check('email', 'El email no es valido').isEmail(),
  check('roles','El rol no es valido').custom(async(rol='') =>{
    const existeRol = await Role.findOne({rol})
    if(!existeRol){
      throw new Error(`el rol: ${rol} no es un rol valido`)
    }
  }),
  validarCampos
], signUp);

router.get("/verify/:uid", verify);
router.get("/verified", verified);

module.exports = router;


    