const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const { validateProduct } = require("../middleware/validateRequest");

router.post("/", protect, validateProduct, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.patch("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
