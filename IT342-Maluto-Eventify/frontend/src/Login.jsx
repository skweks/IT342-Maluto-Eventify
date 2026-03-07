import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from './component/Alert'; // Import the custom Alert component

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  // State for managing the custom alert
  const [alertConfig, setAlertConfig] = useState({ message: '', type: 'error' });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/login', formData);

      // Show success alert using Alert.jsx logic
      setAlertConfig({ message: "Login successful!", type: 'success' });

      // Store token/user data if necessary
      localStorage.setItem('token', response.data.token);

      // Delay navigation so the user sees the success message
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      // Show error alert for failed attempts
      setAlertConfig({
        message: err.response?.data || "Invalid email or password",
        type: 'error'
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* Conditionally render the Alert component */}
      {alertConfig.message && (
        <Alert
          message={alertConfig.message}
          type={alertConfig.type}
          onClose={() => setAlertConfig({ message: '', type: 'error' })}
        />
      )}

      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-lg text-center">
        <h1 className="text-[#ff9c5e] font-bold text-3xl mb-8">Eventify</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="University Email"
            className="w-full border p-3.5 rounded-xl outline-none"
            onChange={e => setFormData({...formData, email: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3.5 rounded-xl outline-none"
            onChange={e => setFormData({...formData, password: e.target.value})}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#ff9c5e] text-white py-4 rounded-xl font-bold mt-4 transition"
          >
            Log In
          </button>
        </form>

        <p className="mt-8 text-sm">
          Don't have an account? <Link to="/register" className="text-[#ff9c5e] font-bold">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;