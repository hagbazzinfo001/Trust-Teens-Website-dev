// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { getUpcomingHangout, UpcomingEvent } from '@/lib/adminData';

// export default function UpcomingHangouts() {
//   const [event, setEvent] = useState<UpcomingEvent | null>(null);
//   const revealRefs = useRef<HTMLElement[]>([]);

//   useEffect(() => {
//     const data = getUpcomingHangout();
//     if (data && data.is_active) {
//       setEvent(data);
//     }
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('opacity-100', 'translate-y-0');
//           }
//         });
//       },
//       { threshold: 0.2 }
//     );

//     revealRefs.current.forEach((ref) => {
//       if (ref) observer.observe(ref);
//     });

//     return () => observer.disconnect();
//   }, [event]); // Re-run when event is loaded

//   const addToRefs = (el: HTMLElement | null) => {
//     if (el && !revealRefs.current.includes(el)) {
//       revealRefs.current.push(el);
//     }
//   };

//   if (!event) return null; // Kill Switch

//   return (
//     <section className="w-full bg-orange-50 py-20 px-6 lg:px-20 border-y border-orange-100">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//         <div className="flex justify-center">
//           <div
//             ref={addToRefs}
//             className="w-[280px] sm:w-[340px] lg:w-[420px] shadow-2xl rounded-3xl overflow-hidden opacity-0 translate-y-8 transition-all duration-[1200ms]"
//           >
//             <img
//               src={event.promo_image || "https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764810649/Phone_Mockup_cxmgpl.png"}
//               alt={event.name}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>

//         <div
//           ref={addToRefs}
//           className="opacity-0 translate-y-8 transition-all duration-[1200ms] space-y-6"
//         >
//           <p className="tracking-widest text-orange-600 text-sm font-bold uppercase">
//             Upcoming Hangout
//           </p>

//           <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
//             {event.name}
//           </h2>

//           <p className="text-gray-600 leading-relaxed text-lg italic">
//             &quot;{event.description}&quot;
//           </p>

//           <div className="space-y-3 bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
//             <div className="flex items-center gap-3 text-gray-800">
//               <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
//                 📅
//               </div>
//               <span className="font-semibold">{event.date_time}</span>
//             </div>
//             <div className="flex items-center gap-3 text-gray-800">
//               <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
//                 📍
//               </div>
//               <span className="font-semibold">{event.location}</span>
//             </div>
//           </div>

//           <a
//             href={event.register_url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-block relative bg-orange-500 text-white font-black px-12 py-4 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-orange-600 shadow-xl shadow-orange-200 active:scale-95"
//           >
//             Register Now →
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }



'use client';

import { useEffect, useRef } from 'react';

export default function UpcomingHangouts() {
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        });
      },
      { threshold: 0.2 }
    );

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <section className="w-full bg-white py-20 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          <div
            ref={addToRefs}
            className="w-[280px] sm:w-[340px] lg:w-[420px] float-animation opacity-0 translate-y-8 transition-all duration-[1200ms]"
          >
            <img
              src="https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764810649/Phone_Mockup_cxmgpl.png"
              alt="Campaign Preview"
              className="rounded-3xl shadow-xl w-full"
            />
          </div>
        </div>

        <div
          ref={addToRefs}
          className="opacity-0 translate-y-8 transition-all duration-[1200ms]"
        >
          {/* RIGHT — Content + Scroll Reveal */}
          <div
            ref={addToRefs}
            className="opacity-0 translate-y-8 transition-all duration-[1200ms]"
          >
            <p className="tracking-widest text-gray-500 text-sm mb-2 uppercase">
              Upcoming Hangout
            </p>

            <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
              Hangout Name
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Condimentum diam orci
              pretium a pharetra, feugiat cursus. Dictumst risus, sem egestas odio cras
              adipiscing vulputate.
            </p>

            <p className="font-semibold text-gray-800">
              Saturday, 21st November 2025; 02:00 PM
            </p>

            <p className="text-gray-900 font-medium mt-2">Location???</p>

            {/* Button with Scale + Shine Hover Effect */}
            <button className="relative mt-8 bg-orange-500 text-white font-semibold px-10 py-3 rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:bg-orange-600 shine-btn">
              Register Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
