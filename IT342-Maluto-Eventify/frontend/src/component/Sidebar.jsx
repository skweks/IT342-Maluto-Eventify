import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ role }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isOrganizer = role === 'ORGANIZER';

    // Theme colors based on role
    const themeColor = isOrganizer ? 'bg-[#1E1B4B]' : 'bg-white';
    const textColor = isOrganizer ? 'text-gray-300' : 'text-gray-600';
    const activeBg = isOrganizer ? 'bg-purple-700 text-white' : 'bg-blue-50 text-blue-600';
    const activeBorder = isOrganizer ? '' : 'border-l-4 border-blue-600';
    const logoColor = isOrganizer ? 'text-white' : 'text-blue-600';

    // Different menu items for each role
    const organizerMenuItems = [
        { name: 'Manage Events', path: '/organizer-dashboard', icon: '📋' },
        { name: 'Create New Event', path: '/create-event', icon: '➕' },
        { name: 'Broadcast Announcements', path: '/announcements', icon: '📢' },
    ];

    const studentMenuItems = [
        { name: 'Discover Events', path: '/student-dashboard', icon: '🔍' },
        { name: 'My Registrations', path: '/my-registrations', icon: '📋' },
        { name: 'Bookmarks', path: '/bookmarks', icon: '🔖' },
    ];

    const studentCategories = [
        { name: 'Webinars', path: '/category/webinars' },
        { name: 'Campus Activities', path: '/category/campus-activities' },
        { name: 'Paid Events', path: '/category/paid-events' },
    ];

    const menuItems = isOrganizer ? organizerMenuItems : studentMenuItems;

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className={`w-56 h-screen flex flex-col ${themeColor} border-r border-gray-200`}>
            {/* Logo Section */}
            <div className="p-6">
                <h1 className={`text-lg font-bold ${logoColor}`}>
                    Eventify {isOrganizer && <span className="text-purple-400 text-sm font-normal">- Organizer Console</span>}
                </h1>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 px-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <div
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition-all text-sm
                                ${isActive
                                    ? `${activeBg} font-medium ${isOrganizer ? '' : 'bg-blue-50 text-blue-600'}`
                                    : `${textColor} hover:bg-gray-100`}`}
                        >
                            <span>{item.name}</span>
                        </div>
                    );
                })}

                {/* Categories for Student */}
                {!isOrganizer && (
                    <div className="mt-6">
                        <p className="px-4 text-xs font-semibold text-gray-400 uppercase mb-2">Categories</p>
                        {studentCategories.map((cat) => (
                            <div
                                key={cat.name}
                                onClick={() => navigate(cat.path)}
                                className={`flex items-center px-4 py-2 rounded-md cursor-pointer text-sm text-gray-600 hover:bg-gray-50`}
                            >
                                {cat.name}
                            </div>
                        ))}
                    </div>
                )}
            </nav>

            {/* Logout Section */}
            <div className="p-4">
                <button
                    onClick={handleLogout}
                    className={`w-full py-2 rounded-md text-sm font-medium transition
                        ${isOrganizer
                            ? 'bg-purple-600 text-white hover:bg-purple-700'
                            : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;