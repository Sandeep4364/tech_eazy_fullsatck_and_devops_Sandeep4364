import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Check for stored auth data
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setAuthState({
        user: JSON.parse(storedUser),
        token: storedToken,
        isAuthenticated: true,
      });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call - replace with actual authentication
    const mockUsers = [
      { id: '1', email: 'admin@teacheazy.com', password: 'admin123', name: 'Admin User', role: 'admin' as const },
      { id: '2', email: 'vendor@teacheazy.com', password: 'vendor123', name: 'Vendor User', role: 'vendor' as const, vendorType: 'PRIME' as const },
      { id: '3', email: 'driver@teacheazy.com', password: 'driver123', name: 'Driver User', role: 'driver' as const, vehicleId: 'VH001' },
      { id: '4', email: 'customer@teacheazy.com', password: 'customer123', name: 'Customer User', role: 'customer' as const },
    ];

    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      const token = `mock-jwt-token-${user.id}`;
      
      setAuthState({
        user: userWithoutPassword,
        token,
        isAuthenticated: true,
      });
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    // Simulate registration - replace with actual API call
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email!,
      name: userData.name!,
      role: userData.role || 'customer',
      phone: userData.phone,
      address: userData.address,
    };

    const token = `mock-jwt-token-${newUser.id}`;
    
    setAuthState({
      user: newUser,
      token,
      isAuthenticated: true,
    });
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    return true;
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
    