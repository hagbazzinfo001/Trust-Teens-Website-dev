'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { useState } from "react";
import { Summit } from '@/lib/mockSummit';
import { X } from 'lucide-react';
import icon1 from '@/public/images/icon1.svg';
import icon2 from '@/public/images/icon2.svg';
import icon3 from '@/public/images/icon3.svg';
import icon4 from '@/public/images/icon4.svg';
import icon5 from '@/public/images/icon5.svg';
import icon6 from '@/public/images/icon6.svg';
import volunteerIcon from '@/public/images/volunteerIcon.svg'
import sessionIcon from '@/public/images/sessionIcon.svg'
import teenagerIcon from '@/public/images/teenagersIcon.svg'
import schoolIcon from '@/public/images/schoolIcon.svg'


interface SummitDetailsModalProps {
  Summit: Summit | null;
  onClose: () => void;
}

const stats = [
  { icon: sessionIcon, label: "Campaign Activities Delivered", value: "6+" },
  { icon: schoolIcon, label: "Schools & Communities Engaged", value: "15+" },
  { icon: volunteerIcon, label: "Volunteers Mobilised", value: "30+" },
  { icon: teenagerIcon, label: "Teenagers Reached", value: "1000+" },
];

const iconsArray = [
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
];
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function SummitDetailsModal({
  Summit,
  onClose,
}: SummitDetailsModalProps) {

  // ✅ HOOKS BELONG HERE
  const [activeSet, setActiveSet] = useState(0);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  if (!Summit) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen py-8 ">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl overflow-hidden">
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
            >
              <X size={24} />
            </button>



            <div className="text-white py-8 md:p-12 bg-no-repeat bg-center bg-cover bg-[url(/summitBlueBg.svg)]">
              <div className="h-64 md:h-96 overflow-hidden bg-white mt-5 rounded-3xl p-2">
                <img
                  src={Summit.headerImage}
                  alt={Summit.name}
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
              <div className="space-y-4 pt-4 w-full md:w-3/5 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold">{Summit.name}</h1>
                <p className="text-lg opacity-90">{Summit.fullDescription}</p>
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


            </div>
            <div className="py-8 md:py-10 space-y-12">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font text-gray-900">ABOUT EVENT</h2>
                </div>
                <div className="flex flex-col lg:flex-row items-start gap-8">
                  <div className="w-full lg:w-3/5">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{Summit.objective}</h3>
                    <p>{Summit.objectiveDetails}</p>
                    <ul className="space-y-3 pl-8">
                      {Summit.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-600">
                          <div className={`w-6 h-6 flex items-center justify-center rounded-md bg-gradient-to-r ${Summit.color}`}>
                            <Image
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
                      src={Summit.aboutImage}
                      alt={Summit.name}
                      className=" w-full lg:w-[50%] h-auto rounded-lg object-cover lg:float-right"
                    />
                  </div>
                </div>

              </div>

              <section
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
              <div className="flex flex-row gap-4 flex-wrap lg:flex-nowrap p-8">
                {/* LEFT SECTION */}
                <div className="flex flex-col items-start gap-3 mb-2 w-full lg:w-auto">
                  <h2 className="text-2xl font-bold text-gray-900">OUR PARTNERS</h2>
                  <p className="text-gray-600 mb-8">
                    These partners supported this campaign through resources, expertise, and vision
                    to reach more teenagers and deliver stronger impact.
                  </p>
                </div>

                {/* RIGHT SECTION - 60% width on large screens */}
                <div className="w-full lg:w-[140%] grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Summit.partners.map((partner, index) => (
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

              {Summit.speakers && Summit.speakers.length > 0 && (
                <section className="relative py-20 bg-[url('/speakersBlue.svg')] bg-no-repeat bg-center overflow-hidden mb-12 bg-cover rounded-3xl mx-8">
                  <div className="relative max-w-7xl mx-auto px-6">
                    <h2 className="text-center text-white text-3xl md:text-5xl font-extrabold mb-11 tracking-wide">
                      MEET OUR SPEAKERS
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
                      {Summit.speakers.map((speaker, idx) => (
                        <div key={idx} className="group text-center">
                          <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden mb-6">
                            <img
                              src={speaker.image}
                              alt={speaker.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <h3 className="text-white text-xl font-bold">{speaker.name}</h3>
                          <p className="text-white/80 text-sm mt-1">{speaker.role}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}
              <section>

              </section>

              <div className="p-8">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font text-gray-900">GALLERY</h2>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Moments from the Event</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Summit.gallery.map((image, index) => (
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
      </div>    </div>
  );
}
