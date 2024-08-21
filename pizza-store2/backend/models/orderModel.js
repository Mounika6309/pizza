const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    totalAmount: { type: Number },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

