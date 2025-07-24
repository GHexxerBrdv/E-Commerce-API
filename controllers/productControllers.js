const Products = require("../model/productModel");
const asyncHandler = require("express-async-handler");

const addProduct = asyncHandler(async(req, res) => {
    const {name, price, description, category, brand, stock} = req.body;

    if(!name || !price || !description || !category || !stock) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const product = await Products.create({
        name,
        price,
        description,
        category,
        brand,
        stock,
        user: req.user._id
    });

    res.status(200).json(product);
});

const updateProduct = asyncHandler(async(req, res) => {
    const product = await Products.findById(req.params.id);

    if(!product) {
        res.status(400);
        throw new Error("Product not found");
    }

    const updated = await Products.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json(updated);
});

const removeProduct = asyncHandler(async(req, res) => {
    const product = await Products.findById(req.params.id);

    if(!product) {
        res.status(400);
        throw new Error("Product not found");
    }

    const deleted = await Products.findByIdAndDelete(req.params.id, req.body);

    res.status(200).json(deleted);
});

const getProducts = asyncHandler(async(req, res) => {
    const products = await Products.find();
    res.status(200).json(products);
});

const getProductById = asyncHandler(async(req, res) => {
    const product = await Products.findById(req.params.id);

    if(!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    res.status(200).json(product);
});

const addProductReview = asyncHandler(async(req, res) => {
    const {name, rating, comment} = req.body;

    if(!name || !rating || !comment) {
        res.status(400);
        throw new Error("All fields required to rate the product.");
    }

});

module.exports = {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    removeProduct
}