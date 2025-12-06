'use client';

import { Campaign } from '@/lib/mockCampaigns';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CampaignDetailsModalProps {
  campaign: Campaign | null;
  onClose: () => void;
}

export default function CampaignDetailsModal({ campaign, onClose }: CampaignDetailsModalProps) {
  if (!campaign) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden">
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
            >
              <X size={24} />
            </button>

            <div className={`bg-gradient-to-r ${campaign.color} text-white p-8 md:p-12`}>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold">{campaign.name}</h1>
                <p className="text-lg opacity-90">{campaign.fullDescription}</p>
              </div>
            </div>

            <div className="h-64 md:h-96 overflow-hidden bg-gray-200">
              <img
                src={campaign.headerImage}
                alt={campaign.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8 md:p-12 space-y-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-1 h-8 bg-gradient-to-b ${campaign.color}`}></div>
                  <h2 className="text-2xl font-bold text-gray-900">ABOUT EVENT</h2>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{campaign.objective}</h3>
                  <ul className="space-y-3">
                    {campaign.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-600">
                        <div className={`w-2 h-2 rounded-full mt-2 bg-gradient-to-r ${campaign.color}`}></div>
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className={`w-1 h-8 bg-gradient-to-b ${campaign.color}`}></div>
                  <h2 className="text-2xl font-bold text-gray-900">IMPACT</h2>
                </div>
                <div className={`bg-gradient-to-r ${campaign.color} text-white rounded-2xl p-8`}>
                  <h3 className="text-2xl font-bold mb-8">Impact of this campaign</h3>
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

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-1 h-8 bg-gradient-to-b ${campaign.color}`}></div>
                  <h2 className="text-2xl font-bold text-gray-900">OUR PARTNERS</h2>
                </div>
                <p className="text-gray-600 mb-8">
                  These partners supported this campaign through resources, expertise, and vision to reach more teenagers and deliver stronger impact.
                </p>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
                  {campaign.partners.map((partner, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-2xl"
                    >
                      {partner.logo}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className={`w-1 h-8 bg-gradient-to-b ${campaign.color}`}></div>
                  <h2 className="text-2xl font-bold text-gray-900">GALLERY</h2>
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
