// src/App.jsx
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import ThemeToggle from './components/ThemeToggle';
import { WebSocketProvider } from './context/WebSocketContext';

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <WebSocketProvider>
      <div className="min-h-screen bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="p-4 flex justify-between items-center shadow">
          <h1 className="text-2xl font-bold">Logistics Dashboard</h1>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </header>
        <Dashboard />
      </div>
    </WebSocketProvider>
  );
};

export default App;
