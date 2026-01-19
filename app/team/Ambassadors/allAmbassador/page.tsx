"use client";

import Image from "next/image";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const ambassadors = [
  { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
  { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
  { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
  { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
  { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
  { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
  { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
  { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
  { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
  { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
  { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
  { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
  { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
  { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
  { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
];
export default function allAmbassadorPage() {
  
      const containerVariants: Variants = {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.12,
          },
        },
      };
      
      const cardVariants: Variants = {
        hidden: {
          opacity: 0,
          x: -60,
        },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1], // ✅ now TS-safe
          },
        },
      };
      
  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold text-center mb-4">
        Ambassador Community
      </h1>

      <p className="text-center max-w-3xl mx-auto text-gray-600 mb-12">
        Our ambassadors are young leaders who embody purpose, responsibility, and influence.
      </p>

<motion.div
className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
variants={containerVariants}
initial="hidden"
animate="visible"
>
      {ambassadors.map((a, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{ y: -5 }}
            className="rounded-2xl border p-4 shadow-sm bg-white"
          >
           <Image
                src="/coreteam2.svg"
                alt="Ambassador"
                width={200}
                height={200}
                className="h-26 w-full rounded-xl mb-4 object-cover"
              />

              <h4 className="font-semibold">{a.name}</h4>
              <p className="text-sm text-orange-500">{a.school}</p>
              <p className="text-sm text-gray-500">{a.location}</p>
            <div className="flex gap-4 mt-4 text-gray-400">
              <Facebook size={18} />
              <Instagram size={18} />
              <Linkedin size={18} />
            </div>
          </motion.div>
        ))}
    </motion.div>
    </main>
  );
}
