'use client';

import { useAdmin } from '@/contexts/AdminContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
// import { supabase } from '@/lib/supabase';
import { ContentCategory } from '@/types/database';
import { Trash2, Plus } from 'lucide-react';

export default function CategoriesPage() {
  const { user, isAdmin, loading } = useAdmin();
  const router = useRouter();
  const [categories, setCategories] = useState<ContentCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', type: 'blog' as const, description: '', icon: '' });
  const [error, setError] = useState('');

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

  // useEffect(() => {
  //   loadCategories();
  // }, []);

  // const loadCategories = async () => {
  //   setIsLoading(true);
  //   const { data, error: fetchError } = await supabase
  //     .from('content_categories')
  //     .select('*')
  //     .order('type, order_index');

  //   if (fetchError) {
  //     setError('Error loading categories');
  //   } else {
  //     setCategories(data || []);
  //   }
  //   setIsLoading(false);
  // };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!newCategory.name) {
      setError('Category name is required');
      return;
    }

    setIsAdding(true);
    const slug = newCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  //   const { error: addError } = await supabase
  //     .from('content_categories')
  //     .insert([{
  //       name: newCategory.name,
  //       slug,
  //       description: newCategory.description,
  //       icon: newCategory.icon,
  //       type: newCategory.type,
  //       order_index: categories.filter(c => c.type === newCategory.type).length,
  //     }]);

  //   if (addError) {
  //     setError(addError.message);
  //     setIsAdding(false);
  //   } else {
  //     setNewCategory({ name: '', type: 'blog', description: '', icon: '' });
  //     loadCategories();
  //   }
  // };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

  //   const { error: deleteError } = await supabase
  //     .from('content_categories')
  //     .delete()
  //     .eq('id', id);

  //   if (deleteError) {
  //     setError(deleteError.message);
  //   } else {
  //     setCategories(categories.filter(c => c.id !== id));
  //   }
  // };

  const groupedCategories = {
    mission: categories.filter(c => c.type === 'mission'),
    community: categories.filter(c => c.type === 'community'),
    blog: categories.filter(c => c.type === 'blog'),
    story: categories.filter(c => c.type === 'story'),
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Content Categories</h1>
          <p className="text-gray-600">Manage categories for content organization</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Category</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Category Name *
                  </label>
                  <Input
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    placeholder="e.g., TT Campaigns"
                    disabled={isAdding}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Type *
                  </label>
                  <select
                    value={newCategory.type}
                    onChange={(e) => setNewCategory({ ...newCategory, type: e.target.value as any })}
                    disabled={isAdding}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="mission">Mission</option>
                    <option value="community">Community</option>
                    <option value="blog">Blog</option>
                    <option value="story">Story</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Icon (Emoji)
                  </label>
                  <Input
                    value={newCategory.icon}
                    onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                    placeholder="e.g., 📊"
                    maxLength={2}
                    disabled={isAdding}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Description
                  </label>
                  <Input
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    placeholder="Optional description"
                    disabled={isAdding}
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 gap-2"
                  disabled={isAdding}
                >
                  <Plus size={20} />
                  {isAdding ? 'Adding...' : 'Add Category'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedCategories).map(([type, cats]) => (
              cats.length > 0 && (
                <Card key={type}>
                  <CardHeader>
                    <CardTitle className="capitalize">{type} Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {cats.map((category) => (
                        <div key={category.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="text-2xl">
                              {category.icon || (type === 'mission' ? '📊' : '📚')}
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{category.name}</h3>
                              {category.description && (
                                <p className="text-sm text-gray-600">{category.description}</p>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleDelete(category.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}}}
