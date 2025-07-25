const {asyncHandler} = require("express-async-handler");
const Order = require("../model/orderModel");

const createOrder = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice
    } = req.body;

    if(!orderItem || orderItem.length === 0) {
        res.status(400);
        throw new Error("No order item");
    }

    const order = new Order ({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice
    })

    const createOrder = await order.save();

    res.status(200).json(createOrder);
});

const getMyOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({user: req.user._id});

    res.status(400).json(orders);
});

const getOrerById = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "username email");
    
    if(!order) {
        res.status(404);
        throw new Error("Orer not found");
    }

    if(order.user._id.toString() !== req.user._id || req.user.role !== "admin") {
        res.status(403);
        throw new Error("Not authorised to view this profuct");
    }

    res.status(200).json(order);
});

module.exports = {
    createOrder, 
    getMyOrders,
    getOrerById
}