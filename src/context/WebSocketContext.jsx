// src/context/WebSocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const WebSocketContext = createContext(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket('wss://your-server.com/ws'); // Replace with correct URL
        setSocket(ws);

        ws.onopen = () => console.log('✅ WebSocket Connected');
        ws.onerror = (err) => console.error('❌ WebSocket Error:', err);
        ws.onclose = (event) => console.warn(`⚠️ WebSocket Closed (Code: ${event.code})`);

        return () => ws.close();
    }, []);

    return (
        <WebSocketContext.Provider value={socket}>
            {children}
        </WebSocketContext.Provider>
    );
};
