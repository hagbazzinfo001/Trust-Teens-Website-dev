

'use client';

import { useState } from 'react';
import { mockConference, Conference } from '@/lib/mockConferences';
import CampaignDetailsModal from '@/components/CampaignDetailsModal';
import { ChevronRight } from 'lucide-react';
import ConferenceDetailsModal from './ConferenceDetailsModal';

export default function PastConferences() {
  const [selectedConference, setSelectedConference] = useState<Conference | null>(null);
  const [featuredConference, setFeaturedConference ] = useState<Conference>(mockConference[0]);

  return (
    <>
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-sm font-semibold text-gray-600 mb-2">PAST CONFERENCE</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 lg:w-[70%]">
            Explore all our previous conference and the impact behind each one.            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 space-y-3">
              {mockConference.map((conference) => (
                <button
                  key={conference.id}
                  onClick={() => setFeaturedConference(conference)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 group ${
                    featuredConference.id === conference.id
                      // ? `bg-gradient-to-r ${conference.color} text-black shadow-lg`
                      ? `bg-orange-300 text-black shadow-lg`

                      : 'bg-white-500 text-gray-900 hover:bg-orange-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-black">{conference.name}</h3>
                      <p className={`text-sm ${
                        featuredConference.id === conference.id
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
                {/* <div className={`bg-gradient-to-r ${featuredConference.color} text-black rounded-2xl p-6 md:p-8`}>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">{featuredConference.name}</h3>
                  <p className="opacity-90 text-sm md:text-base leading-relaxed">
                    {featuredConference.description}
                  </p>
                </div> */}

                <div className="aspect-video md:aspect-auto md:h-96 rounded-2xl overflow-hidden bg-gray-200 cursor-pointer hover:shadow-lg transition-shadow group"
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
                  className={`w-full bg-gradient-to-r ${featuredConference.color} text-black font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-between group bg-green-500`}
                >
                  <span className='text-white'>View Full Campaign Details</span>
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
