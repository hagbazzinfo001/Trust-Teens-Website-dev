'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ContentCategory } from '@/types/database';
import Link from 'next/link';

interface SubNavProps {
  type: 'mission' | 'community';
}

export default function SubNav({ type }: SubNavProps) {
  const [categories, setCategories] = useState<ContentCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, [type]);

  const loadCategories = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('content_categories')
      .select('*')
      .eq('type', type)
      .order('order_index');

    setCategories(data || []);
    setLoading(false);
  };

  if (loading) return null;
  if (categories.length === 0) return null;

  return (
    <div className="bg-white border-b sticky top-0 z-10 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${type}/${category.slug}`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 transition-colors group"
            >
              <div className="text-2xl flex-shrink-0">
                {category.icon || (type === 'mission' ? '📊' : '📚')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 group-hover:text-orange-600 transition-colors truncate">
                  {category.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
