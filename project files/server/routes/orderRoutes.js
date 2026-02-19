const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { auth, adminAuth } = require('../middleware/auth');

// User routes
router.post('/', auth, orderController.createOrder);
router.get('/my-orders', auth, orderController.getUserOrders);
router.get('/:id', auth, orderController.getOrderById);
router.put('/:id/cancel', auth, orderController.cancelOrder);

// Admin routes
router.get('/', adminAuth, orderController.getAllOrders);
router.put('/:id/status', adminAuth, orderController.updateOrderStatus);

module.exports = router;
