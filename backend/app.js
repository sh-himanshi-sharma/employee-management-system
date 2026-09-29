const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Base / API Health Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Employee Management Auth API is running' });
});

// Routes
app.use('/api/auth', authRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
