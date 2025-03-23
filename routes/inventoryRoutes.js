const express = require("express");
const router = express.Router();
const {
  createInventory,
  getAllInventory,
  getLowStockItems,
  deleteInventory,
  updateInventory,
} = require("../controllers/inventoryController");

// Routes
router.post("/", createInventory);
router.get("/", getAllInventory);
router.get("/low-stock", getLowStockItems);
router.patch("/:inventoryId", updateInventory);
router.delete("/:inventoryId", deleteInventory);

module.exports = router;
