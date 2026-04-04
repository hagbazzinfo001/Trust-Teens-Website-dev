'use client';

import { Project } from '@/lib/mockCommunityService';
import { X } from 'lucide-react';
import Image from 'next/image';

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { useState } from "react";
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

interface ProjectDetailsModalProps {
    project: Project | null;
    onClose: () => void;
}
const stats = [
    { icon: sessionIcon, label: "Sessions Delivered", value: "6+" },
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
// speakers.ts
export const speakers = [
    {
        id: 1,
        name: "Andry Ford",
        role: "CEO at Whatever",
        image: "https://res.cloudinary.com/dd6pd8dsc/image/upload/v1765931469/Rectangle_40_f5hmcz.png",
    },
    {
        id: 2,
        name: "Andry Ford",
        role: "CEO at Whatever",
        image: "https://res.cloudinary.com/dd6pd8dsc/image/upload/v1765931469/Rectangle_41_ziphlq.png",
    },
    {
        id: 3,
        name: "Andry Ford",
        role: "CEO at Whatever",
        image: "https://res.cloudinary.com/dd6pd8dsc/image/upload/v1765931468/Rectangle_39_ca6qnk.png",

    },
    {
        id: 4,
        name: "Andry Ford",
        role: "CEO at Whatever",
        image: "https://res.cloudinary.com/dd6pd8dsc/image/upload/v1765931468/Rectangle_38_q0mdy1.png",
    },
    {
        id: 5,
        name: "Andry Ford",
        role: "CEO at Whatever",
        image: "https://res.cloudinary.com/dd6pd8dsc/image/upload/v1765931469/Rectangle_40_f5hmcz.png",
    },
    {
        id: 6,
        name: "Andry Ford",
        role: "CEO at Whatever",
        image: "https://res.cloudinary.com/dd6pd8dsc/image/upload/v1765931469/Rectangle_41_ziphlq.png",
    },
    {
        id: 7,
        name: "Andry Ford",
        role: "CEO at Whatever",
        image: "https://res.cloudinary.com/dd6pd8dsc/image/upload/v1765931468/Rectangle_39_ca6qnk.png",
    },
    {
        id: 8,
        name: "Andry Ford",
        role: "CEO at Whatever",
        image: "https://res.cloudinary.com/dd6pd8dsc/image/upload/v1765931468/Rectangle_38_q0mdy1.png",
    },
];
const news = [
    {
        image: "https://res.cloudinary.com/dd6pd8dsc/image/upload/v1765932279/Rectangle_39_2_fwmbfr.png",
        title: "Does productivity increase when working remotely?",
        link: "",
    },
    {
        image: "https://res.cloudinary.com/dd6pd8dsc/image/upload/v1765932279/Rectangle_39_1_meda4z.png",
        title: "Morning routine to boost your mood",
        link: "",
    },
    {
        image: "https://res.cloudinary.com/dd6pd8dsc/image/upload/v1765932279/Rectangle_39_3_jxguuz.png",
        title: "5+ tips to find comfortable co-working space",
        link: "",
    },
];
export default function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.3,
    });

    if (!project) return null;

    const displayNews: { image: string; title: string; link: string }[] = (project as any)?.news?.length > 0 ? (project as any).news : news;
    const displaySpeakers: { name: string; role: string; image: string }[] = (project as any)?.speakers?.length > 0 ? (project as any).speakers : speakers;

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
                            <p className="pt-12">PROJECT DETAILS</p>
                            <div className="h-64 md:h-96 overflow-hidden bg-gray-200 rounded-3xl">
                                <img
                                    src={project.headerImage}
                                    alt={project.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="text-white p-8 md:p-12 bg-no-repeat bg-center bg-cover bg-[url(/images/conferenceblue.png)] rounded-3xl">
                                <div className="space-y-4  w-full text-center md:text-left">
                                    <h1 className="text-4xl md:text-5xl font-bold">{project.name}</h1>
                                    <p className="text-lg opacity-90">{project.fullDescription}</p>

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

                        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 p-10">
                            <div className="w-full lg:w-3/5">
                                <h2 className="text-2xl font text-gray-900">ABOUT PROJECT</h2>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{project.objective}</h3>
                                <p className="text-lg opacity-90">{project.fullDescription}</p>
                                <ul className="space-y-3 pl-10">
                                    {project.objectives.map((objective, index) => (
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
                                src={project.featuredImage}
                                alt={project.name}
                                className="lg:w-[25%] h-auto rounded-lg object-cover"
                            />
                        </div>



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
                                Project Impact
                            </h2>

                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                                <div ref={ref} className="grid grid-cols-2 gap-4">
                                    {(project.impact.length > 0 ? project.impact : stats).map((stat, index) => {
                                        const value = (stat as any).impactValue || (stat as any).value || "";
                                        const label = (stat as any).impactLabel || (stat as any).label || "";
                                        const icon = (stat as any).icon || stats[index % stats.length].icon || volunteerIcon;

                                        return (
                                            <motion.div
                                                key={index}
                                                variants={itemVariants}
                                                initial="hidden"
                                                animate={inView ? "show" : "hidden"}
                                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                                className="flex flex-row gap-2 items-center text-center"
                                            >
                                                <div className="inline-flex p-3 md:p-4 rounded-full mb-4 bg-transparent shrink-0">
                                                    <Image
                                                        src={icon}
                                                        alt={label}
                                                        width={60}
                                                        height={60}
                                                        className="w-12 h-12 md:w-16 md:h-16 object-contain"
                                                    />
                                                </div>
                                                <div className="text-left">
                                                    <div className="text-2xl md:text-4xl font-bold text-white mb-1">
                                                        {inView ? (
                                                            <CountUp
                                                                end={parseInt(String(value).replace(/\D/g, ""))}
                                                                duration={2.5}
                                                                separator=","
                                                            />
                                                        ) : (
                                                            "0"
                                                        )}
                                                        {String(value).includes("+") && "+"}
                                                    </div>

                                                    <div className="text-xs md:text-sm text-white/80 leading-tight">
                                                        {label}
                                                    </div>
                                                </div>

                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                        <div className="flex flex-row gap-4 flex-wrap lg:flex-nowrap p-6 lg:p-12">
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
                                {project.partners.map((partner, index) => (
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
                        {/* <section className="bg-[#f2f2f2] py-20 px-6 lg:px-20">
                            <div className="max-w-7xl mx-auto">

                                 <h2 className="text-4xl font-bold text-gray-900 mb-12">
                                    News Highlight
                                </h2>

                                {/* Grid  
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {displayNews.map((item, idx) => (
                                        <article
                                            key={idx}
                                            className="bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
                                        >
                                             <div className="h-56 w-full overflow-hidden">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>

                                             <div className="p-5 space-y-3">
                                                <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                                                    {item.title}
                                                </h3>
                                                {item.link && (
                                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-orange-500 text-sm font-medium hover:underline">Read more</a>
                                                )}
                                            </div>
                                        </article>
                                    ))}
                                </div>

                            </div>
                        </section> */}

                        {/* <section className="relative py-20 bg-[url('/speakersBlue.svg')]     bg-no-repeat
            bg-center
             overflow-hidden mb-12 bg-cover ">
 
                            <div className="relative max-w-7xl mx-auto px-6">
                                 <h2 className="text-center text-white text-3xl md:text-5xl font-extrabold mb-11 tracking-wide">
                                    MEET OUR SPEAKERS
                                </h2>

                                 <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
                                    {displaySpeakers.map((speaker, idx) => (
                                        <div
                                            key={idx}
                                            className="group text-center"
                                        >
                                             <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden mb-6">
                                                <Image
                                                    src={speaker.image}
                                                    alt={speaker.name}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>

                                             <h3 className="text-white text-xl font-bold">
                                                {speaker.name}
                                            </h3>

                                             <p className="text-white/80 text-sm mt-1">
                                                {speaker.role}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section> */}


                        <div className="px-6 lg:px-12 pb-11">
                            <div className="flex items-center gap-3 mb-2 " >
                                <h2 className="text-2xl font text-gray-900">GALLERY</h2>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Moments from the Event</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {project.gallery.map((image, index) => (
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
                        {/* </div> */}
                    </div>
                </div>
            </div>    </div>
    );
}
