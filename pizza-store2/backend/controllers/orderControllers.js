const Order = require('../models/orderModel');
const Product = require('../models/productModel');

// Create Order
exports.createOrder = async (req, res) => {
    const { items } = req.body;
    try {
        const products = await Product.find({ _id: { $in: items } });
        const totalAmount = products.reduce((sum, product) => sum + product.price, 0);
        const order = new Order({
            items,
            user: req.user._id,
            totalAmount
        });
        await order.save();
        res.status(201).json({ message: 'Order created', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Orders (Admin Only)
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'username').populate('items');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId).populate('user', 'username').populate('items');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Order Status (Admin Only)
exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        order.status = req.body.status;
        await order.save();
        res.json({ message: 'Order status updated', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete Order (Admin Only)
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        await order.remove();
        res.json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
