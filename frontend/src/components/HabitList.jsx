import React from 'react';
import { motion } from 'framer-motion';
import HabitItem from './HabitItem';

function HabitList({ habits }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-300 mb-6">My Habits</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {habits.map((habit) => (
          <HabitItem key={habit._id} habit={habit} />
        ))}
      </motion.div>
    </div>
  );
}

export default HabitList;