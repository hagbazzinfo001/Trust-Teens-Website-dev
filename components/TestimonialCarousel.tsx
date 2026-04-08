'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { fetchTestimonials } from '@/lib/testimonialsApi';

type Testimonial = {
  quote: string;
  name: string;
  age: string;
  avatars: string[];
};

const defaultTestimonials: Testimonial[] = [
  {
    quote:
      'We had an incredible experience working with Landify and were impressed they made such a big difference in only three weeks. Our team is so grateful for the wonderful improvements they made and their ability to get familiar with the product concept so quickly. It acted as a catalyst to take our design to the next level and get more eyes on our product..',
    name: 'Jane Cooper',
    age: '14 year’s old',
    avatars: [
      '/images/testimonia1.svg',
      '/images/testimonia2.svg',
      '/images/testimonia3.svg',
      '/images/testimonia4.svg',
      '/images/testimonia5.svg',
    ],
  },
  {
    quote:
      'This program helped me build confidence, leadership skills, and gave me a voice in my community.',
    name: 'Samuel Ade',
    age: '16 year’s old',
    avatars: [
      '/images/testimonia1.svg',
      '/images/testimonia2.svg',
      '/images/testimonia3.svg',
      '/images/testimonia4.svg',
      '/images /testimonia5.svg',
    ],
  },
  {
    quote:
      'This program helped me build confidence, leadership skills, and gave me a voice in my community.',
    name: 'Owolabi Agbabiaka',
    age: '30 year’s old',
    avatars: [
      '/images/testimonia1.svg',
      '/images/testimonia2.svg',
      '/images/testimonia3.svg',
      '/images/testimonia4.svg',
      '/images /testimonia5.svg',
    ],
  },
  {
    quote:
      'This program helped me build confidence, leadership skills, and gave me a voice in my community.',
    name: 'Afis Olaranwaju',
    age: '28 year’s old',
    avatars: [
      '/images/testimonia1.svg',
      '/images/testimonia2.svg',
      '/images/testimonia3.svg',
      '/images/testimonia4.svg',
      '/images /testimonia5.svg',
    ],
  },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.96,
  }),
};

export default function TestimonialCarousel() {
  const [dataList, setDataList] = useState<Testimonial[]>(defaultTestimonials);
  const [[index, direction], setIndex] = useState([0, 0]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchTestimonials().then(res => {
      if (res && res.length > 0) {
        const avatarsList = res.map(t => t.teenImage || '/images/testimonia1.svg');
        const mapped = res.map(t => ({
          quote: t.quoteText,
          name: t.teenName,
          age: t.teenAge,
          avatars: avatarsList
        }));
        setDataList(mapped);
      }
    }).catch(e => console.error("Failed to fetch testimonials", e));
  }, []);

  const testimonial = dataList[index] || defaultTestimonials[0];

  const paginate = (dir: number) => {
    setIndex(([prev]) => [
      (prev + dir + dataList.length) % dataList.length,
      dir,
    ]);
  };

  // Auto rotate
  useEffect(() => {
    timeoutRef.current = setTimeout(() => paginate(1), 6000);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [index]);

  return (
    <section className="relative py-24 px-4 overflow-hidden text-white">
      {/* 🔁 Replace background later */}
      <img
        src="/images/ImpactBlue.svg"
        alt="impact background"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Who did this really touch?
        </h2>
        <p className="text-white/80">
          Our achievement in the journey depicted in numbers
        </p>
      </div>

      {/* Carousel */}
      <div className="relative max-w-4xl mx-auto">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={(_, info) => {
              if (info.offset.x > 80) paginate(-1);
              if (info.offset.x < -80) paginate(1);
            }}
            className="relative bg-white text-gray-800 rounded-2xl px-10 py-12 shadow-xl cursor-grab active:cursor-grabbing"
          >
            {/* Quote mark */}
            <span className="absolute top-6 left-8 text-orange-500 text-5xl font-bold">
              “
            </span>

            <p className="text-lg leading-relaxed mt-6">
              {testimonial.quote}
            </p>

            {/* Bubble pointer */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rotate-45" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Avatars + Name */}
      <div className="mt-12 flex flex-col items-center gap-6">
        <div className="flex gap-4">
          {testimonial.avatars.map((src, i) => (
            <img
              key={i}
              src={src}
              className="w-12 h-12 rounded-full border-2 border-white object-cover"
              alt="avatar"
            />
          ))}
        </div>

        <div className="text-center">
          <p className="font-semibold text-lg">{testimonial.name}</p>
          <p className="text-sm text-white/70">{testimonial.age}</p>
        </div>

        {/* Pagination */}
        <div className="flex gap-3 mt-4">
          {dataList.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex([i, i > index ? 1 : -1])}
              className={`w-3 h-3 rounded-full transition ${i === index ? 'bg-white' : 'bg-white/40'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
