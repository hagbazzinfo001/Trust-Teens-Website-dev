'use client';

import { useState } from 'react';
import { mockSummit, Summit } from '@/lib/mockSummit';
import SubmitDetailsModal from '@/components/SubmitDetailedModal';
import { ChevronRight } from 'lucide-react';

export default function PastSummit() {
  const [selectedSummit, setSelectedSummit] = useState<Summit | null>(null);
  const [featuredSummit, setFeaturedSummit ] = useState<Summit>(mockSummit[0]);

  return (
    <>
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-sm font-semibold text-gray-600 mb-2">PAST SUMMIT</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore all our previous summits and the impact behind each one.            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 space-y-3">
              {mockSummit.map((summit) => (
                <button
                  key={summit.id}
                  onClick={() => setFeaturedSummit(summit)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 group ${
                    featuredSummit.id === summit.id
                      // ? `bg-gradient-to-r ${summit.color} text-black shadow-lg`
                      ? `bg-orange-300 text-black shadow-lg`

                      : 'bg-white-500 text-gray-900 hover:bg-orange-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-black">{summit.name}</h3>
                      <p className={`text-sm ${
                        featuredSummit.id === summit.id
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
                <div className={`bg-gradient-to-r ${featuredSummit.color} text-black rounded-2xl p-6 md:p-8`}>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">{featuredSummit.name}</h3>
                  <p className="opacity-90 text-sm md:text-base leading-relaxed">
                    {featuredSummit.description}
                  </p>
                </div>

                <div className="aspect-video md:aspect-auto md:h-96 rounded-2xl overflow-hidden bg-gray-200 cursor-pointer hover:shadow-lg transition-shadow group"
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
                  className={`w-full bg-gradient-to-r ${featuredSummit.color} text-black font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-between group bg-green-500`}
                >
                  <span className='text-white'>View Full Summit Details</span>
                  <ChevronRight size={30} className="group-hover:translate-x-1 transition-transform " />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SubmitDetailsModal
        campaign={selectedSummit}
        onClose={() => setSelectedSummit(null)}
      />
    </>
  );
}
