
'use client';

import { useState, useEffect } from 'react';
import { mockHangout, Hangout } from '@/lib/mockHangout';
import HangoutDetailsModal from '@/components/HangoutDetailedModal';
import { ChevronRight } from 'lucide-react';
import { hangoutApi } from '@/lib/hangoutApi';

export default function PastHangouts() {
  const [hangouts, setHangouts] = useState<Hangout[]>([]);
  const [selectedHangout, setSelectedHangout] = useState<Hangout | null>(null);
  const [featuredHangout, setFeaturedHangout] = useState<Hangout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHangouts();
  }, []);

  const fetchHangouts = async () => {
    try {
      setLoading(true);
      const adminPast = await hangoutApi.getPastHangouts();
      if (adminPast && adminPast.length > 0) {
        const converted: Hangout[] = adminPast.map(p => ({
          id: p.id,
          name: p.hangoutTitle,
          date: p.hangoutDate,
          description: p.hangoutTitle,
          fullDescription: p.hangoutTitle,
          objective: 'What we did',
          objectives: [],
          featuredImage: p.hangoutImage,
          headerImage: p.hangoutImage,
          impact: [],
          partners: [],
          gallery: [],
          color: 'from-orange-500 to-orange-600'
        }));
        setHangouts(converted);
        setFeaturedHangout(converted[0]);
      } else {
        setHangouts(mockHangout);
        setFeaturedHangout(mockHangout[0]);
      }
    } catch (error) {
           console.error('Error loading hangouts:', error);
           setHangouts(mockHangout);
           setFeaturedHangout(mockHangout[0]);
    } finally {
      setLoading(false);
    }
  };

  // Effect to load full details for the featured hangout
  useEffect(() => {
    if (featuredHangout && featuredHangout.objectives.length === 0 && !featuredHangout.id.startsWith('mock')) {
      loadDetailedRecap(featuredHangout.id);
    }
  }, [featuredHangout?.id]);

  const loadDetailedRecap = async (id: string) => {
    try {
      const detail = await hangoutApi.getHangoutDetails(id);
      const partners = await hangoutApi.getPartners(id);
      const gallery = await hangoutApi.getGallery(id);
      
      if (detail) {
        setFeaturedHangout(prev => {
          if (!prev || prev.id !== id) return prev;
          return {
            ...prev,
            name: detail.hangoutName || prev.name,
            fullDescription: detail.hangoutSummary || prev.fullDescription,
            objectiveDetails: detail.aboutTextBody || '',
            objectives: detail.eventHighlights || [],
            featuredImage: detail.sideActionImage || prev.featuredImage,
            headerImage: detail.heroMainImage || prev.headerImage,
            impact: detail.impactMetrics?.map(s => ({ 
              label: s.impactLabel, 
              value: parseInt(s.impactValue.replace(/\D/g, '')) || 0,
              originalValue: s.impactValue 
            })) || [],
            partners: partners?.map(p => ({ name: '', logo: p.partnerLogo })) || [],
            gallery: gallery?.map(g => g.imageUrl) || []
          };
        });
      }
    } catch (error) {
      console.error('Error loading detailed recap:', error);
    }
  };

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
                  className={`w-full p-5 rounded-2xl text-left transition-all duration-300 group relative overflow-hidden ${featuredHangout?.id === hangout.id
                    ? `bg-gray-900 text-white shadow-xl translate-x-1`
                    : 'bg-gray-50 text-gray-900 hover:bg-orange-500 hover:text-white'
                    }`}
                >
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <h3 className="font-bold text-lg mb-0.5">{hangout.name}</h3>
                      <p className={`text-xs ${featuredHangout?.id === hangout.id
                        ? 'text-white/70'
                        : 'text-gray-500 group-hover:text-white/70'
                        }`}>
                        {hangout.date}
                      </p>
                    </div>
                    <ChevronRight size={20} className={`${featuredHangout?.id === hangout.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`} />
                  </div>
                </button>
              ))}
            </div>

              <div className="lg:col-span-2">
                {featuredHangout ? (
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
                      className={`w-full bg-gradient-to-r text-black font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-between group bg-green-500`}

                    >
                      <span className='text-white'>View Full Hangout Details</span>
                      <ChevronRight size={30} className="group-hover:translate-x-1 transition-transform " />
                    </button>

                  </div>
                ) : (
                  <div className="h-96 flex items-center justify-center bg-gray-50 rounded-3xl border border-dashed border-gray-300">
                    <p className="text-gray-400">Select a hangout to view details</p>
                  </div>
                )}
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
