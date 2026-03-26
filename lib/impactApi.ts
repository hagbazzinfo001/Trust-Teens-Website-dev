// ─── Impact API Service ───────────────────────────────────────────
// Wraps the trustteens backend endpoints for the Impact Page

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
// HERO SECTION
// ═══════════════════════════════════════════════════════════════════════

export async function fetchImpactHero(): Promise<ApiImpactHero> {
    return apiFetch<ApiImpactHero>(`${BASE}/hero`);
}

export async function updateImpactHero(
    data: ApiImpactHero,
    headers: Headers,
): Promise<void> {
    await apiFetch(`${BASE}/hero`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...headers },
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
    data: Omit<ApiImpactMetric, 'id'>,
    headers: Headers,
): Promise<ApiImpactMetric> {
    return apiFetch<ApiImpactMetric>(`${BASE}/stats-grid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}

export async function updateImpactMetric(
    id: number,
    data: Omit<ApiImpactMetric, 'id'>,
    headers: Headers,
): Promise<void> {
    await apiFetch(`${BASE}/stats-grid/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}

export async function deleteImpactMetric(id: number, headers: Headers): Promise<void> {
    await apiFetch(`${BASE}/stats-grid/${id}`, {
        method: 'DELETE',
        headers: { ...headers },
    });
}

// ═══════════════════════════════════════════════════════════════════════
// FEATURED VIDEO
// ═══════════════════════════════════════════════════════════════════════

export async function fetchImpactVideo(): Promise<ApiImpactVideo> {
    return apiFetch<ApiImpactVideo>(`${BASE}/featured-video`);
}

export async function updateImpactVideo(
    data: ApiImpactVideo,
    headers: Headers,
): Promise<void> {
    await apiFetch(`${BASE}/featured-video`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}
