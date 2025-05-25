const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const ObjectId = mongoose.Types.ObjectId;

const DocSchema = new Schema(
  {
    phone: { type: Number,  index: true, },
    username: { type: String,  index: true, },
    password: { type: String },
    type:{ type: String, enum:["DATA"] ,index: true, },
  },

  {
    timestamps: true,
  }
);







module.exports = mongoose.model("Test", DocSchema);

