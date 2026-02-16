// // 'use client';

// // import { useAdmin } from '@/contexts/AdminContext';
// // import { useRouter, useParams } from 'next/navigation';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Card, CardContent } from '@/components/ui/card';
// // import { useEffect, useState } from 'react';
// // import { supabase } from '@/lib/supabase';
// // import { ContentItem, ContentCategory } from '@/types/database';

// // export default function EditContentPage() {
// //   const { user, isAdmin, loading } = useAdmin();
// //   const router = useRouter();
// //   const params = useParams();
// //   const id = params.id as string;

// //   const [contentItem, setContentItem] = useState<ContentItem | null>(null);
// //   const [title, setTitle] = useState('');
// //   const [description, setDescription] = useState('');
// //   const [content, setContent] = useState('');
// //   const [authorName, setAuthorName] = useState('');
// //   const [categoryId, setCategoryId] = useState('');
// //   const [categories, setCategories] = useState<ContentCategory[]>([]);
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [error, setError] = useState('');
// //   const [isLoading, setIsLoading] = useState(true);

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
// //       </div>
// //     );
// //   }

// //   if (!user || !isAdmin) {
// //     router.push('/admin/login');
// //     return null;
// //   }

// //   useEffect(() => {
// //     loadData();
// //   }, [id]);

// //   const loadData = async () => {
// //     setIsLoading(true);
// //     const [contentResult, categoriesResult] = await Promise.all([
// //       supabase.from('content_items').select('*').eq('id', id).single(),
// //       supabase.from('content_categories').select('*').order('order_index'),
// //     ]);

// //     if (contentResult.error) {
// //       setError('Content not found');
// //       setIsLoading(false);
// //       return;
// //     }

// //     const item = contentResult.data;
// //     setContentItem(item);
// //     setTitle(item.title);
// //     setDescription(item.description || '');
// //     setContent(item.content);
// //     setAuthorName(item.author_name);
// //     setCategoryId(item.category_id);

// //     if (categoriesResult.data) {
// //       setCategories(categoriesResult.data);
// //     }

// //     setIsLoading(false);
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError('');
// //     setIsSubmitting(true);

// //     if (!title || !content || !categoryId) {
// //       setError('Please fill in all required fields');
// //       setIsSubmitting(false);
// //       return;
// //     }

// //     const { error: updateError } = await supabase
// //       .from('content_items')
// //       .update({
// //         title,
// //         description,
// //         content,
// //         author_name: authorName,
// //         category_id: categoryId,
// //         updated_at: new Date().toISOString(),
// //       })
// //       .eq('id', id);

// //     if (updateError) {
// //       setError(updateError.message);
// //       setIsSubmitting(false);
// //     } else {
// //       router.push('/admin/content');
// //     }
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
// //       </div>
// //     );
// //   }

// //   if (!contentItem) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 py-12">
// //         <div className="max-w-4xl mx-auto px-4">
// //           <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
// //             Content not found
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-12">
// //       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="mb-8">
// //           <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Content</h1>
// //           <p className="text-gray-600">Update your content</p>
// //         </div>

// //         <Card>
// //           <CardContent className="p-8">
// //             <form onSubmit={handleSubmit} className="space-y-6">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-900 mb-2">
// //                   Title *
// //                 </label>
// //                 <Input
// //                   value={title}
// //                   onChange={(e) => setTitle(e.target.value)}
// //                   placeholder="Enter content title"
// //                   disabled={isSubmitting}
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-900 mb-2">
// //                   Category *
// //                 </label>
// //                 <select
// //                   value={categoryId}
// //                   onChange={(e) => setCategoryId(e.target.value)}
// //                   disabled={isSubmitting}
// //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
// //                 >
// //                   <option value="">Select a category</option>
// //                   {categories.map((cat) => (
// //                     <option key={cat.id} value={cat.id}>
// //                       {cat.name}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-900 mb-2">
// //                   Author Name
// //                 </label>
// //                 <Input
// //                   value={authorName}
// //                   onChange={(e) => setAuthorName(e.target.value)}
// //                   placeholder="Your name"
// //                   disabled={isSubmitting}
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-900 mb-2">
// //                   Description
// //                 </label>
// //                 <textarea
// //                   value={description}
// //                   onChange={(e) => setDescription(e.target.value)}
// //                   placeholder="Brief description of the content"
// //                   rows={3}
// //                   disabled={isSubmitting}
// //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent resize-none"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-900 mb-2">
// //                   Content *
// //                 </label>
// //                 <textarea
// //                   value={content}
// //                   onChange={(e) => setContent(e.target.value)}
// //                   placeholder="Write your content here..."
// //                   rows={12}
// //                   disabled={isSubmitting}
// //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent resize-none font-mono text-sm"
// //                 />
// //               </div>

// //               {error && (
// //                 <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
// //                   {error}
// //                 </div>
// //               )}

// //               <div className="flex gap-4 justify-end">
// //                 <Button
// //                   type="button"
// //                   variant="outline"
// //                   onClick={() => router.back()}
// //                   disabled={isSubmitting}
// //                 >
// //                   Cancel
// //                 </Button>
// //                 <Button
// //                   type="submit"
// //                   className="bg-orange-600 hover:bg-orange-700"
// //                   disabled={isSubmitting}
// //                 >
// //                   {isSubmitting ? 'Saving...' : 'Save Changes'}
// //                 </Button>
// //               </div>
// //             </form>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }



// 'use client';

// import { useAdmin } from '@/contexts/AdminContext';
// import { useRouter, useParams } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent } from '@/components/ui/card';
// import { useEffect, useState } from 'react';
// // import { supabase } from '@/lib/supabase';
// import { ContentItem, ContentCategory } from '@/types/database';

// export default function EditContentPage() {
//   const { user, isAdmin, loading } = useAdmin();
//   const router = useRouter();
//   const params = useParams();
//   const id = params.id as string;

//   const [contentItem, setContentItem] = useState<ContentItem | null>(null);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [content, setContent] = useState('');
//   const [authorName, setAuthorName] = useState('');
//   const [categoryId, setCategoryId] = useState('');
//   const [categories, setCategories] = useState<ContentCategory[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   // ✅ Logout function (Option 1)
//   const handleLogout = async () => {
//     // await supabase.auth.signOut();
//     router.push('/admin/login');
//   };

//   useEffect(() => {
//     if (!loading && (!user || !isAdmin)) {
//       router.push('/admin/login');
//     }
//   }, [user, isAdmin, loading, router]);

//   useEffect(() => {
//     if (user && isAdmin && id) {
//       loadData();
//     }
//   }, [id, user, isAdmin]);

//   const loadData = async () => {
//     setIsLoading(true);

//     // const [contentResult, categoriesResult] = await Promise.all([
//     //   supabase.from('content_items').select('*').eq('id', id).single(),
//     //   supabase.from('content_categories').select('*').order('order_index'),
//     // ]);

//     if (contentResult.error) {
//       setError('Content not found');
//       setIsLoading(false);
//       return;
//     }

//     const item = contentResult.data;
//     setContentItem(item);
//     setTitle(item.title);
//     setDescription(item.description || '');
//     setContent(item.content);
//     setAuthorName(item.author_name);
//     setCategoryId(item.category_id);

//     if (categoriesResult.data) {
//       setCategories(categoriesResult.data);
//     }

//     setIsLoading(false);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setIsSubmitting(true);

//     if (!title || !content || !categoryId) {
//       setError('Please fill in all required fields');
//       setIsSubmitting(false);
//       return;
//     }

//   //   const { error: updateError } = await supabase
//   //     .from('content_items')
//   //     .update({
//   //       title,
//   //       description,
//   //       content,
//   //       author_name: authorName,
//   //       category_id: categoryId,
//   //       updated_at: new Date().toISOString(),
//   //     })
//   //     .eq('id', id);

//   //   if (updateError) {
//   //     setError(updateError.message);
//   //     setIsSubmitting(false);
//   //   } else {
//   //     router.push('/admin/content');
//   //   }
//   // };

//   if (loading || isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
//       </div>
//     );
//   }

//   if (!contentItem) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-12">
//         <div className="max-w-4xl mx-auto px-4">
//           <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
//             Content not found
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* ✅ Header with Logout */}
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-4xl font-bold text-gray-900 mb-2">
//               Edit Content
//             </h1>
//             <p className="text-gray-600">Update your content</p>
//           </div>

//           <Button
//             onClick={handleLogout}
//             variant="outline"
//             className="border-red-500 text-red-600 hover:bg-red-50"
//           >
//             Logout
//           </Button>
//         </div>

//         <Card>
//           <CardContent className="p-8">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-900 mb-2">
//                   Title *
//                 </label>
//                 <Input
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   disabled={isSubmitting}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-900 mb-2">
//                   Category *
//                 </label>
//                 <select
//                   value={categoryId}
//                   onChange={(e) => setCategoryId(e.target.value)}
//                   disabled={isSubmitting}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
//                 >
//                   <option value="">Select a category</option>
//                   {categories.map((cat) => (
//                     <option key={cat.id} value={cat.id}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-900 mb-2">
//                   Author Name
//                 </label>
//                 <Input
//                   value={authorName}
//                   onChange={(e) => setAuthorName(e.target.value)}
//                   disabled={isSubmitting}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-900 mb-2">
//                   Description
//                 </label>
//                 <textarea
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   rows={3}
//                   disabled={isSubmitting}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent resize-none"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-900 mb-2">
//                   Content *
//                 </label>
//                 <textarea
//                   value={content}
//                   onChange={(e) => setContent(e.target.value)}
//                   rows={12}
//                   disabled={isSubmitting}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent resize-none font-mono text-sm"
//                 />
//               </div>

//               {error && (
//                 <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
//                   {error}
//                 </div>
//               )}

//               <div className="flex gap-4 justify-end">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => router.back()}
//                   disabled={isSubmitting}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   className="bg-orange-600 hover:bg-orange-700"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? 'Saving...' : 'Save Changes'}
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
