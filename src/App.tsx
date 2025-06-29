import React, { useState, useEffect } from 'react';
import { Package, Plus, Search, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import axios from 'axios';

interface Parcel {
  id: string;
  trackingId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  pickupAddress: string;
  deliveryAddress: string;
  parcelSize: 'small' | 'medium' | 'large' | 'extra_large';
  weight: number;
  status: 'pending' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'cancelled';
  deliveryFee: number;
  createdAt: string;
  specialInstructions?: string;
  isFragile: boolean;
  requiresSignature: boolean;
}

function App() {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const [trackedParcel, setTrackedParcel] = useState<Parcel | null>(null);

  // Fetch parcels from backend API
  useEffect(() => {
    axios.get('http://localhost:4000/api/parcels')
      .then(res => setParcels(res.data))
      .catch(() => setParcels([]));
  }, []);

  const generateTrackingId = () => {
    const prefix = 'ZMD';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `${prefix}${timestamp}${random}`;
  };

  const calculateDeliveryFee = (size: string, weight: number) => {
    const baseFees = {
      small: 5.00,
      medium: 8.00,
      large: 12.00,
      extra_large: 18.00
    };
    let fee = baseFees[size as keyof typeof baseFees] || 8.00;
    if (weight > 10) {
      fee += (weight - 10) * 0.5;
    }
    return Math.round(fee * 100) / 100;
  };

  // Save new parcel to backend
  const handleCreateParcel = async (formData: any) => {
    const newParcel: Omit<Parcel, 'id'> = {
      trackingId: generateTrackingId(),
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      customerEmail: formData.customerEmail,
      pickupAddress: formData.pickupAddress,
      deliveryAddress: formData.deliveryAddress,
      parcelSize: formData.parcelSize,
      weight: parseFloat(formData.weight),
      status: 'pending',
      deliveryFee: calculateDeliveryFee(formData.parcelSize, parseFloat(formData.weight)),
      createdAt: new Date().toISOString(),
      specialInstructions: formData.specialInstructions,
      isFragile: formData.isFragile ? true : false,
      requiresSignature: formData.requiresSignature ? true : false
    };

    try {
      const res = await axios.post('http://localhost:4000/api/parcels', newParcel);
      setParcels([res.data, ...parcels]);
      setShowCreateForm(false);
    } catch (err) {
      alert('Failed to create parcel');
    }
  };

  const updateParcelStatus = (id: string, newStatus: Parcel['status']) => {
    setParcels(parcels.map(parcel => 
      parcel.id === id ? { ...parcel, status: newStatus } : parcel
    ));
  };

  const trackParcel = () => {
    const found = parcels.find(p => p.trackingId === trackingId);
    setTrackedParcel(found || null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'picked_up': return <Package className="h-5 w-5 text-blue-500" />;
      case 'in_transit': return <Truck className="h-5 w-5 text-purple-500" />;
      case 'out_for_delivery': return <Truck className="h-5 w-5 text-orange-500" />;
      case 'delivered': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled': return <AlertCircle className="h-5 w-5 text-red-500" />;
      default: return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

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

  const getNextStatus = (currentStatus: string) => {
    const statusFlow = {
      'pending': 'picked_up',
      'picked_up': 'in_transit',
      'in_transit': 'out_for_delivery',
      'out_for_delivery': 'delivered',
      'delivered': 'delivered',
      'cancelled': 'pending'
    };
    return statusFlow[currentStatus as keyof typeof statusFlow] || currentStatus;
  };

  const filteredParcels = parcels.filter(parcel =>
    parcel.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    parcel.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    parcel.customerPhone.includes(searchQuery)
  );

  const stats = {
    total: parcels.length,
    pending: parcels.filter(p => p.status === 'pending').length,
    inTransit: parcels.filter(p => p.status === 'in_transit').length,
    delivered: parcels.filter(p => p.status === 'delivered').length,
    revenue: parcels.reduce((sum, p) => sum + p.deliveryFee, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Zero Mile Delivery</h1>
                <p className="text-sm text-gray-600">Parcel Management System</p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>New Parcel</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Parcels</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Transit</p>
                <p className="text-3xl font-bold text-purple-600">{stats.inTransit}</p>
              </div>
              <Truck className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-3xl font-bold text-green-600">{stats.delivered}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-3xl font-bold text-green-600">${stats.revenue.toFixed(2)}</p>
              </div>
              <div className="text-green-500 text-2xl font-bold">$</div>
            </div>
          </div>
        </div>

        {/* Search and Tracking */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Search */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Parcels</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, tracking ID, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Tracking */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Track Parcel</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Enter tracking ID..."
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={trackParcel}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Track
              </button>
            </div>
            {trackedParcel && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  {getStatusIcon(trackedParcel.status)}
                  <span className="font-medium">{trackedParcel.customerName}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trackedParcel.status)}`}>
                    {trackedParcel.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Tracking ID: {trackedParcel.trackingId}</p>
              </div>
            )}
          </div>
        </div>

        {/* Parcels List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">All Parcels ({filteredParcels.length})</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredParcels.map((parcel) => (
              <div key={parcel.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(parcel.status)}
                      <span className="font-medium text-gray-900">{parcel.customerName}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(parcel.status)}`}>
                      {parcel.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">#{parcel.trackingId}</span>
                    <button
                      onClick={() => updateParcelStatus(parcel.id, getNextStatus(parcel.status))}
                      disabled={parcel.status === 'delivered'}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                    >
                      {parcel.status === 'delivered' ? 'Delivered' : 'Next Status'}
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">From: {parcel.pickupAddress}</p>
                    <p className="text-gray-600">To: {parcel.deliveryAddress}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone: {parcel.customerPhone}</p>
                    <p className="text-gray-600">Weight: {parcel.weight}kg</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Size: {parcel.parcelSize}</p>
                    <p className="text-gray-600">Fee: ${parcel.deliveryFee.toFixed(2)}</p>
                  </div>
                </div>
                
                {parcel.specialInstructions && (
                  <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Special Instructions:</strong> {parcel.specialInstructions}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Create Parcel Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Create New Parcel</h3>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const data = Object.fromEntries(formData.entries());
              handleCreateParcel(data);
            }} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                  <input
                    type="text"
                    name="customerName"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="customerPhone"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="customerEmail"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Address *</label>
                <textarea
                  name="pickupAddress"
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label>
                <textarea
                  name="deliveryAddress"
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parcel Size *</label>
                  <select
                    name="parcelSize"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select size</option>
                    <option value="small">Small (up to 2kg) - $5.00</option>
                    <option value="medium">Medium (up to 5kg) - $8.00</option>
                    <option value="large">Large (up to 15kg) - $12.00</option>
                    <option value="extra_large">Extra Large (up to 50kg) - $18.00</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg) *</label>
                  <input
                    type="number"
                    name="weight"
                    step="0.1"
                    min="0.1"
                    max="50"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                <textarea
                  name="specialInstructions"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input type="checkbox" name="isFragile" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">Fragile Item</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" name="requiresSignature" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">Requires Signature</span>
                </label>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Create Parcel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;