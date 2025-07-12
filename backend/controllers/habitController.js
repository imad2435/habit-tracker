const asyncHandler = require('express-async-handler');
const Habit = require('../models/habitModel');

/**
 * @desc    Get all habits for a user
 * @route   GET /api/habits
 * @access  Private (will be secured later)
 */
const getHabits = asyncHandler(async (req, res) => {
  // For now, we find all habits. Later we will filter by user.
  const habits = await Habit.find(); 
  res.status(200).json(habits);
});

/**
 * @desc    Create a new habit
 * @route   POST /api/habits
 * @access  Private (will be secured later)
 */
const createHabit = asyncHandler(async (req, res) => {
  // THIS LINE IS NOW WORKING! req.body EXISTS!
  if (!req.body.name) { 
    res.status(400);
    // THIS IS THE ERROR YOU ARE SEEING!
    throw new Error('Please add a name field'); 
  }
//...
  const habit = await Habit.create({
    name: req.body.name,
    // Note: We are not setting the user yet. We will add this
    // once we implement user authentication.
  });

  res.status(201).json(habit);
});

module.exports = {
  getHabits,
  createHabit,
};