
'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { useState } from "react";
import { CompleteConference } from '@/lib/conferencesApi';
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


interface ConferenceDetailsModalProps {
  conference: CompleteConference | null;
  onClose: () => void;
}

// Stat icons mapping (fallback/static)
const statsIcons = [
  { icon: sessionIcon, label: "Sessions Delivered" },
  { icon: schoolIcon, label: "Schools & Communities Engaged" },
  { icon: volunteerIcon, label: "Volunteers Mobilised" },
  { icon: teenagerIcon, label: "Teenagers Reached" },
];

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function ConferenceDetailsModal({
  conference,
  onClose,
}: ConferenceDetailsModalProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  if (!conference) return null;

  const iconsArray = [icon1, icon2, icon3, icon4, icon5, icon6];
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  const displaySpeakers = conference.speakers || [];

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
            <div className="p-5 flex flex-col gap-5 items-left">
              <p className="pt-12 text-sm font-semibold tracking-widest text-gray-500 uppercase">TRUST TEENS CONFERENCE</p>
              <div className="h-64 md:h-96 overflow-hidden bg-gray-200 rounded-2xl">
                <img
                  src={conference.heroMainImage}
                  alt={conference.conferenceName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white p-8 md:p-12 bg-no-repeat bg-center bg-cover bg-[url(/images/conferenceblue.png)] rounded-3xl">
                <div className="space-y-4  w-full text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-bold">{conference.conferenceName}</h1>
                  <p className="text-lg opacity-90">{conference.conferenceSummary}</p>

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

            </div>


            {/* <div className="p-8 md:p-10 space-y-12"> */}

            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 p-8">
              <div className="w-full lg:w-3/5">
                <h2 className="text-2xl font text-gray-900">ABOUT EVENT</h2>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Mission & Recap</h3>
                <p className="text-lg opacity-95 pb-3 leading-relaxed">{conference.aboutTextBody}</p>
                <ul className="space-y-3 pl-8">
                  {conference.eventHighlights.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-600">
                      <div className={`w-6 h-6 flex items-center justify-center rounded-md bg-gradient-to-r`}>
                        <Image
                          src={iconsArray[index % iconsArray.length]}
                          alt="icon"
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      </div>
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <img
                src={conference.aboutSideImage || conference.heroMainImage}
                alt={conference.conferenceName}
                className="lg:w-[35%] h-auto rounded-2xl object-cover shadow-lg"
              />
            </div>



            <section
              className="py-12 md:py-20 bg-[url(/images/BackgroundBlack.svg)] bg-cover bg-center bg-no-repeat"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {conference.impactMetrics.map((stat, index) => {
                    const isLast = index === conference.impactMetrics.length - 1;
                    const statIcon = statsIcons[index % statsIcons.length].icon;
                    return (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        initial="hidden"
                        animate={inView ? "show" : "hidden"}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                      >
                        <Card className="border-0 bg-transparent rounded-none relative">
                          {!isLast && (
                            <span className="hidden md:block absolute right-0 top-0 h-full w-[1px] bg-gray-300"></span>
                          )}
                          <CardContent className="p-2 text-center bg-transparent text-white rounded-none">
                            <div className="inline-flex p-4 rounded-full mb-4">
                              <Image
                                src={statIcon}
                                alt={stat.impactLabel}
                                width={60}
                                height={60}
                                className="w-16 h-16 object-contain"
                              />
                            </div>
                            <div className="text-sm mb-2 text-white/80 uppercase tracking-widest">
                              {stat.impactLabel}
                            </div>
                            <div className="text-3xl font-bold text-white">
                              {inView ? (
                                <CountUp
                                  end={parseInt(stat.impactValue.replace("+", ""))}
                                  duration={2.5}
                                  separator=","
                                />
                              ) : (
                                "0"
                              )}
                              {stat.impactValue.includes('+') ? '+' : ''}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
            <div className="flex flex-row gap-4 flex-wrap lg:flex-nowrap p-6 lg:p-12">
              <div className="flex flex-col items-start gap-3 mb-2 w-full lg:w-auto">
                <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-orange-500 pb-1">OUR PARTNERS</h2>
                <p className="text-gray-600 mb-8 max-w-md">
                  These partners supported this conference through resources, expertise, and vision.
                </p>
              </div>

              <div className="w-full lg:w-[140%] grid grid-cols-2 md:grid-cols-4 gap-4">
                {conference.partners.map((partner, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center p-4 border border-gray-100 bg-white rounded-2xl hover:shadow-md transition-all duration-300"
                  >
                    <img
                      src={partner.partnerLogo}
                      alt="Partner Logo"
                      width={150}
                      height={150}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* News Section removed as it's not in the API currently */}

            {/* Speakers Section */}
            <section className="relative py-20 bg-[url('/images/speakersBlue.svg')]     bg-no-repeat
    bg-center
     overflow-hidden mb-12 bg-cover ">
              {/* Decorative background shapes */}

              <div className="relative max-w-7xl mx-auto px-6">
                {/* Title */}
                <h2 className="text-center text-white text-3xl md:text-5xl font-extrabold mb-11 tracking-wide">
                  MEET OUR SPEAKERS
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
                  {displaySpeakers.map((speaker, idx) => (
                    <div
                      key={idx}
                      className="group text-center"
                    >
                      {/* Image */}
                      <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden mb-6 shadow-xl border-4 border-white/10 group-hover:border-orange-500 transition-colors">
                        <Image
                          src={speaker.speakerImage}
                          alt={speaker.speakerName}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      {/* Name */}
                      <h3 className="text-white text-xl font-bold uppercase tracking-wide">
                        {speaker.speakerName}
                      </h3>

                      {/* Role */}
                      <p className="text-orange-400 text-sm mt-1 font-medium bg-white/10 inline-block px-3 py-1 rounded-full">
                        {speaker.speakerRole}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>


            <div className="px-6 lg:px-12 pb-11">
              <div className="flex items-center gap-3 mb-2 " >
                <h2 className="text-2xl font text-gray-900">GALLERY</h2>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Event Highlights Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {conference.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-2xl overflow-hidden bg-gray-100 hover:shadow-xl transition-all duration-300 group"
                    >
                      <img
                        src={image.imageUrl}
                        alt={`Moment ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>    </div>
  );
}
