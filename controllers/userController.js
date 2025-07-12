const Users = require("../model/userModel");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const {generateToken} = require("../utils/auth");

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password) {
        res.status(400);
        throw new Error("Required all fields");
    }

    const userExist = await Users.findOne({email});
    if(userExist) {
        res.status(400);
        throw new Error("User already exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await Users.create({
        username,
        email,
        password: hashedPassword
    });

    if(user) {
        res.cookie("token", generateToken(user._id), {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60*24*60*60*1000
        });

        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            message: "User registered successfully"
        });

    } else {
        res.status(401);
        throw new Error("Invalid user data");
    }
});  

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        res.status(401);
        throw new Error("Email and Password required!");
    }

    const user = await Users.findOne({email}).select("+password");

    if(user && (await bcrypt.compare(password, user.password))) {
        res.cookie("token", generateToken(user._id), {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60*24*60*60*1000
        });

        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            message: "User loggedin successfully"
        });
    } else {
        res.status(401);
        throw new Error("Invalid credentials");
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        sameSite: "strict",
    });

    res.status(200).json({message: "Logged out successfully"})
});

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}