import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className="bg-slate-800 text-white p-4 mb-8 border-b-2 border-slate-700">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-cyan-400">
          <Link to="/">HabitTracker</Link>
        </div>
        <nav>
          <ul className="flex items-center gap-6">
            {user ? (
              <li>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                    <FaSignInAlt /> Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                    <FaUser /> Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;