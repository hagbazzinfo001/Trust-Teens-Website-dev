  
  "use client";
 import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
 import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
 import PastSummit from '@/components/pastSummit';
 import bb from '@/public/bb.svg'
 import gg from '@/public/gg.svg'
 import oo from '@/public/oo.svg'
 import pp from '@/public/pp.svg'
import icon1 from "@/public/icon1.svg";
import icon3 from "@/public/icon3.svg";
import icon4 from "@/public/icon4.svg";
import icon2 from "@/public/icon2.svg";
import icon5 from "@/public/icon5.svg";
import icon6 from "@/public/icon6.svg";
import reflect from "@/public/reflect.svg";
import understand from "@/public/understand.svg";
import talk from "@/public/talk.svg"
import engage from "@/public/engage.svg"
 import UpcomingSummit from "@/components/ui/UpcomingSummit";
import {
  ArrowRight,
  Users,
  GraduationCap,
  BookOpen,
  Package,
  Icon,
} from "lucide-react";
import { use } from "react";



export default function summitPage() {
//  const res = await fetch("https://your-api.com/campaign", {
//     next: { revalidate: 10 }, // optional caching
//   });
//   const data = await res.json();
const Approach = [
    
    {
      id: 2,
      Icon: talk,
      title: "Talk",
      color: "text-blue-500",
      description:
        "We speak to teenagers first, sharing real stories, insights, and lessons from lived experiences.",
    },
    {
      id: 3,
      Icon: reflect,
      title: "Reflect",
      color: "text-green-500",
      description:
        "Teenagers pause, reflect, and gain clarity to form their own understanding.",
    },
    {
      id: 4,
      Icon: understand,
      title: "Understand",
      color: "text-purple-500",
      description:
        "Teenagers join panels, activities, and workshops that encourage personal expression.",
    },
    {
      id: 5,
      Icon: engage,
      title: "Engage",
      color: "text-red-500",
      description:
        "They connect in small groups and engage with others in a safe, supportive environment.",
    },
  ];
  


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
 
const stats = [
    { icon: icon1, label: "Teenagers Reached", value: "500+" },
    { icon: icon2, label: "Volunteers Mobilised", value: "25" },
    { icon: icon3, label: "Sessions Delivered", value: "7+" },
    { icon: icon4, label: "Communities engaged", value: "1" },
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
        
        {/* TEXT CONTENT */}
        <div className="max-w-3xl">
          <p className="tracking-[0.3em] text-sm font-medium text-gray-700 mb-4">
            TRUST TEENS SUMMITS
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Space for Teenagers to <br />
            Think, Share, and Become
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed">
            Smaller, focused gatherings where teenagers explore purpose,
            values, identity, and life skills in an intimate, safe, and
            interactive environment.
          </p>
        </div>

        {/* DOT PATTERNS */}
        <div className="hidden lg:block absolute top-0 right-0">
          <div className="grid grid-cols-7 gap-3 mb-10">
            {Array.from({ length: 21 }).map((_, i) => (
              <span key={i} className="w-2 h-2 bg-green-400 rounded-full" />
            ))}
          </div>

          <div className="grid grid-cols-7 gap-3 ml-10">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className="w-2 h-2 bg-pink-500 rounded-full" />
            ))}
          </div>
        </div>

        {/* IMAGES */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-3xl overflow-hidden">
            <Image
              src="/fsummit.svg"
              alt="Summit audience"
              width={500}
              height={350}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="rounded-3xl overflow-hidden">
            <Image
              src="/msummit.svg"
              alt="Workshop session"
              width={500}
              height={350}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="rounded-3xl overflow-hidden">
            <Image
              src="/Ssummit.svg"
              alt="Group celebration"
              width={500}
              height={350}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
    



<div className="p-6 m-12 flex flex-col gap-6">
  <p className="text-2xl md:text-4xl font-bold mb-4">
    Our <span className="text-pink-500 font-bold">TRUE</span> approach
  </p>

  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {Approach.map((item) => (
      <div
        key={item.id}
        className="bg-white "
      >
        {/* Icon */}
        <div className="mb-4">
          <Image
            src={item.Icon}
            alt={item.title}
            width={50}
            height={50}
            className="w-full h-20 mb-4 object-contain"
          />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold mb-2">
  <span className={`${item.color}`}>
    {item.title.charAt(0)}
  </span>
  {item.title.slice(1)}
</h3>


        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {item.description}
        </p>
      </div>
    ))}
  </div>
</div>

  
   
<section className="
p-12 md:py-20
bg-[url(/BackgroundBlack.svg)] bg-cover bg-center bg-no-repeat
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
    The impact of our Summits
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
    
 {/* <UpcomingCampaigns
      title={data.title}
      subtitle={data.subtitle}
      description={data.description}
      datetime={data.datetime}
      location={data.location}
      image={data.image}
      buttonLabel={data.buttonLabel}
    /> */}
 <PastSummit />
< UpcomingSummit />
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
          href="#contact"
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
