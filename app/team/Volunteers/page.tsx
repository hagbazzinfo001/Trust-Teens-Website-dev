 "use client";
 import { useRouter } from "next/navigation";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import icon1 from "@/public/icon1.svg";
import icon3 from "@/public/icon3.svg";
import icon4 from "@/public/icon4.svg";
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { AnimatePresence} from "framer-motion";
 import icon2 from "@/public/icon2.svg";
import icon5 from "@/public/icon5.svg";
import icon6 from "@/public/icon6.svg";
/* ---------------------------------
   Animation Variants (TS Safe)
----------------------------------*/
const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1], // ✅ TS-safe easeOut curve
    },
  },
};
const ambassadors2 = [
  { name: "Deborah Dada", school: "School name", bio: "Enjoys adventurous travel and new cultures." },
  { name: "Deborah Dada", school: "School name", bio: "Enjoys adventurous travel and new cultures." },
  { name: "Deborah Dada", school: "School name", bio: "Enjoys adventurous travel and new cultures." },
  { name: "Deborah Dada", school: "School name", bio: "Enjoys adventurous travel and new cultures." },
  { name: "Deborah Dada", school: "School name", bio: "Enjoys adventurous travel and new cultures." },
  { name: "Deborah Dada", school: "School name", bio: "Enjoys adventurous travel and new cultures." },
  { name: "Deborah Dada", school: "School name", bio: "Enjoys adventurous travel and new cultures." },
  { name: "Deborah Dada", school: "School name", bio: "Enjoys adventurous travel and new cultures." },
  { name: "Deborah Dada", school: "School name", bio: "Enjoys adventurous travel and new cultures." },
  { name: "Deborah Dada", school: "School name", bio: "Enjoys adventurous travel and new cultures." },
  { name: "Deborah Dada", school: "School name", bio: "Enjoys adventurous travel and new cultures." },
  { name: "Deborah Dada", school: "School name", bio: "Enjoys adventurous travel and new cultures." },
  { name: "Deborah Dada", school: "School name", bio: "Enjoys adventurous travel and new cultures." },
  { name: "Deborah Dada", school: "School name", bio: "Enjoys adventurous travel and new cultures." },
  { name: "Deborah Dada", school: "School name", bio: "Enjoys adventurous travel and new cultures." },
];
const slideFromLeft: Variants = {
    hidden: {
      opacity: 0,
      x: -80, // start from left
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // smooth easeOut
      },
    },
  };
  
/* ---------------------------------
   DATA
----------------------------------*/
const volunteers = [
  {
    name: "Deborah Dada",
    role: "Founder & Lead",
    bio: "Enjoys adventurous travel and new cultures.",
    image: "/coreteam1.svg",
  },
  {
    name: "Iyanoluwa Sonde-Ikokoh",
    role: "Programs Manager",
    bio: "Empowering young people to lead change.",
    image: "/coreteam2.svg",
  },
  {
    name: "Oluwadunni Akihnami",
    role: "Media Manager",
    bio: "5+ years in media & marketing.",
    image: "/coreteam3.svg",
  },
];

const roles = [
  { title: "Media", desc: "Content creation, photography & storytelling.", image: icon1 },
  { title: "Community", desc: "Coordination of teenage participants, schools, and mentors..", image: icon2 },
  { title: "Programs", desc: "Planning and execution of events, workshops, and conferences..", image: icon3 },
  { title: "Partnerships", desc: "Donor engagement, proposal writing, and corporate relations..", image: icon4 },
  { title: "Tech", desc: "Website development, product design, and digital experience.", image: icon5 },
  { title: "Admin & Logistics", desc: "Structure, process, and on-ground event management.", image: icon6 },
];
const volunteerImages = [
  {
    id: 1,
    src: "/volunteer1.svg",
    alt: "Volunteers posing",
    // Custom margin to handle the staggered look
    containerStyles: "mt-0" 
  },
  {
    id: 2,
    src: "/volunteer2.svg",
    alt: "Volunteers in green shirts",
    containerStyles: "mt-12"
  },
  {
    id: 3,
    src: "/volunteer3.svg",
    alt: "Volunteers walking",
    containerStyles: "-mt-6"
  },
  {
    id: 4,
    src: "/volunteer4.svg",
    alt: "Group of teens",
    containerStyles: "mt-0"
  }
];
const masonryImages = ["/volunteer1.svg", "/volunteer2.svg", "/volunteer3.svg", "/volunteer4.svg"];

/* ---------------------------------
   Skeleton Components
----------------------------------*/
function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-2xl p-6 shadow-sm">
      <div className="h-40 bg-gray-200 rounded-xl" />
      <div className="h-4 bg-gray-200 rounded mt-4 w-3/4" />
      <div className="h-3 bg-gray-200 rounded mt-2 w-1/2" />
      <div className="h-3 bg-gray-200 rounded mt-4 w-full" />
    </div>
  );
}

function SkeletonImage() {

  return (
    <div className="animate-pulse bg-gray-200 rounded-2xl w-full h-full" />
  );
}

/* ---------------------------------
   PAGE
----------------------------------*/
export default function VolunteersPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);
 
  return (
    <div>

    
    <main className="bg-white overflow-hidden">
  
<section className="flex flex-col md:flex-row items-start justify-between gap-12 p-8 max-w-7xl mx-auto bg-[#fdfdfd]">
      
      {/* Left Side: Image Grid using .map() */}
      <div className="grid grid-cols-2 gap-6 w-full md:w-1/2">
        {volunteerImages.map((image) => (
          <div key={image.id} className={`relative ${image.containerStyles}`}>
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-[280px] object-cover rounded-[2.5rem] shadow-lg"
            />
          </div>
        ))}
      </div>

      {/* Right Side: Text Content */}
      <div className="w-full md:w-1/2 space-y-4 px-4">
        <h2 className="text-5xl font-extrabold text-[#232735] tracking-tight">
          Our Volunteers
        </h2>
        <p className="text-lg text-gray-500 leading-relaxed max-w-md">
          Volunteers are the backbone of Trust Teens. They give 
          their time, skills, and energy to support our programs, 
          events, and community work, helping us deliver 
          meaningful experiences for teenagers.
        </p>
      </div>
      
    </section>
      {/* ================= COMMUNITY ================= */}
   
{/* ================= COMMUNITY ================= */}
<section className="bg-gray-50 py-20 overflow-hidden">
  <motion.div
    className="max-w-7xl mx-auto px-6 text-center"
    variants={slideFromLeft}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    <h3 className="text-3xl font-bold mb-4">
      Volunteer Community
    </h3>

    <p className="text-gray-600 max-w-3xl mx-auto">
    Our volunteers come from different backgrounds and contribute across various areas of Trust Teens. From event support to media, logistics, and community engagement, they help bring every initiative to life.
    </p>

    <div className="grid md:grid-cols-3 gap-8 mt-12">
      {loading
        ? Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))
        : volunteers.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.15,  
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-2 shadow-sm"
            >
              <Image
                src={v.image}
                alt={v.name}
                width={400}
                height={400}
                className="rounded-3xl mx-auto"
              />
              <h4 className="mt-4 font-semibold text-left">{v.name}</h4>
              <p className="text-orange-500 text-sm text-left" >{v.role}</p>
              <p className="text-gray-500 text-sm mt-2 w-2/3 ">{v.bio}</p>
                 <motion.div
                      className="flex justify-start gap-4 mt-4 text-gray-400"
                      whileHover={{ color: '#7c3aed' }}
                    >
                      <Facebook size={18} />
                      <Instagram size={18} />
                      <Linkedin size={18} />
                    </motion.div>
            </motion.div>
          ))}
    </div>
    <motion.button
  whileHover={{ scale: 1.05 }}
  className="mt-4 bg-orange-500 text-white px-6 py-3 rounded-lg"
  onClick={() => router.push("/team/Volunteers/allVolunteers")}
>
  See all Volunteers
</motion.button>

  </motion.div>
</section>

      {/* ================= ROLES ================= */}
  
{/* Changed grid-cols-2 to grid-cols-12 */}
<section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1  md:grid-cols-12 gap-16  items-start">
  
  {/* First Child: Takes 8 out of 12 columns (~67%) */}
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="lg:col-span-8" 
  >
    <h3 className="text-3xl font-bold mb-4">What Our Volunteers Do</h3>
    <p className="py-2">
    Volunteers support Trust Teens across different touchpoints, including conferences, summits, campaigns, and community activities. Their contributions help ensure smooth coordination, positive experiences, and safe environments for teenagers.
    </p>
    
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {roles.map((r) => (
        <motion.div key={r.title} whileHover={{ scale: 1.03 }} className="p-5 rounded-xl">
          <div className="bg-slate-50 p-3 rounded-full w-14 h-14 mb-4 flex items-center justify-center">
            <Image src={r.image} alt={r.title} width={35} height={35} />
          </div>
          <h4 className="font-semibold">{r.title}</h4>
          <p className="text-sm text-gray-600 mt-1">{r.desc}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>

  {/* Second Child: Takes 4 out of 12 columns (~33%) */}
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="lg:col-span-4 rounded-2xl overflow-hidden flex justify-center"
  >
    {loading ? (
      <SkeletonImage />
    ) : (
      <Image
        src="/rolevolunteer.svg"
        alt="Volunteer Action"
        width={600}
        height={400}
        className="w-full h-screen object-cover" // Ensures it fits well in the smaller space
      />
    )}
  </motion.div>
</section>
      {/* ================= CTA ================= */}
      <section className="bg-white-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {loading ? (
            <SkeletonImage />
          ) : (
            <Image
              src="/volunteersbg.svg"
              alt="Join Volunteer"
              width={600}
              height={400}
              className="rounded-2xl"
            />
          )}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="uppercase text-sm text-black">
              Join as a volunteer
            </p>
            <h3 className="text-3xl text-black font-bold mt-2">Volunteer With Us</h3>
            <p className="text-black mt-4">
            We welcome individuals who are willing to serve, learn, and contribute to meaningful youth-focused work. Volunteer opportunities are available across events, campaigns, and ongoing community initiatives.
Some roles are one-day commitments, while others span longer periods depending on the program.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-6 bg-orange-500 px-6 py-3 rounded-lg"
            >
              Join us today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
    </div>
  );
}
