"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import PastCommunityServices from '@/components/PastCommunityServices';
import UpcomingCampaigns from "@/components/ui/UpcomingCampaigns"; // Using campaigns as placeholder if service has no upcoming
import {
  getCommunityServiceHero,
  getCommunityServiceApproach,
  getCommunityServiceImpact,
  CommunityServiceHero,
  CommunityServiceApproach,
  MissionImpactStat
} from "@/lib/adminData";

import icon1 from "@/public/images/icon1.svg";
import icon3 from "@/public/images/icon3.svg";
import icon4 from "@/public/images/icon4.svg";
import icon2 from "@/public/images/icon2.svg";

export default function CommunityServicePage() {
  const defaultHero = {
    hero_gallery: ["/images/communityImage1.svg", "/images/communityImage2.svg", "/images/communityImage1.svg"]
  };
  const [hero, setHero] = useState<CommunityServiceHero>(defaultHero);

  const defaultStats = [
    { icon: icon1, label: "Teenagers participating", value: "25" },
    { icon: icon2, label: "Safe community spaces", value: "3" },
    { icon: icon3, label: "Projects Delivered", value: "2" },
  ];
  const [stats, setStats] = useState(defaultStats);

  const [approach, setApproach] = useState<CommunityServiceApproach>({
    approach_image: "/images/communityImage4.svg",
    focus_points: [
      "Encourage responsibility and initiative",
      "Build teamwork and leadership skills",
      "Promote environmental and social awareness",
      "Strengthen relationships with local communities"
    ]
  });

  useEffect(() => {
    const adminHero = getCommunityServiceHero();
    if (adminHero && adminHero.hero_gallery.some(img => img !== "")) {
      setHero(adminHero);
    }

    const adminImpact = getCommunityServiceImpact();
    if (adminImpact && adminImpact.length > 0) {
      const icons = [icon1, icon2, icon3, icon4];
      setStats(adminImpact.map((s, i) => ({
        icon: icons[i] || icon1,
        label: s.stat_label,
        value: s.stat_number,
      })));
    }

    const adminApproach = getCommunityServiceApproach();
    if (adminApproach && adminApproach.approach_image !== "") {
      setApproach(adminApproach);
    }
  }, []);

  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      <section className="py-12 md:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-1 sm:px-3 lg:px-8">
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
            {/* Left Image Grid (Original Structure) */}
            <div className="w-full md:w-[60%] lg:w-[65%]">
              <div className="relative h-[500px] md:h-[600px] w-full">
                {/* Image 1 – Large Backdrop */}
                <div className="absolute top-0 left-0 w-3/4 h-3/4 rounded-2xl overflow-hidden shadow-xl z-0">
                  <Image
                    src={hero.hero_gallery[0] || "/images/communityImage1.svg"}
                    alt="Community service"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Image 2 – Middle */}
                <div className="absolute top-28 left-40 w-72 h-72 rounded-2xl overflow-hidden shadow-xl z-10 border-4 border-white">
                  <Image
                    src={hero.hero_gallery[1] || "/images/communityImage2.svg"}
                    alt="Teen volunteers"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Image 3 – Bottom Right */}
                <div className="absolute top-[360px] left-20 w-80 h-72 rounded-2xl overflow-hidden shadow-xl z-20 border-4 border-white hidden md:block">
                  <Image
                    src={hero.hero_gallery[2] || "/images/communityImage1.svg"}
                    alt="Street cleanup"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-[40%] lg:w-[35%] py-8">
              <p className="text-sm font-semibold text-gray-500 mb-2 tracking-[0.2em] uppercase">
                Trust Teens Community Service
              </p>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                <span className="text-gray-900">Community</span> <br />
                <span className="text-orange-500">In Action</span>
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed mb-10">
                We believe leadership is not taught only through words, but through action.
                Our community service initiatives give teenagers practical opportunities
                to serve, lead, and take responsibility for their environment.
              </p>
              <a
                href="https://chat.whatsapp.com/Cjg5iRW6pZ3Gd5i76oAQdQ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-green-600 px-8 py-4 text-white font-bold hover:bg-green-700 transition-all hover:scale-105 shadow-lg"
              >
                Join our Teens Community
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT — Image */}
          <div className="relative w-full h-[450px] md:h-[550px] rounded-[2.5rem] overflow-hidden shadow-2xl">
            <Image
              src={approach.approach_image || "/images/communityImage4.svg"}
              alt="Community service in action"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* RIGHT — Content */}
          <div className="space-y-8">
            <p className="text-sm tracking-[0.3em] text-orange-500 font-bold uppercase">
              Leadership Through Action
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Our Approach
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed font-medium">
              Our community service projects are simple, practical, and
              intentional. We focus on activities that allow teenagers to
              engage directly with real community needs while learning
              leadership and collaboration.
            </p>

            <div className="space-y-5">
              <p className="text-lg font-black text-gray-900">
                Each project is designed to:
              </p>
              <ul className="space-y-4">
                {approach.focus_points.map((point, index) => (
                  <li key={index} className="flex items-center gap-4 text-gray-700 font-semibold text-lg">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-lg text-gray-600 italic leading-relaxed pt-4 border-t border-gray-200">
              Community service is not treated as an add-on. It is a learning
              experience that reinforces the values we teach across our
              programs.
            </p>
          </div>
        </div>
      </section>

      <div className="text-center mb-8 mt-20">
        <h2 className="text-4xl md:text-5xl font-black text-gray-950">
          Impact of Our Community Service
        </h2>
      </div>

      <section className="py-16 md:py-24 bg-[url(/images/BackgroundBlack.svg)] bg-cover bg-center bg-no-repeat">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, index) => {
              const isLast = index === stats.length - 1;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate={inView ? "show" : "hidden"}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative text-center"
                >
                  {!isLast && (
                    <span className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-20 w-[1px] bg-white/20"></span>
                  )}
                  <div className="inline-flex p-5 rounded-3xl bg-white/5 mb-6 backdrop-blur-sm">
                    <Image
                      src={stat.icon}
                      alt={stat.label}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="text-sm font-bold uppercase tracking-widest text-white/70 mb-2">
                    {stat.label}
                  </div>
                  <div className="text-5xl font-black text-white">
                    {inView ? (
                      <CountUp
                        end={parseInt(stat.value.replace(/\D/g, ''))}
                        duration={2.5}
                        separator=","
                      />
                    ) : (
                      "0"
                    )}
                    {stat.value.includes('+') ? '+' : ''}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <PastCommunityServices />

      <section className="relative overflow-hidden bg-[#257CFF] text-white py-24 px-6 mt-20">
        <Image
          src="https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764815863/Rectangle_usvu7i.png"
          alt="background texture"
          fill
          className="object-cover opacity-30 pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-8">
            Partner with us to support <br /> meaningful teen impact.
          </h2>
          <p className="text-xl leading-relaxed max-w-3xl mx-auto mb-12 font-medium opacity-90">
            We believe stronger communities are built when organisations work
            together. Partner with us to support campaigns in health, wellbeing,
            relationships, digital literacy, social justice, creativity, and more.
          </p>
          <motion.a
            href="mailto:info@trustteens.com"
            whileHover={{ scale: 1.05 }}
            className="relative inline-block px-12 py-5 bg-orange-500 rounded-xl text-xl font-black overflow-hidden shadow-2xl active:scale-95 transition-transform"
          >
            <span className="relative z-10">We await your message</span>
          </motion.a>
        </motion.div>
      </section>
    </>
  );
}
