const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: "string",
      unique: true,
      require: true,
      trim: true,
      min: 3,
      max: 255,
    },
    password: {
      type: "string",
      trim: true,
      require: true,
      min: 6,
      max: 255,
    },
    email: {
      type: "string",
      require: true,
      trim: true,
      unique: true,
      min: 6,
      max: 255,
    },
    name: {
      type: "string",
      require: true,
      trim: true,
    },
    surname: {
      type: "string",
      require: true,
      trim: true,
    },
    birthYear: {
      type: "number",
      require: true,
      trim: true,
    },
    cel: {
      type: "string",
      require: true,
      trim: true,
    },
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId, //Relacion entre el Schema de roles y el de Users
      },
    ],
    uuidEmail: {
      type: "string",
    },
    enabled: {
      type: "boolean",
      default: false,
    },
    deleted: {
      type: "boolean",
      default: false,
    },
  },
  {
    timestamps: true,
    versionkey: false,
  }
);

module.exports = model("User", userSchema);
