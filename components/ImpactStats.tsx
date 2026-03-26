'use client';

import { motion } from 'framer-motion';
import CountUp from "@/components/ui/CountUp2"
import { useEffect, useState } from 'react';
import { fetchImpactMetrics } from '@/lib/impactApi';

const DEFAULT_STATS = [
  {
    value: 17,
    label: 'Events Organised',
    bgImage: '/images/ImpactPurple.svg',
  },
  {
    value: 54,
    label: 'Activities Set Up',
    bgImage: '/images/ImpactGreen.svg',
  },
  {
    value: 19,
    label: 'Communities Engaged',
    bgImage: '/images/ImpactYellow.svg',
  },
  {
    value: 200,
    label: 'Members',
    bgImage: '/images/ImpactRed.svg',
  },
  {
    value: 30,
    label: 'Speakers / Mentors',
    bgImage: '/images/ImpactBlue.svg',
  },
  {
    value: 105,
    label: 'Volunteers',
    bgImage: '/images/ImpactOrange.svg',
  },
];

const BG_IMAGES = [
  '/images/ImpactPurple.svg',
  '/images/ImpactGreen.svg',
  '/images/ImpactYellow.svg',
  '/images/ImpactRed.svg',
  '/images/ImpactBlue.svg',
  '/images/ImpactOrange.svg',
];

export default function ImpactStats() {
  const [stats, setStats] = useState(DEFAULT_STATS);

  useEffect(() => {
    fetchImpactMetrics().then((savedMetrics) => {
      if (savedMetrics && savedMetrics.length > 0) {
        setStats(
          savedMetrics.map((m, i) => ({
            value: parseInt(m.metricValue) || 0,
            label: m.metricLabel,
            bgImage: BG_IMAGES[i % BG_IMAGES.length],
          }))
        );
      }
    }).catch(e => console.error("Failed to load metrics", e));
  }, []);
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
