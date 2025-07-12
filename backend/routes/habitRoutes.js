const express = require('express');
const router = express.Router();
const { getHabits, createHabit } = require('../controllers/habitController');

// Route for getting all habits and creating a new habit
router.route('/').get(getHabits).post(createHabit);

module.exports = router;