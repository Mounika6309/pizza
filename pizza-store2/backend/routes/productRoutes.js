const express = require('express');
const { addProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productControllers');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, authorize('admin'), addProduct);
router.get('/', getProducts);
router.get('/:productId', getProductById);
router.put('/:productId', protect, authorize('admin'), updateProduct);
router.delete('/:productId', protect, authorize('admin'), deleteProduct);

module.exports = router;