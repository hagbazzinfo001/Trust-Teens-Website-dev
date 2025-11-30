"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Users,
  GraduationCap,
  BookOpen,
  Package,
} from "lucide-react";

export default function MissionsPage() {
  const features = [
    {
      title: "Communicate with students, their way",
      description:
        "Completely modern interface, sucking ideas without decorate innovation.",
      icon: Users,
    },
    {
      title: "Track student involvement, at scale",
      description:
        "Completely modern interface, sucking ideas without decorate innovation.",
      icon: GraduationCap,
    },
    {
      title: "Drive student outcomes with all innovation",
      description:
        "Completely modern interface, sucking ideas without decorate innovation.",
      icon: BookOpen,
    },
  ];

  const stats = [
    { icon: Users, label: "Dribe Students", value: "1200+" },
    { icon: GraduationCap, label: "Students", value: "1000+" },
    { icon: BookOpen, label: "E-learning Courses", value: "9000+" },
    { icon: Package, label: "Materials", value: "1100+" },
  ];

  const facilities = [
    "Spacious parking area",
    "Comfortable spaces",
    "Cozy cafe",
    "Child playground",
    "Outdoor spaces",
  ];
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  const itemVariants = {
    hidden: { opacity: 0, y: 40 }, // bottom to top
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      <section className="py-12 md:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-1 sm:px-3 lg:px-8">
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
            {/* Left Image (40% width, 70vh height) */}
            <div className="rounded-3xl overflow-hidden w-full md:w-[40%]">
              <div className="h-[70vh] w-full rounded-3xl overflow-hidden">
                <motion.img
                  src="https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764510219/Group_582_g80ue8.png?auto=compress&cs=tinysrgb&w=500"
                  alt="Left visual"
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, x: -80 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Right Section (60% width) */}
            <div className="w-full md:w-[60%]">
              <div className="mb-4 px-0 md:pl-10">
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  TRUST TEENS CAMPAIGNS
                </p>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Where We Drive Impact
                </h1>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We run focused campaigns that help teenagers grow, serve their
                  communities, and lead with purpose.
                </p>
              </div>

              <div className="rounded-3xl overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764510689/Group_516_bplvj3.png?auto=compress&cs=tinysrgb&w=1200"
                  alt="Large event"
                  width={800}
                  height={400}
                  className="w-full h-64 md:h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              What We Provide
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              This Privacy Policy becomes effective upon your first use online
              service, understood this and agree to be bound thereby.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <feature.icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === 0 ? "w-8 bg-green-500" : "w-2 bg-gray-300"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Students at a Glance
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The teaching demo is a common step in the hiring process at many
              colleges, driving a successful.
            </p>
          </div>

          <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card
                  className={`border-0 ${
                    index === 2 ? "bg-orange-500 text-white" : "bg-gray-50"
                  }`}
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`inline-flex p-4 rounded-full mb-4 ${
                        index === 2 ? "bg-white/20" : "bg-orange-100"
                      }`}
                    >
                      <stat.icon
                        className={`w-8 h-8 ${
                          index === 2 ? "text-white" : "text-orange-600"
                        }`}
                      />
                    </div>

                    {/* Label */}
                    <div
                      className={`text-sm mb-2 ${
                        index === 2 ? "text-white/80" : "text-gray-600"
                      }`}
                    >
                      {stat.label}
                    </div>

                    {/* CountUp Number */}
                    <div className="text-3xl font-bold">
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
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-2">
                Our Facilities
              </p>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                All facilities are designed to meet all your needs
              </h2>
              <div className="space-y-4">
                {facilities.map((facility, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className={`w-1 h-12 ${
                        index === 2 ? "bg-orange-500" : "bg-gray-300"
                      }`}
                    ></div>
                    <span
                      className={`text-lg ${
                        index === 2 ? "font-semibold" : ""
                      }`}
                    >
                      {facility}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden">
              <Image
                src="https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764499947/Rectangle_17_a8n1kb.png?auto=compress&cs=tinysrgb&w=800"
                alt="Cafe space"
                width={800}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
