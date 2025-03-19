const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const auth = require("../middleware/authMiddleware");

// Create a new category (admin only)
router.post("/", auth, createCategory);

// Get all categories (public)
router.get("/", getAllCategories);

// Get a single category (public)
router.get("/:id", getCategoryById);

// Update a category (admin only)
router.put("/:id", auth, updateCategory);

// Delete a category (admin only)
router.delete("/:id", auth, deleteCategory);

module.exports = router;
