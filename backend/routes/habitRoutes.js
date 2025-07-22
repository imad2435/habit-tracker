const express = require('express');
const router = express.Router();
const {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  toggleHabitCompletion, // Import new function
} = require('../controllers/habitController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getHabits).post(protect, createHabit);
router.route('/:id').put(protect, updateHabit).delete(protect, deleteHabit);

// Route for toggling habit completion
router.route('/:id/toggle').put(protect, toggleHabitCompletion);

module.exports = router;