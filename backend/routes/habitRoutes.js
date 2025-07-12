const express = require('express');
const router = express.Router();
const {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
} = require('../controllers/habitController');
const { protect } = require('../middleware/authMiddleware');

// Chained route for getting all habits and creating a new one
// The 'protect' middleware will run before the controller functions
router.route('/').get(protect, getHabits).post(protect, createHabit);

// Chained route for updating and deleting a single habit by its ID
router.route('/:id').put(protect, updateHabit).delete(protect, deleteHabit);

module.exports = router;