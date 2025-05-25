const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DimensionsSchema = new Schema({
  w: Number,
  h: Number,
  L: Number,
}, { _id: false });

const ItemSchema = new Schema({
  productName: String,
  dimensions: DimensionsSchema,
  weight: Number,
  quantity: Number,
  properties: { type: String, enum: ["stackable", "fragila"] },
}, { _id: false });

const CalculationSchema = new Schema({
  items: [ItemSchema],
  containerweight: Number,
  originport: String,
  destinationport: String,

  // Calculated fields
  totalCBM: Number,
  totalWeight: Number,
  remainingWeight: Number,
  fuelCharge: Number,
  portFees: Number,
  documentationFees: Number,
  totalCharges: Number,

}, { timestamps: true });

module.exports = mongoose.model("calculations", CalculationSchema);
