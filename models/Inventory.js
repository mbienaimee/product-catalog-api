const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  variant: { size: String, color: String },
  quantity: { type: Number, required: true, min: 0 },
  lowStockThreshold: { type: Number, default: 10 },
});

module.exports = mongoose.model("Inventory", inventorySchema);
