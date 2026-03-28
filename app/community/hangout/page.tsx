
"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import PastHangouts from '@/components/PastHangouts';

import icon1 from "@/public/images/icon1.svg";
import icon3 from "@/public/images/icon3.svg";
import icon4 from "@/public/images/icon4.svg";
import icon2 from "@/public/images/icon2.svg";
import icon5 from "@/public/images/icon5.svg";
import icon6 from "@/public/images/icon6.svg";
import UpcomingHangouts from "@/components/ui/UpcomingHangouts";
import {
  ArrowRight,
  Users,
  GraduationCap,
  BookOpen,
  Package,
} from "lucide-react";
import { use } from "react";



export default function HangoutsPage() {
  //  const res = await fetch("https://your-api.com/campaign", {
  //     next: { revalidate: 10 }, // optional caching
  //   });
  //   const data = await res.json();

  const features = [
    {
      title: "Health & Wellness",
      description:
        "Helping teens build healthy habits, stay active, and improve wellbeing.",
      icon: icon1,
    },
    {
      title: "Digital Literacy",
      description:
        "Teaching safe online behaviour, smart tech use, and digital awareness.",
      icon: icon2,
    },
    {
      title: "Social justice",
      description:
        "Helping teens understand fairness, challenge inequality, serve others, support justice.",
      icon: icon3,
    },
    {
      title: "Emotions & Relationships",
      description:
        "Helping teens understand emotions, build respect, strengthen friendships, set boundaries.",
      icon: icon4,
    },
    {
      title: "Creativity",
      description:
        "Encouraging teens to explore ideas, express themselves, create new work.",
      icon: icon5,
    },
    {
      title: "Food & Nutrition",
      description:
        "Teaching teens healthy eating habits, food awareness, simple nutrition knowledge.",
      icon: icon6,
    },
  ];
  const coreComponents = [
    {
      title: "Large Audience",
      description:
        "Thousands of teenagers gather from schools and communities.",
      icon: icon1,
    },
    {
      title: "Keynote Sessions",
      description:
        "Impactful talks from experienced leaders and professionals.",
      icon: icon2,
    },
    {
      title: "Competitions & Awards",
      description:
        "Debates, spelling challenges, business pitches and more.",
      icon: icon3,
    },
    {
      title: "Innovation & Creativity",
      description:
        "Idea pitching, talent showcases, and problem-solving moments.",
      icon: icon4,
    },
    {
      title: "Teen Panels",
      description:
        "Peer-led conversations that give teenagers a voice in the room.",
      icon: icon5,
    },
    {
      title: "Networking & Connection",
      description:
        "Teens meet new friends, mentors, and opportunities.",
      icon: icon6,
    },
  ];

  const defaultHeroImages = ["/images/fsummit.svg", "/images/msummit.svg", "/images/Ssummit.svg"];
  const [heroImages, setHeroImages] = useState(defaultHeroImages);


  const stats = [
    { icon: icon1, label: "Teenagers Attended", value: "30+" },
    { icon: icon2, label: "Volunteers Mobilised", value: "1+" },
    { icon: icon3, label: "Sessions Delivered", value: "1+" },
    { icon: icon4, label: "Communities Engaged", value: "1+" },
  ];
  const [activeSet, setActiveSet] = useState(0);
  const featuresPerPage = 3;

  // Slice out the current 3 features
  const displayedFeatures = features.slice(
    activeSet * featuresPerPage,
    activeSet * featuresPerPage + featuresPerPage
  );


  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  const itemVariants = {
    hidden: { opacity: 0, y: 40 }, // bottom to top
    show: { opacity: 1, y: 0 },
  };

  return (
    <>



      <section className="w-full bg-white py-20 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto relative">


          <div className="relative overflow-hidden">
            {/* Background Image */}
            <img
              src="/images/dots-bg.svg" // replace with your actual image path
              alt=""
              className="
      pointer-events-none
      absolute
      bottom-0
      right-0
      w-40
      md:w-56
      lg:w-72
      opacity-90
    "
            />

            {/* Content */}
            <div className="max-w-3xl relative z-10">
              <p className="tracking-[0.3em] text-sm font-medium text-gray-700 mb-4">
                TRUST TEENS HANGOUTS
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Joy, exposure, and <br />
                connection
              </h1>

              <p className="text-gray-600 text-lg leading-relaxed" style={{ maxWidth: "600px" }}>
                Fun, relaxed outings where teenagers explore, laugh, and experience life together for the first time.
              </p>
            </div>
          </div>

          {/* DOT PATTERNS */}



          {/* IMAGES */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-3xl overflow-hidden">
              <img
                src={heroImages[0]}
                alt="Summit audience"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="rounded-3xl overflow-hidden">
              <img
                src={heroImages[1]}
                alt="Workshop session"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="rounded-3xl overflow-hidden">
              <img
                src={heroImages[2]}
                alt="Group celebration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT — Content */}
          <div className="space-y-6">

            {/* Eyebrow */}

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              What Hangouts Look Like            </h2>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed max-w-xl">
              Many teenagers have limited access to recreational spaces and new experiences. Hangouts create opportunities for fun, discovery, and confidence-building through everyday joy.

            </p>

            {/* Sub-text */}
            <div className="space-y-4">
              <p className="font-medium text-gray-900">

                Our hangouts often include:
              </p>

              <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4">
                <li>Cinema outings
                </li>
                <li>Zoo visits
                </li>
                <li>Recreational centres

                </li>
                <li>Group games and fun activities

                </li>
                <li>Simple shared meals

                </li>

              </ul>
            </div>

            {/* Closing */}
            <p className="text-gray-700 leading-relaxed max-w-xl">
              These moments are relaxed and teen-led. The goal is enjoyment            </p>

          </div>



          {/* RIGHT — Image */}
          <div className="relative w-full h-[420px] md:h-[520px] rounded-2xl overflow-hidden">
            <Image
              src="/images/communityImage4.svg" // replace with your image path
              alt="Community service in action"
              fill
              className="object-cover"
              priority
            />
          </div>


        </div>
      </section>

      <section className="
p-8 md:py-20
bg-[url(/images/impactsolidblack.svg)] bg-cover bg-center bg-no-repeat
flex flex-col md:flex-row
justify-center md:justify-between
items-center
">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white   mb-8 mt-12
  mx-auto
  text-center
  w-auto
  lg:w-[40%]
  lg:text-left">
          The impact of our Hangouts
        </h2>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div ref={ref} className="grid grid-cols-2">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-row gap-2 items-center text-center"
              >
                <div className="inline-flex p-3 md:p-4 rounded-full mb-4 bg-transparent">
                  <Image
                    src={stat.icon}
                    alt={stat.label}
                    width={60}
                    height={60}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2 text-start">
                    {inView ? (
                      <CountUp
                        end={parseInt(stat.value.replace("+", ""))}
                        duration={2.5}
                        separator=","
                      />
                    ) : (
                      "0"
                    )}
                    {stat.value.includes("+") && "+"}
                  </div>

                  <div className="text-sm md:text-base text-white/80">
                    {stat.label}
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <PastHangouts />

      <UpcomingHangouts />
      <section className="relative overflow-hidden bg-[#257CFF] text-white py-24 px-6">
        {/* Background texture (use your own URL) */}
        <Image
          src="https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764815863/Rectangle_usvu7i.png"
          alt="background texture"
          fill
          className="object-cover opacity-30 pointer-events-none"
        />

        {/* Animated container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
            Partner with us to support <br /> meaningful teen impact.
          </h2>

          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            We believe stronger communities are built when organisations work
            together. Partner with us to support campaigns in health, wellbeing,
            relationships, digital literacy, social justice, creativity, and more.
            Together, we influence teenagers and help them grow into responsible
            leaders.
          </p>

          {/* CTA button */}
          <motion.a
            href="mailto:info@trustteens.com"
            whileHover={{ scale: 1.05 }}
            className="relative inline-block px-8 py-4 bg-orange-500 rounded-lg text-lg font-semibold overflow-hidden"
          >
            {/* Shine effect */}
            <span className="absolute inset-0 -left-full bg-white/30 skew-x-12 transition-all duration-700 hover:left-full"></span>

            <span className="relative z-10">We await your message</span>
          </motion.a>
        </motion.div>
      </section>

    </>
  );
}
