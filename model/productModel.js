const mongoose = require("mongoose");
const validator = require("validator");

const productModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        maxLength: 8
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["electronics", "clothing", "books", "accessories", "food", "furniture", "others"]
    },
    brand: {
        type: String,
        default: "Generic"
    },
    stock: {
        type: Number,
        required: true,
        maxLength: 4,
        default: 1
    },
    images: [
        {
            public_id: {
                type: String
            },
            url: {
                type: String
            }
        }

    ],
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users"
            },
            name: String,
            rating: Number,
            comment: String,
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Products", productModel);