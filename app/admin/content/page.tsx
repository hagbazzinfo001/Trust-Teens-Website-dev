'use client';

import { useAdmin } from '@/contexts/AdminContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ContentItem, ContentCategory } from '@/types/database';
import Link from 'next/link';
import { Edit2, Trash2, Plus, Eye, EyeOff } from 'lucide-react';

export default function AdminContentPage() {
  const { user, isAdmin, loading } = useAdmin();
  const router = useRouter();
  const [content, setContent] = useState<(ContentItem & { category?: ContentCategory })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    router.push('/admin/login');
    return null;
  }

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('content_items')
      .select(`
        *,
        category:content_categories(*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading content:', error);
    } else {
      setContent(data || []);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('content_items')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting content:', error);
    } else {
      setContent(content.filter(item => item.id !== id));
      setDeleteId(null);
    }
  };

  const handlePublish = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('content_items')
      .update({
        is_published: !currentStatus,
        published_at: !currentStatus ? new Date().toISOString() : null,
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating content:', error);
    } else {
      setContent(content.map(item =>
        item.id === id
          ? { ...item, is_published: !currentStatus }
          : item
      ));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Content Management</h1>
            <p className="text-gray-600">Create and manage all content</p>
          </div>
          <Link href="/admin/content/new">
            <Button className="bg-orange-600 hover:bg-orange-700 gap-2">
              <Plus size={20} />
              New Content
            </Button>
          </Link>
        </div>

        <Card>
          <CardContent className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
              </div>
            ) : content.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No content yet. Create your first post!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Title</th>
                      <th className="text-left py-3 px-4">Category</th>
                      <th className="text-left py-3 px-4">Author</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Created</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{item.title}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {item.category?.name || 'N/A'}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{item.author_name}</td>
                        <td className="py-3 px-4">
                          <span className={`text-sm px-3 py-1 rounded-full ${
                            item.is_published
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.is_published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(item.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handlePublish(item.id, item.is_published)}
                              className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
                              title={item.is_published ? 'Unpublish' : 'Publish'}
                            >
                              {item.is_published ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                            <Link href={`/admin/content/edit/${item.id}`}>
                              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                                <Edit2 size={18} />
                              </button>
                            </Link>
                            <button
                              onClick={() => setDeleteId(item.id)}
                              className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {deleteId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-md w-full">
              <CardHeader>
                <CardTitle>Delete Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Are you sure you want to delete this content? This action cannot be undone.</p>
                <div className="flex gap-4 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setDeleteId(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => handleDelete(deleteId)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
