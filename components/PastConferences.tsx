

'use client';

import { useState, useEffect } from 'react';
import { mockConference, Conference } from '@/lib/mockConferences';
import { ChevronRight } from 'lucide-react';
import ConferenceDetailsModal from './ConferenceDetailsModal';
import { getPastConferences, getConferenceDetail } from '@/lib/adminData';

export default function PastConferences() {
  const [conferences, setConferences] = useState<Conference[]>(mockConference);
  const [selectedConference, setSelectedConference] = useState<Conference | null>(null);
  const [featuredConference, setFeaturedConference] = useState<Conference>(mockConference[0]);

  useEffect(() => {
    const adminPast = getPastConferences();
    if (adminPast && adminPast.length > 0) {
      const converted: Conference[] = adminPast.map(cp => ({
        id: cp.conference_id,
        name: cp.conference_title,
        date: cp.conference_date,
        description: cp.conference_title, // Placeholder until full detail is loaded
        fullDescription: cp.conference_title,
        objective: 'What we did',
        objectives: [],
        featuredImage: cp.conference_image,
        headerImage: cp.conference_image,
        impact: [],
        partners: [],
        gallery: [],
        color: 'from-orange-500 to-orange-600'
      }));
      setConferences(converted);
      setFeaturedConference(converted[0]);
    }
  }, []);

  // Effect to load full details for the featured conference if it's from admin
  useEffect(() => {
    if (featuredConference && featuredConference.objectives.length === 0) {
      const detail = getConferenceDetail(featuredConference.id);
      if (detail) {
        setFeaturedConference(prev => ({
          ...prev,
          name: detail.conference_name,
          description: detail.conference_summary,
          fullDescription: detail.about_text_body,
          objectives: detail.event_highlights,
          featuredImage: detail.about_side_image || prev.featuredImage,
          headerImage: detail.hero_main_image || prev.headerImage, // conference modal uses hero_main_image
          impact: detail.impact.map(s => ({ label: s.stat_label, value: parseInt(s.stat_number) || 0 })),
          partners: detail.partners.map(p => ({ name: p.name, logo: p.logo })),
          speakers: detail.speakers.map(s => ({ name: s.speaker_name, role: s.speaker_role, image: s.speaker_image })),
          news: detail.news.map(n => ({ title: n.news_title, link: n.news_link, image: n.news_thumbnail })),
          gallery: detail.gallery
        }));
      }
    }
  }, [featuredConference.id]);

  return (
    <>
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-sm font-semibold text-gray-600 mb-2">PAST CONFERENCE</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 lg:w-[70%]">
              Explore all our previous conference and the impact behind each one.
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 space-y-3">
              {conferences.map((conference) => (
                <button
                  key={conference.id}
                  onClick={() => setFeaturedConference(conference)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 group ${featuredConference.id === conference.id
                    ? `bg-orange-300 text-black shadow-lg`
                    : 'bg-white-500 text-gray-900 hover:bg-orange-500'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-black">{conference.name}</h3>
                      <p className={`text-sm ${featuredConference.id === conference.id
                        ? 'opacity-90'
                        : 'text-gray-600'
                        }`}>
                        {conference.date}
                      </p>
                    </div>
                    {featuredConference.id === conference.id && (
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
                  onClick={() => setSelectedConference(featuredConference)}
                >
                  <img
                    src={featuredConference.featuredImage}
                    alt={featuredConference.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <button
                  onClick={() => setSelectedConference(featuredConference)}
                  className={`w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-between group`}
                >
                  <span>View Full Conference Details</span>
                  <ChevronRight size={30} className="group-hover:translate-x-1 transition-transform " />
                </button>
              </div>
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