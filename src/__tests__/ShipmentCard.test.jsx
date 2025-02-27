import { render, screen } from '@testing-library/react';
import ShipmentCard from '../components/ShipmentCard';

test('renders shipment details', () => {
    const shipment = { id: '001', status: 'In Transit', location: 'Lagos', eta: '2 days' };
    render(<ShipmentCard shipment={shipment} />);

    expect(screen.getByText(/Shipment ID: 001/i)).toBeInTheDocument();
    expect(screen.getByText(/In Transit/i)).toBeInTheDocument();
    expect(screen.getByText(/Lagos/i)).toBeInTheDocument();
    expect(screen.getByText(/2 days/i)).toBeInTheDocument();
});
