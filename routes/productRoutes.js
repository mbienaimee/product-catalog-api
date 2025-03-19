// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
} = require("../controllers/productController");
const upload = require("../middleware/multer");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// Create a new product (admin only)
router.post("/", [auth, admin], upload.array("images", 5), createProduct);

// Get all products (public)
router.get("/", getAllProducts);

// Get low stock products (admin only)
router.get("/low-stock", [auth, admin], getLowStockProducts);

// Get a single product (public)
router.get("/:id", getProductById);

// Update a product (admin only)
router.put("/:id", [auth, admin], upload.array("images", 5), updateProduct);

// Delete a product (admin only)
router.delete("/:id", [auth, admin], deleteProduct);

module.exports = router;
