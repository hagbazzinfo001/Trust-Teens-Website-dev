// ─── Summits API Service ─────────────────────────────────────────────
// Wraps the trustteens backend endpoints for Impact Stats, Past Campaigns
// (used as past summits), and Upcoming Mission (used as upcoming summit).
// The backend uses the same /missions/ endpoints for all mission subtypes.

const BASE = 'https://trustteens-api.onrender.com/api/v1/missions';

// ─── Types (backend shapes) ─────────────────────────────────────────

export interface ApiImpactStat {
    id: number;
    statNumber: string;
    statLabel: string;
    position: number;
}

export interface ApiPastSummit {
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

type Headers = Record<string, string>;

// ─── Helper ─────────────────────────────────────────────────────────

async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
    const res = await fetch(url, init);
    if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`API ${init?.method ?? 'GET'} ${url} → ${res.status}: ${body}`);
    }
    const text = await res.text();
    return text ? (JSON.parse(text) as T) : (undefined as unknown as T);
}

// ═══════════════════════════════════════════════════════════════════════
// IMPACT STATS  (same endpoints as campaigns — shared resource)
// ═══════════════════════════════════════════════════════════════════════

export async function fetchImpactStats(): Promise<ApiImpactStat[]> {
    return apiFetch<ApiImpactStat[]>(`${BASE}/impact-stats`);
}

export async function createImpactStat(
    data: { statNumber: string; statLabel: string; position: number },
    headers: Headers,
): Promise<void> {
    await apiFetch(`${BASE}/impact-stats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}

export async function updateImpactStat(
    id: number,
    data: { statNumber: string; statLabel: string; position: number },
    headers: Headers,
): Promise<void> {
    await apiFetch(`${BASE}/impact-stats/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}

export async function deleteImpactStat(id: number, headers: Headers): Promise<void> {
    await apiFetch(`${BASE}/impact-stats/${id}`, {
        method: 'DELETE',
        headers: { ...headers },
    });
}

// ═══════════════════════════════════════════════════════════════════════
// PAST SUMMITS  (reuses past-campaigns endpoints)
// ═══════════════════════════════════════════════════════════════════════

export async function fetchPastSummits(): Promise<ApiPastSummit[]> {
    return apiFetch<ApiPastSummit[]>(`${BASE}/past-campaigns/all`);
}

export async function createPastSummit(
    data: { campaignTitle: string; campaignDate: string; campaignImage: string; isActive: boolean },
    headers: Headers,
): Promise<void> {
    await apiFetch(`${BASE}/past-campaigns`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}

export async function updatePastSummit(
    id: number,
    data: { campaignTitle: string; campaignDate: string; campaignImage: string; isActive: boolean },
    headers: Headers,
): Promise<void> {
    await apiFetch(`${BASE}/past-campaigns/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}

export async function deletePastSummit(id: number, headers: Headers): Promise<void> {
    await apiFetch(`${BASE}/past-campaigns/${id}`, {
        method: 'DELETE',
        headers: { ...headers },
    });
}

// ═══════════════════════════════════════════════════════════════════════
// UPCOMING SUMMIT  (reuses upcoming endpoint)
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
    },
    headers: Headers,
): Promise<void> {
    await apiFetch(`${BASE}/upcoming`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}
