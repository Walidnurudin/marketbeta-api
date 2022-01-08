const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
  },
  userId: {
    type: ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("products", productSchema);
