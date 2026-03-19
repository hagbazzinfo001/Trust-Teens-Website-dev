'use client';

import { Campaign } from '@/lib/mockCampaigns';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
interface CampaignDetailsModalProps {
  campaign: Campaign | null;
  onClose: () => void;
}

export default function CampaignDetailsModal({ campaign, onClose }: CampaignDetailsModalProps) {
  if (!campaign) return null;
  const listicons = {
    'Icon1': '/images/icon1.svg',
    'Icon2': '/images/icon2.svg',
    'Icon3': '/images/icon3.svg',
    'Icon4': '/images/icon4.svg',
    'Icon5': '/images/icon5.svg',
    'Icon6': '/images/icon6.svg',
  }
  const iconsArray = Object.values(listicons);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl overflow-hidden">
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
            >
              <X size={24} />
            </button>



            <div className="text-white p-8 md:p-12 bg-no-repeat bg-center bg-cover bg-[url(/images/orange_bg.svg)]">
              <div className="space-y-4 ml-0 md:ml-[50%] tranform md:-translate-x-1/2 w-full md:w-3/5 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold">{campaign.name}</h1>
                <p className="text-lg opacity-90">{campaign.fullDescription}</p>

                <Link href="https://youtu.be/L_9xVmM4cqI?si=6G9jpe3LtL0-Z72k">
                  <button
                    className="
    rounded-xl
    bg-white
    px-6
    py-3
    font-semibold
    text-black
    shadow-md
    animate-pulse
    hover:animate-none
    hover:scale-105
    transition
  "
                  >
                    Watch Highlight
                    <span
                      className="
    inline-block
    transition-transform
    duration-300
    group-hover:translate-x-1
  "
                    >
                      →
                    </span>
                  </button>
                </Link>
              </div>

              <div className="h-64 md:h-96 overflow-hidden bg-gray-200 mt-5 rounded-lg">
                <img
                  src={campaign.headerImage}
                  alt={campaign.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>


            <div className="p-8 md:p-10 space-y-12">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font text-gray-900">ABOUT EVENT</h2>
                </div>
                <div className="flex flex-col lg:flex-row items-start gap-8">
                  <div className="w-full lg:w-3/5">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{campaign.objective}</h3>
                    <ul className="space-y-3">
                      {campaign.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-600">
                          <div className={`w-6 h-6 flex items-center justify-center rounded-md bg-gradient-to-r `}>
                            <img
                              src={iconsArray[index % iconsArray.length]}
                              alt="icon"
                              className="w-5 h-5"
                            />
                          </div>

                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full lg:w-2/5">
                    <img
                      src={campaign.featuredImage}
                      alt={campaign.name}
                      className="w-full h-auto rounded-lg object-cover"
                    />
                  </div>
                </div>

              </div>

              <div>

                <div className={`bg-gradient-to-r ${campaign.color} text-white rounded-2xl p-8 `}
                  style={{
                    backgroundImage: `url('/images/Background.svg')`,
                    backgroundSize: "contain",
                    // backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}>
                  <h3 className="text-2xl font-bold mb-8 text-center">Impact of this campaign</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {campaign.impact.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                        <div className="text-sm opacity-90">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-4 flex-wrap lg:flex-nowrap">
                {/* LEFT SECTION */}
                <div className="flex flex-col items-start gap-3 mb-2 w-full lg:w-auto">
                  <h2 className="text-2xl font-bold text-gray-900">OUR PARTNERS</h2>
                  <p className="text-gray-600 mb-8">
                    These partners supported this campaign through resources, expertise, and vision
                    to reach more teenagers and deliver stronger impact.
                  </p>
                </div>

                {/* RIGHT SECTION - 60% width on large screens */}
                <div className="w-full lg:w-[140%] grid grid-cols-2 md:grid-cols-4 gap-4">
                  {campaign.partners.map((partner, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                    >
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        width={150}
                        height={150}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>


              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font text-gray-900">GALLERY</h2>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Moments from the Event</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {campaign.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-lg overflow-hidden bg-gray-200 hover:shadow-lg transition-shadow"
                      >
                        <img
                          src={image}
                          alt={`Moment ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
