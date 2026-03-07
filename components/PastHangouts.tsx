'use client';

import { useState, useEffect } from 'react';
import { mockHangout, Hangout } from '@/lib/mockHangout';
import HangoutDetailsModal from '@/components/HangoutDetailedModal';
import { ChevronRight } from 'lucide-react';
import { getPastHangouts, getHangoutDetail } from '@/lib/adminData';

export default function PastHangouts() {
  const [hangouts, setHangouts] = useState<Hangout[]>(mockHangout);
  const [selectedHangout, setSelectedHangout] = useState<Hangout | null>(null);
  const [featuredHangout, setFeaturedHangout] = useState<Hangout>(mockHangout[0]);

  useEffect(() => {
    const adminPast = getPastHangouts();
    if (adminPast && adminPast.length > 0) {
      const converted: Hangout[] = adminPast.map(p => ({
        id: p.hangout_id,
        name: p.hangout_title,
        date: p.hangout_date,
        description: p.hangout_title,
        fullDescription: p.hangout_title,
        objective: 'What we did',
        objectives: [],
        featuredImage: p.hangout_image,
        headerImage: p.hangout_image,
        impact: [],
        partners: [],
        gallery: [],
        color: 'from-orange-500 to-orange-600'
      }));
      setHangouts(converted);
      setFeaturedHangout(converted[0]);
    }
  }, []);

  // Effect to load full details for the featured hangout if it's from admin
  useEffect(() => {
    if (featuredHangout && featuredHangout.objectives.length === 0) {
      const detail = getHangoutDetail(featuredHangout.id);
      if (detail) {
        setFeaturedHangout(prev => ({
          ...prev,
          name: detail.hangout_name,
          fullDescription: detail.hangout_summary,
          objective: 'What we did',
          objectives: detail.event_highlights,
          featuredImage: detail.side_action_image || prev.featuredImage,
          headerImage: detail.hero_main_image || prev.headerImage,
          impact: detail.impact.map(s => ({ label: s.impact_label, value: parseInt(s.impact_value) || 0 })),
          partners: detail.partners.map(p => ({ name: p.name, logo: p.logo })),
          gallery: detail.gallery
        }));
      }
    }
  }, [featuredHangout.id]);

  return (
    <>
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-widest">PAST HANGOUTS</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
              Explore our <span className="text-orange-500">Previous Sessions</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 space-y-3">
              {hangouts.map((hangout) => (
                <button
                  key={hangout.id}
                  onClick={() => setFeaturedHangout(hangout)}
                  className={`w-full p-5 rounded-2xl text-left transition-all duration-300 group relative overflow-hidden ${featuredHangout.id === hangout.id
                    ? `bg-gray-900 text-white shadow-xl translate-x-1`
                    : 'bg-gray-50 text-gray-900 hover:bg-orange-500 hover:text-white'
                    }`}
                >
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <h3 className="font-bold text-lg mb-0.5">{hangout.name}</h3>
                      <p className={`text-xs ${featuredHangout.id === hangout.id
                        ? 'text-white/70'
                        : 'text-gray-500 group-hover:text-white/70'
                        }`}>
                        {hangout.date}
                      </p>
                    </div>
                    <ChevronRight size={20} className={`${featuredHangout.id === hangout.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`} />
                  </div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div
                  className="aspect-video md:aspect-auto md:h-96 rounded-3xl overflow-hidden bg-gray-100 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 group relative"
                  onClick={() => setSelectedHangout(featuredHangout)}
                >
                  <img
                    src={featuredHangout.headerImage}
                    alt={featuredHangout.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <p className="text-white font-medium text-lg">Click to view full recap</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedHangout(featuredHangout)}
                  className={`w-full py-5 px-8 rounded-2xl bg-orange-500 text-white font-black text-lg hover:rotate-1 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-between shadow-xl shadow-orange-100`}
                >
                  <span className="tracking-tight uppercase">View Full Hangout Recap</span>
                  <ChevronRight size={28} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HangoutDetailsModal
        hangout={selectedHangout}
        onClose={() => setSelectedHangout(null)}
      />
    </>
  );
}
