export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'vendor' | 'driver' | 'customer';
  phone?: string;
  address?: string;
  vehicleId?: string; // for drivers
  vendorType?: 'NORMAL' | 'PRIME' | 'VIP'; // for vendors
}

export interface Parcel {
  id: string;
  trackingId: string;
  customerId: string;
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
  assignedDriverId?: string;
  vendorId?: string;
  deliveryOrderId?: string;
  pincode: string;
}

export interface DeliveryOrder {
  id: string;
  vendorId: string;
  vendorName: string;
  orderDate: string;
  totalParcels: number;
  status: 'pending' | 'processing' | 'ready_for_pickup' | 'picked_up' | 'completed';
  parcels: string[]; // parcel IDs
  fileUrl?: string; // uploaded order details file
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  subscriptionType: 'NORMAL' | 'PRIME' | 'VIP';
  isActive: boolean;
  totalOrders: number;
  createdAt: string;
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleId: string;
  vehicleType: string;
  isActive: boolean;
  currentLocation?: string;
  assignedParcels: string[];
  attendanceMarked: boolean;
  deliveryReport: {
    delivered: number;
    pending: number;
    failed: number;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}