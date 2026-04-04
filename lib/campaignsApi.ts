import { apiFetch } from '@/lib/apiFetch';

const BASE = 'https://trustteens-api.onrender.com/api/v1/missions';
const DETAIL_BASE = 'https://trustteens-api.onrender.com/api/v1/campaigns';

// ─── Types (backend shapes) ─────────────────────────────────────────

export interface ApiImpactStat {
    id: number;
    statNumber: string;
    statLabel: string;
    position: number;
}

export interface ApiPastCampaign {
    id: number;
    campaignTitle: string;
    campaignDate: string;
    campaignImage: string;
    isActive: boolean;
}

export interface ApiUpcoming {
    id: number;
    missionTitle: string;
    missionDate: string;
    missionLink: string;
    missionDescription: string;
    missionImage: string;
}

export interface ApiCampaignImpact {
    id: number;
    impactValue: string;
    impactLabel: string;
}

export interface ApiCampaignDetail {
    campaignName: string;
    shortDescription: string;
    heroVideoUrl: string;
    coverImage: string;
    aboutTextBody: string;
    aboutSideImage: string;
    actionItems: string[];
    impactMetrics: ApiCampaignImpact[];
}

export interface ApiCampaignPartner {
    id: number;
    partnerLogo: string;
}

export interface ApiCampaignGallery {
    id: number;
    imageUrl: string;
}

export interface CompleteCampaign extends ApiCampaignDetail {
    id: number;
    date: string;
    partners: ApiCampaignPartner[];
    gallery: ApiCampaignGallery[];
}

// ═══════════════════════════════════════════════════════════════════════
// IMPACT STATS
// ═══════════════════════════════════════════════════════════════════════

export async function fetchImpactStats(): Promise<ApiImpactStat[]> {
    return apiFetch<ApiImpactStat[]>(`${BASE}/impact-stats`);
}

export async function createImpactStat(
    data: { statNumber: string; statLabel: string; position: number }
): Promise<void> {
    await apiFetch(`${BASE}/impact-stats`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function updateImpactStat(
    id: number,
    data: { statNumber: string; statLabel: string; position: number }
): Promise<void> {
    await apiFetch(`${BASE}/impact-stats/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

export async function deleteImpactStat(id: number): Promise<void> {
    await apiFetch(`${BASE}/impact-stats/${id}`, {
        method: 'DELETE',
    });
}

// ═══════════════════════════════════════════════════════════════════════
// PAST CAMPAIGNS
// ═══════════════════════════════════════════════════════════════════════

export async function fetchPastCampaigns(): Promise<ApiPastCampaign[]> {
    return apiFetch<ApiPastCampaign[]>(`${BASE}/past-campaigns/all`);
}

export async function createPastCampaign(
    data: { campaignTitle: string; campaignDate: string; campaignImage: string; isActive: boolean }
): Promise<void> {
    await apiFetch(`${BASE}/past-campaigns`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function updatePastCampaign(
    id: number,
    data: { campaignTitle: string; campaignDate: string; campaignImage: string; isActive: boolean }
): Promise<void> {
    await apiFetch(`${BASE}/past-campaigns/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

export async function deletePastCampaign(id: number): Promise<void> {
    await apiFetch(`${BASE}/past-campaigns/${id}`, {
        method: 'DELETE',
    });
}

// ═══════════════════════════════════════════════════════════════════════
// UPCOMING MISSION
// ═══════════════════════════════════════════════════════════════════════

export async function fetchUpcoming(): Promise<ApiUpcoming> {
    return apiFetch<ApiUpcoming>(`${BASE}/upcoming`);
}

export async function updateUpcoming(
    data: {
        missionTitle: string;
        missionDate: string;
        missionLink: string;
        missionDescription: string;
        missionImage: string;
    }
): Promise<void> {
    await apiFetch(`${BASE}/upcoming`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

// ═══════════════════════════════════════════════════════════════════════
// INDIVIDUAL CAMPAIGN DETAILS
// ═══════════════════════════════════════════════════════════════════════

export async function getCampaignById(id: number): Promise<ApiCampaignDetail | null> {
    return apiFetch<ApiCampaignDetail>(`${DETAIL_BASE}/${id}`);
}

export async function updateCampaignDetail(id: number, data: ApiCampaignDetail): Promise<void> {
    await apiFetch(`${DETAIL_BASE}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

// Partners
export async function getPartnersByCampaign(campaignId: number): Promise<ApiCampaignPartner[]> {
    return apiFetch<ApiCampaignPartner[]>(`${DETAIL_BASE}/${campaignId}/partners`) || [];
}

export async function addPartnerToCampaign(campaignId: number, data: { partnerLogo: string }): Promise<void> {
    await apiFetch(`${DETAIL_BASE}/${campaignId}/partners`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function deletePartnerFromCampaign(campaignId: number, partnerId: number): Promise<void> {
    await apiFetch(`${DETAIL_BASE}/${campaignId}/partners/${partnerId}`, {
        method: 'DELETE',
    });
}

// Gallery
export async function getGalleryByCampaign(campaignId: number): Promise<ApiCampaignGallery[]> {
    return apiFetch<ApiCampaignGallery[]>(`${DETAIL_BASE}/${campaignId}/gallery`) || [];
}

export async function addGalleryToCampaign(campaignId: number, data: { imageUrl: string }): Promise<void> {
    await apiFetch(`${DETAIL_BASE}/${campaignId}/gallery`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function deleteGalleryFromCampaign(campaignId: number, imageId: number): Promise<void> {
    await apiFetch(`${DETAIL_BASE}/${campaignId}/gallery/${imageId}`, {
        method: 'DELETE',
    });
}
