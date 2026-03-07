'use client';

import Link from 'next/link';
import { Users, Coffee, BookOpen, ArrowRight } from 'lucide-react';

const communitySections = [
    {
        title: 'Community Service',
        description: 'Hero gallery, focus points, impact stats, and project reports',
        href: '/admin/community/service',
        icon: Users,
        color: 'bg-red-500',
    },
    {
        title: 'Hangouts',
        description: 'Highlights gallery, approach, impact stats, and event recaps',
        href: '/admin/community/hangout',
        icon: Coffee,
        color: 'bg-yellow-600',
    },
    {
        title: 'Curriculum',
        description: 'Manage the external Notion link for Trust Teens Curriculum',
        href: '/admin/community/curriculum',
        icon: BookOpen,
        color: 'bg-blue-600',
    },
];

export default function CommunityDashboard() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Community Management</h1>
                <p className="text-gray-500 mt-1">
                    Manage all community-related content, including service projects, hangouts, and curriculum.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {communitySections.map((section) => (
                    <Link
                        key={section.href}
                        href={section.href}
                        className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200"
                    >
                        <div
                            className={`w-12 h-12 rounded-xl ${section.color} flex items-center justify-center mb-4`}
                        >
                            <section.icon size={22} className="text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                            {section.title}
                            <ArrowRight
                                size={16}
                                className="text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all"
                            />
                        </h3>
                        <p className="text-sm text-gray-500">{section.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
