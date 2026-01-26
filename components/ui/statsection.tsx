"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface CountUpProps {
  end: number;
}

const CountUp = ({ end }: CountUpProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const step = end / (duration / 20);

      const counter = setInterval(() => {
        start += step;
        if (start >= end) {
          start = end;
          clearInterval(counter);
        }
        setCount(Math.floor(start));
      }, 20);
    }
  }, [inView, end]);

  return <span ref={ref}>{count}</span>;
};

interface ImageItem {
  type: "image";
  img: string;
}

interface StatItem {
  type: "stat";
  bg: string;
  value: number;
  label: string;
}

type StatCard = ImageItem | StatItem;

export default function StatsSection() {
  const cardHeights = {
    tall: "h-[350px] md:h-[380px]",
    medium: "h-[350px] md:h-[260px]",
    small: "h-[180px] md:h-[200px]",
  };

  const stats: StatCard[] = [
    {
      type: "image",
      img: "/images/schchild.svg",
    },
    {
      type: "stat",
      bg: "/images/oran.svg",
      value: 25,
      label: "Purpose driven initiatives executed",
    },
    {
      type: "stat",
      bg: "/images/yel.svg",
      value: 8500,
      label:
        "Direct beneficiaries of our programs and continuous learning efforts.",
    },

    {
      type: "image",
      img: "https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764462349/Image_2_ckefa5.png",
    },
    {
      type: "stat",
      bg: "/images/bluestar.svg",
      value: 12,
      label:
        "Communities in Africa, expanding presence across cities and schools.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-10 items-end">
      {stats.map((item, i) => {
        const heightClass =
          i === 0 || i === 4
            ? cardHeights.tall
            : i === 1 || i === 3
            ? cardHeights.medium
            : cardHeights.small;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60, scale: 0.85 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            viewport={{ once: true }}
            className={`rounded-3xl overflow-hidden relative ${heightClass}`}
          >
            {item.type === "image" && (
              <Image
                src={item.img}
                alt="Stat Image"
                fill
                className="object-cover"
              />
            )}

            {item.type === "stat" && (
              <div className="relative w-full h-full">
                <Image
                  src={item.bg}
                  alt="Stat Background"
                  fill
                  className="object-cover brightness-50"
                />

                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-3 ">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    <CountUp end={item.value} />+
                  </h2>
                  <p className="text-sm md:text-base mt-1">{item.label}</p>
                </div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
