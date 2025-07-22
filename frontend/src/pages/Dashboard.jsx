import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import HabitForm from '../components/HabitForm';
import HabitList from '../components/HabitList';
import { getHabits, reset } from '../features/habits/habitSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { habits, isLoading, isError, message } = useSelector((state) => state.habits);

  useEffect(() => {
    if (isError) {
      console.log(message); // Or use toast for errors
    }

    if (!user) {
      navigate('/login');
      return; // Stop execution if no user
    }
    
    dispatch(getHabits());

    // When the component unmounts, reset the habits state
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading && habits.length === 0) {
    // Show a more elegant loading state for the initial fetch
    return (
        <div className="text-center">
            <h1 className="text-2xl text-slate-400">Loading your star chart...</h1>
        </div>
    );
  }

  return (
    <>
      <motion.section 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold">Welcome {user && user.name}</h1>
        <p className="text-slate-400 mt-2">Your Habits Dashboard</p>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <HabitForm />
      </motion.div>


      <section className="mt-8">
        {habits.length > 0 ? (
          <HabitList habits={habits} />
        ) : (
          !isLoading && <h3 className="text-center text-slate-400">You have not set any habits yet.</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;