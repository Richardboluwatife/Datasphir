// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
const SessionExpiredModal = ({ onLogin }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white p-4 bg-opacity-75 z-50">
        <div className="bg-white dark:bg-gray-500 rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-xl font-bold mb-4">Your session has expired</h2>
          <p className="mb-4">Please log in again to continue using the app.</p>
          <button
            onClick={onLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Log in
          </button>
        </div>
      </div>
    );
};

export default SessionExpiredModal;
