'use client';

import Link from 'next/link';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminNav() {
  const { user, isAdmin } = useAdmin();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!user || !isAdmin) return null;

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="bg-gray-900 text-white border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/admin" className="font-bold text-xl">
            Trust Teens Admin
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/admin/dashboard" className="hover:text-orange-500 transition-colors">
              Dashboard
            </Link>
            <Link href="/admin/content" className="hover:text-orange-500 transition-colors">
              Content
            </Link>
            <Link href="/admin/categories" className="hover:text-orange-500 transition-colors">
              Categories
            </Link>
            <span className="text-sm text-gray-400">{user.email}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700 space-y-4">
            <Link href="/admin/dashboard" className="block hover:text-orange-500 transition-colors">
              Dashboard
            </Link>
            <Link href="/admin/content" className="block hover:text-orange-500 transition-colors">
              Content
            </Link>
            <Link href="/admin/categories" className="block hover:text-orange-500 transition-colors">
              Categories
            </Link>
            <span className="block text-sm text-gray-400">{user.email}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2 w-full"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
