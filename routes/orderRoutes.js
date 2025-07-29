const express = require("express");
const {createOrder, getAllOrders, getMyOrders, getOrderById, markOrderAsPAid} = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/onlyAdminMiddleware");
const router = express.Router();

router.get("/my", getMyOrders);
router.get("/:id", protect, getOrderById);
router.get("/all", protect, getAllOrders);


router.post("/", protect, createOrder);
router.put("/:id", protect, isAdmin, markOrderAsPAid);


module.exports = router;