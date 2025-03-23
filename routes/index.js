const express = require("express");

const router = express.Router();

router.use("/products", require("./productRoutes"));
router.use("/categories", require("./categoryRoutes"));
router.use("/users", require("./userRoutes"));
router.use("/inventory", require("./inventoryRoutes"));

module.exports = router;
