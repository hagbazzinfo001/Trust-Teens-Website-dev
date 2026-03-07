'use client';

import { Hangout } from '@/lib/mockHangout';
import { X } from 'lucide-react';
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface HangoutDetailsModalProps {
  hangout: Hangout | null;
  onClose: () => void;
}

export default function HangoutDetailsModal({ hangout, onClose }: HangoutDetailsModalProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  if (!hangout) return null;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-2 text-white transition-all shadow-lg border border-white/20"
        >
          <X size={24} />
        </button>

        {/* Hero Section */}
        <div className="relative h-[50vh] min-h-[400px]">
          <Image
            src={hangout.headerImage}
            alt={hangout.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight leading-tight">
              {hangout.name}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl font-medium leading-relaxed">
              {hangout.fullDescription}
            </p>
          </div>
        </div>

        <div className="p-8 md:p-12 space-y-16">
          {/* About Section */}
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3 space-y-6">
              <h2 className="text-3xl font-extrabold text-gray-900 border-l-4 border-orange-500 pl-4 uppercase tracking-tighter">
                What we did
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg font-medium">
                {hangout.fullDescription}
              </p>
              <div className="space-y-4">
                {hangout.objectives.map((point, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="mt-1.5 w-6 h-6 rounded-lg flex-shrink-0 bg-orange-100 flex items-center justify-center text-orange-600 text-xs font-black group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <span className="text-gray-800 font-semibold group-hover:text-orange-600 transition-colors">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {hangout.featuredImage && (
              <div className="lg:col-span-2 relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl skew-y-1 hover:skew-y-0 transition-transform duration-500">
                <Image
                  src={hangout.featuredImage}
                  alt="Hangout highlight"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Impact Metrics */}
          <div ref={ref} className="rounded-[2.5rem] bg-gray-950 p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('/images/Background.svg')] bg-cover pointer-events-none" />

            <h3 className="text-2xl font-black mb-12 text-center relative z-10 text-orange-500 tracking-widest uppercase">
              Hangout Impact
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              {hangout.impact.map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className="text-4xl md:text-5xl font-black mb-2 text-white group-hover:text-orange-500 transition-colors">
                    {inView ? (
                      <CountUp
                        end={stat.value}
                        duration={2.5}
                        suffix={stat.value >= 10 ? '+' : ''}
                      />
                    ) : '0'}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-white/80 transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partners & Gallery */}
          <div className="space-y-16">
            {hangout.partners && hangout.partners.length > 0 && (
              <div className="space-y-8">
                <h2 className="text-3xl font-extrabold text-gray-900">Our Strategic Partners</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {hangout.partners.map((partner, i) => (
                    <div key={i} className="flex items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-orange-50 transition-colors border border-transparent hover:border-orange-200 group">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="h-10 w-auto object-contain opacity-60 group-hover:opacity-100 transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hangout.gallery && hangout.gallery.length > 0 && (
              <div className="space-y-8">
                <h2 className="text-3xl font-extrabold text-gray-900">Captured Moments</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {hangout.gallery.map((img, i) => (
                    <div key={i} className="aspect-square relative rounded-3xl overflow-hidden shadow-lg group">
                      <Image
                        src={img}
                        alt={`Moment ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-orange-500 p-8 flex justify-center">
          <button
            onClick={onClose}
            className="bg-white text-orange-600 px-12 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-xl active:scale-95"
          >
            CLOSE RECAP
          </button>
        </div>
      </div>
    </div>
  );
}
