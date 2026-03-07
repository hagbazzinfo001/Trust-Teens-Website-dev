

'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface AdminContextType {
  user: { email: string } | null;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  login: async () => false,
  logout: () => { },
});

// 🔐 CHANGE THESE TO YOUR ADMIN CREDENTIALS
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('admin_user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = { email };
      localStorage.setItem('admin_user', JSON.stringify(adminUser));
      setUser(adminUser);
      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem('admin_user');
    setUser(null);
  };

  return (
    <AdminContext.Provider
      value={{
        user,
        loading,
        isAdmin: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
