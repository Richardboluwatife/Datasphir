import React from 'react';

const ThemeToggle = ({ theme, setTheme }) => {
    return (
        <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded"
        >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
    );
};

export default ThemeToggle;