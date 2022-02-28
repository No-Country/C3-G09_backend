const  Role  = require("../models/Role");
const User = require("../models/User");

exports.isAValidRol = async(rol='') =>{
    const rolExists = await Role.findOne({rol})
    if(!rolExists){
      throw new Error(`el rol: ${rol} no es un rol valido`)
    }
  }


  exports.isAValidEmail = async(email='') =>{
    const emailExists = await User.findOne({email})
    if(emailExists){
      throw new Error(`el email ya esta registrado`)
    }
  }

  
  exports.isAValidUsername= async(username='') =>{
    const usernameExists = await User.findOne({username})
    if(username){
      throw new Error(`el nombre de usuario ya esta registrado`)
    }
  }

  