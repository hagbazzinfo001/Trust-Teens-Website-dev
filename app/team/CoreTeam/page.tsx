'use client';

import Image from "next/image";
import TeamCard from "@/components/TeamCard";
import { FadeUp } from '@/components/MotionWrapper';
import { motion } from 'framer-motion';

const teamMembers = [
  {
    name: "Deborah Dada",
    role: "Founder & Lead",
    description: "Enjoys adventurous travel, seeks new cultures and offbeat destinations",
    image: "/images/coreteam1.svg",
  },
  {
    name: "Iyanoluwa Sonde-Ikokoh",
    role: "Programs Manager",
    description: "Over a decade of experience empowering young people to lead change",
    image: "/images/coreteam2.svg",
  },
  {
    name: "Oluwadunni Akinhanmi",
    role: "Media Manager",
    description: "5+ years hands-on experience in Media & Marketing",
    image: "/images/coreteam3.svg",
  },
  {
    name: "Samuel Dada",
    role: "Events Manager",
    description: "Creative painter capturing beauty with imaginative artwork",
    image: "/images/coreteam4.svg",
  },
  {
    name: "Favour Ikediashi",
    role: "Community Manager",
    description: "Football enthusiast, enjoys movie nights with friends",
    image: "/images/coreteam1.svg",
  },
  {
    name: "Esther Ogunyemi",
    role: "Assistant Programs Manager",
    description: "Culinary artist, explores diverse flavors",
    image: "/images/coreteam2.svg",
  },
];

export default function CoreTeamPage() {
  return (
    <main>
      {/* HERO SECTION */}
      <section className="w-full px-10 py-20  grid md:grid-cols-3 gap-12 items-start bg-[#FAFAFA]">
  <FadeUp>
    <div>
      <h1 className="text-4xl font-bold mb-6">The Core Team</h1>
      <p className="text-gray-600 leading-relaxed">
      The people stewarding the vision, building the systems, and delivering the work behind Trust Teens. This team leads strategy, programs, partnerships, and daily execution with purpose and care.
      </p>
    </div>
  </FadeUp>

  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: 'easeOut' }}
  >
    <Image
      src="/images/maincoreteam1.svg"
      alt="Core Team"
      width={600}
      height={400}
      className="rounded-xl object-cover"
    />
  </motion.div>
  <FadeUp>
    <div>
      
      <p className="text-gray-600 leading-relaxed">
The Core Team operates with clear roles, shared accountability, and a commitment to excellence. <br /> <br /> 
We prioritize structure, communication, and follow-through to ensure every program reflects the values Trust Teens stands for. <br /> <br />
Our work is guided by purpose-driven leadership, clear ownership of roles, collaboration across teams and long-term thinking over short-term wins      </p>
    </div>
  </FadeUp>
</section>


      {/* TEAM GRID */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-black mb-4">
            Meet the Trust Teens Core Team
          </h2>
          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-12">
            Our Core Team is made up of individuals committed to shaping
            value-driven teenagers through intentional programs, structure,
            and community.
          </p>

          {/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamCard key={member.name} {...member} />
            ))}
          </div> */}

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }}
  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
>
  {teamMembers.map((member) => (
    <TeamCard key={member.name} {...member} />
  ))}
</motion.div>

        </div>
      </section>
       <section className="relative overflow-hidden bg-[#257CFF] text-white py-24 px-6 mb-12">
          {/* Background texture (use your own URL) */}
          <Image
            src="https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764815863/Rectangle_usvu7i.png"
            alt="background texture"
            fill
            className="object-cover opacity-30 pointer-events-none"
          />
      
          {/* Animated container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
            Join the Core Team
            </h2>
      
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            We welcome individuals who are aligned with our mission and ready to contribute their skills to building meaningful systems for teenagers. Core Team roles may include programs, operations, community management, partnerships, media, and strategy.
Some roles are ongoing, while others are project-based or rotational.
            </p>
      
            {/* CTA button */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              className="relative inline-block px-8 py-4 bg-orange-500 rounded-lg text-lg font-semibold overflow-hidden"
            >
              {/* Shine effect */}
              <span className="absolute inset-0 -left-full bg-white/30 skew-x-12 transition-all duration-700 hover:left-full"></span>
      
              <span className="relative z-10">We await your message</span>
            </motion.a>
          </motion.div>
        </section>
    </main>
  );
}
