// // app/volunteers/page.tsx
// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";

// const fadeUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0 },
// };
// /* DATA */
// const volunteers = [
//   {
//     name: "Deborah Dada",
//     role: "Founder & Lead",
//     bio: "Enjoys adventurous travel and new cultures.",
//     image: "/person1.jpg",
//   },
//   {
//     name: "Iyanoluwa Sonde-Ikokoh",
//     role: "Programs Manager",
//     bio: "Empowering young people to lead change.",
//     image: "/person2.jpg",
//   },
//   {
//     name: "Oluwadunni Akihnami",
//     role: "Media Manager",
//     bio: "5+ years in media & marketing.",
//     image: "/person3.jpg",
//   },
// ];

// const roles = [
//   { title: "Media", desc: "Content creation and storytelling." },
//   { title: "Community", desc: "Teen engagement & coordination." },
//   { title: "Programs", desc: "Events, workshops & conferences." },
//   { title: "Partnerships", desc: "Donor & corporate relations." },
//   { title: "Tech", desc: "Website & product development." },
//   { title: "Admin & Logistics", desc: "Operations & coordination." },
// ];

// export default function VolunteersPage() {
//   return (
//     <main className="bg-white">
//       {/* HERO / OUR VOLUNTEERS */}
//       <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
//         {/* Images */}
//         <motion.div
//           variants={fadeUp}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="grid grid-cols-2 gap-4"
//         >
//           {["/v1.jpg", "/v2.jpg", "/v3.jpg", "/v4.jpg"].map((img, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.05 }}
//               className="overflow-hidden rounded-2xl"
//             >
//               <Image
//                 src={img}
//                 alt="Volunteer"
//                 width={400}
//                 height={400}
//                 className="object-cover"
//               />
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Text */}
//         <motion.div
//           variants={fadeUp}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//         >
//           <h2 className="text-4xl font-bold mb-4">Our Volunteers</h2>
//           <p className="text-gray-600 leading-relaxed">
//             Volunteers are the backbone of Trust Teens. They give their time,
//             skills, and energy to support our programs, events, and community
//             work, helping us deliver meaningful experiences for teenagers.
//           </p>
//         </motion.div>
//       </section>

//       {/* VOLUNTEER COMMUNITY */}
//       <section className="bg-gray-50 py-20">
//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <motion.h3
//             variants={fadeUp}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="text-3xl font-bold mb-4"
//           >
//             Volunteer Community
//           </motion.h3>

//           <motion.p
//             variants={fadeUp}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             transition={{ delay: 0.1 }}
//             className="text-gray-600 max-w-3xl mx-auto"
//           >
//             Our volunteers come from different backgrounds and contribute across
//             various areas of Trust Teens.
//           </motion.p>

//           {/* Cards */}
//           <div className="grid md:grid-cols-3 gap-8 mt-12">
//             {volunteers.map((v, i) => (
//               <motion.div
//                 key={i}
//                 whileHover={{ y: -8 }}
//                 className="bg-white rounded-2xl p-6 shadow-sm"
//               >
//                 <Image
//                   src={v.image}
//                   alt={v.name}
//                   width={200}
//                   height={200}
//                   className="rounded-xl mx-auto"
//                 />
//                 <h4 className="mt-4 font-semibold">{v.name}</h4>
//                 <p className="text-orange-500 text-sm">{v.role}</p>
//                 <p className="text-gray-500 text-sm mt-2">{v.bio}</p>
//               </motion.div>
//             ))}
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             className="mt-12 bg-orange-500 text-white px-6 py-3 rounded-lg"
//           >
//             See all Volunteers
//           </motion.button>
//         </div>
//       </section>

//       {/* WHAT OUR VOLUNTEERS DO */}
//       <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16">
//         <motion.div
//           variants={fadeUp}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           <h3 className="text-3xl font-bold mb-4">What Our Volunteers Do</h3>
//           <p className="text-gray-600 mb-8">
//             Volunteers support Trust Teens across different touchpoints.
//           </p>

//           <div className="grid grid-cols-2 gap-6">
//             {roles.map((r, i) => (
//               <motion.div
//                 key={i}
//                 whileHover={{ scale: 1.03 }}
//                 className="bg-gray-50 p-5 rounded-xl"
//               >
//                 <h4 className="font-semibold">{r.title}</h4>
//                 <p className="text-sm text-gray-600 mt-1">{r.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         <motion.div
//           variants={fadeUp}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           transition={{ delay: 0.2 }}
//           className="rounded-2xl overflow-hidden"
//         >
//           <Image
//             src="/volunteer-action.jpg"
//             alt="Volunteer Action"
//             width={600}
//             height={600}
//             className="object-cover"
//           />
//         </motion.div>
//       </section>

//       {/* JOIN AS A VOLUNTEER */}
//       <section className="bg-gray-900 text-white py-20">
//         <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
//           <Image
//             src="/join-volunteer.jpg"
//             alt="Join Volunteer"
//             width={600}
//             height={400}
//             className="rounded-2xl"
//           />

//           <motion.div
//             variants={fadeUp}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//           >
//             <p className="uppercase text-sm text-orange-400">
//               Join as a volunteer
//             </p>
//             <h3 className="text-3xl font-bold mt-2">Volunteer With Us</h3>
//             <p className="text-gray-300 mt-4">
//               We welcome individuals who are willing to serve, learn, and
//               contribute to meaningful youth-focused work.
//             </p>

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               className="mt-6 bg-orange-500 px-6 py-3 rounded-lg"
//             >
//               Join us today
//             </motion.button>
//           </motion.div>
//         </div>
//       </section>
//     </main>
//   );
// }



"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/* ---------------------------------
   Animation Variants (Mobile Safe)
----------------------------------*/
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
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
    image: "/person1.jpg",
  },
  {
    name: "Iyanoluwa Sonde-Ikokoh",
    role: "Programs Manager",
    bio: "Empowering young people to lead change.",
    image: "/person2.jpg",
  },
  {
    name: "Oluwadunni Akihnami",
    role: "Media Manager",
    bio: "5+ years in media & marketing.",
    image: "/person3.jpg",
  },
];

const roles = [
  { title: "Media", desc: "Content creation, photography & storytelling." },
  { title: "Community", desc: "Teen engagement & coordination." },
  { title: "Programs", desc: "Events, workshops & conferences." },
  { title: "Partnerships", desc: "Donor & corporate relations." },
  { title: "Tech", desc: "Website & product development." },
  { title: "Admin & Logistics", desc: "Operations & coordination." },
];

const masonryImages = ["/v1.jpg", "/v2.jpg", "/v3.jpg", "/v4.jpg"];

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

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="bg-white overflow-hidden">
      {/* ================= HERO / OUR VOLUNTEERS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Masonry Images */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 auto-rows-[180px] gap-4"
        >
          {masonryImages.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04 }}
              className={`relative overflow-hidden rounded-2xl ${
                i % 3 === 0 ? "row-span-2" : "row-span-1"
              }`}
            >
              {loading ? (
                <SkeletonImage />
              ) : (
                <Image
                  src={img}
                  alt="Volunteer activity"
                  fill
                  className="object-cover"
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Text */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">Our Volunteers</h2>
          <p className="text-gray-600 leading-relaxed">
            Volunteers are the backbone of Trust Teens. They give their time,
            skills, and energy to support our programs, events, and community
            work, helping us deliver meaningful experiences for teenagers.
          </p>
        </motion.div>
      </section>

      {/* ================= VOLUNTEER COMMUNITY ================= */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h3
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4"
          >
            Volunteer Community
          </motion.h3>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-gray-600 max-w-3xl mx-auto"
          >
            Our volunteers come from diverse backgrounds and contribute across
            different areas of Trust Teens.
          </motion.p>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : volunteers.map((v, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-2xl p-6 shadow-sm"
                  >
                    <Image
                      src={v.image}
                      alt={v.name}
                      width={200}
                      height={200}
                      className="rounded-xl mx-auto"
                    />
                    <h4 className="mt-4 font-semibold">{v.name}</h4>
                    <p className="text-orange-500 text-sm">{v.role}</p>
                    <p className="text-gray-500 text-sm mt-2">{v.bio}</p>
                  </motion.div>
                ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-12 bg-orange-500 text-white px-6 py-3 rounded-lg"
          >
            See all Volunteers
          </motion.button>
        </div>
      </section>

      {/* ================= WHAT OUR VOLUNTEERS DO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-4">What Our Volunteers Do</h3>
          <p className="text-gray-600 mb-8">
            Volunteers support Trust Teens across different touchpoints.
          </p>

          <div className="grid grid-cols-2 gap-6">
            {roles.map((r, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="bg-gray-50 p-5 rounded-xl"
              >
                <h4 className="font-semibold">{r.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden"
        >
          {loading ? (
            <SkeletonImage />
          ) : (
            <Image
              src="/volunteer-action.jpg"
              alt="Volunteer Action"
              width={600}
              height={600}
              className="object-cover"
            />
          )}
        </motion.div>
      </section>

      {/* ================= JOIN AS A VOLUNTEER ================= */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {loading ? (
            <SkeletonImage />
          ) : (
            <Image
              src="/join-volunteer.jpg"
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
            <p className="uppercase text-sm text-orange-400">
              Join as a volunteer
            </p>
            <h3 className="text-3xl font-bold mt-2">Volunteer With Us</h3>
            <p className="text-gray-300 mt-4">
              We welcome individuals who are willing to serve, learn, and
              contribute to meaningful youth-focused work.
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
  );
}
