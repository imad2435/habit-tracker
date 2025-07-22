import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteHabit, toggleHabit } from '../features/habits/habitSlice';
import { LiaSeedlingSolid } from 'react-icons/lia';
import { BsTrash } from 'react-icons/bs';

function HabitItem({ habit }) {
  const dispatch = useDispatch();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isCompleted = habit.completedDates.some(
    (date) => new Date(date).getTime() === today.getTime()
  );

  return (
    <div className="bg-white/5 p-4 rounded-lg flex items-center justify-between mb-3 shadow-lg transition-all hover:bg-white/10">
      <div className="flex items-center">
        <button 
          onClick={() => dispatch(toggleHabit(habit._id))} 
          className={`w-7 h-7 rounded-md flex items-center justify-center border-2 transition-all ${isCompleted ? 'bg-brand-mint border-brand-mint' : 'border-brand-slate hover:border-brand-mint'}`}
        >
          {isCompleted && <LiaSeedlingSolid className="text-brand-dark" size={20} />}
        </button>
        <span className={`ml-4 text-lg transition-all ${isCompleted ? 'text-brand-slate line-through' : 'text-brand-light'}`}>
          {habit.name}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-center">
            <div className="font-bold text-brand-amber">{habit.streak}</div>
            <div className="text-xs text-brand-slate">Streak</div>
        </div>
        <button onClick={() => dispatch(deleteHabit(habit._id))} className="text-brand-slate hover:text-red-500 transition-colors">
          <BsTrash size={20} />
        </button>
      </div>
    </div>
  );
}
export default HabitItem;