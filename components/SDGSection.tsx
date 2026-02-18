

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import icon1 from "@/public/images/sdg4.png";
import icon2 from "@/public/images/sdg8.png";
import icon3 from "@/public/images/sdg5.png";
import icon4 from "@/public/images/sdg17.png";

const sdgs = [
  {
    title: 'SDG 4',
    subtitle: 'Quality Education',
    text: 'We deliver learning beyond the classroom through conferences and summits.',
    icon: icon1,
  },
  {
    title: 'SDG 5',
    subtitle: 'Gender Equality',
    text: 'Girls and boys participate equally and access the same opportunities.',
    icon: icon3,
  },
  {
    title: 'SDG 8',
    subtitle: 'Decent Work & Economic Growth',
    text: 'We expose teenagers to skills, innovation, and entrepreneurship.',
    icon: icon2,
  },
  {
    title: 'SDG 17',
    subtitle: 'Partnerships for the Goals',
    text: 'Collaboration strengthens impact across education and community.',
    icon: icon4,
  },
];

export default function SDGSection() {
  return (
    <section className="bg-white-400 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid gap-12 md:grid-cols-[1fr_2fr] items-start">
        {/* LEFT — 33% */}
        <div className="space-y-6">
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-lg"
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <Image
                src="/images/impactsdg.jpg"
                alt="Community impact"
                width={900}
                height={500}
                className="object-cover"
              />
            </motion.div>
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Aligned With the Sustainable Development Goals
          </h1>

          <p className="text-gray-600 leading-relaxed">
            Our work with teenagers contributes directly to the United Nations
            Sustainable Development Goals. Through education, leadership development,
            community engagement, and partnerships, Trust Teens supports long-term
            social and economic progress.
          </p>

          {/* IMAGE WITH MOTION */}

        </div>

        {/* RIGHT — 66% */}
        <div className="grid sm:grid-cols-2 gap-8">
          {sdgs.map((item, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-3xl
                p-8
                border border-gray-100
                shadow-sm
                hover:shadow-md
                transition-shadow
              "
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 rounded-xl bg-gray-50 border border-gray-200">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>

                <div>
                  <p className="text-xs tracking-widest text-gray-500 mb-1">
                    {item.title}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.subtitle}
                  </h3>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

      </div>
<section
className="relative overflow-hidden text-white py-20 px-6 mt-12 bg-contain  bg-center"
style={{ backgroundImage: "url('/images/impactPartnerbg.png')" }}
>
    {/* Background texture (use your own URL) */}
      {/* <Image
        src="https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764815863/Rectangle_usvu7i.png"
        alt="background texture"
        fill
        className="object-cover opacity-30 pointer-events-none"
      /> */}

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
    </section>
  );
}
