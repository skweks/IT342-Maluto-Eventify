import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './component/Sidebar';

const CreateEvent = () => {
    const navigate = useNavigate();

    // All your inputs are stored in this single object
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        date: '',
        startTime: '',
        location: '',
        totalSlots: 0,
        price: 0
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create a guaranteed clean payload
            const payload = {
                title: eventData.title,
                description: eventData.description,
                date: eventData.date,
                startTime: eventData.startTime,
                location: eventData.location,
                totalSlots: parseInt(eventData.totalSlots) || 0,
                price: parseFloat(eventData.price) || 0
            };

            console.log("Sending payload:", payload); // Check your browser console

            await axios.post('http://localhost:8080/api/v1/events', payload);

            alert("Event successfully published!");
            navigate('/organizer-dashboard');
        } catch (err) {
            console.error("Backend Error:", err.response?.data);
            alert(`Error: ${err.response?.data?.message || "Failed to create event. Check console."}`);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#F8F9FD]">
            <Sidebar role="ORGANIZER" />
            <div className="flex-1 p-10">
                <div className="max-w-2xl bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-purple-900 mb-8 font-sans">Create New Event</h2>
                    <form onSubmit={handleSubmit} className="space-y-5 font-sans">

                        <input className="w-full p-4 bg-gray-50 rounded-2xl outline-none" placeholder="Event Title"
                            onChange={e => setEventData({...eventData, title: e.target.value})} required />

                        {/* ADDED: Description Field */}
                        <textarea
                            className="w-full p-4 bg-gray-50 rounded-2xl outline-none resize-none"
                            placeholder="Event Description"
                            rows="4"
                            onChange={e => setEventData({...eventData, description: e.target.value})}
                            required
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 ml-2 uppercase">Date</label>
                                <input type="date" className="w-full p-4 bg-gray-50 rounded-2xl outline-none"
                                    onChange={e => setEventData({...eventData, date: e.target.value})} required />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 ml-2 uppercase">Start Time</label>
                                <input type="time" className="w-full p-4 bg-gray-50 rounded-2xl outline-none"
                                    onChange={e => setEventData({...eventData, startTime: e.target.value})} required />
                            </div>
                        </div>

                        <input className="w-full p-4 bg-gray-50 rounded-2xl outline-none" placeholder="Location"
                            onChange={e => setEventData({...eventData, location: e.target.value})} required />

                        <div className="grid grid-cols-2 gap-4">
                            <input type="number" className="p-4 bg-gray-50 rounded-2xl outline-none" placeholder="Price (0 for Free)"
                                onChange={e => setEventData({...eventData, price: parseFloat(e.target.value) || 0})} />
                            <input type="number" className="p-4 bg-gray-50 rounded-2xl outline-none" placeholder="Capacity"
                                onChange={e => setEventData({...eventData, totalSlots: parseInt(e.target.value) || 0})} required />
                        </div>

                        <button type="submit" className="w-full bg-[#4F46E5] text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-indigo-700 transition transform active:scale-95">
                            Publish Event
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;