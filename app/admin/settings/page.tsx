// 'use client';

// import { useAdmin } from '@/contexts/AdminContext';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// export default function SettingsPage() {
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
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
//           <p className="text-gray-600">Manage admin settings and configuration</p>
//         </div>

//         <Card>
//           <CardHeader>
//             <CardTitle>Current User</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-900">Email</label>
//               <p className="text-gray-600 mt-1">{user.email}</p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-900">User ID</label>
//               <p className="text-gray-600 mt-1 text-sm break-all">{user.id}</p>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="mt-8">
//           <CardHeader>
//             <CardTitle>Getting Started</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div>
//               <h3 className="font-semibold text-gray-900 mb-2">Quick Start Guide</h3>
//               <ol className="list-decimal list-inside space-y-2 text-gray-600">
//                 <li>Create categories for your content (Missions, Community, Blogs, etc.)</li>
//                 <li>Add new content in the Content Management section</li>
//                 <li>Publish content to make it visible on the public site</li>
//                 <li>Edit or delete content as needed</li>
//               </ol>
//             </div>
//             <div className="mt-6">
//               <h3 className="font-semibold text-gray-900 mb-2">Content Types</h3>
//               <ul className="space-y-2 text-gray-600">
//                 <li><strong>Missions:</strong> Sub-pages and content for the Missions section</li>
//                 <li><strong>Community:</strong> Sub-pages and content for the Community section</li>
//                 <li><strong>Blogs:</strong> Blog posts and articles</li>
//                 <li><strong>Stories:</strong> User testimonials and stories</li>
//               </ul>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Settings
            </h1>
            <p className="text-gray-600">
              Manage admin settings and configuration
            </p>
          </div>

          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700"
          >
            Logout
          </Button>
        </div>

        {/* Admin Info Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Admin Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Email
              </label>
              <p className="text-gray-600 mt-1">admin@test.com</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Role
              </label>
              <p className="text-gray-600 mt-1">Super Admin</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Access Level
              </label>
              <p className="text-gray-600 mt-1">Full System Access</p>
            </div>
          </CardContent>
        </Card>

        {/* System Guide Card */}
        <Card className="mt-8 shadow-sm">
          <CardHeader>
            <CardTitle>Quick Start Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Content Workflow
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Create categories (Missions, Community, Blogs, etc.)</li>
                <li>Add new content inside the Content Management section</li>
                <li>Publish content to make it visible on the public site</li>
                <li>Edit or delete content anytime</li>
              </ol>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Content Types
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li><strong>Missions:</strong> Mission-related pages</li>
                <li><strong>Community:</strong> Community section pages</li>
                <li><strong>Blogs:</strong> Blog posts & articles</li>
                <li><strong>Stories:</strong> Testimonials & experiences</li>
              </ul>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
