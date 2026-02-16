

'use client';

import { useState } from 'react';
import { mockHangout, Hangout } from '@/lib/mockHangout';
import HangoutDetailsModal from '@/components/HangoutDetailedModal';
import { ChevronRight } from 'lucide-react';
 
export default function PastHangouts() {
  const [selectedHangout, setSelectedHangout] = useState<Hangout | null>(null);
  const [featuredHangout, setFeaturedHangout ] = useState<Hangout>(mockHangout[0]);

  return (
    <>
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-sm font-semibold text-gray-600 mb-2">PAST HANGOUTS</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 lg:w-[70%]">
            Explore all our previous hangout and the impact behind each one.            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 space-y-3">
              {mockHangout.map((hangout) => (
                <button
                  key={hangout.id}
                  onClick={() => setFeaturedHangout(hangout)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 group ${
                    featuredHangout.id === hangout.id
                      // ? `bg-gradient-to-r ${hangout.color} text-black shadow-lg`
                      ? `bg-orange-300 text-black shadow-lg`

                      : 'bg-white-500 text-gray-900 hover:bg-orange-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-black">{hangout.name}</h3>
                      <p className={`text-sm ${
                        featuredHangout.id === hangout.id
                          ? 'opacity-90'
                          : 'text-gray-600'
                      }`}>
                        {hangout.date}
                      </p>
                    </div>
                    {featuredHangout.id === hangout.id && (
                      <ChevronRight size={20} />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-4">
                {/* <div className={`bg-gradient-to-r ${featuredHangout.color} text-black rounded-2xl p-6 md:p-8`}>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">{featuredHangout.name}</h3>
                  <p className="opacity-90 text-sm md:text-base leading-relaxed">
                    {featuredHangout.description}
                  </p>
                </div> */}

                <div className="aspect-video md:aspect-auto md:h-96 rounded-2xl overflow-hidden bg-gray-200 cursor-pointer hover:shadow-lg transition-shadow group"
                  onClick={() => setSelectedHangout(featuredHangout)}
                >
                  <img
                    src={featuredHangout.featuredImage}
                    alt={featuredHangout.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <button
                  onClick={() => setSelectedHangout(featuredHangout)}
                  className={`w-full bg-gradient-to-r ${featuredHangout.color} text-black font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-between group bg-green-500`}
                >
                  <span className='text-white'>View Full Hangout Details</span>
                  <ChevronRight size={30} className="group-hover:translate-x-1 transition-transform " />
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
