const jwt = require("jsonwebtoken");
require("dotenv").config();
const KEY = process.env.KEY;


const generateToken = (userId) => {
    return jwt.sign({id: userId}, KEY, {
        expiresIn: '60d'
    });
}

const verifyToken = (token) => {
    return jwt.verify(token, KEY);
}

module.exports = {generateToken, verifyToken};