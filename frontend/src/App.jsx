import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

// Layout for the main application (with header)
const AppLayout = () => (
  <div className="bg-slate-900 text-white min-h-screen font-sans">
    <Header />
    <main className="container mx-auto max-w-4xl p-8">
      <Outlet /> {/* Nested routes will render here */}
    </main>
  </div>
);

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            {/* Add other private routes here later */}
          </Route>
        </Routes>
      </Router>
      <ToastContainer theme="dark" />
    </>
  );
}

export default App;