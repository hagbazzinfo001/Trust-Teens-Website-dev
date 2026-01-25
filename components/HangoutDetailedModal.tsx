'use client';

import { Hangout } from '@/lib/mockHangout';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import cleanCummunity from '@/public/images/cleanCummunity.svg'
 import projectCommunity from '@/public/images/projectCommunity.svg'
 import teenagerCommunity from '@/public/images/teenagerCommunitty.svg'
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";


import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
interface HangoutDetailsModalProps {
  hangout: Hangout | null;
  onClose: () => void;
}
const stats = [
  { icon: teenagerCommunity, label: "Teenagers actively participating in service projects", value: "25" },
  { icon: cleanCummunity, label: "Cleaner, safer community spaces", value: "3" },
  { icon: projectCommunity, label: "Community Projects Delivered", value: "2" },
 
];
export default function HangoutDetailsModal({ hangout, onClose }: HangoutDetailsModalProps) {
  if (!hangout) return null;
const listicons = {
  'Icon1': '/icon1.svg',
  'Icon2': '/icon2.svg',
  'Icon3': '/icon3.svg',
  'Icon4': '/icon4.svg',
  'Icon5': '/icon5.svg', 
  'Icon6': '/icon6.svg',
}
const iconsArray = Object.values(listicons);

const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

const itemVariants = {
  hidden: { opacity: 0, y: 40 }, // bottom to top
  show: { opacity: 1, y: 0 },
};
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl overflow-hidden">
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
            >
              <X size={24} />
            </button>

 

<div className="text-white p-8 md:p-12 bg-no-repeat bg-center bg-cover bg-[url(/orange_bg.svg)]">
  <div className="space-y-4 ml-0 md:ml-[50%] tranform md:-translate-x-1/2 w-full md:w-3/5 text-center md:text-left">
    <h1 className="text-4xl md:text-5xl font-bold">{hangout.name}</h1>
    <p className="text-lg opacity-90">{hangout.fullDescription}</p>
    <button
  className="
    rounded-xl
    bg-white
    px-6
    py-3
    font-semibold
    text-black
    shadow-md
    animate-pulse
    hover:animate-none
    hover:scale-105
    transition
  "
>
  Watch Highlight
  <span
  className="
    inline-block
    transition-transform
    duration-300
    group-hover:translate-x-1
  "
>
  →
</span>
</button>
  
  </div>

  <div className="h-64 md:h-96 overflow-hidden bg-gray-200 mt-5 rounded-lg">
    <img
      src={hangout.headerImage}
      alt={hangout.name}
      className="w-full h-full object-cover"
    />
  </div>
</div>


            <div className="p-8 md:p-10 space-y-12">
              <div>
                <div className="flex items-center gap-3 mb-2">
                   <h2 className="text-2xl font text-gray-900">ABOUT EVENT</h2>
                </div>
<div className="flex flex-col lg:flex-row items-start gap-8">
<div className="w-full lg:w-3/5">
  <h3 className="text-xl font-bold text-gray-900 mb-4">{hangout.objective}</h3>
                  <ul className="space-y-3">
                    {hangout.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-600">
                             <div className={`w-6 h-6 flex items-center justify-center rounded-md bg-gradient-to-r ${hangout.color}`}>
        <img 
          src={iconsArray[index % iconsArray.length]} 
          alt="icon" 
          className="w-5 h-5"
        />
      </div>
    
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full lg:w-2/5">
    <img
      src={hangout.featuredImage}
      alt={hangout.name}
      className="w-full h-auto rounded-lg object-cover"
    />
  </div>
                </div>
               
              </div>

              <div>
                
                <div className={`bg-gradient-to-r ${hangout.color} text-white rounded-2xl p-8 `}
                  style={{
                    backgroundImage: `url('/Background.svg')`,
                    backgroundSize: "contain",
                    // backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}>
                  {/* <h3 className="text-2xl font-bold mb-8 text-center">Impact of this hangout</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {hangout.impact.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                        <div className="text-sm opacity-90">{stat.label}</div>
                      </div>
                    ))}
                  </div> */}
                  
                  <section
                  // className="py-12 md:py-20 bg-[url('https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764438624/Background_sfdpyy.png')] bg-cover bg-center bg-no-repeat"
                  className="py-12 md:py-20 bg-[url(/BackgroundBlack.svg)] bg-cover bg-center bg-no-repeat"
                  
                  >
                  
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-6">
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
                  
                </div>
              </div>

  <div className="flex flex-row gap-4 flex-wrap lg:flex-nowrap">
  {/* LEFT SECTION */}
  <div className="flex flex-col items-start gap-3 mb-2 w-full lg:w-auto">
     <h2 className="text-2xl font-bold text-gray-900">OUR PARTNERS</h2>
    <p className="text-gray-600 mb-8">
      These partners supported this hangout through resources, expertise, and vision
      to reach more teenagers and deliver stronger impact.
    </p>
  </div>

  {/* RIGHT SECTION - 60% width on large screens */}
  <div className="w-full lg:w-[140%] grid grid-cols-2 md:grid-cols-4 gap-4">
    {hangout.partners.map((partner, index) => (
      <div
        key={index}
        className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
      >
        <img
          src={partner.logo}
          alt={partner.name}
          width={150}
          height={150}
          className="w-full h-auto object-contain"
        />
      </div>
    ))}
  </div>
</div>


              <div>
                <div className="flex items-center gap-3 mb-2">
                   <h2 className="text-2xl font text-gray-900">GALLERY</h2>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Moments from the Event</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {hangout.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-lg overflow-hidden bg-gray-200 hover:shadow-lg transition-shadow"
                      >
                        <img
                          src={image}
                          alt={`Moment ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
