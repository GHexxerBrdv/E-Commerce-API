const express = require("express");
const onlyAdmin = require("../middleware/onlyAdminMiddleware");
const protect = require("../middleware/authMiddleware");
const {addProduct, getProductById, getProducts, removeProduct, updateProduct} = require("../controllers/productControllers");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/", protect, onlyAdmin, addProduct);
router.delete("/:id", protect, onlyAdmin, removeProduct);
router.put("/:id", protect, onlyAdmin, updateProduct);


module.exports = router;