const Product = require("../models/Product");
const Inventory = require("../models/Inventory");

exports.createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      category,
      stockQuantity,
      imageUrls,
      variants,
    } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, price, and category are required fields",
      });
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      stockQuantity: stockQuantity || 0, // Ensure stock is handled properly
      imageUrls,
      variants: variants || [], // Ensure variants are properly stored
    });

    await product.save();

    // Save stock in Inventory if using a separate model
    await Inventory.create({
      product: product._id,
      stockQuantity: stockQuantity || 0,
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, product: updatedProduct });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};
