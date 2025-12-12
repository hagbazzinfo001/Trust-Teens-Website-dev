 


'use client';
import Image from "next/image";
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import icon1 from "@/public/icon1.svg";
import icon3 from "@/public/icon3.svg";
import icon4 from "@/public/icon4.svg";
import icon2 from "@/public/icon2.svg";
import icon5 from "@/public/icon5.svg";
import icon6 from "@/public/icon6.svg";

const missionItems = [
  { name: 'TT Campaigns', slug: 'campaigns', icon: icon1 },
  { name: 'TT Summits', slug: 'summits', icon: icon2 },
  { name: 'TT Conference', slug: 'conference', icon: icon3 },
  { name: 'TT School Club', slug: 'school-club', icon: icon4 },
  { name: 'TT Community Clubs', slug: 'community-clubs', icon: icon5 },
];

const communityItems = [
  { name: 'TT Community', slug: 'community', icon: icon6 },
  { name: 'TT Curriculum', slug: 'curriculum', icon: icon5 },
  { name: 'TT Community Service', slug: 'community-service', icon: icon3 },
  { name: 'TT Hangout', slug: 'hangout', icon: icon4 },
  { name: 'TT Blogs', slug: 'blogs', icon: icon2 },
  { name: 'TT TV', slug: 'tv', icon: icon1 },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({
    missions: false,
    community: false,
  });

  const toggleMobileDropdown = (section: 'missions' | 'community') => {
    setMobileDropdowns(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <header className="w-full bg-white border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center">
            <div className="flex items-center gap-2">
            <Image
                 src="/logo1.svg"
                 width={110}
                 height={110}
               alt="Picture of the author"
               />{" "}
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-sm hover:text-orange-500 transition-colors">
              About us
            </Link>
            <Link href="/impact" className="text-sm hover:text-orange-500 transition-colors">
              Our impact
            </Link>

            <div className="relative group">
              <button className="flex items-center gap-1 text-sm hover:text-orange-500 transition-colors py-2">
                Missions
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>

              <div className="absolute left-0 mt-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-4 px-4 z-50">
                <div className="grid grid-cols-1 gap-3">
                  {missionItems.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/missions/${item.slug}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 transition-colors group/item"
                    >
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-xl">
<Image src={item.icon} alt={item.name} width={40} height={40} />
</div>
                      <span className="text-sm font-medium text-gray-900 group-hover/item:text-orange-600">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-1 text-sm hover:text-orange-500 transition-colors py-2">
                Community
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>

              <div className="absolute left-0 mt-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-4 px-4 z-50">
                <div className="grid grid-cols-1 gap-3">
                  {communityItems.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/community/${item.slug}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 transition-colors group/item"
                    >
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-xl">
<Image src={item.icon} alt={item.name} width={40} height={40} />
</div>
                      <span className="text-sm font-medium text-gray-900 group-hover/item:text-orange-600">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/team" className="text-sm hover:text-orange-500 transition-colors">
              Team
            </Link>
            <Button className="bg-pink-600 hover:bg-pink-700 text-white rounded-md px-6">
              Upcoming Events
            </Button>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-2">
              <Link
                href="/about"
                className="block px-4 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors rounded"
              >
                About us
              </Link>
              <Link
                href="/impact"
                className="block px-4 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors rounded"
              >
                Our impact
              </Link>

              <div>
                <button
                  onClick={() => toggleMobileDropdown('missions')}
                  className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors rounded"
                >
                  Missions
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${mobileDropdowns.missions ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileDropdowns.missions && (
                  <div className="mt-2 space-y-2 bg-gray-50 rounded-lg p-3">
                    {missionItems.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/missions/${item.slug}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 p-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors rounded"
                      >
                        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-lg">
                          {item.icon}
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleMobileDropdown('community')}
                  className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors rounded"
                >
                  Community
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${mobileDropdowns.community ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileDropdowns.community && (
                  <div className="mt-2 space-y-2 bg-gray-50 rounded-lg p-3">
                    {communityItems.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/community/${item.slug}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 p-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors rounded"
                      >
                        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-lg">
                          {item.icon}
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/team"
                className="block px-4 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors rounded"
              >
                Team
              </Link>
              <Button className="bg-pink-600 hover:bg-pink-700 text-white rounded-md w-full mt-4">
                Upcoming Events
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
