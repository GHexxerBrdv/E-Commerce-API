const asyncHandler = require("express-async-handler");
const Users = require("../model/userModel");
const Products = require("../model/productModel");
const Order = require("../model/orderModel");

const adminAnalytics = asyncHandler(async (req, res) => {
    try {
        const totalUser = await Users.countDocuments();
        const totalProducts = await Products.countDocuments();
        const totalOrders = await Order.countDocuments();

        const totalRevenueAgg = await Order.aggregate([
            {
                $match: {
                    isPaid: true
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$totalPrice"
                    }
                }
            }
        ]);

        const totalRevenue = totalRevenueAgg[0]?.total || 0;

        res.status(200).json({
            totalUser,
            totalProducts,
            totalOrders,
            totalRevenue
        }
        );

    } catch (error) {
        res.status(500).json({ message: "analytics fetch failed" });
    }
})

module.exports = adminAnalytics;