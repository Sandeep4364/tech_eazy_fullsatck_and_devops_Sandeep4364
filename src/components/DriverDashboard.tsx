import React, { useState } from 'react';
import { MapPin, Package, CheckCircle, Clock, Navigation, Phone, AlertCircle } from 'lucide-react';
import { Parcel } from '../types';

const DriverDashboard: React.FC = () => {
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [activeTab, setActiveTab] = useState('assigned');
  const [parcelFilter, setParcelFilter] = useState('All Parcels');

  // Mock data
  const driverStats = {
    assignedParcels: 8,
    delivered: 12,
    pending: 3,
    failed: 0,
    currentLocation: 'Sector 18, Noida'
  };

  const assignedParcels: Parcel[] = [
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
      status: 'picked_up',
      deliveryFee: 8.00,
      createdAt: '2024-07-01T10:00:00Z',
      isFragile: true,
      requiresSignature: true,
      assignedDriverId: 'D001',
      vendorId: 'V001',
      pincode: '110002'
    },
    {
      id: 'P002',
      trackingId: 'ZMD789012EFGH',
      customerId: 'C002',
      customerName: 'Jane Smith',
      customerPhone: '+91-8765432109',
      pickupAddress: '789 Pine St, Midtown, Delhi 110003',
      deliveryAddress: '321 Elm St, Suburb, Delhi 110004',
      parcelSize: 'small',
      weight: 0.8,
      status: 'in_transit',
      deliveryFee: 5.00,
      createdAt: '2024-07-01T11:00:00Z',
      isFragile: false,
      requiresSignature: false,
      assignedDriverId: 'D001',
      vendorId: 'V002',
      pincode: '110004'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'picked_up': return 'bg-blue-100 text-blue-800';
      case 'in_transit': return 'bg-purple-100 text-purple-800';
      case 'out_for_delivery': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'picked_up': return <Package className="h-4 w-4" />;
      case 'in_transit': return <Navigation className="h-4 w-4" />;
      case 'out_for_delivery': return <MapPin className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const updateParcelStatus = (parcelId: string, newStatus: string) => {
    // In real app, this would update the backend
    console.log(`Updating parcel ${parcelId} to status ${newStatus}`);
  };

  const groupParcelsByPincode = (parcels: Parcel[]) => {
    return parcels.reduce((groups, parcel) => {
      const pincode = parcel.pincode;
      if (!groups[pincode]) {
        groups[pincode] = [];
      }
      groups[pincode].push(parcel);
      return groups;
    }, {} as Record<string, Parcel[]>);
  };

  const groupedParcels = groupParcelsByPincode(assignedParcels);

  // Filter assignedParcels based on parcelFilter
  const filteredAssignedParcels = parcelFilter === 'All Parcels'
    ? assignedParcels
    : assignedParcels.filter(parcel => {
        if (parcelFilter === 'Picked Up') return parcel.status === 'picked_up';
        if (parcelFilter === 'In Transit') return parcel.status === 'in_transit';
        if (parcelFilter === 'Out for Delivery') return parcel.status === 'out_for_delivery';
        return true;
      });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Driver Dashboard</h1>
              <p className="text-gray-600">Vehicle ID: VH001 • {driverStats.currentLocation}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setAttendanceMarked(!attendanceMarked)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  attendanceMarked
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                }`}
              >
                {attendanceMarked ? '✅ Attendance Marked' : 'Mark Attendance'}
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Update Location</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Assigned Parcels</p>
                <p className="text-3xl font-bold text-gray-900">{driverStats.assignedParcels}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivered Today</p>
                <p className="text-3xl font-bold text-gray-900">{driverStats.delivered}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-gray-900">{driverStats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed</p>
                <p className="text-3xl font-bold text-gray-900">{driverStats.failed}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'assigned', label: 'Assigned Parcels', icon: Package },
                { id: 'grouped', label: 'Grouped by Pincode', icon: MapPin },
                { id: 'report', label: 'Delivery Report', icon: CheckCircle },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'assigned' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Your Assigned Parcels</h3>
                  <div className="flex space-x-2">
                    <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      value={parcelFilter}
                      onChange={(e) => setParcelFilter(e.target.value)}
                    >
                      <option>All Parcels</option>
                      <option>Picked Up</option>
                      <option>In Transit</option>
                      <option>Out for Delivery</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredAssignedParcels.map((parcel) => (
                    <div key={parcel.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <h4 className="text-lg font-semibold text-gray-900">#{parcel.trackingId}</h4>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(parcel.status)}`}>
                            {getStatusIcon(parcel.status)}
                            <span>{parcel.status.replace('_', ' ').toUpperCase()}</span>
                          </span>
                          {parcel.isFragile && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                              FRAGILE
                            </span>
                          )}
                          {parcel.requiresSignature && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                              SIGNATURE REQUIRED
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Customer Details</h5>
                          <p className="text-sm text-gray-600">📧 {parcel.customerName}</p>
                          <p className="text-sm text-gray-600">📱 {parcel.customerPhone}</p>
                          <p className="text-sm text-gray-600">📍 {parcel.deliveryAddress}</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Parcel Details</h5>
                          <p className="text-sm text-gray-600">Size: {parcel.parcelSize}</p>
                          <p className="text-sm text-gray-600">Weight: {parcel.weight}kg</p>
                          <p className="text-sm text-gray-600">Fee: ₹{parcel.deliveryFee}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-1">
                            <Phone className="h-4 w-4" />
                            <span>Call Customer</span>
                          </button>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>Navigate</span>
                          </button>
                        </div>
                        <div className="flex space-x-2">
                          {parcel.status === 'picked_up' && (
                            <button
                              onClick={() => updateParcelStatus(parcel.id, 'in_transit')}
                              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                            >
                              Mark In Transit
                            </button>
                          )}
                          {parcel.status === 'in_transit' && (
                            <button
                              onClick={() => updateParcelStatus(parcel.id, 'out_for_delivery')}
                              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                            >
                              Out for Delivery
                            </button>
                          )}
                          {parcel.status === 'out_for_delivery' && (
                            <button
                              onClick={() => updateParcelStatus(parcel.id, 'delivered')}
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                            >
                              Mark Delivered
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'grouped' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Parcels Grouped by Pincode</h3>
                  <p className="text-sm text-gray-600">Optimize your delivery route</p>
                </div>

                <div className="space-y-6">
                  {Object.entries(groupedParcels).map(([pincode, parcels]) => (
                    <div key={pincode} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">Pincode: {pincode}</h4>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {parcels.length} parcels
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {parcels.map((parcel) => (
                          <div key={parcel.id} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-900">#{parcel.trackingId}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(parcel.status)}`}>
                                {parcel.status.replace('_', ' ')}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{parcel.customerName}</p>
                            <p className="text-xs text-gray-500">{parcel.deliveryAddress}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex space-x-2">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                          Optimize Route
                        </button>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                          Start Delivery
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'report' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Today's Delivery Report</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold text-green-700">{driverStats.delivered}</p>
                        <p className="text-sm text-green-600">Delivered</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <Clock className="h-8 w-8 text-yellow-500" />
                      <div>
                        <p className="text-2xl font-bold text-yellow-700">{driverStats.pending}</p>
                        <p className="text-sm text-yellow-600">Pending</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <AlertCircle className="h-8 w-8 text-red-500" />
                      <div>
                        <p className="text-2xl font-bold text-red-700">{driverStats.failed}</p>
                        <p className="text-sm text-red-600">Failed</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-4">Performance Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Success Rate</span>
                      <span className="font-semibold text-green-600">
                        {(driverStats.delivered + driverStats.failed > 0
                          ? ((driverStats.delivered / (driverStats.delivered + driverStats.failed)) * 100).toFixed(1)
                          : '0.0'
                        )}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Distance</span>
                      <span className="font-semibold">45.2 km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Working Hours</span>
                      <span className="font-semibold">8.5 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;