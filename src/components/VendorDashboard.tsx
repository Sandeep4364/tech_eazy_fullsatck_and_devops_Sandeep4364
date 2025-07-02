import React, { useState } from 'react';
import { Package, Upload, Calendar, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { DeliveryOrder } from '../types';

const VendorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Mock data
  const vendorStats = {
    totalOrders: 156,
    todayOrders: 12,
    pendingPickups: 8,
    completedToday: 4,
    subscriptionType: 'PRIME' as const
  };

  const deliveryOrders: DeliveryOrder[] = [
    {
      id: 'DO001',
      vendorId: 'V001',
      vendorName: 'Myntra Fashion',
      orderDate: '2024-07-01',
      totalParcels: 25,
      status: 'ready_for_pickup',
      parcels: ['P001', 'P002', 'P003'],
      fileUrl: '/uploads/order_details_001.xlsx'
    },
    {
      id: 'DO002',
      vendorId: 'V001',
      vendorName: 'Myntra Fashion',
      orderDate: '2024-06-30',
      totalParcels: 18,
      status: 'completed',
      parcels: ['P004', 'P005', 'P006']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'ready_for_pickup': return 'bg-green-100 text-green-800';
      case 'picked_up': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'ready_for_pickup': return <CheckCircle className="h-4 w-4" />;
      case 'picked_up': return <TrendingUp className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Vendor Dashboard</h1>
              <p className="text-gray-600">Manage your delivery orders</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
getStatusColor('pending')} flex items-center space-x-1`}>
                <Clock className="h-4 w-4" />
                <span>Pending</span>  
                vendorStats.subscriptionType === 'PRIME' ? 'bg-blue-100 text-blue-800' :
                 'bg-gray-100 text-gray-800' 
              
                {vendorStats.subscriptionType} Member
              </span>
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>Upload Order Details</span>
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
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{vendorStats.totalOrders}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Orders</p>
                <p className="text-3xl font-bold text-gray-900">{vendorStats.todayOrders}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Pickups</p>
                <p className="text-3xl font-bold text-gray-900">{vendorStats.pendingPickups}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Today</p>
                <p className="text-3xl font-bold text-gray-900">{vendorStats.completedToday}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'orders', label: 'Delivery Orders', icon: Package },
                { id: 'history', label: 'Order History', icon: Calendar },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp },
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
            {activeTab === 'orders' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Current Delivery Orders</h3>
                  <div className="flex space-x-2">
                  
                    
                  </div>
                </div>

                <div className="space-y-4">
                  {deliveryOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <h4 className="text-lg font-semibold text-gray-900">Order #{order.id}</h4>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span>{order.status.replace('_', ' ').toUpperCase()}</span>
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Total Parcels</p>
                          <p className="text-xl font-semibold text-gray-900">{order.totalParcels}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Order Date</p>
                          <p className="text-sm text-gray-900">{new Date(order.orderDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Vendor</p>
                          <p className="text-sm text-gray-900">{order.vendorName}</p>
                        </div>
                      </div>

                      {order.fileUrl && (
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Upload className="h-4 w-4 text-blue-500" />
                            <span className="text-sm text-blue-700">Order details file uploaded</span>
                            <a href={order.fileUrl} className="text-blue-600 hover:text-blue-800 text-sm underline">
                              Download
                            </a>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          {order.status === 'pending' && (
                            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                              Cancel Order
                            </button>
                          )}
                          {order.status === 'ready_for_pickup' && (
                            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                              Reschedule Pickup
                            </button>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                            View Details
                          </button>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                            Track Order
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Order History</h3>
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Historical Records</h4>
                  <p className="text-gray-600">View your complete order history and performance metrics</p>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Analytics & Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Monthly Performance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Orders Completed</span>
                        <span className="font-semibold">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Success Rate</span>
                        <span className="font-semibold text-green-600">98.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg. Processing Time</span>
                        <span className="font-semibold">2.3 hours</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Revenue Insights</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">This Month</span>
                        <span className="font-semibold">₹45,230</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Month</span>
                        <span className="font-semibold">₹38,950</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Growth</span>
                        <span className="font-semibold text-green-600">+16.1%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upload Order Details</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <form
              onSubmit={e => {
                e.preventDefault();
                setShowUploadModal(false);
                // handle upload logic here
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="orderFile">
                  Order Details File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Drop your Excel/CSV file here or click to browse
                  </p>
                  <input id="orderFile" name="orderFile" type="file" className="mt-2" accept=".xlsx,.xls,.csv" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vendor Name
                </label>
                
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Delivery Date
                </label>
                const dateInput = document.querySelector('input[type="date"]');
                dateInput.value = '2023-03-15';
                
                 

              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                >
                  Upload Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;