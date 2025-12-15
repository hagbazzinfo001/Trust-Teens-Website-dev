  
  "use client";
 import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
 import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
 import PastCampaigns from '@/components/PastCampaigns';
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
 import UpcomingCampaigns from "@/components/ui/UpcomingCampaigns";
import {
  ArrowRight,
  Users,
  GraduationCap,
  BookOpen,
  Package,
} from "lucide-react";
import { use } from "react";



export default function MissionsPage() {
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
 

  const stats = [
    { icon: gg, label: "Campaign Activities Delivered", value: "6+" },
    { icon: oo, label: "Schools & Communities Engaged", value: "15+" },
    { icon: bb, label: "Volunteers Mobilised", value: "30+" },
    { icon: pp, label: "Teenagers Reached", value: "1000+" },
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
      <section className="py-12 md:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-1 sm:px-3 lg:px-8">
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
            {/* Left Image (40% width, 70vh height) */}
            <div className="rounded-3xl overflow-hidden w-full md:w-[40%]">
              <div className="h-[70vh] w-full rounded-3xl overflow-hidden">
                <motion.img
                  src="https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764510219/Group_582_g80ue8.png?auto=compress&cs=tinysrgb&w=500"
                  alt="Left visual"
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, x: -80 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Right Section (60% width) */}
            <div className="w-full md:w-[60%]">
              <div className="mb-4 px-0 md:pl-10">
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  TRUST TEENS CAMPAIGNS
                </p>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Where We Drive Impact
                </h1>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We run focused campaigns that help teenagers grow, serve their
                  communities, and lead with purpose.
                </p>
              </div>

              <div className="rounded-3xl overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764510689/Group_516_bplvj3.png?auto=compress&cs=tinysrgb&w=1200"
                  alt="Large event"
                  width={800}
                  height={400}
                  className="w-full h-64 md:h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

 
      <section className="py-12 md:py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-5xl font-bold mb-4">
        Our Campaign Sectors
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        This Privacy Policy becomes effective upon your first use of the service.
        Understood and agreed to be bound thereby.
      </p>
    </div>

    {/* 🔥 Animated Cards */}
    <AnimatePresence mode="wait">
      <motion.div
        key={activeSet} // triggers animation on click
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -60 }}
        transition={{ duration: 0.45 }}
        className="grid md:grid-cols-3 gap-6 mb-12"
      >
        {displayedFeatures.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                     <Image
    src={feature.icon}
    alt={feature.title}
    width={30}
    height={30}
    className="w-6 h-6 object-contain"
  />
                    {/* <feature.icon className="w-6 h-6 text-orange-600" /> */}
                  </div>
                  {/* <ArrowRight className="w-5 h-5 text-gray-400" /> */}
                </div>

                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>

    {/* Control Dots */}
    <div className="flex justify-center gap-2">
      {[0, 1].map((i) => (
        <button
          key={i}
          onClick={() => setActiveSet(i)}
          className={`h-2 rounded-full transition-all ${
            activeSet === i ? "w-8 bg-orange-500" : "w-2 bg-gray-300"
          }`}
        ></button>
      ))}
    </div>
  </div>
</section>

  <div className="text-center mb-8 mt-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
Campaigns’ impact            </h2>
             
          </div>

<section
  // className="py-12 md:py-20 bg-[url('https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764438624/Background_sfdpyy.png')] bg-cover bg-center bg-no-repeat"
  className="py-12 md:py-20 bg-[url(/BackgroundBlack.svg)] bg-cover bg-center bg-no-repeat"

>
  
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const isLast = index === stats.length - 1;

        

        return (
          <motion.div
            key={index}
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Card className="border-0 bg-transparent rounded-none relative">
              
              {/* Right border — only on DESKTOP (md+) & not last item */}
              {!isLast && (
                <span className="hidden md:block absolute right-0 top-0 h-full w-[1px] bg-gray-300"></span>
              )}

              <CardContent className="p-2 text-center bg-transparent text-white rounded-none">
                {/* Icon */}
               {/* Icon */}
<div className="inline-flex p-4 rounded-full mb-4">
  <Image
    src={stat.icon}
    alt={stat.label}
    width={60}
    height={60}
    className="w-16 h-16 object-contain"
  />
</div>


                {/* Label */}
                <div className="text-sm mb-2 text-white/80">
                  {stat.label}
                </div>

                {/* CountUp */}
                <div className="text-3xl font-bold text-white">
                  {inView ? (
                    <CountUp
                      end={parseInt(stat.value.replace("+", ""))}
                      duration={2.5}
                      separator=","
                    />
                  ) : (
                    "0"
                  )}
                  +
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
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
      <PastCampaigns />

< UpcomingCampaigns />
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
