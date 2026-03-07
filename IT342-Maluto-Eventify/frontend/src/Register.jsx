import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from './component/Alert'; // Import the custom Alert component

const Register = () => {
  const [role, setRole] = useState('STUDENT');
  const [formData, setFormData] = useState({ fullName: '', schoolId: '', email: '', password: '' });

  // State for the custom alert
  const [alertConfig, setAlertConfig] = useState({ message: '', type: 'error' });

  const navigate = useNavigate();

  const isStudent = role === 'STUDENT';
  const color = isStudent ? '#ff9c5e' : '#9864ff';

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/v1/auth/register', { ...formData, role });

      // Use custom alert for success
      setAlertConfig({ message: "Account created!", type: 'success' });

      // Optional: Delay navigation so the user can see the success alert
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      // Use custom alert for errors
      setAlertConfig({
        message: err.response?.data || "Registration failed",
        type: 'error'
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* Render the Alert component if there is a message */}
      {alertConfig.message && (
        <Alert
          message={alertConfig.message}
          type={alertConfig.type}
          onClose={() => setAlertConfig({ message: '', type: 'error' })}
        />
      )}

      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-lg text-center">
        <h1 style={{color}} className="font-bold text-3xl mb-8">Eventify</h1>
        <div className="flex mb-8 border rounded-xl overflow-hidden">
          <button onClick={() => setRole('STUDENT')} className={`flex-1 py-3 ${isStudent ? 'bg-[#ff9c5e] text-white' : 'bg-white text-gray-400'}`}>Student</button>
          <button onClick={() => setRole('ORGANIZER')} className={`flex-1 py-3 ${!isStudent ? 'bg-[#9864ff] text-white' : 'bg-white text-gray-400'}`}>Organizer</button>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <input placeholder="Full Name" className="w-full border p-3.5 rounded-xl outline-none" onChange={e => setFormData({...formData, fullName: e.target.value})} required />
          <input placeholder={isStudent ? "Student ID" : "Student / Employee ID"} className="w-full border p-3.5 rounded-xl outline-none" onChange={e => setFormData({...formData, schoolId: e.target.value})} required />
          <input type="email" placeholder="University Email" className="w-full border p-3.5 rounded-xl outline-none" onChange={e => setFormData({...formData, email: e.target.value})} required />
          <input type="password" placeholder="Password" className="w-full border p-3.5 rounded-xl outline-none" onChange={e => setFormData({...formData, password: e.target.value})} required />
          <button type="submit" style={{backgroundColor: color}} className="w-full text-white py-4 rounded-xl font-bold mt-4 transition">Register</button>
        </form>
        <p className="mt-8 text-sm">Already have an account? <Link to="/login" style={{color}} className="font-bold">Log In</Link></p>
      </div>
    </div>
  );
};

export default Register;