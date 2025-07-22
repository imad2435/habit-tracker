const asyncHandler = require('express-async-handler');
const Habit = require('../models/habitModel');
const User = require('../models/userModel');

/**
 * @desc    Get habits for the logged-in user
 * @route   GET /api/habits
 * @access  Private
 */
const getHabits = asyncHandler(async (req, res) => {
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
    user: req.user.id,
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
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  if (habit.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  const updatedHabit = await Habit.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
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
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  if (habit.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  await habit.deleteOne();
  res.status(200).json({ id: req.params.id, message: 'Habit removed' });
});

/**
 * @desc    Toggle completion status for a habit for today
 * @route   PUT /api/habits/:id/toggle
 * @access  Private
 */
const toggleHabitCompletion = asyncHandler(async (req, res) => {
  const habit = await Habit.findById(req.params.id);

  if (!habit) {
    res.status(404);
    throw new Error('Habit not found');
  }

  if (habit.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const completedTodayIndex = habit.completedDates.findIndex(
    (date) => new Date(date).getTime() === today.getTime()
  );

  if (completedTodayIndex > -1) {
    habit.completedDates.splice(completedTodayIndex, 1);
  } else {
    habit.completedDates.push(today);
  }

  // --- Simple Streak Calculation Logic ---
  habit.completedDates.sort((a, b) => b - a);
  let currentStreak = 0;
  if (habit.completedDates.length > 0) {
    let lastDate = new Date();
    lastDate.setHours(0, 0, 0, 0);

    const todayCompleted = habit.completedDates.some(d => new Date(d).getTime() === lastDate.getTime());

    if (todayCompleted) {
      currentStreak = 1;
      let streakDate = new Date(lastDate);
      streakDate.setDate(streakDate.getDate() - 1);

      for (let i = 1; i < habit.completedDates.length; i++) {
        const nextDate = new Date(habit.completedDates[i]);
        if (nextDate.getTime() === streakDate.getTime()) {
          currentStreak++;
          streakDate.setDate(streakDate.getDate() - 1);
        } else if (nextDate.getTime() < streakDate.getTime()) {
          break; 
        }
      }
    }
  }
  habit.streak = currentStreak;
  // --- End of Streak Logic ---

  const updatedHabit = await habit.save();
  res.status(200).json(updatedHabit);
});

module.exports = {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  toggleHabitCompletion,
};