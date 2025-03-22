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

router.post("/", [auth, admin], upload.array("images", 5), createProduct);

router.get("/", getAllProducts);

router.get("/low-stock", [auth, admin], getLowStockProducts);

router.get("/:id", getProductById);

router.put("/:id", [auth, admin], upload.array("images", 5), updateProduct);

router.delete("/:id", [auth, admin], deleteProduct);

module.exports = router;
