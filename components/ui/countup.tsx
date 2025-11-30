"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  end: number;
  duration?: number;
}

export default function CountUpOnView({ end, duration = 1500 }: Props) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const el = entries[0];
        if (el.isIntersecting) {
          // Reset before starting again
          setCount(0);

          const startTime = performance.now();

          const animate = (time: number) => {
            const progress = Math.min((time - startTime) / duration, 1);
            const value = Math.floor(progress * end);
            setCount(value);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}</span>;
}
