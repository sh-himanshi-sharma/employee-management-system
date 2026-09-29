const express = require('express');
const router = express.Router();
const { loginAdmin, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public route for login
router.post('/login', loginAdmin);

// Protected route for profile verification
router.get('/profile', protect, getProfile);

module.exports = router;
