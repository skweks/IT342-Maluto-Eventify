import React, { useEffect } from 'react';

const Alert = ({ message, type = 'error', onClose }) => {
  // Auto-close after 5 seconds for better Usability
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  const bgColor = type === 'error' ? 'bg-red-100 border-red-400 text-red-700' : 'bg-green-100 border-green-400 text-green-700';

  return (
    <div className={`fixed top-5 right-5 z-50 p-4 rounded-xl border-l-4 shadow-lg transition-all transform animate-bounce ${bgColor}`}>
      <div className="flex items-center">
        <span className="font-bold mr-2">{type === 'error' ? '⚠️' : '✅'}</span>
        <p className="text-sm font-medium">{message}</p>
        <button onClick={onClose} className="ml-4 font-bold text-lg">&times;</button>
      </div>
    </div>
  );
};

export default Alert;