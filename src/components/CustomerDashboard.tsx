import React, { useState } from 'react';
import { Package, Plus, Search, MapPin, Phone, MessageCircle } from 'lucide-react';
import { Parcel } from '../types';

const CustomerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('parcels');
  const [trackingId, setTrackingId] = useState('');
  const [showCreateParcel, setShowCreateParcel] = useState(false);

  // Mock customer parcels
  const customerParcels: Parcel[] = [
    {
      id: 'P001',
      trackingId: 'ZMD123456ABCD',
      customerId: 'C001',
      customerName: 'John Doe',
      customerPhone: '+91-9876543210',
      customerEmail: 'john@example.com',
      pickupAddress: '123 Main St, Downtown, Delhi 110001',
      deliveryAddress: '456 Oak Ave, Uptown, Delhi 110002',
      parcelSize: 'medium',
      weight: 2.5,
      status: 'in_transit',
      deliveryFee: 8.00,
      createdAt: '2024-07-01T10:00:00Z',
      isFragile: true,
      requiresSignature: true,
      assignedDriverId: 'D001',
      vendorId: 'V001',
      pincode: '110002',
      specialInstructions: 'Please call before delivery'
    },
    {
      id: 'P002',
      trackingId: 'ZMD789012EFGH',
      customerId: 'C001',
      customerName: 'John Doe',
      customerPhone: '+91-9876543210',
      pickupAddress: '789 Pine St, Midtown, Delhi 110003',
      deliveryAddress: '456 Oak Ave, Uptown, Delhi 110002',
      parcelSize: 'small',
      weight: 0.8,
      status: 'delivered',
      deliveryFee: 5.00,
      createdAt: '2024-06-30T11:00:00Z',
      isFragile: false,
      requiresSignature: false,
      assignedDriverId: 'D001',
      vendorId: 'V002',
      pincode: '110002'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'picked_up': return 'bg-blue-100 text-blue-800';
      case 'in_transit': return 'bg-purple-100 text-purple-800';
      case 'out_for_delivery': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      {/* Customer dashboard UI here */}
      {/* For brevity, UI implementation is omitted */}
      <h1>Customer Dashboard</h1>
    </div>
  );
};

export default CustomerDashboard;
