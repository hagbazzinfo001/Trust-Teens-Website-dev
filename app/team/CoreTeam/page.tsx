import Image from "next/image";
import TeamCard from "@/components/TeamCard";

const teamMembers = [
  {
    name: "Deborah Dada",
    role: "Founder & Lead",
    description: "Enjoys adventurous travel, seeks new cultures and offbeat destinations",
    image: "/team/1.jpg",
  },
  {
    name: "Iyanoluwa Sonde-Ikokoh",
    role: "Programs Manager",
    description: "Over a decade of experience empowering young people to lead change",
    image: "/team/2.jpg",
  },
  {
    name: "Oluwadunni Akinhanmi",
    role: "Media Manager",
    description: "5+ years hands-on experience in Media & Marketing",
    image: "/team/3.jpg",
  },
  {
    name: "Samuel Dada",
    role: "Events Manager",
    description: "Creative painter capturing beauty with imaginative artwork",
    image: "/team/4.jpg",
  },
  {
    name: "Favour Ikediashi",
    role: "Community Manager",
    description: "Football enthusiast, enjoys movie nights with friends",
    image: "/team/5.jpg",
  },
  {
    name: "Esther Ogunyemi",
    role: "Assistant Programs Manager",
    description: "Culinary artist, explores diverse flavors",
    image: "/team/6.jpg",
  },
];

export default function CoreTeamPage() {
  return (
    <main>
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-6">The Core Team</h1>
          <p className="text-gray-600 leading-relaxed">
            The people stewarding the vision, building the systems, and delivering
            the work behind Trust Teens. This team leads strategy, programs,
            partnerships, and daily execution with purpose and care.
          </p>
        </div>

        <Image
          src="/team/hero.jpg"
          alt="Core Team"
          width={600}
          height={400}
          className="rounded-xl object-cover"
        />
      </section>

      {/* TEAM GRID */}
      <section className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Meet the Trust Teens Core Team
          </h2>
          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-12">
            Our Core Team is made up of individuals committed to shaping
            value-driven teenagers through intentional programs, structure,
            and community.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
