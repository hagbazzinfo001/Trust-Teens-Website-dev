// // "use client";
// // import { useRef } from "react";

// // export default function ShineButton() {
// //   const btnRef = useRef<HTMLButtonElement | null>(null);
// //   const shineRef = useRef<HTMLSpanElement | null>(null);

// //   const triggerEffect = () => {
// //     if (!btnRef.current || !shineRef.current) return;

// //     // Reset shine animation
// //     // shineRef.current.classList.remove("shine-animate");
// //     // void shineRef.current.offsetWidth;
// //     // shineRef.current.classList.add("shine-animate");
// // shineRef.current.classList.remove("partner-shine-animate");
// // void shineRef.current.offsetWidth;
// // shineRef.current.classList.add("partner-shine-animate");

// //     // Reset click scale animation
// //     btnRef.current.classList.remove("btn-click-animate");
// //     void btnRef.current.offsetWidth;
// //     btnRef.current.classList.add("btn-click-animate");
// //   };

// //   return (
// //     <button
// //       ref={btnRef}
// //       onClick={triggerEffect}
// //       className="relative inline-block px-10 py-4 bg-orange-500 
// //         text-white font-semibold rounded-xl overflow-hidden 
// //         transition-transform duration-300 hover:scale-105 active:scale-95"
// //     >
// //       {/* Shine Overlay */}
// //       <span
// //         ref={shineRef}
// //         className="shine absolute inset-0 -left-full bg-white/20 skew-x-12 pointer-events-none"
// //       />

// //       <span className="relative z-10">We await your message</span>
// //     </button>
// //   );
// // }

// "use client";
// import { useRef } from "react";

// export default function ShineButton() {
//   const btnRef = useRef<HTMLButtonElement | null>(null);
//   const shineRef = useRef<HTMLSpanElement | null>(null);

//   const triggerEffect = () => {
//     if (!btnRef.current || !shineRef.current) return;

//     shineRef.current.classList.remove("partner-shine-animate");
//     void shineRef.current.offsetWidth;
//     shineRef.current.classList.add("partner-shine-animate");

//     btnRef.current.classList.remove("btn-click-animate");
//     void btnRef.current.offsetWidth;
//     btnRef.current.classList.add("btn-click-animate");
//   };

//   return (
//     <button
//       ref={btnRef}
//       onClick={triggerEffect}
//       className="relative inline-block px-10 py-4 bg-orange-500 
//         text-white font-semibold rounded-xl overflow-hidden 
//         transition-transform duration-300 hover:scale-105 active:scale-95"
//     >
//       <span
//         ref={shineRef}
//         className="partner-shine absolute inset-0 -left-full bg-white/20 
//         skew-x-12 pointer-events-none"
//       />

//       <span className="relative z-10">We await your message</span>
//     </button>
//   );
// }
