const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { auth, adminAuth } = require('../middleware/auth');

// User routes
router.post('/', auth, feedbackController.createFeedback);
router.get('/product/:productId', feedbackController.getProductFeedbacks);

// Admin routes
router.get('/', adminAuth, feedbackController.getAllFeedbacks);
router.put('/:id/approve', adminAuth, feedbackController.approveFeedback);
router.delete('/:id', adminAuth, feedbackController.deleteFeedback);

module.exports = router;
