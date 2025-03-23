const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  stockQuantity: { type: Number, required: true, default: 0 },
  imageUrls: [{ type: String }],
  variants: [
    {
      size: { type: String, required: true },
      color: { type: String, required: true },
      price: { type: Number, required: true, min: 0 },
      stockQuantity: { type: Number, default: 0 },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
