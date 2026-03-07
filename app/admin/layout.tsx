'use client';

import { useAdmin, AdminProvider } from '@/contexts/AdminContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home,
    Info,
    BarChart3,
    LogOut,
    LayoutDashboard,
    ChevronRight,
    ChevronDown,
    Megaphone,
    Mountain,
    Mic2,
    Users,
    Coffee,
    BookOpen,
    Settings,
} from 'lucide-react';

const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Home Page', href: '/admin/home', icon: Home },
    { label: 'About Page', href: '/admin/about', icon: Info },
    { label: 'Impact Page', href: '/admin/impact', icon: BarChart3 },
];

const missionsItems = [
    { label: 'Campaigns', href: '/admin/missions/campaigns', icon: Megaphone },
    { label: 'Summits', href: '/admin/missions/summits', icon: Mountain },
    { label: 'Conferences', href: '/admin/missions/conferences', icon: Mic2 },
];

const communityItems = [
    { label: 'Community Service', href: '/admin/community/service', icon: Users },
    { label: 'Hangouts', href: '/admin/community/hangout', icon: Coffee },
    { label: 'Curriculum', href: '/admin/community/curriculum', icon: BookOpen },
];

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
    const { user, isAdmin, loading, logout } = useAdmin();
    const router = useRouter();
    const pathname = usePathname();
    const [missionsOpen, setMissionsOpen] = useState(
        () => pathname.startsWith('/admin/missions')
    );
    const isMissionActive = pathname.startsWith('/admin/missions');
    const isCommunityActive = pathname.startsWith('/admin/community');
    const [communityOpen, setCommunityOpen] = useState(
        () => pathname.startsWith('/admin/community')
    );

    useEffect(() => {
        if (!loading && !isAdmin && pathname !== '/admin/login') {
            router.push('/admin/login');
        }
    }, [loading, isAdmin, pathname, router]);

    // Login page — no layout chrome
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    // Loading
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // Not authenticated
    if (!isAdmin) return null;

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white flex flex-col flex-shrink-0 fixed inset-y-0 left-0 z-30">
                {/* Brand */}
                <div className="px-6 py-6 border-b border-gray-700/50">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center font-bold text-sm">
                            TT
                        </div>
                        <div>
                            <div className="font-bold text-sm">Trust Teens</div>
                            <div className="text-[11px] text-gray-400">Admin Portal</div>
                        </div>
                    </Link>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive =
                            pathname === item.href ||
                            (item.href !== '/admin' && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${isActive
                                    ? 'bg-orange-500/15 text-orange-400'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                    }`}
                            >
                                <item.icon size={18} />
                                <span className="flex-1">{item.label}</span>
                                {isActive && (
                                    <ChevronRight size={14} className="text-orange-400" />
                                )}
                            </Link>
                        );
                    })}

                    {/* Missions group */}
                    <div className="pt-2">
                        <button
                            onClick={() => setMissionsOpen(!missionsOpen)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 w-full ${pathname.startsWith('/admin/missions')
                                ? 'text-orange-400'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                }`}
                        >
                            <Megaphone size={18} />
                            <span className="flex-1 text-left">Missions</span>
                            <ChevronDown
                                size={14}
                                className={`transition-transform duration-200 ${missionsOpen ? 'rotate-180' : ''}`}
                            />
                        </button>
                        {missionsOpen && (
                            <div className="ml-4 mt-1 space-y-1">
                                {missionsItems.map((item) => {
                                    const isActive = pathname === item.href || pathname.startsWith(item.href);
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 group ${isActive
                                                ? 'bg-orange-500/15 text-orange-400'
                                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                                }`}
                                        >
                                            <item.icon size={16} />
                                            <span className="flex-1">{item.label}</span>
                                            {isActive && (
                                                <ChevronRight size={14} className="text-orange-400" />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Community Section */}
                    <div className="space-y-1">
                        <Link href="/admin/community"
                            onClick={(e) => {
                                e.preventDefault();
                                setCommunityOpen(!communityOpen);
                            }}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 w-full ${pathname.startsWith('/admin/missions')
                                ? 'text-orange-400'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                }`}
                        >
                            <Users size={18} />
                            <span className="flex-1 text-left">Community</span>

                            <ChevronRight
                                size={16}
                                className={`transition-transform duration-200 ${communityOpen ? 'rotate-90' : ''
                                    }`}
                            />
                        </Link>

                        <AnimatePresence>
                            {communityOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden ml-2"
                                >
                                    {communityItems.map((item) => {
                                        const active = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}


                                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${active
                                                    ? 'bg-orange-500/15 text-orange-400'
                                                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                                    }`}
                                            >
                                                <item.icon size={16} />
                                                {item.label}
                                            </Link>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </nav>

                {/* Footer */}
                <div className="px-4 py-4 border-t border-gray-700/50">
                    <div className="flex items-center gap-3 px-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold">
                            {user?.email?.charAt(0)?.toUpperCase() ?? 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-xs text-gray-300 truncate">{user?.email}</div>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            logout();
                            router.push('/admin/login');
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors"
                    >
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 ml-64 min-h-screen">
                <div className="p-8">{children}</div>
            </main>
        </div>
    );
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminProvider>
            <AdminLayoutInner>{children}</AdminLayoutInner>
        </AdminProvider>
    );
}
