
"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import PastCampaigns from '@/components/PastCampaigns';
import bb from '@/public/images/bb.svg'
import gg from '@/public/images/gg.svg'
import oo from '@/public/images/oo.svg'
import pp from '@/public/images/pp.svg'
import icon1 from "@/public/images/icon1.svg";
import icon3 from "@/public/images/icon3.svg";
import icon4 from "@/public/images/icon4.svg";
import icon2 from "@/public/images/icon2.svg";
import icon5 from "@/public/images/icon5.svg";
import icon6 from "@/public/images/icon6.svg";
import UpcomingCampaigns from "@/components/ui/UpcomingCampaigns";
import {
ArrowRight,
Users,
GraduationCap,
BookOpen,
Package,
} from "lucide-react";
import { use } from "react";
 import cleanCummunity from '@/public/images/cleanCummunity.svg'
 import projectCommunity from '@/public/images/projectCommunity.svg'
 import teenagerCommunity from '@/public/images/teenagerCommunitty.svg'


export default function CommunityServicePage() {
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


const stats = [
  { icon: teenagerCommunity, label: "Teenagers actively participating in service projects", value: "25" },
  { icon: cleanCummunity, label: "Cleaner, safer community spaces", value: "3" },
  { icon: projectCommunity, label: "Community Projects Delivered", value: "2" },
 
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
   <section className="relative bg-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
      <div className="hidden lg:block relative w-full h-[560px]">

        {/* LEFT: Images collage */}
        <div className="relative w-full h-[560px] ">

{/* Image 1 – Top Left */}
<div className=" absolute top-0 left-0 w-72 h-72 rounded-2xl overflow-hidden shadow-xl">
  <Image
    src="/images/communityImage1.svg"
    alt="Community service"
    fill
    className="object-cover"
  />
</div>

{/* Image 2 – Middle (diagonal down + right) */}
<div className="absolute top-28 left-40 w-72 h-72 rounded-2xl overflow-hidden shadow-xl">
  <Image
    src="/images/communityImage2.svg"
    alt="Teen volunteers"
    fill
    className="object-cover"
  />
</div>

{/* Image 3 – Bottom Right */}
<div className="absolute top-[360px] left-20 w-80 h-72 rounded-2xl overflow-hidden shadow-xl">
  <Image
    src="/images/communityImage1.svg"
    alt="Street cleanup"
    fill
    className="object-cover"
  />
</div>

</div>
</div>

        {/* RIGHT: Text content */}
        <div className="relative">

          <p className="text-gray-600 max-w-lg leading-relaxed mb-10">
            We believe leadership is not taught only through words, but through action.
            Our community service initiatives give teenagers practical opportunities
            to serve, lead, and take responsibility for their environment.
          </p>

          <h2 className="text-5xl font-extrabold leading-tight mb-8">
            <span className="text-gray-900">Community</span>{" "}
            <span className="text-orange-500">Service</span>
          </h2>

          <button className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition">
            Join our Teens Community
          </button>
        </div>
      </div>
    </section>

    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* LEFT — Image */}
        <div className="relative w-full h-[420px] md:h-[520px] rounded-2xl overflow-hidden">
          <Image
            src="/images/communityImage4.svg" // replace with your image path
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
              <li>Encourage responsibility and initiative</li>
              <li>Build teamwork and leadership skills</li>
              <li>Promote environmental and social awareness</li>
              <li>Strengthen relationships with local communities</li>
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
    <PastCampaigns />

< UpcomingCampaigns />
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
