import React, { useEffect, useState } from 'react';
import ShipmentCard from './ShipmentCard';

const mockShipments = [
    { id: '001', status: 'In Transit', location: 'Lagos', eta: '2 days' },
    { id: '002', status: 'Delivered', location: 'Abuja', eta: 'Arrived' },
    { id: '003', status: 'Pending', location: 'Port Harcourt', eta: '5 days' },
];

const Dashboard = () => {
    const [shipments, setShipments] = useState(mockShipments);

    useEffect(() => {
        const ws = new WebSocket('wss://example.com/ws');
        ws.onmessage = (event) => {
            const updatedShipment = JSON.parse(event.data);
            setShipments((prev) =>
                prev.map((s) => (s.id === updatedShipment.id ? updatedShipment : s))
            );
        };
        return () => ws.close();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {shipments.map((shipment) => (
                <ShipmentCard key={shipment.id} shipment={shipment} />
            ))}
        </div>
    );
};

export default Dashboard;
