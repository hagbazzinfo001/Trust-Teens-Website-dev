'use client';

import { useState, useEffect } from 'react';
import { mockSummit, Summit } from '@/lib/mockSummit';
import SubmitDetailsModal from '@/components/SubmitDetailedModal';
import { ChevronRight } from 'lucide-react';
import { getPastSummits, getSummitDetail } from '@/lib/adminData';

export default function PastSummit() {
  const [summits, setSummits] = useState<Summit[]>(mockSummit);
  const [selectedSummit, setSelectedSummit] = useState<Summit | null>(null);
  const [featuredSummit, setFeaturedSummit] = useState<Summit>(mockSummit[0]);

  useEffect(() => {
    const adminPast = getPastSummits();
    if (adminPast && adminPast.length > 0) {
      const converted: Summit[] = adminPast.map(ps => ({
        id: ps.summit_id,
        name: ps.summit_title,
        date: ps.summit_date,
        description: ps.summit_title, // Placeholder until full detail is loaded
        fullDescription: ps.summit_title,
        objective: 'What we did',
        objectives: [],
        featuredImage: ps.summit_image,
        headerImage: ps.summit_image,
        impact: [],
        partners: [],
        gallery: [],
        color: 'from-orange-500 to-orange-600'
      }));
      setSummits(converted);
      setFeaturedSummit(converted[0]);
    }
  }, []);

  // Effect to load full details for the featured summit if it's from admin
  useEffect(() => {
    if (featuredSummit && featuredSummit.objectives.length === 0) {
      const detail = getSummitDetail(featuredSummit.id);
      if (detail) {
        setFeaturedSummit(prev => ({
          ...prev,
          name: detail.summit_name,
          description: detail.short_description,
          fullDescription: detail.about_text_body,
          objectives: detail.event_highlights,
          featuredImage: detail.event_side_image || prev.featuredImage,
          headerImage: detail.hero_video_url || prev.headerImage,
          impact: detail.impact.map(s => ({ label: s.stat_label, value: parseInt(s.stat_number) || 0 })),
          partners: detail.partners.map(p => ({ name: p.name, logo: p.logo })),
          speakers: detail.speakers.map(s => ({ name: s.speaker_name, role: s.speaker_role, image: s.speaker_image })),
          gallery: detail.gallery
        }));
      }
    }
  }, [featuredSummit.id]);

  return (
    <>
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-sm font-semibold text-gray-600 mb-2">PAST SUMMIT</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore all our previous summits and the impact behind each one.
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 space-y-3">
              {summits.map((summit) => (
                <button
                  key={summit.id}
                  onClick={() => setFeaturedSummit(summit)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 group ${featuredSummit.id === summit.id
                    ? `bg-orange-300 text-black shadow-lg`
                    : 'bg-white-500 text-gray-900 hover:bg-orange-500'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-black">{summit.name}</h3>
                      <p className={`text-sm ${featuredSummit.id === summit.id
                        ? 'opacity-90'
                        : 'text-gray-600'
                        }`}>
                        {summit.date}
                      </p>
                    </div>
                    {featuredSummit.id === summit.id && (
                      <ChevronRight size={20} />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-4">
                <div
                  className="aspect-video md:aspect-auto md:h-96 rounded-2xl overflow-hidden bg-gray-200 cursor-pointer hover:shadow-lg transition-shadow group"
                  onClick={() => setSelectedSummit(featuredSummit)}
                >
                  <img
                    src={featuredSummit.featuredImage}
                    alt={featuredSummit.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <button
                  onClick={() => setSelectedSummit(featuredSummit)}
                  className={`w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-between group`}
                >
                  <span>View Full Summit Details</span>
                  <ChevronRight size={30} className="group-hover:translate-x-1 transition-transform " />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SubmitDetailsModal
        Summit={selectedSummit}
        onClose={() => setSelectedSummit(null)}
      />
    </>
  );
}
