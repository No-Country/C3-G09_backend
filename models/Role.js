const { Schema, model } = require("mongoose");

//exports.Roles = ["user", "moderator", "admin"];

const RoleSchema = new Schema({

  rol: {
    type: String,
    required:[true, 'el rol es obligatorio']
  }

});

module.exports = model("Role", RoleSchema);
