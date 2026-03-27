import { apiFetch } from '@/lib/apiFetch';

const BASE = 'https://trustteens-api.onrender.com/api/v1/missions';

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
