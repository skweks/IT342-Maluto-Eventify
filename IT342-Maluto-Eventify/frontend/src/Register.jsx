import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from './component/Alert';

const Register = () => {
  const [role, setRole] = useState('STUDENT');
  // CHANGE: changed 'fullName' to 'name' to match your User.java entity
  // Note: 'schoolId' is not in your User.java, so it will be ignored by the backend
  const [formData, setFormData] = useState({ fullName: '', schoolId: '', email: '', password: '' });

  const [alertConfig, setAlertConfig] = useState({ message: '', type: 'error' });
  const navigate = useNavigate();

  const isStudent = role === 'STUDENT';
  const color = isStudent ? '#1e90ff' : '#9864ff';

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // The payload now sends 'name', which matches the backend @Column(name = "name")
      await axios.post('http://localhost:8080/api/v1/auth/register', { ...formData, role });

      setAlertConfig({ message: "Account created!", type: 'success' });
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setAlertConfig({
        message: err.response?.data || "Registration failed",
        type: 'error'
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {alertConfig.message && (
        <Alert
          message={alertConfig.message}
          type={alertConfig.type}
          onClose={() => setAlertConfig({ message: '', type: 'error' })}
        />
      )}

      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-lg text-center">
        <h1 style={{color}} className="font-bold text-3xl mb-8 font-sans">Eventify</h1>

        <div className="flex mb-8 border rounded-xl overflow-hidden font-sans">
          <button
            type="button"
            onClick={() => setRole('STUDENT')}
            className={`flex-1 py-3 font-bold transition ${isStudent ? 'bg-[#1e90ff] text-white' : 'bg-white text-gray-400'}`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setRole('ORGANIZER')}
            className={`flex-1 py-3 font-bold transition ${!isStudent ? 'bg-[#9864ff] text-white' : 'bg-white text-gray-400'}`}
          >
            Organizer
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-4 font-sans text-left">
          <div>
            <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Full Name</label>
            <input
              placeholder="John Doe"
              className="w-full border p-3.5 rounded-xl outline-none focus:border-gray-400"
              // CHANGE: onChange now updates 'name'
              onChange={e => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 ml-1 uppercase">ID Number</label>
            <input
              placeholder={isStudent ? "23-6927-565" : "Employee ID"}
              className="w-full border p-3.5 rounded-xl outline-none focus:border-gray-400"
              onChange={e => setFormData({...formData, schoolId: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 ml-1 uppercase">University Email</label>
            <input
              type="email"
              placeholder="user@cit.edu"
              className="w-full border p-3.5 rounded-xl outline-none focus:border-gray-400"
              onChange={e => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border p-3.5 rounded-xl outline-none focus:border-gray-400"
              onChange={e => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <button
            type="submit"
            style={{backgroundColor: color}}
            className="w-full text-white py-4 rounded-xl font-bold mt-4 shadow-lg active:scale-95 transition transform"
          >
            Register as {isStudent ? 'Student' : 'Organizer'}
          </button>
        </form>

        <p className="mt-8 text-sm font-sans">
          Already have an account? <Link to="/login" style={{color}} className="font-bold hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;