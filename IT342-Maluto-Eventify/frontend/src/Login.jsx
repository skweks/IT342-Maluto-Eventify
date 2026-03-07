import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from './component/Alert'; // Ensure this path matches your Alert.jsx location

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to hold the error message
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error before a new attempt

    try {
      // POST request to your Spring Boot backend [cite: 119, 278]
      const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
        email,
        password
      });

      // If successful, navigate to the Dashboard [cite: 136]
      navigate('/dashboard');
    } catch (err) {
      // Capture the specific error message from your AuthController (e.g., "Account not found") [cite: 330]
      const errorMessage = err.response?.data || "Login failed. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 relative">
      {/* Efficient use of the Alert component:
          It only renders if 'error' has a value.
      */}
      <Alert
        message={error}
        type="error"
        onClose={() => setError('')}
      />

      <div className="flex w-full max-w-4xl bg-white rounded-[2.5rem] shadow-xl overflow-hidden border">
        {/* Left Side: Branding */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-orange-50/30 p-12 border-r relative">
          <h1 className="text-[#ff9c5e] font-bold text-2xl absolute top-10 left-10">Eventify</h1>
          <span className="text-6xl mb-4">🎓</span>
          <h2 className="text-xl font-bold">Discover Campus Events</h2>
        </div>

        {/* Right Side: Form [cite: 437] */}
        <div className="w-full md:w-1/2 p-12">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">Log In</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">University Email</label>
              <input
                type="email"
                placeholder="student@cit.edu"
                className="w-full border p-3.5 rounded-xl focus:ring-1 focus:ring-[#ff9c5e] outline-none transition-all"
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border p-3.5 rounded-xl focus:ring-1 focus:ring-[#ff9c5e] outline-none transition-all"
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#ff9c5e] text-white py-4 rounded-xl font-bold hover:shadow-lg hover:bg-[#e88b4d] transition-all transform active:scale-[0.98]"
            >
              Sign in
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?
            <Link to="/register" className="text-[#ff9c5e] font-bold hover:underline ml-1">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;