"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b">
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
            <Link
              href="/about"
              className="text-sm hover:text-orange-500 transition-colors"
            >
              About us
            </Link>
            <Link
              href="/impact"
              className="text-sm hover:text-orange-500 transition-colors"
            >
              Our impact
            </Link>
            <Link
              href="/missions"
              className="text-sm hover:text-orange-500 transition-colors"
            >
              Missions
            </Link>
            <Link
              href="/community"
              className="text-sm hover:text-orange-500 transition-colors"
            >
              Community
            </Link>
            <Link
              href="/team"
              className="text-sm hover:text-orange-500 transition-colors"
            >
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
            {/* <nav className="flex flex-col gap-4"> */}
            <nav
              className="flex flex-col gap-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link
                onClick={() => setIsMenuOpen(false)}
                href="/about"
                className="text-sm hover:text-orange-500 transition-colors"
              >
                About us
              </Link>
              <Link
                onClick={() => setIsMenuOpen(false)}
                href="/impact"
                className="text-sm hover:text-orange-500 transition-colors"
              >
                Our impact
              </Link>
              <Link
                onClick={() => setIsMenuOpen(false)}
                href="/missions"
                className="text-sm hover:text-orange-500 transition-colors"
              >
                Missions
              </Link>
              <Link
                onClick={() => setIsMenuOpen(false)}
                href="/community"
                className="text-sm hover:text-orange-500 transition-colors"
              >
                Community
              </Link>
              <Link
                onClick={() => setIsMenuOpen(false)}
                href="/team"
                className="text-sm hover:text-orange-500 transition-colors"
              >
                Team
              </Link>
              <Button className="bg-[#F41266] hover:bg-[#d20f58] text-white rounded-md w-full">
                Upcoming Events
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
