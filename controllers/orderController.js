const asyncHandler = require("express-async-handler");
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

const getOrderById = asyncHandler(async(req, res) => {
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

const getAllOrders = asyncHandler(async (req, res) => {

    if(req.user.role !== "admin") {
        res.status(403);
        throw new Error("Not authorized to see orders");
    }
    const orders = await Order.find().populate("user", "username email");

    res.status(200).json(orders);
})

const markOrderAsPAid = asyncHandler(async (req, res) => {

    const {id} = req.params.id;

    const order = await Order.findById(id);

    if(!order) {
        res.status(404);
        throw new Error("Order not found");
    }

    const isPaid = order.isPaid;

    if(isPaid) {
        res.status(201);
        throw new Error("the order is already paid");
    }

    order.isPaid = true;
    order.paidAt = Date.now();

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);

})

module.exports = {
    createOrder, 
    getMyOrders,
    getOrderById,
    getAllOrders,
    markOrderAsPAid
}