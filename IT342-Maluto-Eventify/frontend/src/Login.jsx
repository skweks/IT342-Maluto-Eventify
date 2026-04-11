import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
            e.preventDefault();
            try {
                const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
                    email,
                    password
                });

                const user = response.data;
                // Store user info to check role for theming
                localStorage.setItem('user', JSON.stringify(user));

                // Direct to dashboard based on role
                if (user.role === 'ORGANIZER') {
                    navigate('/organizer-dashboard');
                } else {
                    navigate('/student-dashboard');
                }
            } catch (err) {
                setError('Invalid email or password');
            }
        };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
            {/* Header */}
            <div className="p-6">
                <h1 className="text-xl font-bold text-blue-600">Eventify</h1>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex min-h-[500px]">

                    {/* Left Side - Gray Background */}
                    <div className="w-1/2 bg-gray-200 flex flex-col items-center justify-center p-12 text-center">
                        <div className="mb-6">
                            {/* Graduation Cap Icon */}
                            <h1 style={{ fontSize: '60px' }}>🎓</h1>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Discover Campus Events</h2>
                        <p className="text-gray-500 text-sm max-w-xs">
                            Log in to register for webinars, parties, and club activities.
                        </p>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="w-1/2 bg-white flex flex-col justify-center p-12">
                        <div className="max-w-sm mx-auto w-full">
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">Log In</h2>
                            <p className="text-gray-500 text-sm mb-8">Welcome back! Please enter your details.</p>

                            {error && (
                                <div className="text-red-500 text-sm mb-4 bg-red-50 px-4 py-2 rounded">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleLogin} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        University Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="student@cit.edu"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
                                        <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                            Remember me
                                        </label>
                                    </div>
                                    <button
                                        type="button"
                                        className="text-sm text-blue-600 hover:underline font-medium"
                                        onClick={() => navigate('/forgot-password')}
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition duration-200 text-sm"
                                >
                                    Sign in
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600">
                                    Don't have an account?{' '}
                                    <button
                                        onClick={() => navigate('/register')}
                                        className="text-blue-600 hover:underline font-medium"
                                    >
                                        Sign up
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;