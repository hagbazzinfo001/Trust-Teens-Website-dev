"use client"; // ← Add this at the very top
import { Card, CardContent } from "@/components/ui/card";
import { CheckSquare } from "lucide-react";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

export default function AboutPage() {
  const values = [
    { title: "Influence", image: "/bluebg.svg" },
    { title: "Impact", image: "/greenbg.svg" },
    { title: "Identity", image: "/redbg.svg" },
    { title: "Excellence", image: "/purplebg.svg" },
    { title: "Legacy", image: "/yellowbg.svg" },
  ];
  const howWeDoIt = [
    { text: "We leverage community to shape character.", icon: "/icon1.svg" },
    {
      text: "We share structured resources through a defined curriculum.",
      icon: "/icon2.svg",
    },
    {
      text: "We host campaigns across all areas of life (e.g., Personal hygiene, Valentines etc.)",
      icon: "/icon3.svg",
    },
    {
      text: "We organize summits, conferences, and school clubs.",
      icon: "/icon4.svg",
    },
  ];

  const leaders = [
    {
      name: "Deborah Dada",
      role: "Founder, Trust Teens",
      image:
        "https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764436920/deborah_yw4azn.png?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Alex Oyebanji",
      role: "Founder, Peercheck",
      image:
        "https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764440281/alex_dbug1a.png?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Emmanuel Oshowobi",
      role: "UX Designer",
      image:
        "https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764440305/emeal_ec26gr.png?auto=compress&cs=tinysrgb&w=400",
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        <section className="relative overflow-hidden bg-purple-700 text-white py-12 md:py-20 rounded-[3rem]">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 right-10 w-32 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="20" cy="20" r="5" fill="orange" />
                <circle cx="50" cy="30" r="8" fill="orange" />
                <circle cx="70" cy="50" r="6" fill="orange" />
                <path
                  d="M 10 80 Q 40 60, 70 80"
                  stroke="orange"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </div>
            <div className="absolute top-20 right-20 w-40 h-40">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M 50 10 L 70 40 L 50 70 L 30 40 Z" fill="brown" />
                <circle cx="50" cy="50" r="15" fill="brown" />
              </svg>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-8 flex justify-left gap-6">
              <div className="opacity-0 md:opacity-100 transition-opacity duration-300">
                {" "}
                <Image
                  src="/visionimage.svg"
                  width={150}
                  height={150}
                  alt="Picture of the author"
                />
              </div>
              <div className="max-w-2xl mb-8 ">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Our Vision Statement
                </h1>
                <p className="text-lg md:text-xl leading-relaxed">
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
                  <div className="rounded-3xl overflow-hidden">
                    <Image
                      src="https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764462357/Frame_1000003523_fdhxmr.png?auto=compress&cs=tinysrgb&w=400"
                      alt="Community"
                      className="w-full h-full object-cover"
                      width={400}
                      height={400}
                    />
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
