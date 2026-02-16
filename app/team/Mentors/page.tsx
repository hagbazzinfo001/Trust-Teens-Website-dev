 
"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TeamCard from "@/components/TeamCard";
  
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
const MentorPage = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const mentors = [
    { name: "Deborah Dada", role: "Founder & Lead", bio: "Enjoys adventurous travel, seeks new cultures and offbeat destinations", img: "/images/coreteam1.svg" },
    { name: "Iyanuoluwa Sonde-Ikokoh", role: "Programs Manager", bio: "Over a decade of experience empowering young people to lead change in their communities.", img: "/images/coreteam2.svg" },
    { name: "Oluwadunni Akinhanmi", role: "Media Manager", bio: "Has 5 years & counting hands-on experience in the Media & Marketing Industry.", img: "/images/coreteam3.svg" },
    { name: "Samuel Dada", role: "Events Manager", bio: "Creative painter capturing beauty with imaginative artwork", img: "/images/coreteam4.svg" },
    { name: "Favour Ikedishi", role: "Community Manager", bio: "Football enthusiast, enjoys movie nights with friends", img: "/coreteam1.svg" },
    { name: "Esther Ogunyemi", role: "Assistant Programs Manager", bio: "Culinary artist, explores diverse flavors, skilled in cooking", img: "/images/coreteam2.svg" },
  ];

  return (
    <main className="bg-white overflow-hidden">
      
      {/* SECTION 1: MENTOR COMMUNITY HERO */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Mentor Community</h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
          <p className="text-gray-600 max-w-xl text-left md:text-left text-sm leading-relaxed">
            Mentors support teenagers by sharing guidance, perspective, and lived experience. 
            Through conversations, teaching, and presence, they help young people think clearly, 
            grow confidently, and make better life decisions.
          </p>
          <button className="bg-[#E91E63] text-white px-6 py-3 rounded-md font-semibold text-sm hover:bg-pink-600 transition-all">
            Mentor a teenager today
          </button>
        </div>

        {/* Top Two Featured Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-[2rem] overflow-hidden h-[350px] relative shadow-lg">
            <Image src="/images/mentorhero2.svg" alt="Conference" fill className="object-cover" />
          </div>
          <div className="rounded-[2rem] overflow-hidden h-[350px] relative shadow-lg">
            <Image src="/images/mentorhero1.svg " alt="Meeting" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* SECTION 2: MEET THE MENTORS GRID */}
      <section className="bg-slate-50/50 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Meet the Trust Teens Mentors</h2>
          <p className="text-gray-500 max-w-3xl mx-auto text-sm leading-relaxed">
            Our mentors are professionals, creatives, educators, and leaders who are committed to 
            shaping teenagers beyond academics. They contribute by speaking, facilitating sessions, 
            leading workshops, and offering guidance across Trust Teens programs.
          </p>
        </div>
 


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
      </section>

      {/* SECTION 3: WHAT MENTORS DO (70/30 Split) */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="lg:col-span-8">
          <span className="text-[10px]  tracking-[0.2em]  mb-3 block">
            THE ROLE OF A MENTOR
          </span>
          <h3 className="text-4xl font-extrabold text-slate-900 mb-6">What Mentors Do</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-12 max-w-2xl">
            Mentors at Trust Teens engage teenagers through structured conversations, 
            teaching sessions, and interactive experiences. They provide clarity, 
            encouragement, and real-world perspective that helps teenagers navigate 
            identity, purpose, relationships, and future decisions.
          </p>
          
          {/* Example Roles Internal Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
             {/* Map your roles here as per previous component */}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="lg:col-span-4">
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative aspect-[4/5]">
            <Image src="/images/mentorrole.svg" alt="Mentoring" fill className="object-cover" />
          </div>
        </motion.div>
      </section>

      {/* SECTION 4: BECOME A MENTOR FOOTER */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="rounded-[2.5rem] overflow-hidden h-[400px] relative mb-12">
          <Image src="/images/mentorfooter.svg" alt="Team" fill className="object-cover" />
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">Become a<br/>Mentor</h2>
            <button className="bg-black text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all">
              Join Us today
            </button>
          </div>
          <div className="md:w-2/3">
            <p className="text-gray-600 text-base leading-7">
            We welcome mentors who are aligned with our values and passionate about supporting teenagers through guidance and example. Mentorship opportunities vary by program and may be short-term or ongoing. Mentors are expected to engage responsibly, communicate clearly, and uphold the values of Trust Teens in all interactions.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
};

export default MentorPage;