const express = require('express');
const {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
} = require('../controllers/orderControllers');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
// (none, all order routes are protected)

// Protected routes
router.post('/', protect, authorize('admin'), createOrder); // Create an order
router.get('/', protect, authorize('admin'), getOrders); // Get all orders (Admin only)
router.get('/:orderId', protect, authorize('admin'), getOrderById); // Get order by ID (Admin only)
router.put('/:orderId', protect, authorize('admin'), updateOrderStatus); // Update order status (Admin only)
router.delete('/:orderId', protect, authorize('admin'), deleteOrder); // Delete an order (Admin only)

module.exports = router;