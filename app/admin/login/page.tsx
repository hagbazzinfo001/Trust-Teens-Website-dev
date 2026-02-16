// 'use client';

// import { useState } from 'react';
// import { supabase } from '@/lib/supabase';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { useRouter } from 'next/navigation';
// import { useAdmin } from '@/contexts/AdminContext';

// export default function AdminLoginPage() {
//   const router = useRouter();
//   const { user, isAdmin, loading } = useAdmin();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   if (!loading && user && isAdmin) {
//     router.push('/admin/dashboard');
//     return null;
//   }

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     try {
//       const { error: signInError } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });

//       if (signInError) {
//         setError(signInError.message);
//         setIsLoading(false);
//         return;
//       }

//       const { data: { user: authUser } } = await supabase.auth.getUser();
//       if (!authUser) {
//         setError('Login failed');
//         setIsLoading(false);
//         return;
//       }

//       const { data: adminData } = await supabase
//         .from('admins')
//         .select('id')
//         .eq('user_id', authUser.id)
//         .single();

//       if (!adminData) {
//         await supabase.auth.signOut();
//         setError('You do not have admin access');
//         setIsLoading(false);
//         return;
//       }

//       router.push('/admin/dashboard');
//     } catch (err) {
//       setError('An error occurred. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
//       <Card className="w-full max-w-md bg-gray-800 border-gray-700">
//         <CardHeader>
//           <CardTitle className="text-white text-2xl">Trust Teens Admin</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleLogin} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">
//                 Email
//               </label>
//               <Input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="your@email.com"
//                 className="bg-gray-700 border-gray-600 text-white"
//                 disabled={isLoading}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">
//                 Password
//               </label>
//               <Input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 className="bg-gray-700 border-gray-600 text-white"
//                 disabled={isLoading}
//               />
//             </div>

//             {error && (
//               <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded">
//                 {error}
//               </div>
//             )}

//             <Button
//               type="submit"
//               className="w-full bg-orange-600 hover:bg-orange-700"
//               disabled={isLoading}
//             >
//               {isLoading ? 'Logging in...' : 'Login'}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // If already logged in, redirect to dashboard
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 🔐 Hardcoded Credentials
    if (email === "admin@test.com" && password === "TestAdmin123") {
      localStorage.setItem("isAdmin", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-2xl">
            Trust Teens Admin
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            {error && (
              <div className="bg-red-900 text-red-200 p-3 rounded">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
