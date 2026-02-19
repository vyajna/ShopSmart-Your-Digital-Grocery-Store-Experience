const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { auth, adminAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/:id', productController.getProductById);

// Admin routes
router.post('/', adminAuth, upload.single('image'), productController.createProduct);
router.put('/:id', adminAuth, upload.single('image'), productController.updateProduct);
router.delete('/:id', adminAuth, productController.deleteProduct);

module.exports = router;
