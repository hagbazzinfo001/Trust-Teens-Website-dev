// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';
// import { supabase } from '@/lib/supabase';
// import { User, Session } from '@supabase/supabase-js';

// interface AdminContextType {
//   user: User | null;
//   session: Session | null;
//   loading: boolean;
//   isAdmin: boolean;
// }

// const AdminContext = createContext<AdminContextType>({
//   user: null,
//   session: null,
//   loading: true,
//   isAdmin: false,
// });

// export function AdminProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [session, setSession] = useState<Session | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     const checkAdmin = async (userId: string) => {
//       const { data } = await supabase
//         .from('admins')
//         .select('id')
//         .eq('user_id', userId)
//         .single();
//       setIsAdmin(!!data);
//     };

//     const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
//       setSession(session);
//       setUser(session?.user || null);

//       if (session?.user) {
//         checkAdmin(session.user.id);
//       } else {
//         setIsAdmin(false);
//       }

//       setLoading(false);
//     });

//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//       setUser(session?.user || null);
//       if (session?.user) {
//         checkAdmin(session.user.id);
//       }
//       setLoading(false);
//     });

//     return () => subscription?.unsubscribe();
//   }, []);

//   return (
//     <AdminContext.Provider value={{ user, session, loading, isAdmin }}>
//       {children}
//     </AdminContext.Provider>
//   );
// }

// export function useAdmin() {
//   return useContext(AdminContext);
// }


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
  logout: () => {},
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
