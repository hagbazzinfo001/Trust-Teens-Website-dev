import { apiFetch } from '@/lib/apiFetch';

const BASE = 'https://trustteens-api.onrender.com/api/v1/summits';

// ─── Types (backend shapes) ─────────────────────────────────────────

export interface ApiImpactStat {
    id: number;
    statNumber: string;
    statLabel: string;
    position: number;
}

export interface ApiPastSummit {
    id: number;
    summitTitle: string;
    summitDate: string;
    summitImage: string;
}

export interface ApiUpcoming {
    id: number;
    isActive: boolean;
    summitName: string;
    description: string;
    dateTime: string;
    location: string;
    registerUrl: string;
}

export interface ApiSpeaker {
    id: number;
    speakerName: string;
    speakerRole: string;
    speakerImage: string;
}

export interface ApiPartner {
    id: number;
    partnerLogo: string;
}

export interface ApiGalleryImage {
    id: number;
    imageUrl: string;
}

export interface ApiSummitDetail {
    id: number;
    summitName: string;
    shortDescription: string;
    heroVideoUrl: string;
    coverImage: string;
    aboutTextBody: string;
    eventSideImage: string;
    eventHighlights: string[];
    impactMetrics: { id: number; impactValue: string; impactLabel: string }[];
}

// ═══════════════════════════════════════════════════════════════════════
// IMPACT STATS (shared from missions/campaigns style)
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
// PAST SUMMITS
// ═══════════════════════════════════════════════════════════════════════

export async function fetchPastSummits(): Promise<ApiPastSummit[]> {
    return apiFetch<ApiPastSummit[]>(`${BASE}/past`);
}

export async function createPastSummit(
    data: { summitTitle: string; summitDate: string; summitImage: string }
): Promise<void> {
    await apiFetch(`${BASE}/past`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function updatePastSummit(
    id: number,
    data: { summitTitle: string; summitDate: string; summitImage: string }
): Promise<void> {
    await apiFetch(`${BASE}/past/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

export async function deletePastSummit(id: number): Promise<void> {
    await apiFetch(`${BASE}/past/${id}`, {
        method: 'DELETE',
    });
}

// ═══════════════════════════════════════════════════════════════════════
// UPCOMING SUMMIT
// ═══════════════════════════════════════════════════════════════════════

export async function fetchUpcoming(): Promise<ApiUpcoming> {
    return apiFetch<ApiUpcoming>(`${BASE}/upcoming`);
}

export async function updateUpcoming(
    data: Partial<ApiUpcoming>
): Promise<void> {
    await apiFetch(`${BASE}/upcoming`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

// ═══════════════════════════════════════════════════════════════════════
// INDIVIDUAL SUMMIT DETAILS (RECAP)
// ═══════════════════════════════════════════════════════════════════════

export async function getSummitById(id: number): Promise<ApiSummitDetail> {
    return apiFetch<ApiSummitDetail>(`${BASE}/${id}`);
}

export async function updateSummitDetail(id: number, data: Partial<ApiSummitDetail>): Promise<void> {
    await apiFetch(`${BASE}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

// ─── Speakers ───
export async function getSpeakersBySummit(id: number): Promise<ApiSpeaker[]> {
    return apiFetch<ApiSpeaker[]>(`${BASE}/${id}/speakers`);
}

export async function addSpeakerToSummit(id: number, data: Omit<ApiSpeaker, 'id'>): Promise<void> {
    await apiFetch(`${BASE}/${id}/speakers`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function updateSpeaker(id: number, speakerId: number, data: Omit<ApiSpeaker, 'id'>): Promise<void> {
    await apiFetch(`${BASE}/${id}/speakers/${speakerId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

export async function deleteSpeaker(id: number, speakerId: number): Promise<void> {
    await apiFetch(`${BASE}/${id}/speakers/${speakerId}`, {
        method: 'DELETE',
    });
}

// ─── Partners ───
export async function getPartnersBySummit(id: number): Promise<ApiPartner[]> {
    return apiFetch<ApiPartner[]>(`${BASE}/${id}/partners`);
}

export async function addPartnerToSummit(id: number, data: { partnerLogo: string }): Promise<void> {
    await apiFetch(`${BASE}/${id}/partners`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function deletePartner(id: number, partnerId: number): Promise<void> {
    await apiFetch(`${BASE}/${id}/partners/${partnerId}`, {
        method: 'DELETE',
    });
}

// ─── Gallery ───
export async function getGalleryBySummit(id: number): Promise<ApiGalleryImage[]> {
    return apiFetch<ApiGalleryImage[]>(`${BASE}/${id}/gallery`);
}

export async function addGalleryImage(id: number, data: { imageUrl: string }): Promise<void> {
    await apiFetch(`${BASE}/${id}/gallery`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function deleteGalleryImage(id: number, imageId: number): Promise<void> {
    await apiFetch(`${BASE}/${id}/gallery/${imageId}`, {
        method: 'DELETE',
    });
}
