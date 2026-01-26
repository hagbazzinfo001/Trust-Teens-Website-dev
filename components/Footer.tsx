
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
              src="/images/logowhite.svg"
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
                  <Link href="/missions/conferences">Conferences</Link>
                </li>
                <li>
                  <Link href="/missions/summit">Summits</Link>
                </li>
                <li>
                  <Link href="/missions/campaigns">Campaigns</Link>
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
                  <Link href="https://glacier-dogsled-9b5.notion.site/Trust-Teens-Curriculum-209a6df594508026a95af038b05e4da5?source=copy_link">Curriculum</Link>
                </li>
                <li>
                  <Link href="/community/community-service">Community Service</Link>
                </li>
                <li>
                  <Link href="/community/hangout">Hangout</Link>
                </li>
                <li>
                  <Link href="/community/trust-teens-tv">Trust Teens TV</Link>
                </li>
              </ul>
            </div>

            {/* Team */}
            <div>
              <h3 className="font-semibold mb-4 text-blue-400">Team</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/team/coreTeam">Core Team</Link>
                </li>
                <li>
                  <Link href="/team/volunteers">Volunteers</Link>
                </li>
                <li>
                  <Link href="/team/Ambassadors">Ambassadors</Link>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="font-semibold mb-4 text-blue-400">Follow us</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="https://www.tiktok.com/@trustteens_">TikTok</Link>
                </li>
                <li>
                  <Link href="https://x.com/trustteens_?s=21">Twitter</Link>
                  {/* 𝕏 */}
                </li>
                <li>
                  <Link href="https://www.instagram.com/trustteens_?igsh=MWFnZ3IyN3Ixd2lhYQ==">Instagram</Link>
                </li>
                <li>
                  <Link href="https://www.linkedin.com/company/trust-teens-community/">LinkedIn</Link>
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
              src="/images/logowhite.svg"
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
          {/* <div>
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
          </div> */}
     <div>
              <h3 className="font-semibold mb-4 text-blue-400">Missions</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/missions/conferences">Conferences</Link>
                </li>
                <li>
                  <Link href="/missions/summit">Summits</Link>
                </li>
                <li>
                  <Link href="/missions/campaigns">Campaigns</Link>
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
          {/* <div>
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
          </div> */}
     <div>
              <h3 className="font-semibold mb-4 text-blue-400">Community</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="https://glacier-dogsled-9b5.notion.site/Trust-Teens-Curriculum-209a6df594508026a95af038b05e4da5?source=copy_link">Curriculum</Link>
                </li>
                <li>
                  <Link href="/community/community-service">Community Service</Link>
                </li>
                <li>
                  <Link href="/community/hangout">Hangout</Link>
                </li>
                <li>
                  <Link href="/community/trust-teens-tv">Trust Teens TV</Link>
                </li>
              </ul>
            </div>
          {/* Team */}
          {/* <div>
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
          </div> */}
  <div>
              <h3 className="font-semibold mb-4 text-blue-400">Team</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/team/CoreTeam">Core Team</Link>
                </li>
                <li>
                  <Link href="/team/Volunteers">Volunteers</Link>
                </li>
                <li>
                  <Link href="/team/Ambassadors">Ambassadors</Link>
                </li>
              </ul>
            </div>
          {/* Follow Us */}
          {/* <div>
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
          </div> */}
                 <div>
              <h3 className="font-semibold mb-4 text-blue-400">Follow us</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="https://www.tiktok.com/@trustteens_">TikTok</Link>
                </li>
                <li>
                  <Link href="https://x.com/trustteens_?s=21">Twitter</Link>
                  {/* 𝕏 */}
                </li>
                <li>
                  <a href="https://www.instagram.com/trustteens_?igsh=MWFnZ3IyN3Ixd2lhYQ==">Instagram</a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/trust-teens-community/">LinkedIn</a>
                </li>
              </ul>
            </div>
        </div>
      </div>
    </footer>
  );
}
