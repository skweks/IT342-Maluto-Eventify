import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../component/Sidebar';

const OrganizerDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [participants, setParticipants] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Stats - all set to 0/empty for initial state
    const stats = {
        totalCapacity: 0,
        confirmed: 0,
        pendingApproval: 0
    };

    useEffect(() => {
        // Fetch organizer's events from backend
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/organizer/events', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setEvents(response.data);
                if (response.data.length > 0) {
                    setSelectedEvent(response.data[0]);
                    // Fetch participants for selected event
                    const participantsRes = await axios.get(
                        `http://localhost:8080/api/v1/events/${response.data[0].id}/participants`,
                        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
                    );
                    setParticipants(participantsRes.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleCreateEvent = () => {
        navigate('/create-event');
    };

    const handleEditEvent = () => {
        if (selectedEvent) {
            navigate(`/edit-event/${selectedEvent.id}`);
        }
    };

    const handlePostAnnouncement = () => {
        navigate('/post-announcement');
    };

    const handleConfirm = async (participantId) => {
        try {
            await axios.post(`http://localhost:8080/api/v1/participants/${participantId}/confirm`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            // Refresh participants
        } catch (error) {
            console.error('Error confirming participant:', error);
        }
    };

    const handleReject = async (participantId) => {
        try {
            await axios.post(`http://localhost:8080/api/v1/participants/${participantId}/reject`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
        } catch (error) {
            console.error('Error rejecting participant:', error);
        }
    };

    const handleRemove = async (participantId) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/participants/${participantId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
        } catch (error) {
            console.error('Error removing participant:', error);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar role="ORGANIZER" />

            <div className="flex-1">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-8">
                    <div className="flex items-center gap-3">
                        <span className="text-xl">🔔</span>
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm">
                            {user?.name?.charAt(0) || 'O'}
                        </div>
                    </div>
                </header>

                <main className="p-8">
                    {/* Event Title & Actions */}
                    <div className="flex items-center gap-4 mb-6">
                        <h1 className="text-xl font-bold text-gray-900">
                            {selectedEvent?.title || 'Event Dashboard'}
                        </h1>
                        <button
                            onClick={handleEditEvent}
                            className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50"
                        >
                            Edit Event
                        </button>
                        <button
                            onClick={handlePostAnnouncement}
                            className="px-3 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700"
                        >
                            + Post Announcement
                        </button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="text-xs text-gray-500 mb-1">Total Capacity</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.totalCapacity}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="text-xs text-gray-500 mb-1">Confirmed</p>
                            <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="text-xs text-gray-500 mb-1">Pending Approval</p>
                            <p className="text-2xl font-bold text-orange-500">{stats.pendingApproval}</p>
                        </div>
                    </div>

                    {/* Participant List */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="font-semibold text-gray-800">Participant List</h3>
                        </div>
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Student Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">ID Number</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {participants.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-gray-400 text-sm">
                                            No participants yet
                                        </td>
                                    </tr>
                                ) : (
                                    participants.map((p) => (
                                        <tr key={p.id}>
                                            <td className="px-6 py-3 text-sm text-gray-900">{p.name}</td>
                                            <td className="px-6 py-3 text-sm text-gray-500">{p.studentId}</td>
                                            <td className="px-6 py-3">
                                                <span className={`px-2 py-1 text-xs rounded ${
                                                    p.status === 'Confirmed'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                    {p.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3">
                                                {p.status === 'Pending Payment' ? (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleConfirm(p.id)}
                                                            className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                                                        >
                                                            Confirm
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(p.id)}
                                                            className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => handleRemove(p.id)}
                                                        className="px-3 py-1 border border-gray-300 text-gray-600 text-xs rounded hover:bg-gray-50"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default OrganizerDashboard;