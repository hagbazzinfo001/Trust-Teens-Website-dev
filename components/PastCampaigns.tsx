'use client';

import { useState, useEffect } from 'react';
import { mockCampaigns, Campaign } from '@/lib/mockCampaigns';
import CampaignDetailsModal from '@/components/CampaignDetailsModal';
import { ChevronRight } from 'lucide-react';
import { getPastCampaigns, getCampaignDetail } from '@/lib/adminData';

export default function PastCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [featuredCampaign, setFeaturedCampaign] = useState<Campaign>(mockCampaigns[0]);

  useEffect(() => {
    const adminPast = getPastCampaigns();
    if (adminPast && adminPast.length > 0) {
      const converted: Campaign[] = adminPast.map(cp => ({
        id: cp.campaign_id.toString(),
        name: cp.campaign_title,
        date: cp.campaign_date,
        description: cp.campaign_title, // Placeholder until full detail is loaded
        fullDescription: cp.campaign_title,
        objective: 'What we did',
        objectives: [],
        featuredImage: cp.campaign_image,
        headerImage: cp.campaign_image,
        impact: [],
        partners: [],
        gallery: [],
        color: 'from-orange-500 to-orange-600'
      }));
      setCampaigns(converted);
      setFeaturedCampaign(converted[0]);
    }
  }, []);

  // Effect to load full details for the featured campaign if it's from admin
  useEffect(() => {
    if (featuredCampaign && featuredCampaign.objectives.length === 0) {
      const detail = getCampaignDetail(featuredCampaign.id);
      if (detail) {
        setFeaturedCampaign(prev => ({
          ...prev,
          name: detail.campaign_name,
          description: detail.short_description,
          fullDescription: detail.about_text_body,
          objectives: detail.action_items,
          featuredImage: detail.about_side_image || prev.featuredImage,
          headerImage: detail.about_side_image || prev.headerImage, // Modal uses headerImage
          impact: detail.impact.map(s => ({ label: s.stat_label, value: parseInt(s.stat_number) || 0 })),
          partners: detail.partners.map(p => ({ name: p.name, logo: p.logo })),
          gallery: detail.gallery
        }));
      }
    }
  }, [featuredCampaign.id]);

  return (
    <>
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-sm font-semibold text-gray-600 mb-2">PAST CAMPAIGNS</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore all our previous campaigns and the impact behind each one.
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 space-y-3">
              {campaigns.map((campaign) => (
                <button
                  key={campaign.id}
                  onClick={() => setFeaturedCampaign(campaign)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 group ${featuredCampaign.id === campaign.id
                    ? `bg-orange-300 text-black shadow-lg`
                    : 'bg-white-500 text-gray-900 hover:bg-orange-500'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-black">{campaign.name}</h3>
                      <p className={`text-sm ${featuredCampaign.id === campaign.id
                        ? 'opacity-90'
                        : 'text-gray-600'
                        }`}>
                        {campaign.date}
                      </p>
                    </div>
                    {featuredCampaign.id === campaign.id && (
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
                  onClick={() => setSelectedCampaign(featuredCampaign)}
                >
                  <img
                    src={featuredCampaign.featuredImage}
                    alt={featuredCampaign.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <button
                  onClick={() => setSelectedCampaign(featuredCampaign)}
                  className={`w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-between group`}
                >
                  <span>View Full Campaign Details</span>
                  <ChevronRight size={30} className="group-hover:translate-x-1 transition-transform " />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CampaignDetailsModal
        campaign={selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
      />
    </>
  );
}
