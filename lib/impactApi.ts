import { apiFetch } from '@/lib/apiFetch';

const BASE = 'https://trustteens-api.onrender.com/api/v1/impact';

// ─── Types (backend shapes) ─────────────────────────────────────────

export interface ApiImpactHero {
    totalImpactNumber: string;
    heroBodyText: string;
    heroImages: string[];
}

export interface ApiImpactMetric {
    id: number;
    metricValue: string;
    metricLabel: string;
}

export interface ApiImpactVideo {
    videoUrl: string;
    videoDescription: string;
}

// ═══════════════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════════════

export async function fetchImpactHero(): Promise<ApiImpactHero> {
    return apiFetch<ApiImpactHero>(`${BASE}/hero`);
}

export async function updateImpactHero(
    data: ApiImpactHero
): Promise<void> {
    await apiFetch(`${BASE}/hero`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

// ═══════════════════════════════════════════════════════════════════════
// METRICS GRID
// ═══════════════════════════════════════════════════════════════════════

export async function fetchImpactMetrics(): Promise<ApiImpactMetric[]> {
    return apiFetch<ApiImpactMetric[]>(`${BASE}/stats-grid`);
}

export async function createImpactMetric(
    data: Omit<ApiImpactMetric, 'id'>
): Promise<ApiImpactMetric> {
    return apiFetch<ApiImpactMetric>(`${BASE}/stats-grid`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function updateImpactMetric(
    id: number,
    data: Omit<ApiImpactMetric, 'id'>
): Promise<void> {
    await apiFetch(`${BASE}/stats-grid/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

export async function deleteImpactMetric(id: number): Promise<void> {
    await apiFetch(`${BASE}/stats-grid/${id}`, {
        method: 'DELETE',
    });
}

// ═══════════════════════════════════════════════════════════════════════
// FEATURED VIDEO
// ═══════════════════════════════════════════════════════════════════════

export async function fetchImpactVideo(): Promise<ApiImpactVideo> {
    return apiFetch<ApiImpactVideo>(`${BASE}/featured-video`);
}

export async function updateImpactVideo(
    data: ApiImpactVideo
): Promise<void> {
    await apiFetch(`${BASE}/featured-video`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}
