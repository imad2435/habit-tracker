import axios from 'axios';

const API_URL = 'http://localhost:5001/api/habits/';

// Create new habit
const createHabit = async (habitData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(API_URL, habitData, config);
  return response.data;
};

// Get user habits
const getHabits = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Update user habit
const updateHabit = async (habitData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.put(API_URL + habitData.id, habitData, config);
  return response.data;
};

// Delete user habit
const deleteHabit = async (habitId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.delete(API_URL + habitId, config);
  return response.data;
};

// Toggle habit completion
const toggleHabit = async (habitId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.put(API_URL + habitId + '/toggle', {}, config);
  return response.data;
};

const habitService = {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
  toggleHabit,
};

export default habitService;