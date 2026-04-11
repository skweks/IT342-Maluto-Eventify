import React from 'react';

const EventCard = ({ event, onRegister }) => {
    return (
        <div className="border border-gray-100 rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-md transition duration-300 flex flex-col">

            {/* Banner Section */}
            <div className="h-44 bg-blue-50 flex items-center justify-center relative shrink-0">
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold text-gray-700 shadow-sm">
                    {event.location}
                </div>
                <span className="text-blue-200 font-bold italic text-2xl font-sans">Eventify</span>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-1">
                {/* Title */}
                <h3 className="font-bold text-gray-800 text-lg mb-1">{event.title}</h3>

                {/* Description (Moved right under the title) */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {event.description || "No description provided for this event."}
                </p>

                {/* Date & Time */}
                <p className="text-gray-500 text-xs mb-5 flex items-center gap-1 font-medium">
                    <span>🕒</span> {event.startTime || 'TBA'} • {new Date(event.date).toLocaleDateString()}
                </p>

                {/* Footer and Button */}
                <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 text-[10px] font-bold rounded-full ${event.price > 0 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                            {event.price > 0 ? `₱${event.price}` : 'FREE'}
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold">
                            {event.availableSlots} Slots Left
                        </span>
                    </div>

                    <button
                        onClick={() => onRegister(event.id)}
                        className="w-full bg-blue-600 text-white py-3 rounded-2xl text-sm font-bold hover:bg-blue-700 transition transform active:scale-95 shadow-md hover:shadow-lg"
                    >
                        Register Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;