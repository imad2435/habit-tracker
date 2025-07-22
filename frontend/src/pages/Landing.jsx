import React from 'react';
import { Link } from 'react-router-dom';
import { BsStars } from 'react-icons/bs';

function Landing() {
  return (
    <div className="min-h-screen bg-brand-dark font-sans flex flex-col justify-center items-center text-center p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center items-center gap-3 text-brand-mint mb-4">
          <BsStars size={32} />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-brand-light">
          Your Digital Garden for Habits
        </h1>
        <p className="max-w-xl mx-auto mt-6 text-lg text-brand-slate">
          Track daily. Stay consistent. See real progress.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link to="/register" className="bg-brand-mint text-brand-dark font-bold py-3 px-8 rounded-md text-lg hover:bg-opacity-90 transition-all">
            Go to start
          </Link>
          <Link to="/login" className="bg-white/10 text-brand-light font-bold py-3 px-8 rounded-md text-lg hover:bg-white/20 transition-all">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;