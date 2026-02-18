  
  "use client";
 import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
 import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
 import PastHangouts from '@/components/PastHangouts';
 
import icon1 from "@/public/images/icon1.svg";
import icon3 from "@/public/images/icon3.svg";
import icon4 from "@/public/images/icon4.svg";
import icon2 from "@/public/images/icon2.svg";
import icon5 from "@/public/images/icon5.svg";
import icon6 from "@/public/images/icon6.svg";
 import UpcomingHangouts from "@/components/ui/UpcomingHangouts";
import {
  ArrowRight,
  Users,
  GraduationCap,
  BookOpen,
  Package,
} from "lucide-react";
import { use } from "react";



export default function HangoutsPage() {
//  const res = await fetch("https://your-api.com/campaign", {
//     next: { revalidate: 10 }, // optional caching
//   });
//   const data = await res.json();

const features = [
  {
    title: "Health & Wellness",
    description:
      "Helping teens build healthy habits, stay active, and improve wellbeing.",
    icon: icon1,
  },
  {
    title: "Digital Literacy",
    description:
      "Teaching safe online behaviour, smart tech use, and digital awareness.",
    icon: icon2,
  },
  {
    title: "Social justice",
    description:
      "Helping teens understand fairness, challenge inequality, serve others, support justice.",
    icon: icon3,
  },
  {
    title: "Emotions & Relationships",
    description:
      "Helping teens understand emotions, build respect, strengthen friendships, set boundaries.",
    icon: icon4,
  },
  {
    title: "Creativity",
    description:
      "Encouraging teens to explore ideas, express themselves, create new work.",
    icon: icon5,
  },
  {
    title: "Food & Nutrition",
    description:
      "Teaching teens healthy eating habits, food awareness, simple nutrition knowledge.",
    icon: icon6,
  },
];
const coreComponents = [
  {
    title: "Large Audience",
    description:
      "Thousands of teenagers gather from schools and communities.",
      icon: icon1, 
  },
  {
    title: "Keynote Sessions",
    description:
      "Impactful talks from experienced leaders and professionals.",
      icon: icon2, 
  },
  {
    title: "Competitions & Awards",
    description:
      "Debates, spelling challenges, business pitches and more.",
      icon: icon3, 
  },
  {
    title: "Innovation & Creativity",
    description:
      "Idea pitching, talent showcases, and problem-solving moments.",
      icon: icon4, 
  },
  {
    title: "Teen Panels",
    description:
      "Peer-led conversations that give teenagers a voice in the room.",
      icon: icon5, 
  },
  {
    title: "Networking & Connection",
    description:
      "Teens meet new friends, mentors, and opportunities.",
      icon: icon6, 
  },
];


  const stats = [
    { icon: icon1, label: "Teenagers Attended", value: "4000+" },
    { icon: icon2, label: "Schools Mobilised", value: "29+" },
    { icon: icon3, label: "Speakers and Guests", value: "30+" },
    { icon: icon4, label: "Volunteers Deployed", value: "50+" },
  ];
const [activeSet, setActiveSet] = useState(0);
const featuresPerPage = 3;

// Slice out the current 3 features
const displayedFeatures = features.slice(
  activeSet * featuresPerPage,
  activeSet * featuresPerPage + featuresPerPage
);

 
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  const itemVariants = {
    hidden: { opacity: 0, y: 40 }, // bottom to top
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      <section className="pb-4 pt-4 md:py-10 bg-white mx-3 lg:mx-12 mb-12">
      <div
  className="
    w-full
    rounded-3xl
    overflow-hidden
    h-auto
    sm:h-[50vh]
    lg:h-[70vh]
  "
>
  <motion.img
    src="/images/conferenceheader.svg"
    alt="Conference Header"
    className="
      w-full
      h-auto
      sm:h-full
      object-contain
      sm:object-cover
    "
    initial={{ opacity: 0, x: -80 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
  />
</div>

 
  <div className="
  flex
  flex-col
  lg:flex-row
  gap-8
  w-full
  mt-8
  items-start
  lg:items-center
 ">
  <h1 className="text-3xl md:text-5xl font-bold lg:w-[50%]">
    The Biggest Teenage Conference in Africa
  </h1>

  <p className="text-gray-600 max-w-2xl lg:w-[40%]">
    Our annual conference brings together thousands of teenagers for a full day of inspiration,
    learning, creativity, and values-driven leadership.
  </p>
</div>

      </section>

      <section className="pb-8 md:py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch">
      
      {/* TEXT CARD */}
      <div className="
        bg-yellow-400
        rounded-3xl
        p-5 md:p-12
        z-10
      ">
        <div className="lg:w-[45%]">

                <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
          Why Trust Teens Conference
        </h2>

        <p className="text-black/80 leading-relaxed mb-4">
          The Trust Teens Conference is our largest annual gathering for
          teenagers across Africa. It brings together students, teachers,
          mentors and community leaders for a powerful, high-energy
          experience built around one theme each year.
        </p>

        <p className="text-black/80 leading-relaxed">
          Every edition is designed to give young people the tools, stories,
          and opportunities they need to grow, influence, and make better
          decisions in a rapidly changing world.
        </p>
      </div>

  
        <div className="overflow-hidden rounded-3xl  lg:absolute
        lg:right-0
        lg:top-1/2
        lg:-translate-y-1/2
        lg:w-[50%]
        w-full
        mt-6 lg:mt-0">
          <img
            src="/images/yellowImage.svg" // replace with your image path
            alt="Trust Teens Conference"
            className="w-full h-full object-cover lg:p-9 p-0"
          />
        </div>
       </div>

    </div>
  </div>
</section>

<section className="py-12 md:py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Heading */}
    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-12">
      Core Components <br /> of the conference
    </h2>

    {/* Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {coreComponents.map((item, index) => (
        <div key={index} className="flex items-start gap-4">
          
          {/* Icon */}
          <div className="flex gap-1 mt-1">
          <Image
    src={item.icon}
    alt={item.title}
    width={30}
    height={30}
    className="w-8 h-8 object-contain"
  />
          </div>

          {/* Text */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>

        </div>
      ))}
    </div>

  </div>
</section>


 
<section
  // className="py-12 md:py-20 bg-[url('https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764438624/Background_sfdpyy.png')] bg-cover bg-center bg-no-repeat"
  className="py-12 md:py-20 bg-[url(/BackgroundBlack.svg)] bg-cover bg-center bg-no-repeat"

>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white text-left px-4 sm:px-6 lg:px-8">
            Big Impact Metrics          </h2>
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
               <div className="flex flex-row items-center justify-center gap-4">
               {/* <div className="inline-flex p-4 rounded-full mb-4"> */}
  <Image
    src={stat.icon}
    alt={stat.label}
    width={30}
    height={30}
    className="w-8 h-8 object-contain"
  />
{/* </div> */}
                {/* Label */}
             <div className="text-left">
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
                <div className="text-sm mb-2 text-white/80">
                  {stat.label}
                </div>
             </div>
               </div>


                {/* CountUp */}
           
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>


   
 {/* <UpcomingCampaigns
      title={data.title}
      subtitle={data.subtitle}
      description={data.description}
      datetime={data.datetime}
      location={data.location}
      image={data.image}
      buttonLabel={data.buttonLabel}
    /> */}
      <PastHangouts />

<UpcomingHangouts />
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
          href="mailto:info@trustteens.com"
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
