// import Link from "next/link";
// import Image from "next/image";
// export default function Footer() {
//   return (
//     <footer className="bg-black text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
//           <div className="md:col-span-1">
//             <Image
//               src="/logowhite.svg"
//               width={150}
//               height={150}
//               alt="Picture of the author"
//             />

//             <p className="text-sm text-gray-400">
//               Built with a smile ☺️
//               <br />
//               &copy; {new Date().getFullYear()} Trust Teens
//             </p>
//           </div>

//           <div>
//             <h3 className="font-semibold mb-4 text-blue-400">Missions</h3>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <Link
//                   href="/conferences"
//                   className="text-gray-300 hover:text-white transition-colors"
//                 >
//                   Conferences
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/summits"
//                   className="text-gray-300 hover:text-white transition-colors"
//                 >
//                   Summits
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/campaigns"
//                   className="text-gray-300 hover:text-white transition-colors"
//                 >
//                   Campaigns
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/school-clubs"
//                   className="text-gray-300 hover:text-white transition-colors"
//                 >
//                   School Clubs
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/community-clubs"
//                   className="text-gray-300 hover:text-white transition-colors"
//                 >
//                   Community Clubs
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-semibold mb-4 text-blue-400">Community</h3>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <Link
//                   href="/curriculum"
//                   className="text-gray-300 hover:text-white transition-colors"
//                 >
//                   Curriculum
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/community-service"
//                   className="text-gray-300 hover:text-white transition-colors"
//                 >
//                   Community Service
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/hangout"
//                   className="text-gray-300 hover:text-white transition-colors"
//                 >
//                   Hangout
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/trust-teens-tv"
//                   className="text-gray-300 hover:text-white transition-colors"
//                 >
//                   Trust Teens TV
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-semibold mb-4 text-blue-400">Team</h3>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <Link
//                   href="/core-team"
//                   className="text-gray-300 hover:text-white transition-colors"
//                 >
//                   Core Team
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/volunteers"
//                   className="text-gray-300 hover:text-white transition-colors"
//                 >
//                   Volunteers
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/ambassadors"
//                   className="text-gray-300 hover:text-white transition-colors"
//                 >
//                   Ambassadors
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-semibold mb-4">Follow us</h3>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <Link
//                   href="https://facebook.com"
//                   className="text-gray-300 hover:text-white transition-colors"
//                 >
//                   Facebook
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="https://twitter.com"
//                   className="text-gray-300 hover:text-white transition-colors"
//                 >
//                   Twitter
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="https://instagram.com"
//                   className="text-gray-300 hover:text-white transition-colors"
//                 >
//                   Instagram
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="https://linkedin.com"
//                   className="text-gray-300 hover:text-white transition-colors"
//                 >
//                   LinkedIn
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Mobile Layout */}
        <div className="md:hidden text-center">
          {/* Logo centered */}
          <div className="mb-10 flex justify-center">
            <Image
              src="/logowhite.svg"
              width={150}
              height={150}
              alt="Trust Teens Logo"
            />
          </div>

          {/* 2×2 Grid for sections */}
          <div className="grid grid-cols-2 gap-8">
            {/* Missions */}
            <div>
              <h3 className="font-semibold mb-4 text-blue-400">Missions</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/conferences">Conferences</Link>
                </li>
                <li>
                  <Link href="/summits">Summits</Link>
                </li>
                <li>
                  <Link href="/campaigns">Campaigns</Link>
                </li>
                <li>
                  <Link href="/school-clubs">School Clubs</Link>
                </li>
                <li>
                  <Link href="/community-clubs">Community Clubs</Link>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="font-semibold mb-4 text-blue-400">Community</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/curriculum">Curriculum</Link>
                </li>
                <li>
                  <Link href="/community-service">Community Service</Link>
                </li>
                <li>
                  <Link href="/hangout">Hangout</Link>
                </li>
                <li>
                  <Link href="/trust-teens-tv">Trust Teens TV</Link>
                </li>
              </ul>
            </div>

            {/* Team */}
            <div>
              <h3 className="font-semibold mb-4 text-blue-400">Team</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/core-team">Core Team</Link>
                </li>
                <li>
                  <Link href="/volunteers">Volunteers</Link>
                </li>
                <li>
                  <Link href="/ambassadors">Ambassadors</Link>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="font-semibold mb-4 text-blue-400">Follow us</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="https://facebook.com">Facebook</Link>
                </li>
                <li>
                  <Link href="https://twitter.com">Twitter</Link>
                </li>
                <li>
                  <Link href="https://instagram.com">Instagram</Link>
                </li>
                <li>
                  <Link href="https://linkedin.com">LinkedIn</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-400 mt-10">
            Built with a smile ☺️ <br />
            &copy; {new Date().getFullYear()} Trust Teens
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-5 gap-8">
          {/* Logo */}
          <div>
            <Image
              src="/logowhite.svg"
              width={150}
              height={150}
              alt="Trust Teens Logo"
            />
            <p className="text-sm text-gray-400 mt-4">
              Built with a smile ☺️ <br />
              &copy; {new Date().getFullYear()} Trust Teens
            </p>
          </div>

          {/* Missions */}
          <div>
            <h3 className="font-semibold mb-4 text-blue-400">Missions</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/conferences">Conferences</Link>
              </li>
              <li>
                <Link href="/summits">Summits</Link>
              </li>
              <li>
                <Link href="/campaigns">Campaigns</Link>
              </li>
              <li>
                <Link href="/school-clubs">School Clubs</Link>
              </li>
              <li>
                <Link href="/community-clubs">Community Clubs</Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4 text-blue-400">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/curriculum">Curriculum</Link>
              </li>
              <li>
                <Link href="/community-service">Community Service</Link>
              </li>
              <li>
                <Link href="/hangout">Hangout</Link>
              </li>
              <li>
                <Link href="/trust-teens-tv">Trust Teens TV</Link>
              </li>
            </ul>
          </div>

          {/* Team */}
          <div>
            <h3 className="font-semibold mb-4 text-blue-400">Team</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/core-team">Core Team</Link>
              </li>
              <li>
                <Link href="/volunteers">Volunteers</Link>
              </li>
              <li>
                <Link href="/ambassadors">Ambassadors</Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="font-semibold mb-4 text-blue-400">Follow us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="https://facebook.com">Facebook</Link>
              </li>
              <li>
                <Link href="https://twitter.com">Twitter</Link>
              </li>
              <li>
                <Link href="https://instagram.com">Instagram</Link>
              </li>
              <li>
                <Link href="https://linkedin.com">LinkedIn</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
