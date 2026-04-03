"use client";
import { Card, CardContent } from "@/components/ui/card";
import { CheckSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import Image from "next/image";
import CountUp from "@/components/ui/CountUp2";
import { getAchievementMetric } from "@/lib/adminData";
import { leadershipApi } from "@/lib/leadershipApi";

export default function AboutPage() {
  const values = [
    { title: "Influence", image: "/images/bluebg.svg" },
    { title: "Impact", image: "/images/greenbg.svg" },
    { title: "Identity", image: "/images/redbg.svg" },
    { title: "Excellence", image: "/images/purplebg.svg" },
    { title: "Legacy", image: "/images/yellowbg.svg" },
  ];
  const howWeDoIt = [
    { text: "We leverage community to shape character.", icon: "/images/icon1.svg" },
    {
      text: "We share structured resources through a defined curriculum.",
      icon: "/images/icon2.svg",
    },
    {
      text: "We host campaigns across all areas of life (e.g., Personal hygiene, Valentines etc.)",
      icon: "/images/icon3.svg",
    },
    {
      text: "We organize summits, conferences, and school clubs.",
      icon: "/images/icon4.svg",
    },
  ];

  const [leaders, setLeaders] = useState<{name: string, role: string, image: string}[]>([]);

  const [achievementValue, setAchievementValue] = useState("25");
  const [achievementLabel, setAchievementLabel] = useState("Purpose driven initiatives executed");

  useEffect(() => {
    AOS.init({ duration: 800, once: false });

    const fetchLeaders = async () => {
      try {
        const data = await leadershipApi.getLeaders();
        if (data && data.length > 0) {
          setLeaders(
            data.sort((a, b) => a.displayOrder - b.displayOrder).map((l) => ({
              name: l.leaderName,
              role: l.leaderTitle,
              image: l.leaderImage,
            }))
          );
        }
      } catch (error) {
        console.error('Failed to fetch leaders:', error);
      }
    };
    fetchLeaders();

    const savedAchievement = getAchievementMetric();
    if (savedAchievement) {
      setAchievementValue(savedAchievement.metric_value);
      setAchievementLabel(savedAchievement.metric_label);
    }
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        <section
          className="
    relative overflow-hidden 
    text-white py-12 md:py-20 rounded-[3rem]
    bg-no-repeat bg-center bg-cover
    bg-[url('/images/bluestar_bg.svg')]
  "
        >



          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-8  gap-6">
              <div
                className="
  max-w-3xl mb-8
  ml-0                        /* Mobile: no shifting */
  md:ml-[49%] md:-translate-x-1/2   /* Desktop: center-left shifting */
  transform
"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Our Vision Statement
                </h1>
                <p className="text-lg md:text-xl leading-relaxed ">
                  We envision a world where African teenagers become the spark
                  for generational cycles of wholeness, leadership, and societal
                  transformation.
                </p>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border-white">
              <Image
                src="https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764439753/Image_3_p6utdj.png?auto=compress&cs=tinysrgb&w=1200"
                alt="Conference"
                className="w-full h-64 md:h-96 object-cover"
                width={800}
                height={400}
              />
            </div>
          </div>
        </section>


        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  How we will
                  <br />
                  achieve it
                </h2>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  We shape value-driven teenagers by curating environments and
                  experiences that encourage purpose, wholeness, and leadership.
                </p>

                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-4">How we do it:</h3>

                  <div className="space-y-3">
                    {howWeDoIt.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Image
                          src={item.icon}
                          width={30}
                          height={30}
                          alt="Icon"
                          className="flex-shrink-0 mt-1"
                        />

                        <p className="text-gray-700">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764462221/Image_1_os48jl.png?auto=compress&cs=tinysrgb&w=400"
                    alt="Teens"
                    className="w-full h-full object-cover"
                    width={400}
                    height={400}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div
                    className="rounded-3xl overflow-hidden h-[300px] flex items-center justify-center bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/aboutusOrange_bg.png')" }}
                  >
                    <div className="text-white text-center">
                      <h2 className="text-5xl font-bold">      <CountUp value={parseInt(achievementValue) || 0} />+
                      </h2>
                      <p className="text-lg mt-2">{achievementLabel}</p>
                    </div>
                  </div>

                  <div className="rounded-3xl overflow-hidden">
                    <Image
                      src="https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764462349/Image_2_ckefa5.png?auto=compress&cs=tinysrgb&w=400"
                      alt="Education"
                      className="w-full h-full object-cover"
                      width={400}
                      height={400}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="rounded-3xl overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764454479/Image_4_u25zfn.png?auto=compress&cs=tinysrgb&w=800"
                  alt="Trust Teens Event"
                  className="w-full h-full object-cover"
                  width={800}
                  height={400}
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Why Trust Teens
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Trust Teens was founded in response to a clear gap in how
                    society raises and shapes teenagers, especially in a world
                    where influence is often louder than wisdom.
                  </p>
                  <p>
                    Our founder, Deborah Dada, observed that access to
                    value-based communities made a defining difference in her
                    life and shaped her future.
                  </p>
                  <p>
                    Trust Teens is her response to that realization — a platform
                    built to provide teenagers with access, values, structure,
                    and intentional influence early in life. We believe that
                    when teenagers are equipped early, they will not only
                    survive, they will thrive and lead.
                  </p>
                  <p className="font-semibold">
                    We are registered with corporate affairs commissions as:
                  </p>
                  <p className="font-bold text-lg">
                    THE TREYSTA COMMUNITY TEENS DEVELOPMENT INITIATIVES
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div>
            {/* Row 1: 3 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {values.slice(0, 3).map((value, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  data-aos="fade-up"
                  className="sr-box rounded-2xl p-12 text-center text-white bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${value.image})` }}
                >
                  <h3 className="text-xl md:text-2xl font-bold drop-shadow-lg">
                    {value.title}
                  </h3>
                </motion.div>
              ))}
            </div>

            {/* Row 2: 2 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {values.slice(3, 5).map((value, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  data-aos="fade-up"
                  className="sr-box rounded-2xl p-12 text-center text-white bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${value.image})` }}
                >
                  <h3 className="text-xl md:text-2xl font-bold drop-shadow-lg">
                    {value.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Our leadership
              </h2>
              <p className="text-gray-600">
                Meet the leaders shaping our mission and building spaces where
                teenagers can grow, lead, and thrive.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {leaders.map((leader, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg overflow-hidden"
                >
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                      width={400}
                      height={400}
                    />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="font-bold text-lg mb-1">{leader.name}</h3>
                    <p className="text-gray-600 text-sm">{leader.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
