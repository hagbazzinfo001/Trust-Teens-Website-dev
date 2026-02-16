// 'use client';

// import { useAdmin } from '@/contexts/AdminContext';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { FileText, Folder, Settings } from 'lucide-react';

// export default function AdminDashboard() {
//   const { user, isAdmin, loading } = useAdmin();
//   const router = useRouter();

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
//       </div>
//     );
//   }

//   if (!user || !isAdmin) {
//     router.push('/admin/login');
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
//           <p className="text-gray-600">Welcome back to Trust Teens Admin Panel</p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">
//           <Card className="hover:shadow-lg transition-shadow cursor-pointer">
//             <Link href="/admin/content">
//               <CardHeader>
//                 <div className="flex items-center gap-3">
//                   <FileText className="w-8 h-8 text-orange-600" />
//                   <CardTitle>Manage Content</CardTitle>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600">Create, edit, and publish blog posts, stories, and other content</p>
//               </CardContent>
//             </Link>
//           </Card>

//           <Card className="hover:shadow-lg transition-shadow cursor-pointer">
//             <Link href="/admin/categories">
//               <CardHeader>
//                 <div className="flex items-center gap-3">
//                   <Folder className="w-8 h-8 text-blue-600" />
//                   <CardTitle>Categories</CardTitle>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600">Manage content categories for missions, community, blogs, and more</p>
//               </CardContent>
//             </Link>
//           </Card>

//           <Card className="hover:shadow-lg transition-shadow cursor-pointer">
//             <Link href="/admin/settings">
//               <CardHeader>
//                 <div className="flex items-center gap-3">
//                   <Settings className="w-8 h-8 text-green-600" />
//                   <CardTitle>Settings</CardTitle>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600">Configure admin users and system settings</p>
//               </CardContent>
//             </Link>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Folder, Settings } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");

    if (isAdmin !== "true") {
      router.push("/admin");
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/admin");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome back to Trust Teens Admin Panel
            </p>
          </div>

          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700"
          >
            Logout
          </Button>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/admin/content">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-orange-600" />
                  <CardTitle>Manage Content</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Create, edit, and publish blog posts, stories, and other content
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/admin/categories">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Folder className="w-8 h-8 text-blue-600" />
                  <CardTitle>Categories</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Manage content categories for missions, community, blogs, and more
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/admin/settings">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Settings className="w-8 h-8 text-green-600" />
                  <CardTitle>Settings</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Configure admin users and system settings
                </p>
              </CardContent>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
