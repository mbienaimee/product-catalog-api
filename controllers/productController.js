const Product = require("../models/Product");
const Category = require("../models/Category");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stockQuantity, variants } =
      req.body;

    // Handle image paths from multer
    const images = req.files
      ? req.files.map((file) => `/uploads/${file.filename}`)
      : [];

    // Check if category exists
    if (category) {
      const existingCategory = await Category.findById(category);
      if (!existingCategory) {
        return res
          .status(400)
          .json({ success: false, message: "Category not found" });
      }
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      stockQuantity,
      variants: variants ? JSON.parse(variants) : [],
      images,
    });

    await product.save();
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice, inStock } = req.query;

    // Build query
    const query = {};

    if (name) query.name = { $regex: name, $options: "i" };
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    if (inStock === "true") query.stockQuantity = { $gt: 0 };

    const products = await Product.find(query).populate("category");
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stockQuantity, variants } =
      req.body;

    // Process new images if uploaded
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => `/uploads/${file.filename}`);
    }

    const productData = {
      name,
      description,
      price,
      category,
      stockQuantity,
    };

    if (variants) productData.variants = JSON.parse(variants);
    if (images.length > 0) productData.images = images;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      { new: true, runValidators: true }
    ).populate("category");

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get low stock products
exports.getLowStockProducts = async (req, res) => {
  try {
    const threshold = parseInt(req.query.threshold) || 10;

    const products = await Product.find({
      stockQuantity: { $lte: threshold },
    }).populate("category");

    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
