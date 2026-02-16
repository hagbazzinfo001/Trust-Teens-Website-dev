// 'use client';

// import { motion } from 'framer-motion';
// import Image from 'next/image';

// const images = [
//   '/ImpactImage_1.svg',
//   '/ImpactImage_2.svg',
//   '/ImpactImage_3.svg',
//   '/ImpactImage_4.svg',
//   '/ImpactImage_5.svg',
// ];

// export default function AutoScrollImages() {
//   return (
//     <div>
//     <div className="overflow-hidden w-full py-8">
//       <motion.div
//         className="flex gap-6"
//         animate={{ x: ['0%', '-100%'] }}
//         transition={{
//           repeat: Infinity,
//           repeatType: 'loop',
//           duration: 30,
//           ease: 'linear',
//         }}
//       >
//         {[...images, ...images].map((src, index) => (
//           <div
//             key={index}
//             className="relative w-[280px] h-[200px] flex-shrink-0 rounded-2xl overflow-hidden"
//           >
//             <Image
//               src={src}
//               alt="Event"
//               fill
//               className="object-cover"
//             />
//           </div>
//         ))}
//       </motion.div>
//     </div>
//       <section className="max-w-7xl mx-auto px-6  grid lg:grid-cols-2 gap-16">
      
//       {/* LEFT */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//       >
//         <h2 className="text-6xl font-extrabold mb-4">8906</h2>
//         <p className="tracking-widest text-sm mb-6">TEENAGERS IMPACTED</p>

//         <p className="text-gray-600 leading-relaxed mb-6">
//           Through every conference hall filled, every campaign walked, and every
//           conversation held, one thing has remained consistent: teenagers show up
//           ready.
//         </p>

//         <p className="text-gray-600 leading-relaxed">
//           Beyond the numbers, what we have witnessed is resilience, curiosity,
//           courage, and a deep hunger for direction.
//         </p>
//       </motion.div>

//       {/* RIGHT */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         whileInView={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//       >
//         <p className='pb-8 text-gray-600 leading-relaxed'>
//         We have watched teenagers step onto stages for the first time. We have listened as they spoke about purpose, fear, identity, and dreams they had never said out loud before. We have seen them move from silence to confidence, from confusion to clarity, from observation to participation. <br /><br />

// As Trust Teens continues to grow, we hold one conviction firmly: impact is not only about how many teenagers we reach, but how deeply they are shaped. The numbers matter. But the transformation matters more.
//         </p>
//         <Image
//           src="/ImpactImage_6.svg"
//           alt="Group"
//           width={900}
//           height={400}
//           className="rounded-2xl object-cover"
//         />
//       </motion.div>
//     </section>
//     </div>

//   );
// }



'use client';

import { motion, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';

const images = [
  '/images/ImpactImage_1.svg',
  '/images/ImpactImage_2.svg',
  '/images/ImpactImage_3.svg',
  '/images/ImpactImage_4.svg',
  '/images/ImpactImage_5.svg',
];

export default function AutoScrollImages() {
  const controls = useAnimationControls();

  useEffect(() => {
    startAutoScroll();
  }, []);

  const startAutoScroll = () => {
    controls.start({
      x: '-50%',
      transition: {
        duration: 30,
        ease: 'linear',
        repeat: Infinity,
      },
    });
  };

  return (
    <div>
      {/* SCROLLING IMAGES */}
      <div className="overflow-hidden w-full py-8 cursor-grab active:cursor-grabbing">
        <motion.div
          className="flex gap-6"
          drag="x"
          dragConstraints={{ left: -1500, right: 0 }}
          animate={controls}
          onPointerDown={() => controls.stop()}
          onPointerUp={startAutoScroll}
          onPointerLeave={startAutoScroll}
        >
          {[...images, ...images].map((src, index) => (
            <div
              key={index}
              className="
                relative
                w-[280px]
                h-[200px]
                flex-shrink-0
                rounded-2xl
                overflow-hidden
                border border-gray-200
                shadow-md
              "
            >
              <Image
                src={src}
                alt="Event"
                fill
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* CONTENT SECTION */}
      <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
        
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl font-extrabold mb-4">8906</h2>
          <p className="tracking-widest text-sm mb-6">TEENAGERS IMPACTED</p>

          <p className="text-gray-600 leading-relaxed mb-6">
          Through every conference hall filled, every small room gathered, every campaign walked, and every conversation held, one thing has remained consistent. Teenagers show up ready. Ready to learn. Ready to grow. Ready to lead, if given the right environment. Since 2024, Trust Teens has reached thousands of teenagers across conferences, summits, campaigns, community service, and small group hangouts. 

          </p>

          <p className="text-gray-600 leading-relaxed">
          But beyond the numbers, what we have witnessed is resilience, curiosity, courage, and a deep hunger for direction.And this is only the beginning.
.
          </p>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="pb-8 text-gray-600 leading-relaxed">
            We have watched teenagers step onto stages for the first time. We have listened
            as they spoke about purpose, fear, identity, and dreams they had never said out
            loud before.
            <br /><br />
            As Trust Teens continues to grow, we hold one conviction firmly: impact is not
            only about how many teenagers we reach, but how deeply they are shaped.
          </p>

          <Image
            src="/images/ImpactImage_6.svg"
            alt="Group"
            width={900}
            height={400}
            className="rounded-2xl object-cover shadow-lg border border-gray-200"
          />
        </motion.div>
      </section>
    </div>
  );
}
