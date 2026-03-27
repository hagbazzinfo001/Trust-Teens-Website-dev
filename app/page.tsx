"use client";
import { useState, useEffect } from "react";
import StatsSection from "@/components/ui/statsection";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CountUpOnView from "@/components/ui/countup";
import icon1 from "@/public/images/icon1.svg";
import icon3 from "@/public/images/icon3.svg";
import icon4 from "@/public/images/icon4.svg";
import icon2 from "@/public/images/icon2.svg";
import icon5 from "@/public/images/icon5.svg";
import icon6 from "@/public/images/icon6.svg";
import Image from "next/image";
import { fetchHomeImpactStats } from "@/lib/homeImpactStatsApi";
import { fetchTestimonials } from "@/lib/testimonialsApi";

const DEFAULT_TESTIMONIALS = [
  {
    quote: "We had an incredible experience working with Laundrify and were impressed they made such a big difference in only three weeks. Our team is so grateful for the wonderful improvements they made and their ability to get familiar with the product concept so quickly. It acted as a catalyst to take our design to the next level and get more eyes on our product.",
    name: "Jane Cooper",
    age: "18 year old",
    image: "/images/testimonia4.svg",
  },
  {
    quote: "This program changed my confidence completely. I now believe in my abilities and leadership skills.",
    name: "David Smith",
    age: "17 year old",
    image: "/images/testimonia4.svg",
  },
  {
    quote: "I learned teamwork, responsibility, and how to communicate better with others.",
    name: "Esther Johnson",
    age: "16 year old",
    image: "/images/testimonia4.svg",
  },
  {
    quote: "The mentorship and support helped me grow academically and personally.",
    name: "Michael Brown",
    age: "19 year old",
    image: "/images/testimonia4.svg",
  },
];

const DEFAULT_IMPACT_STATS = [
  { value: 22, label: "Months of impact" },
  { value: 100, label: "Volunteers", suffix: "+" },
  { value: 8500, label: "Teens Reached" },
  { value: 25, label: "Projects Executed" },
];

export default function Home() {
  const programs = [
    {
      title: "TT Campaigns",
      description: "Intentionally crafted around clear and certain goals to deepen community connections, expand our reach, or strengthen how the world perceives us",
      icon: icon4,
      href: "/missions/campaigns",
    },
    {
      title: "TT Conference",
      description: 'Widely known as the "Biggest Teenagers" Conference in Africa," This is our annual flagship gathering designed to inspire and empower teenagers to live with purpose',
      icon: icon6,
      href: "/missions/conferences",
    },
    {
      title: "TT Community Service",
      description: "Designed to help teenagers step outside their comfort zones and take active responsibility for the world around them through guided outreach programs.",
      icon: icon5,
      href: "/community/community-service",
    },
    {
      title: "TT Curriculum",
      description: "Designed to help teenagers step outside their comfort zones and take active responsibility for the world around them through guided outreach programs.",
      icon: icon3,
      href: "/community/curriculum",
    },
    {
      title: "TT School Clubs",
      description: "Personal development platform for secondary school students. Each meeting combines storytelling, peer mentorship, and practical activities that strengthen character.",
      icon: icon2,
      href: "/missions/school-clubs",
    },
    {
      title: "TT Hangouts",
      description: "Special gatherings held throughout the year. These events are all about fun, relaxation, and fostering genuine connections within the community.",
      icon: icon1,
      href: "/community/hangout",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);
  const [impactStats, setImpactStats] = useState(DEFAULT_IMPACT_STATS);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const apiData = await fetchTestimonials();
        if (apiData && apiData.length > 0) {
          setTestimonials(
            apiData.map((t) => ({
              quote: t.quoteText || "",
              name: t.teenName || "",
              age: t.teenAge || "",
              image: t.teenImage || "/images/testimonia4.svg",
            }))
          );
        }
      } catch (err) {
        console.error("Failed to load testimonials on client", err);
      }
    };
    loadTestimonials();

    const loadImpactStats = async () => {
      try {
        const apiData = await fetchHomeImpactStats();
        if (apiData && apiData.length > 0) {
          setImpactStats(
            apiData.map((d) => ({
              value: parseInt(String(d.statNumber).replace(/[^0-9]/g, '')) || 0,
              label: d.statTitle || '',
              suffix: String(d.statNumber).replace(/[0-9]/g, '').trim() || undefined,
            }))
          );
        }
      } catch (err) {
        console.error('Failed to load impact stats on client', err);
      }
    };
    loadImpactStats();
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              African <span className="text-orange-500">teenagers</span> will
              <br />
              change the world
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              We create value-based communities, learning experiences, and
              environments that help young people discover who they are, what
              they&#39;re capable of, and how they can shape the world around
              them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/impact">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                  See our Impact
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-2 border-gray-900 text-gray-900 px-8 py-6 text-lg hover:bg-gray-900 hover:text-white"
              >
                Get to know us
              </Button>
            </div>
          </div>

          <StatsSection />

          <div className="rounded-3xl overflow-hidden mt-12 md:mt-16">
            <Image
              src="https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764463806/Image_3_1_oi5zni.png?auto=compress&cs=tinysrgb&w=1200"
              alt="Conference"
              width={1200}
              height={400}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                A little about,
                <br />
                Trust Teens
              </h2>

              <Link href="/about">
                <Button
                  variant="outline"
                  className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                >
                  There&apos;s more to tell
                </Button>
              </Link>

            </div>
            <div className="relative">
              <p className="text-gray-700 mb-6 leading-relaxed">
                A teen-focused organisation committed to equipping teenagers
                with resources, mentorship, and support for their growth. We
                create value-based communities, learning experiences, and
                environments that help young people discover who they are, what
                they&#39;re capable of, and how they can shape the world around
                them.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-20  bg-no-repeat bg-center bg-cover
    bg-[url('/images/blue_bg.svg')] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Our Program highlights
            </h2>
          </div>

          {/* Parent for stagger animation */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.25,
                },
              },
            }}
          >
            {/* {programs.map((program, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: {
                    opacity: 0,
                    x: index % 2 === 0 ? -80 : 80, // LEFT for even, RIGHT for odd
                  },
                  show: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.7,
                      ease: "easeOut",
                    },
                  },
                }}
              >
                <Card className="bg-white text-gray-900 border-0 hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="mb-2">
                        {typeof program.icon === "string" ? (
                          <span className="text-3xl">{program.icon}</span>
                        ) : (
                          <Image
                            src={program.icon.src}
                            width={40}
                            height={40}
                            alt={program.title}
                          />
                        )}
                      </div>
                      <div className="text-gray-400">→</div>
                    </div>

                    <h3 className="text-xl font-bold mb-3">{program.title}</h3>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {program.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))} */}

            {programs.map((program, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: {
                    opacity: 0,
                    x: index % 2 === 0 ? -80 : 80,
                  },
                  show: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.7,
                      ease: "easeOut",
                    },
                  },
                }}
              >
                <Link href={program.href} className="block h-full">
                  <motion.div
                    whileHover={{
                      y: -6,
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="h-full"
                  >
                    <Card className="bg-white text-gray-900 border-0 h-full cursor-pointer hover:shadow-2xl transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            {typeof program.icon === "string" ? (
                              <span className="text-3xl">{program.icon}</span>
                            ) : (
                              <Image
                                src={program.icon.src}
                                width={40}
                                height={40}
                                alt={program.title}
                              />
                            )}
                          </div>

                          {/* Arrow animation */}
                          <motion.div
                            className="text-gray-400"
                            whileHover={{ x: 6 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Image src="/images/arrowvector.svg" alt="Arrow Right" width={24} height={24} />

                          </motion.div>
                        </div>

                        <h3 className="text-xl font-bold mb-3">
                          {program.title}
                        </h3>

                        <p className="text-sm text-gray-600 leading-relaxed">
                          {program.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>
            ))}

          </motion.div>
        </div>
      </section>
      {/* 
      <section className="py-12 md:py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Our Program highlights
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <Card
                key={index}
                className="bg-white text-gray-900 border-0 hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="mb-2">
                      {typeof program.icon === "string" ? (
                        <span className="text-3xl">{program.icon}</span>
                      ) : (
                        <Image
                          src={program.icon.src}
                          width={40}
                          height={40}
                          alt={program.title}
                        />
                      )}
                    </div>
                    <div className="text-gray-400">→</div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{program.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {program.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}
      <section className="py-12 md:py-20 bg-[url('https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764438624/Background_sfdpyy.png')] bg-cover bg-center bg-no-repeat text-white">
        {/* <section className="py-12 md:py-20 bg-gray-900 text-white"> */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              The impact that matters
            </h2>
            <p className="text-gray-400">
              Our achievement in the journey depicted in numbers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-6xl font-bold mb-2">
                  <CountUpOnView end={stat.value} />
                  {stat.suffix ?? ""}
                </div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      <section className="py-12 md:py-20 bg-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              What our Teenagers are saying
            </h2>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="text-orange-500 text-5xl mb-4">"</div>

            <p className="text-lg text-gray-700 mb-F8 leading-relaxed transition-all duration-500">
              {testimonials[activeIndex].quote}
            </p>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 relative">
                <Image
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].name}
                  fill
                  className="rounded-full object-cover border-2 border-white"
                />
              </div>

              <div>
                <div className="font-semibold">
                  {testimonials[activeIndex].name}
                </div>
                <div className="text-sm text-gray-500">
                  {testimonials[activeIndex].age}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${i === activeIndex
                  ? "bg-orange-500 scale-125"
                  : "bg-gray-300"
                  }`}
              ></button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
