import { apiFetch } from '@/lib/apiFetch';

const BASE = '/api/v1/conferences';

// ─── Types (backend shapes) ─────────────────────────────────────────

export interface ApiImpactStat {
    id: number;
    statNumber: string;
    statLabel: string;
    position: number;
}

export interface ApiPastConference {
    id: number;
    conferenceTitle: string;
    conferenceDate: string;
    conferenceImage: string;
}

export interface ApiUpcoming {
    id: number;
    isActive: boolean;
    conferenceName: string;
    description: string;
    dateTime: string;
    location: string;
    registerUrl: string;
    promoImage: string;
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

export interface ApiConferenceDetail {
    id: number;
    conferenceName: string;
    conferenceSummary: string;
    heroMainImage: string;
    aboutTextBody: string;
    aboutSideImage: string;
    eventHighlights: string[];
    impactMetrics: { id: number; impactValue: string; impactLabel: string }[];
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
// PAST CONFERENCES
// ═══════════════════════════════════════════════════════════════════════

export async function fetchPastConferences(): Promise<ApiPastConference[]> {
    return apiFetch<ApiPastConference[]>(`${BASE}/past`);
}

export async function createPastConference(
    data: { conferenceTitle: string; conferenceDate: string; conferenceImage: string }
): Promise<void> {
    await apiFetch(`${BASE}/past`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function updatePastConference(
    id: number,
    data: { conferenceTitle?: string; conferenceDate?: string; conferenceImage?: string; isActive?: boolean }
): Promise<void> {
    await apiFetch(`${BASE}/past/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

export async function deletePastConference(id: number): Promise<void> {
    await apiFetch(`${BASE}/past/${id}`, {
        method: 'DELETE',
    });
}

// ═══════════════════════════════════════════════════════════════════════
// UPCOMING CONFERENCE
// ═══════════════════════════════════════════════════════════════════════

export async function fetchUpcoming(): Promise<ApiUpcoming> {
    return apiFetch<ApiUpcoming>(`${BASE}/upcoming`);
}

export async function updateUpcoming(
    data: Partial<ApiUpcoming>
): Promise<void> {
    await apiFetch(`${BASE}/upcoming`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

// ═══════════════════════════════════════════════════════════════════════
// INDIVIDUAL CONFERENCE DETAILS (RECAP)
// ═══════════════════════════════════════════════════════════════════════

export async function getConferenceById(id: number): Promise<ApiConferenceDetail> {
    return apiFetch<ApiConferenceDetail>(`${BASE}/${id}`);
}

export async function updateConferenceRecap(id: number, data: Partial<ApiConferenceDetail>): Promise<void> {
    await apiFetch(`${BASE}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

// ─── Speakers ───
export async function getSpeakersByConference(id: number): Promise<ApiSpeaker[]> {
    return apiFetch<ApiSpeaker[]>(`${BASE}/${id}/speakers`);
}

export async function addSpeakerToConference(id: number, data: Omit<ApiSpeaker, 'id'>): Promise<void> {
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
export async function getPartnersByConference(id: number): Promise<ApiPartner[]> {
    return apiFetch<ApiPartner[]>(`${BASE}/${id}/partners`);
}

export async function addPartnerToConference(id: number, data: { partnerLogo: string }): Promise<void> {
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
export async function getGalleryByConference(id: number): Promise<ApiGalleryImage[]> {
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
