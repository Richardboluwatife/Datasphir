import React from 'react';

const ShipmentCard = ({ shipment }) => {
    return (
        <div className="p-4 border rounded-lg shadow bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-2">Shipment ID: {shipment.id}</h2>
            <p>Status: <span className="font-medium">{shipment.status}</span></p>
            <p>Location: {shipment.location}</p>
            <p>ETA: {shipment.eta}</p>
        </div>
    );
};

export default ShipmentCard;
