// // "use client";
// // import { motion } from "framer-motion";
// // import Image from "next/image";
// // import { useRef } from "react";

// // export default function PartnerSection() {
// //   const shineRef = useRef<HTMLSpanElement>(null);

// //   const triggerShine = () => {
// //     if (!shineRef.current) return;

// //     // Reset animation by removing and re-adding the class
// //     shineRef.current.classList.remove("shine-animate");

// //     // Allow DOM to process the removal
// //     void shineRef.current.offsetWidth;

// //     // Re-add class to replay animation
// //     shineRef.current.classList.add("shine-animate");
// //   };

// //   return (
// //     <section
// //       className="relative overflow-hidden bg-[#257CFF] text-white py-24 px-6 cursor-pointer"
// //       onClick={triggerShine} // CLICK ANYWHERE
// //     >
// //       <Image
// //         src="https://your-bg-image.com/background.png"
// //         alt="background texture"
// //         fill
// //         className="object-cover opacity-30 pointer-events-none"
// //       />

// //       <motion.div
// //         initial={{ opacity: 0, y: 30 }}
// //         whileInView={{ opacity: 1, y: 0 }}
// //         viewport={{ once: true }}
// //         transition={{ duration: 0.8 }}
// //         className="relative z-10 max-w-4xl mx-auto text-center"
// //       >
// //         <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
// //           Partner with us to support <br /> meaningful teen impact.
// //         </h2>

// //         <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
// //           We believe stronger communities are built when organisations work
// //           together. Partner with us to support campaigns in health, wellbeing,
// //           relationships, digital literacy, social justice, creativity, and more.
// //           Together, we influence teenagers and help them grow into responsible
// //           leaders.
// //         </p>

// //         {/* CTA BUTTON */}
// //         <motion.a
// //           href="#contact"
// //           whileHover={{ scale: 1.05 }}
// //           className="relative inline-block px-8 py-4 bg-orange-500 rounded-lg text-lg 
// //           font-semibold overflow-hidden"
// //         >
// //           {/* SHINE EFFECT */}
// //         <span
// //   ref={shineRef}
// //   className="absolute inset-0 -left-full bg-white/30 skew-x-12 partner-shine"
// // ></span>


// //           <span className="relative z-10">We await your message</span>
// //         </motion.a>
// //       </motion.div>
// //     </section>
// //   );
// // }

// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import { useRef } from "react";

// export default function PartnerSection() {
//   const shineRef = useRef<HTMLSpanElement>(null);

//   const triggerShine = () => {
//     if (!shineRef.current) return;

//     // CLEAN FIXED LINE
//     shineRef.current.classList.remove("partner-shine-animate");

//     void shineRef.current.offsetWidth; // force reflow

//     shineRef.current.classList.add("partner-shine-animate");
//   };

//   return (
//     <section
//       className="relative overflow-hidden bg-[#257CFF] text-white py-24 px-6 cursor-pointer"
//       onClick={triggerShine}
//     >
//       <Image
//         src="https://your-bg-image.com/background.png"
//         alt="background texture"
//         fill
//         className="object-cover opacity-30 pointer-events-none"
//       />

//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8 }}
//         className="relative z-10 max-w-4xl mx-auto text-center"
//       >
//         <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
//           Partner with us to support meaningful teen impact.
//         </h2>

//         <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10">
//           We believe stronger communities are built when organisations work
//           together...
//         </p>

//         <motion.a
//           href="#contact"
//           whileHover={{ scale: 1.05 }}
//           className="relative inline-block px-8 py-4 bg-orange-500 rounded-lg 
//           font-semibold overflow-hidden"
//         >
//           <span
//             ref={shineRef}
//             className="partner-shine absolute inset-0 -left-full 
//             bg-white/30 skew-x-12"
//           ></span>

//           <span className="relative z-10">We await your message</span>
//         </motion.a>
//       </motion.div>
//     </section>
//   );
// }
