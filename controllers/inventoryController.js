const Inventory = require("../models/Inventory");
const Product = require("../models/Product");

exports.createInventory = async (req, res) => {
  try {
    const { productId, variant, quantity, lowStockThreshold } = req.body;

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    const inventory = await Inventory.create({
      product: productId,
      variant,
      quantity,
      lowStockThreshold,
    });
    res.status(201).json({ success: true, inventory });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find().populate("product");
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getInventoryByProductId = async (req, res) => {
  try {
    const inventory = await Inventory.find({
      product: req.params.productId,
    }).populate("product");
    if (!inventory.length) {
      return res
        .status(404)
        .json({ error: "Inventory not found for this product" });
    }
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!inventory) {
      return res.status(404).json({ error: "Inventory not found" });
    }
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);
    if (!inventory) {
      return res.status(404).json({ error: "Inventory not found" });
    }
    res.json({ message: "Inventory deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLowStockItems = async (req, res) => {
  try {
    const lowStockItems = await Inventory.find({
      $expr: { $lte: ["$quantity", "$lowStockThreshold"] },
    }).populate("product");
    res.json(lowStockItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
