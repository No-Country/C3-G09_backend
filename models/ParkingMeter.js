const { Schema, model } = require("mongoose");

const parkingMeterSchema = new Schema(
  {
  
   
   
 
    address: {
      type: "string",
      require: true,
      trim: true,
    },
    available: {
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
