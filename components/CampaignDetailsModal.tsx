'use client';

import { CompleteCampaign } from '@/lib/campaignsApi';
import { X } from 'lucide-react';
import Link from 'next/link';

interface CampaignDetailsModalProps {
  campaign: CompleteCampaign | null;
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
              <div className="space-y-4 ml-0 md:ml-[50%] transform md:-translate-x-1/2 w-full md:w-3/5 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold">{campaign.campaignName}</h1>
                <p className="text-lg opacity-90">{campaign.shortDescription || campaign.aboutTextBody}</p>

                {campaign.heroVideoUrl && (
                  <Link href={campaign.heroVideoUrl} target="_blank">
                    <button
                      className="rounded-xl bg-white px-6 py-3 font-semibold text-black shadow-md animate-pulse hover:animate-none hover:scale-105 transition"
                    >
                      Watch Highlight
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-2">
                        →
                      </span>
                    </button>
                  </Link>
                )}
              </div>

              <div className="h-64 md:h-96 overflow-hidden bg-gray-200 mt-5 rounded-lg">
                <img
                  src={campaign.coverImage}
                  alt={campaign.campaignName}
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
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Mission & Objectives</h3>
                    <p className="text-lg opacity-95 mb-6 leading-relaxed">
                      {campaign.aboutTextBody}
                    </p>
                    <ul className="space-y-3">
                      {campaign.actionItems.map((objective, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-600">
                          <div className="w-6 h-6 flex items-center justify-center rounded-md shrink-0">
                            <img
                              src={iconsArray[index % iconsArray.length]}
                              alt="icon"
                              className="w-5 h-5 object-contain"
                            />
                          </div>
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full lg:w-2/5">
                    <img
                      src={campaign.aboutSideImage || campaign.coverImage}
                      alt={campaign.campaignName}
                      className="w-full h-auto rounded-lg object-cover shadow-md"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-8"
                  style={{
                    backgroundImage: `url('/images/Background.svg')`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                  }}>
                  <h3 className="text-2xl font-bold mb-8 text-center">Impact of this campaign</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {campaign.impactMetrics.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl md:text-4xl font-bold mb-2">{stat.impactValue}</div>
                        <div className="text-sm opacity-90 uppercase tracking-wider">{stat.impactLabel}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-4 flex-wrap lg:flex-nowrap">
                <div className="flex flex-col items-start gap-3 mb-2 w-full lg:w-auto">
                  <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">OUR PARTNERS</h2>
                  <p className="text-gray-600 mb-8 max-w-md">
                    These partners supported this campaign through resources, expertise, and vision
                    to reach more teenagers and deliver stronger impact.
                  </p>
                </div>

                <div className="w-full lg:w-[140%] grid grid-cols-2 md:grid-cols-4 gap-4">
                  {campaign.partners.map((partner, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors bg-white shadow-sm"
                    >
                      <img
                        src={partner.partnerLogo}
                        alt="Partner Logo"
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
                  <h2 className="text-2xl font text-gray-900 uppercase tracking-wide">GALLERY</h2>
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
                          src={image.imageUrl}
                          alt={`Moment ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
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

