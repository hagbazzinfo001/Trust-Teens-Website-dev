import { apiFetch } from '@/lib/apiFetch';

const BASE = 'https://trustteens-api.onrender.com/api/v1/missions';

// ─── Types (backend shapes) ─────────────────────────────────────────

export interface ApiImpactStat {
    id: number;
    statNumber: string;
    statLabel: string;
    position: number;
}

export interface ApiPastConference {
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
// PAST CONFERENCES (reuses past-campaigns endpoints)
// ═══════════════════════════════════════════════════════════════════════

export async function fetchPastConferences(): Promise<ApiPastConference[]> {
    return apiFetch<ApiPastConference[]>(`${BASE}/past-campaigns/all`);
}

export async function createPastConference(
    data: { campaignTitle: string; campaignDate: string; campaignImage: string; isActive: boolean }
): Promise<void> {
    await apiFetch(`${BASE}/past-campaigns`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function updatePastConference(
    id: number,
    data: { campaignTitle: string; campaignDate: string; campaignImage: string; isActive: boolean }
): Promise<void> {
    await apiFetch(`${BASE}/past-campaigns/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

export async function deletePastConference(id: number): Promise<void> {
    await apiFetch(`${BASE}/past-campaigns/${id}`, {
        method: 'DELETE',
    });
}

// ═══════════════════════════════════════════════════════════════════════
// UPCOMING CONFERENCE (reuses upcoming endpoint)
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
