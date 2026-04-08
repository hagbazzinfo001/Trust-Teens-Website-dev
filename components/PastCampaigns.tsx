'use client';

import { useState, useEffect, useCallback } from 'react';
import CampaignDetailsModal from '@/components/CampaignDetailsModal';
import { ChevronRight, Loader2 } from 'lucide-react';
import { 
    fetchPastCampaigns, 
    getCampaignById, 
    getPartnersByCampaign, 
    getGalleryByCampaign, 
    ApiPastCampaign, 
    CompleteCampaign 
} from '@/lib/campaignsApi';

export default function PastCampaigns() {
    const [campaigns, setCampaigns] = useState<ApiPastCampaign[]>([]);
    const [selectedCampaign, setSelectedCampaign] = useState<CompleteCampaign | null>(null);
    const [featuredCampaign, setFeaturedCampaign] = useState<CompleteCampaign | null>(null);
    const [loading, setLoading] = useState(true);

    const loadProjects = useCallback(async () => {
        setLoading(true);
        try {
            const apiCampaigns = await fetchPastCampaigns();
            if (apiCampaigns) {
                setCampaigns(apiCampaigns);
                if (apiCampaigns.length > 0) {
                    await loadDetail(apiCampaigns[0].id!);
                }
            }
        } catch (err) {
            console.error('Failed to load past campaigns', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const loadDetail = async (id: number) => {
        try {
            const detail = await getCampaignById(id);
            if (detail) {
                const [partners, gallery] = await Promise.all([
                    getPartnersByCampaign(id),
                    getGalleryByCampaign(id)
                ]);

                const complete: CompleteCampaign = {
                    ...detail,
                    id,
                    date: campaigns.find(p => p.id === id)?.campaignDate || '',
                    partners,
                    gallery
                };
                setFeaturedCampaign(complete);
            }
        } catch (err) {
            console.error('Failed to load campaign detail', err);
        }
    };

    useEffect(() => {
        loadProjects();
    }, [loadProjects]);

    const handleSelectFeatured = async (p: ApiPastCampaign) => {
        if (p.id) {
            await loadDetail(p.id);
        }
    };

    const handleOpenModal = () => {
        if (featuredCampaign) {
            setSelectedCampaign(featuredCampaign);
        }
    };

    if (loading) {
        return (
            <div className="py-20 flex flex-col items-center justify-center text-gray-500">
                <Loader2 className="animate-spin mb-4" size={48} />
                <p>Loading past campaigns...</p>
            </div>
        );
    }

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
                  onClick={() => {
                    if (featuredCampaign?.id === campaign.id) {
                      handleOpenModal();
                    } else {
                      handleSelectFeatured(campaign);
                    }
                  }}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 group ${featuredCampaign?.id === campaign.id
                    ? `bg-orange-300 text-black shadow-lg`
                    : 'bg-white-500 text-gray-900 hover:bg-orange-500'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-black">{campaign.campaignTitle}</h3>
                      <p className={`text-sm ${featuredCampaign?.id === campaign.id
                        ? 'opacity-90'
                        : 'text-gray-600'
                        }`}>
                        {campaign.campaignDate}
                      </p>
                    </div>
                    {featuredCampaign?.id === campaign.id && (
                      <ChevronRight size={20} />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-2">
              {featuredCampaign && (
                <div className="space-y-4">
                  <div
                    className="aspect-video md:aspect-auto md:h-96 rounded-2xl overflow-hidden bg-gray-200 cursor-pointer hover:shadow-lg transition-shadow group"
                    onClick={handleOpenModal}
                  >
                    <img
                      src={featuredCampaign.aboutSideImage || featuredCampaign.coverImage || campaigns.find(c => c.id === featuredCampaign.id)?.campaignImage || "https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764810649/Phone_Mockup_cxmgpl.png"}
                      alt={featuredCampaign.campaignName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <button
                    onClick={handleOpenModal}
                    className={`w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-between group`}
                  >
                    <span>View Full Campaign Details</span>
                    <ChevronRight size={30} className="group-hover:translate-x-1 transition-transform " />
                  </button>
                </div>
              )}
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
