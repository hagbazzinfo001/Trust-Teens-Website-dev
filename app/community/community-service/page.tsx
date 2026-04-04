


"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import PastCommunityServices from '@/components/PastCommunityServices';
import { fetchHero, fetchApproach, fetchImpact } from "@/lib/communityServiceApi";
import teenagerCommunity from '@/public/images/teenagerCommunitty.svg'
import cleanCummunity from '@/public/images/cleanCummunity.svg'
import projectCommunity from '@/public/images/projectCommunity.svg'

export default function CommunityServicePage() {
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [approach, setApproach] = useState({ image: "", focusPoints: [] as string[] });
  const [stats, setStats] = useState<{ icon: string, label: string, value: string }[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [h, a, i] = await Promise.all([
          fetchHero(),
          fetchApproach(),
          fetchImpact(),
        ]);

        if (h) setHeroImages(h.images);
        if (a) setApproach({ image: a.approachImage, focusPoints: a.focusPoints });

        if (i && i.length > 0) {
          const icons = [teenagerCommunity, cleanCummunity, projectCommunity];
          setStats(i.map((item, idx) => ({
            icon: icons[idx % icons.length],
            label: item.statLabel,
            value: item.statNumber
          })));
        } else {
          setStats([
            { icon: teenagerCommunity, label: "Teenagers actively participating in service projects", value: "25" },
            { icon: cleanCummunity, label: "Cleaner, safer community spaces", value: "3" },
            { icon: projectCommunity, label: "Community Projects Delivered", value: "2" },
          ]);
        }
      } catch (err) {
        console.error("Failed to load community service data", err);
      }
    }
    loadData();
  }, []);

  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  const itemVariants = {
    hidden: { opacity: 0, y: 40 }, // bottom to top
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      <section className="relative bg-white pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden px-6">
        <div className="max-w-7xl mx-auto relative lg:min-h-[700px] flex flex-col gap-12 lg:block">

          {/* TOP RIGHT: Text content (Subtext) */}
          <div className="lg:absolute lg:top-0 lg:right-0 lg:w-[40%] flex justify-end">
            <p className="text-gray-600 text-[15px] md:text-base leading-relaxed text-left lg:text-right max-w-sm">
              We believe leadership is not taught only through words, but through action.
              Our community service initiatives give teenagers practical opportunities
              to serve, lead, and take responsibility for their environment.
            </p>
          </div>

          {/* CENTER: Staggered Image Cluster */}
          <div className="relative w-full lg:h-[500px] flex items-center justify-center lg:mt-12">
            <div className="relative w-full max-w-2xl h-[350px] md:h-[450px] lg:h-full">

              {/* Image 1 – Top Left (Portrait) */}
              <div className="absolute top-0 left-0 w-[45%] h-[65%] md:w-72 md:h-80 rounded-2xl overflow-hidden shadow-2xl z-20 border-4 border-white">
                <Image
                  src={heroImages[0] || "/images/communityImage1.svg"}
                  alt="Community service"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Image 2 – Middle (Slightly behind, shifted right/down) */}
              <div className="absolute top-[10%] left-[25%] w-[50%] h-[60%] md:w-80 md:h-72 rounded-2xl overflow-hidden shadow-xl z-10 opacity-90 border-4 border-white">
                <Image
                  src={heroImages[1] || "/images/communityImage2.svg"}
                  alt="Teen volunteers"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Image 3 – Bottom Right (Landscape) */}
              <div className="absolute bottom-0 right-0 w-[55%] h-[60%] md:w-96 md:h-72 rounded-2xl overflow-hidden shadow-2xl z-30 border-4 border-white">
                <Image
                  src={heroImages[2] || "/images/communityImage1.svg"}
                  alt="Street cleanup"
                  fill
                  className="object-cover"
                />
              </div>

            </div>
          </div>

          {/* BOTTOM LEFT: Heading */}
          <div className="lg:absolute lg:bottom-0 lg:left-0 z-40">
            <h1 className="text-[60px] md:text-[80px] lg:text-[100px] font-black leading-[0.9] tracking-tighter flex flex-col items-start translate-y-6 lg:translate-y-12">
              <span className="text-[#1a202c]">Community</span>
              <span className="text-[#ff5c00]">Service</span>
            </h1>
          </div>

          {/* BOTTOM RIGHT: Button */}
          {/* <div className="lg:absolute lg:bottom-4 lg:right-0 z-40 flex justify-end">
            <button className="whitespace-nowrap px-8 py-4 bg-[#257CFF] text-white font-bold rounded-lg hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200 hover:-translate-y-1 active:translate-y-0">
              Join our Teens Community
            </button>
          </div> */}
          <div className="lg:absolute lg:bottom-4 lg:right-0 z-40 flex justify-end">
            <a
              href="https://chat.whatsapp.com/Cjg5iRW6pZ3Gd5i76oAQdQ"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap px-8 py-4 bg-[#257CFF] text-white font-bold rounded-lg hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200 hover:-translate-y-1 active:translate-y-0">

              Join our Teens Community
            </a>
          </div>

        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT — Image */}
          <div className="relative w-full h-[420px] md:h-[520px] rounded-2xl overflow-hidden">
            <Image
              src={approach.image || "/images/communityImage4.svg"} // replace with your image path
              alt="Community service in action"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* RIGHT — Content */}
          <div className="space-y-6">

            {/* Eyebrow */}
            <p className="text-sm tracking-[0.3em] text-gray-700 uppercase">
              Leadership Through Action
            </p>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Our Approach
            </h2>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed max-w-xl">
              Our community service projects are simple, practical, and
              intentional. We focus on activities that allow teenagers to
              engage directly with real community needs while learning
              leadership and collaboration.
            </p>

            {/* Sub-text */}
            <div className="space-y-4">
              <p className="font-medium text-gray-900">
                Each project is designed to:
              </p>

              <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4">
                {approach.focusPoints.length > 0 ? (
                  approach.focusPoints.map((p, i) => <li key={i}>{p}</li>)
                ) : (
                  <>
                    <li>Encourage responsibility and initiative</li>
                    <li>Build teamwork and leadership skills</li>
                    <li>Promote environmental and social awareness</li>
                    <li>Strengthen relationships with local communities</li>
                  </>
                )}
              </ul>
            </div>

            {/* Closing */}
            <p className="text-gray-700 leading-relaxed max-w-xl">
              Community service is not treated as an add-on. It is a learning
              experience that reinforces the values we teach across our
              programs.
            </p>

          </div>
        </div>
      </section>

      <div className="text-center mb-8 mt-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Impact of Our Community Service            </h2>

      </div>

      <section
        // className="py-12 md:py-20 bg-[url('https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764438624/Background_sfdpyy.png')] bg-cover bg-center bg-no-repeat"
        className="py-12 md:py-20 bg-[url(/images/BackgroundBlack.svg)] bg-cover bg-center bg-no-repeat"

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
                            end={parseInt(String(stat.value).replace(/\D/g, ""))}
                            duration={2.5}
                            separator=","
                          />
                        ) : (
                          "0"
                        )}
                        {String(stat.value).includes("+") ? "+" : ""}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <PastCommunityServices />
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