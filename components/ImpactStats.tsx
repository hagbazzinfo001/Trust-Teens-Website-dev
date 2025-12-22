'use client';

import { motion } from 'framer-motion';
import CountUp from "@/components/ui/CountUp2"

const stats = [
    {
      value: 17,
      label: 'Events Organised',
      bgImage: '/ImpactPurple.svg',
    },
    {
      value: 54,
      label: 'Activities Set Up',
      bgImage: '/ImpactGreen.svg',
    },
    {
      value: 19,
      label: 'Communities Engaged',
      bgImage: '/ImpactYellow.svg',
    },
    {
      value: 200,
      label: 'Members',
      bgImage: '/ImpactRed.svg',
    },
    {
      value: 30,
      label: 'Speakers / Mentors',
      bgImage: '/ImpactBlue.svg',
    },
    {
      value: 105,
      label: 'Volunteers',
      bgImage: '/ImpactOrange.svg',
    },
  ];
  
export default function ImpactStats() {
  return (
    <section className="w-full mx-auto  py-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 overflow-hidden ">

        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative h-56 md:h-64 flex flex-col items-center justify-center text-white text-center overflow-hidden"
            style={{
              backgroundImage: `url(${stat.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Overlay for text contrast */}
            <div className="absolute inset-0 bg-black/25" />

            {/* Content */}
            <div className="relative z-10">
              <CountUp value={stat.value} />
              <p className="mt-3 text-sm tracking-widest uppercase">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
}
