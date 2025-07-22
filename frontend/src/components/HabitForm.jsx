import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createHabit } from '../features/habits/habitSlice';

function HabitForm() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createHabit({ name: text }));
    setText('');
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          name="text"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a new habit..."
          className="flex-grow bg-slate-800 border-2 border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
        />
        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          Add Habit
        </button>
      </form>
    </div>
  );
}

export default HabitForm;