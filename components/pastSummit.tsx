'use client';

import { useState, useEffect } from 'react';
import { Summit } from '@/lib/mockSummit';
import SubmitDetailsModal from '@/components/SubmitDetailedModal';
import { ChevronRight } from 'lucide-react';
import { 
  fetchPastSummits, 
  getSummitById, 
  getSpeakersBySummit, 
  getPartnersBySummit, 
  getGalleryBySummit 
} from '@/lib/summitsApi';

export default function PastSummit() {
  const [summits, setSummits] = useState<Summit[]>([]);
  const [selectedSummit, setSelectedSummit] = useState<Summit | null>(null);
  const [featuredSummit, setFeaturedSummit] = useState<Summit | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSummits = async () => {
      try {
        const data = await fetchPastSummits();
        if (data && data.length > 0) {
          const converted: Summit[] = data.map(ps => ({
            id: String(ps.id),
            name: ps.summitTitle,
            date: ps.summitDate,
            description: '', 
            fullDescription: '',
            objective: 'What we did',
            objectives: [],
            featuredImage: ps.summitImage,
            headerImage: ps.summitImage,
            impact: [],
            partners: [],
            gallery: [],
            color: 'from-orange-500 to-orange-600'
          }));
          setSummits(converted);
          setFeaturedSummit(converted[0]);
        }
      } catch (e) {
        console.error('Failed to fetch past summits:', e);
      } finally {
        setLoading(false);
      }
    };
    loadSummits();
  }, []);

  useEffect(() => {
    if (featuredSummit && featuredSummit.id && featuredSummit.objectives.length === 0) {
      const loadFullDetail = async () => {
        try {
          const id = parseInt(featuredSummit.id);
          const [detail, speakers, partners, gallery] = await Promise.all([
            getSummitById(id),
            getSpeakersBySummit(id),
            getPartnersBySummit(id),
            getGalleryBySummit(id)
          ]);

          setFeaturedSummit(prev => {
            if (!prev) return null;
            return {
              ...prev,
              name: detail.summitName,
              description: detail.shortDescription,
              fullDescription: detail.aboutTextBody,
              objectives: detail.eventHighlights,
              featuredImage: detail.eventSideImage || prev.featuredImage,
              headerImage: detail.coverImage || prev.headerImage,
              impact: detail.impactMetrics.map(s => ({ label: s.impactLabel, value: parseInt(s.impactValue) || 0 })),
              partners: partners.map(p => ({ name: '', logo: p.partnerLogo })),
              speakers: speakers.map(s => ({ name: s.speakerName, role: s.speakerRole, image: s.speakerImage })),
              gallery: gallery.map(g => g.imageUrl)
            };
          });
        } catch (e) {
          console.error('Failed to load featured summit detail:', e);
        }
      };
      loadFullDetail();
    }
  }, [featuredSummit?.id]);

  if (loading || !featuredSummit) {
    return (
      <div className="flex items-center justify-center py-20 bg-white">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium">Loading summits...</span>
        </div>
      </div>
    );
  }

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
