const Feedback = require('../models/Feedback');

// Create feedback
exports.createFeedback = async (req, res) => {
  try {
    const { product, rating, comment } = req.body;

    const feedback = new Feedback({
      user: req.userId,
      product,
      rating,
      comment
    });

    await feedback.save();

    res.status(201).json({ success: true, message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all feedbacks (Admin only)
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('user', 'name email')
      .populate('product', 'name image')
      .sort({ createdAt: -1 });

    res.json({ success: true, feedbacks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get approved feedbacks for a product
exports.getProductFeedbacks = async (req, res) => {
  try {
    const { productId } = req.params;

    const feedbacks = await Feedback.find({ product: productId, isApproved: true })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json({ success: true, feedbacks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Approve feedback (Admin only)
exports.approveFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({ success: false, message: 'Feedback not found' });
    }

    res.json({ success: true, message: 'Feedback approved', feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete feedback (Admin only)
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!feedback) {
      return res.status(404).json({ success: false, message: 'Feedback not found' });
    }

    res.json({ success: true, message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
