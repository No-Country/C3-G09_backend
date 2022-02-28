const { Schema, model } = require("mongoose");
const bcryptjs = require('bcryptjs')
const userSchema = new Schema(
  {
    username: {
      type: "string",
      unique: true,
      required: true,
      trim: true,
      min: 3,
      max: 255,
    },
    password: {
      type: "string",
      trim: true,
      required: true,
      min: 6,
      max: 255,
    },
    email: {
      type: "string",
      required: true,
      trim: true,
      unique: true,
      min: 6,
      max: 255,
    },
    name: {
      type: "string",
      required: true,
      trim: true,
    },
    surname: {
      type: "string",
      required: true,
      trim: true,
    },
    birthYear: {
      type: "number",
      required: true,
      trim: true,
    },
    cel: {
      type: "string",
      required: true,
      trim: true,
    },
    img: {
      type: "string",
    },
    roles: 
      {
        type:"string"//ahora lo trae de la base de datos
      },
    
    uuidEmail: {
      type: "string",
    },
    enabled: {
      type: "boolean",
      default: true,
    },
    deleted: {
      type: "boolean",
      default: false,
    },
    google: {
      type: "boolean",
      default: false,
    },
  },
  {
    timestamps: true,
    versionkey: false,
  }
);

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcryptjs.genSaltSync(10);
  return await bcryptjs.hashSync(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcryptjs.compare(password, receivedPassword);
};

module.exports = model("User", userSchema);
