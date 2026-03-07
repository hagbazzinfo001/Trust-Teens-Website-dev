'use client';

import Link from 'next/link';

export default function CommunityPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-8">Community</h1>
      <p className="text-xl text-gray-700 font-medium mb-12">
        Building a generation of impact through shared experiences and collective growth.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <Link
          href="/community/community-service"
          className="p-8 bg-gray-50 rounded-[2rem] hover:bg-orange-50 transition-colors"
        >
          <h2 className="text-2xl font-black text-gray-950 mb-2">Community Service</h2>
          <p className="text-gray-600 font-medium">Leadership through practical action and service.</p>
        </Link>
        <Link
          href="/community/hangout"
          className="p-8 bg-gray-50 rounded-[2rem] hover:bg-orange-50 transition-colors"
        >
          <h2 className="text-2xl font-black text-gray-950 mb-2">Hangouts</h2>
          <p className="text-gray-600 font-medium">Safe spaces for bonding and empowerment.</p>
        </Link>
        <Link
          href="/community/curriculum"
          className="p-8 bg-gray-50 rounded-[2rem] hover:bg-orange-50 transition-colors"
        >
          <h2 className="text-2xl font-black text-gray-950 mb-2">Curriculum</h2>
          <p className="text-gray-600 font-medium">Holistic development through structured learning.</p>
        </Link>
      </div>
    </div>
  );
}
