"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import PastHangouts from '@/components/PastHangouts';
import UpcomingHangouts from "@/components/ui/UpcomingHangouts";
import {
  getHangoutHero,
  getHangoutApproach,
  getHangoutImpact,
  HangoutHero,
  HangoutApproach,
  MissionImpactStat
} from "@/lib/adminData";

import icon1 from "@/public/images/icon1.svg";
import icon3 from "@/public/images/icon3.svg";
import icon4 from "@/public/images/icon4.svg";
import icon2 from "@/public/images/icon2.svg";
import icon5 from "@/public/images/icon5.svg";
import icon6 from "@/public/images/icon6.svg";

export default function HangoutsPage() {
  const defaultHero = {
    hero_gallery_images: ["/images/conferenceheader.svg", "/images/yellowImage.svg", "/images/conferenceheader.svg"]
  };
  const [hero, setHero] = useState<HangoutHero>(defaultHero);

  const defaultStats = [
    { icon: icon1, label: "Teenagers Reached", value: "500+" },
    { icon: icon2, label: "Sessions Delivered", value: "12+" },
    { icon: icon3, label: "Communities engaged", value: "5+" },
    { icon: icon4, label: "Volunteers Mobilised", value: "20+" },
  ];
  const [stats, setStats] = useState(defaultStats);

  const approachFeatures = [
    {
      title: "Safe Environment",
      description: "Providing a secure space where teenagers can express themselves without judgment.",
      icon: icon1,
    },
    {
      title: "Fun Activities",
      description: "Engaging games and interactive sessions that build teamwork and joy.",
      icon: icon2,
    },
    {
      title: "Personal Growth",
      description: "Mentorship-driven conversations that help teens discover their potential.",
      icon: icon3,
    }
  ];

  const [approach, setApproach] = useState<HangoutApproach>({
    approach_image: "/images/yellowImage.svg",
    feature_list: [
      "Building a safe and inclusive environment",
      "Engaging and fun interactive sessions",
      "Mentorship and peer support",
      "Empowering personal and social development"
    ]
  });

  useEffect(() => {
    const adminHero = getHangoutHero();
    if (adminHero && adminHero.hero_gallery_images.some(img => img !== "")) {
      setHero(adminHero);
    }

    const adminImpact = getHangoutImpact();
    if (adminImpact && adminImpact.length > 0) {
      const icons = [icon1, icon2, icon3, icon4];
      setStats(adminImpact.map((s, i) => ({
        icon: icons[i] || icon1,
        label: s.stat_label,
        value: s.stat_number,
      })));
    }

    const adminApproach = getHangoutApproach();
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
      <section className="pb-4 pt-4 md:py-10 bg-white mx-3 lg:mx-12 mb-12">
        <div className="w-full rounded-[2rem] overflow-hidden h-auto sm:h-[50vh] lg:h-[70vh] shadow-xl">
          <motion.img
            src={hero.hero_gallery_images[0] || "/images/conferenceheader.svg"}
            alt="Hangouts Header"
            className="w-full h-auto sm:h-full object-cover"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 w-full mt-8 items-start lg:items-center">
          <h1 className="text-4xl md:text-6xl font-black lg:w-[50%] text-gray-950">
            Trusted Spaces for <br /> <span className="text-orange-500">Teen Hangouts</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl lg:w-[40%] font-medium leading-relaxed">
            Our hangouts are safe, fun, and empowering environments designed for teenagers
            to bond, learn, and grow together through community and shared experiences.
          </p>
        </div>
      </section>

      <section className="pb-8 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch">
            <div className="bg-yellow-400 rounded-[2.5rem] p-8 md:p-16 z-10 shadow-2xl">
              <div className="lg:w-[45%]">
                <h2 className="text-3xl md:text-5xl font-black text-black mb-6 leading-tight">
                  Why Our <br /> Hangouts Matter
                </h2>
                <div className="space-y-6 text-black/90 font-medium text-lg leading-relaxed">
                  <p>
                    Trust Teens Hangouts provide a much-needed bridge between formal education
                    and social life. We create environments where teens feel heard, understood,
                    and supported.
                  </p>
                  <p>
                    Every hangout session is intentionally curated to blend recreation with
                    reflection, ensuring that every participant leaves with new friends,
                    fresh perspectives, and a stronger sense of self.
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-[2rem] lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[50%] w-full mt-10 lg:mt-0 shadow-xl">
                <img
                  src={approach.approach_image || "/images/yellowImage.svg"}
                  alt="Hangout in action"
                  className="w-full h-full object-cover lg:p-10 p-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-6xl font-black text-gray-950 mb-16 text-center lg:text-left">
            Core Components <br /> <span className="text-orange-500">of our experiences</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {approachFeatures.map((item, index) => (
              <div key={index} className="flex flex-col items-start gap-4 p-8 bg-gray-50 rounded-[2rem] hover:bg-orange-50 transition-colors shadow-sm">
                <div className="p-4 rounded-2xl bg-orange-100 mb-2">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-950 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[url(/images/BackgroundBlack.svg)] bg-cover bg-center bg-no-repeat">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-16">
            Our Collective Impact
          </h2>
          <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const isLast = index === stats.length - 1;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate={inView ? "show" : "hidden"}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center"
                >
                  <Card className="border-0 bg-transparent rounded-none relative">
                    {!isLast && (
                      <span className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-[1px] bg-white/20"></span>
                    )}
                    <CardContent className="p-2 flex flex-col items-center">
                      <div className="mb-6 p-4 rounded-full bg-white/5">
                        <Image
                          src={stat.icon}
                          alt={stat.label}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-contain filter invert opacity-80"
                        />
                      </div>
                      <div className="text-4xl md:text-5xl font-black text-white mb-2">
                        {inView ? (
                          <CountUp
                            end={parseInt(stat.value.replace(/\D/g, ""))}
                            duration={2.5}
                            separator=","
                          />
                        ) : (
                          "0"
                        )}
                        {stat.value.includes("+") ? "+" : ""}
                      </div>
                      <div className="text-sm font-bold uppercase tracking-widest text-white/60">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <PastHangouts />
      <UpcomingHangouts />

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
            Together, we influence teenagers and help them grow into responsible leaders. Join us in making a difference.
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
