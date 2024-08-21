const Product = require('../models/productModel');

// Create Pizza (Admin Only)
exports.addProduct = async (req, res) => {
    try {
        const { name, price, description, tax, discount } = req.body;
        const product = new Product({ name, price, description, tax, discount });
        await product.save();
        res.status(201).json({ message: 'Pizza added', product });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Read All Pizzas
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Read Single Pizza
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) return res.status(404).json({ message: 'Pizza not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Pizza (Admin Only)
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) return res.status(404).json({ message: 'Pizza not found' });
        Object.assign(product, req.body);
        await product.save();
        res.json({ message: 'Pizza updated', product });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete Pizza (Admin Only)
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) return res.status(404).json({ message: 'Pizza not found' });
        await product.remove();
        res.json({ message: 'Pizza deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};