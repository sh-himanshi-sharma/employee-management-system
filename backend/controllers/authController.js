const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Helper to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'super_secret_jwt_key_employee_mgmt_2026', {
    expiresIn: process.env.JWT_EXPIRE || '1h',
  });
};

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide both username and password' });
    }

    // Check for admin
    const admin = await Admin.findOne({ username: username.trim().toLowerCase() });

    if (admin && (await admin.matchPassword(password))) {
      const token = generateToken(admin._id);

      return res.json({
        token,
        user: {
          username: admin.username,
        },
      });
    } else {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get current admin profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res, next) => {
  try {
    const admin = req.user;
    if (!admin) {
      return res.status(404).json({ message: 'Admin profile not found' });
    }

    res.json({
      user: {
        id: admin._id,
        username: admin.username,
        createdAt: admin.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginAdmin,
  getProfile,
};
