const jwt = require("jsonwebtoken");
const Users = require("../model/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        res.status(401);
        throw new Error("Not authorized, token missing");
    }

    try {
        const decoded = jwt.verify(token, process.env.KEY);
        req.user = await Users.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, invalid token");
    }
});

module.exports = {
    protect
}