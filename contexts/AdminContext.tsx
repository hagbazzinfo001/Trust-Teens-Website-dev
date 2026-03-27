
// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';

// const API_BASE = 'https://trustteens-api.onrender.com/api/v1/admin/auth';

// interface AdminContextType {
//   user: { email: string } | null;
//   loading: boolean;
//   isAdmin: boolean;
//   login: (email: string, passwvord: string) => Promise<boolean>;
//   logout: () => void;
//   forgotPassword: (email: string) => Promise<{ success: boolean; message: string }>;
//   verifyOtp: (email: string, otp: string) => Promise<{ success: boolean; resetToken?: string; message: string }>;
//   resetPassword: (email: string, resetToken: string, newPassword: string, confirmNewPassword: string) => Promise<{ success: boolean; message: string }>;
//   getAuthHeaders: () => Record<string, string>;
// }

// const AdminContext = createContext<AdminContextType>({
//   user: null,
//   loading: true,
//   isAdmin: false,
//   login: async () => false,
//   logout: () => { },
//   forgotPassword: async () => ({ success: false, message: '' }),
//   verifyOtp: async () => ({ success: false, message: '' }),
//   resetPassword: async () => ({ success: false, message: '' }),
//   getAuthHeaders: () => ({}),
// });

// export function AdminProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<{ email: string } | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('admin_user');
//     const accessToken = localStorage.getItem('admin_access_token');

//     if (storedUser && accessToken) {
//       setUser(JSON.parse(storedUser));
//     }

//     setLoading(false);
//   }, []);

//   const getAuthHeaders = (): Record<string, string> => {
//     const token = localStorage.getItem('admin_access_token');
//     if (token) {
//       return { Authorization: `Bearer ${token}` };
//     }
//     return {};
//   };

//   const login = async (email: string, password: string): Promise<boolean> => {
//     try {
//       const res = await fetch(`${API_BASE}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!res.ok) return false;

//       const data = await res.json();

//       // Store tokens
//       if (data.accessToken) localStorage.setItem('admin_access_token', data.accessToken);
//       if (data.refreshToken) localStorage.setItem('admin_refresh_token', data.refreshToken);

//       const adminUser = { email };
//       localStorage.setItem('admin_user', JSON.stringify(adminUser));
//       setUser(adminUser);
//       return true;
//     } catch {
//       return false;
//     }
//   };

//   const forgotPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
//     try {
//       const res = await fetch(`${API_BASE}/forgot-password`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });

//       if (!res.ok) {
//         const errorData = await res.json().catch(() => null);
//         return { success: false, message: errorData?.message || 'Failed to send OTP. Please try again.' };
//       }

//       return { success: true, message: 'OTP has been sent to your email.' };
//     } catch {
//       return { success: false, message: 'Network error. Please try again.' };
//     }
//   };

//   const verifyOtp = async (email: string, otp: string): Promise<{ success: boolean; resetToken?: string; message: string }> => {
//     try {
//       const res = await fetch(`${API_BASE}/verify-otp`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, otp }),
//       });

//       if (!res.ok) {
//         const errorData = await res.json().catch(() => null);
//         return { success: false, message: errorData?.message || 'Invalid OTP. Please try again.' };
//       }

//       const data = await res.json();
//       return { success: true, resetToken: data.resetToken, message: 'OTP verified successfully.' };
//     } catch {
//       return { success: false, message: 'Network error. Please try again.' };
//     }
//   };

//   const resetPassword = async (
//     email: string,
//     resetToken: string,
//     newPassword: string,
//     confirmNewPassword: string
//   ): Promise<{ success: boolean; message: string }> => {
//     try {
//       const res = await fetch(`${API_BASE}/reset-password`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, resetToken, newPassword, confirmNewPassword }),
//       });

//       if (!res.ok) {
//         const errorData = await res.json().catch(() => null);
//         return { success: false, message: errorData?.message || 'Failed to reset password. Please try again.' };
//       }

//       return { success: true, message: 'Password has been reset successfully!' };
//     } catch {
//       return { success: false, message: 'Network error. Please try again.' };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('admin_user');
//     localStorage.removeItem('admin_access_token');
//     localStorage.removeItem('admin_refresh_token');
//     setUser(null);
//   };

//   return (
//     <AdminContext.Provider
//       value={{
//         user,
//         loading,
//         isAdmin: !!user,
//         login,
//         logout,
//         forgotPassword,
//         verifyOtp,
//         resetPassword,
//         getAuthHeaders,
//       }}
//     >
//       {children}
//     </AdminContext.Provider>
//   );
// }

// export function useAdmin() {
//   return useContext(AdminContext);
// }



'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const API_BASE = 'https://trustteens-api.onrender.com/api/v1/admin/auth';

interface AdminContextType {
  user: { email: string } | null;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  getToken: () => string | null;
}

const AdminContext = createContext<AdminContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  login: async () => false,
  logout: () => { },
  getToken: () => null,
});

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('admin_user');
    const token = localStorage.getItem('admin_access_token');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const getToken = () => {
    return localStorage.getItem('admin_access_token');
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) return false;

      const data = await res.json();

      // 🔥 FIXED TOKEN HANDLING
      const token = data.accessToken || data.access_token;

      console.log('LOGIN RESPONSE:', data);
      console.log('TOKEN:', token);

      if (token) {
        localStorage.setItem('admin_access_token', token);
      }

      const adminUser = { email };
      localStorage.setItem('admin_user', JSON.stringify(adminUser));
      setUser(adminUser);

      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_access_token');
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
        getToken,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}