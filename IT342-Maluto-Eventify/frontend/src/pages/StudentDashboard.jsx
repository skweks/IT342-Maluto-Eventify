import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../component/Sidebar';
import EventCard from '../component/EventCard';

const StudentDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleRegister = async (eventId) => {
        try {
            await axios.post(`http://localhost:8080/api/v1/events/${eventId}/register`);
            alert('Registration successful!');
            fetchEvents(); // Refresh data to show updated slots
        } catch (error) {
            alert('Registration failed');
        }
    };

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-white font-sans">
            <Sidebar role="STUDENT" />

            <div className="flex-1">
                <header className="h-20 border-b border-gray-100 flex items-center justify-between px-10">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search events..."
                            className="w-96 px-6 py-2 bg-gray-50 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <p className="font-bold text-gray-800">{user?.name}</p>
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            {user?.name?.charAt(0)}
                        </div>
                    </div>
                </header>

                <main className="p-10">
                    <h1 className="text-3xl font-black text-gray-900 mb-8">Upcoming Events</h1>

                    {filteredEvents.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <p className="text-lg">No campus events match your search.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredEvents.map((event) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    onRegister={handleRegister}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default StudentDashboard;