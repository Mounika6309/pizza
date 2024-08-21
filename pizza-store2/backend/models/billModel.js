const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    paymentMethod: { type: String, enum: ['card', 'cash', 'online'], required: true },
    issuedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
