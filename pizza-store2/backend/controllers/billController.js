const Bill = require('../models/billModel');
const Order = require('../models/orderModel');

// Create Bill
exports.createBill = async (req, res) => {
    const { orderId, paymentMethod } = req.body;
    try {
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        const bill = new Bill({
            order: orderId,
            totalAmount: order.totalAmount,
            paymentMethod
        });
        await bill.save();
        res.status(201).json({ message: 'Bill created', bill });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get Bill by ID
exports.getBillById = async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.billId).populate('order');
        if (!bill) return res.status(404).json({ message: 'Bill not found' });
        res.json(bill);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update Bill Payment Status (Admin Only)
exports.updateBillStatus = async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.billId);
        if (!bill) return res.status(404).json({ message: 'Bill not found' });

        bill.paymentStatus = req.body.paymentStatus;
        await bill.save();
        res.json({ message: 'Payment status updated', bill });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
