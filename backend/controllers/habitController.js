const asyncHandler = require('express-async-handler');
const Habit = require('../models/habitModel');
// We don't need the User model here anymore unless for specific checks,
// but it's fine to leave it for now.
const User = require('../models/userModel');

/**
 * @desc    Get habits for the logged-in user
 * @route   GET /api/habits
 * @access  Private
 */
const getHabits = asyncHandler(async (req, res) => {
  // Find habits only for the logged-in user
  const habits = await Habit.find({ user: req.user.id });
  res.status(200).json(habits);
});

/**
 * @desc    Create a new habit for the logged-in user
 * @route   POST /api/habits
 * @access  Private
 */
const createHabit = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error('Please add a name field');
  }

  const habit = await Habit.create({
    name: req.body.name,
    user: req.user.id, // Associate habit with the logged-in user
  });

  res.status(201).json(habit);
});

/**
 * @desc    Update a habit for the logged-in user
 * @route   PUT /api/habits/:id
 * @access  Private
 */
const updateHabit = asyncHandler(async (req, res) => {
  const habit = await Habit.findById(req.params.id);

  if (!habit) {
    res.status(404);
    throw new Error('Habit not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the habit user
  if (habit.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedHabit = await Habit.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // This option returns the modified document
  });

  res.status(200).json(updatedHabit);
});

/**
 * @desc    Delete a habit for the logged-in user
 * @route   DELETE /api/habits/:id
 * @access  Private
 */
const deleteHabit = asyncHandler(async (req, res) => {
  const habit = await Habit.findById(req.params.id);

  if (!habit) {
    res.status(404);
    throw new Error('Habit not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the habit user
  if (habit.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await habit.deleteOne();

  res.status(200).json({ id: req.params.id, message: 'Habit removed' });
});

module.exports = {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
};