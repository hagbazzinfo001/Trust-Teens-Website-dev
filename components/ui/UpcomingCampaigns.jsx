"use client";
import { useEffect, useRef } from "react";

export default function UpcomingCampaigns() {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
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

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <section className="w-full bg-white py-20 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT — Floating Image + Scroll Reveal */}
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

        {/* RIGHT — Content + Scroll Reveal */}
        <div
          ref={addToRefs}
          className="opacity-0 translate-y-8 transition-all duration-[1200ms]"
        >
          <p className="tracking-widest text-gray-500 text-sm mb-2 uppercase">
            Upcoming Campaigns
          </p>

          <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
            Campaign Name
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
    </section>
  );
}


// "use client";
// import { useEffect, useRef } from "react";

// export default function UpcomingCampaigns({
//   title = "Campaign Name",
//   subtitle = "Upcoming Campaigns",
//   description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Condimentum diam orci pretium a pharetra, feugiat cursus.",
//   datetime = "Saturday, 21st November 2025; 02:00 PM",
//   location = "Location???",
//   image = "https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764810649/Phone_Mockup_cxmgpl.png?auto=compress&cs=tinysrgb&w=600",
//   buttonLabel = "Register Now",
// }) {
//   const revealRefs = useRef([]);

//   // Scroll-triggered animation
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("opacity-100", "translate-y-0");
//           }
//         });
//       },
//       { threshold: 0.2 }
//     );

//     revealRefs.current.forEach((ref) => {
//       if (ref) observer.observe(ref);
//     });

//     return () => observer.disconnect();
//   }, []);

//   const addToRefs = (el) => {
//     if (el && !revealRefs.current.includes(el)) {
//       revealRefs.current.push(el);
//     }
//   };

//   return (
//     <section className="w-full bg-white py-20 px-6 lg:px-20">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

//         {/* LEFT — Floating Image */}
//         <div className="flex justify-center">
//           <div
//             ref={addToRefs}
//             className="w-[260px] sm:w-[330px] lg:w-[420px] float-animation opacity-0 translate-y-8 transition-all duration-[1200ms]"
//           >
//             <img
//               src={image}
//               alt={title}
//               className="rounded-3xl shadow-xl w-full"
//             />
//           </div>
//         </div>

//         {/* RIGHT — Dynamic Content */}
//         <div
//           ref={addToRefs}
//           className="opacity-0 translate-y-8 transition-all duration-[1200ms]"
//         >
//           <p className="tracking-widest text-gray-500 text-sm mb-2 uppercase">
//             {subtitle}
//           </p>

//           <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
//             {title}
//           </h2>

//           <p className="text-gray-600 leading-relaxed mb-6">
//             {description}
//           </p>

//           <p className="font-semibold text-gray-800">{datetime}</p>

//           <p className="text-gray-900 font-medium mt-2">{location}</p>

//           {/* Button Hover Effect */}
//           <button className="relative mt-8 bg-orange-500 text-white font-semibold px-10 py-3 rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:bg-orange-600 shine-btn">
//             {buttonLabel}
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }
