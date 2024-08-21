const express = require('express');
const { createBill, getBillById, updateBillStatus } = require('../controllers/billController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createBill); // Create bill
router.get('/:billId', protect, getBillById); // Get bill by ID
router.put('/:billId', protect, authorize('admin'), updateBillStatus); // Update payment status (Admin only)

module.exports = router;
