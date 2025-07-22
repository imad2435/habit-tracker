import React, { useState, useEffect } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';

function Login() {
  // ... (Keep all the existing hook and function logic)
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) console.log(message); // Use toast later
    if (isSuccess || user) navigate('/dashboard');
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  const onChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const onSubmit = (e) => { e.preventDefault(); dispatch(login({ email, password })); };

  return (
    <div className="bg-brand-dark min-h-screen font-sans flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-light flex justify-center items-center gap-3">
            <FiLogIn /> Welcome Back
          </h1>
          <p className="text-brand-slate mt-2">Let's login your account.</p>
        </div>
        <form onSubmit={onSubmit} className="bg-white/5 p-8 rounded-lg shadow-2xl">
          <div className="mb-4">
            <label className="block text-brand-slate text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={email} onChange={onChange} className="w-full bg-brand-dark text-brand-light border border-white/20 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-mint" required />
          </div>
          <div className="mb-6">
            <label className="block text-brand-slate text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={onChange} className="w-full bg-brand-dark text-brand-light border border-white/20 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-mint" required />
          </div>
          <button type="submit" className="w-full bg-brand-mint text-brand-dark font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-all">
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
        <div className="text-center mt-6">
          <Link to="/register" className="text-sm text-brand-slate hover:text-brand-mint">Don't have an account? Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
export default Login;