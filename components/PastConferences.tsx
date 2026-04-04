'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';
import ConferenceDetailsModal from './ConferenceDetailsModal';
import { fetchPastConferences, getConferenceById, getSpeakersByConference, getPartnersByConference, getGalleryByConference, CompleteConference } from '@/lib/conferencesApi';

export default function PastConferences() {
  const [conferences, setConferences] = useState<any[]>([]);
  const [selectedConference, setSelectedConference] = useState<CompleteConference | null>(null);
  const [featuredConference, setFeaturedConference] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    const loadConferences = async () => {
      try {
        const data = await fetchPastConferences();
        if (data && data.length > 0) {
          const converted = data.map(cp => ({
            id: String(cp.id),
            name: cp.conferenceTitle,
            date: cp.conferenceDate,
            featuredImage: cp.conferenceImage,
            headerImage: cp.conferenceImage,
          }));
          setConferences(converted);
          setFeaturedConference(converted[0]);
        }
      } catch (e) {
        console.error('Failed to fetch past conferences:', e);
      } finally {
        setLoading(false);
      }
    };
    loadConferences();
  }, []);

  const loadFullDetails = async (conf: any) => {
    setDetailsLoading(true);
    try {
      const id = parseInt(conf.id);
      const [detail, speakers, partners, gallery] = await Promise.all([
        getConferenceById(id),
        getSpeakersByConference(id),
        getPartnersByConference(id),
        getGalleryByConference(id)
      ]);

      const fullConf: CompleteConference = {
        id: conf.id,
        conferenceName: detail.conferenceName,
        conferenceSummary: detail.conferenceSummary,
        heroMainImage: detail.heroMainImage || conf.headerImage,
        aboutTextBody: detail.aboutTextBody,
        aboutSideImage: detail.aboutSideImage || conf.featuredImage,
        eventHighlights: detail.eventHighlights || [],
        impactMetrics: detail.impactMetrics || [],
        speakers: speakers || [],
        partners: partners || [],
        gallery: gallery || [],
      };
      
      setSelectedConference(fullConf);
    } catch (e) {
      console.error('Failed to load conference details:', e);
    } finally {
      setDetailsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center">
        <Loader2 className="animate-spin text-orange-500" size={40} />
      </div>
    );
  }

  return (
    <>
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-sm font-semibold text-gray-600 mb-2">PAST CONFERENCES</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 lg:w-[70%]">
              Explore our previous conferences and the impact behind each one.
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 space-y-3">
              {conferences.map((conference) => (
                <button
                  key={conference.id}
                  onClick={() => setFeaturedConference(conference)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 group ${featuredConference?.id === conference.id
                    ? `bg-orange-300 text-black shadow-lg`
                    : 'bg-white text-gray-900 hover:bg-orange-500 hover:text-white'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{conference.name}</h3>
                      <p className={`text-sm ${featuredConference?.id === conference.id ? 'opacity-90' : 'text-gray-600 group-hover:text-white'}`}>
                        {conference.date}
                      </p>
                    </div>
                    {featuredConference?.id === conference.id && (
                      <ChevronRight size={20} />
                    )}
                  </div>
                </button>
              ))}
              {conferences.length === 0 && <p className="text-gray-400 italic">No conferences found.</p>}
            </div>

            <div className="lg:col-span-2">
              {featuredConference ? (
                <div className="space-y-4">
                  <div
                    className="aspect-video md:aspect-auto md:h-96 rounded-2xl overflow-hidden bg-gray-200 cursor-pointer hover:shadow-lg transition-shadow group relative"
                    onClick={() => loadFullDetails(featuredConference)}
                  >
                    <img
                      src={featuredConference.featuredImage}
                      alt={featuredConference.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {detailsLoading && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Loader2 className="animate-spin text-white" size={32} />
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => loadFullDetails(featuredConference)}
                    disabled={detailsLoading}
                    className={`w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-between group disabled:opacity-70`}
                  >
                    <span>{detailsLoading ? 'Loading Details...' : 'View Full Conference Details'}</span>
                    <ChevronRight size={30} className="group-hover:translate-x-1 transition-transform " />
                  </button>
                </div>
              ) : (
                <div className="h-96 flex items-center justify-center bg-gray-50 rounded-2xl text-gray-400">
                  Select a conference to view details
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <ConferenceDetailsModal
        conference={selectedConference}
        onClose={() => setSelectedConference(null)}
      />
    </>
  );
}