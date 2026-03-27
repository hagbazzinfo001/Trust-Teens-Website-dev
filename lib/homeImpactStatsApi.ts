// // ─── Home Impact Stats API Service ────────────────────────────────────
// // Wraps the trustteens backend endpoints for the Home Impact Stats
// // Endpoint: /api/v1/impact-stats

// const BASE = 'https://trustteens-api.onrender.com/api/v1/impact-stats';

// // ─── Types (backend shapes) ─────────────────────────────────────────

// export interface ApiHomeImpactStat {
//     id?: number | string;
//     _id?: string;
//     statNumber: string;
//     statTitle: string;
//     position: number;
// }

// type Headers = Record<string, string>;

// // ─── Helper ─────────────────────────────────────────────────────────

// async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
//     const res = await fetch(url, init);
//     if (!res.ok) {
//         const body = await res.text().catch(() => '');
//         throw new Error(`API ${init?.method ?? 'GET'} ${url} → ${res.status}: ${body}`);
//     }
//     const text = await res.text();
//     return text ? (JSON.parse(text) as T) : (undefined as unknown as T);
// }

// // ═══════════════════════════════════════════════════════════════════════
// // HOME IMPACT STATS
// // ═══════════════════════════════════════════════════════════════════════

// export async function fetchHomeImpactStats(): Promise<ApiHomeImpactStat[]> {
//     return apiFetch<ApiHomeImpactStat[]>(`${BASE}`);
// }

// export async function createHomeImpactStat(
//     data: Omit<ApiHomeImpactStat, 'id' | '_id'>,
//     headers: Headers,
// ): Promise<ApiHomeImpactStat> {
//     return apiFetch<ApiHomeImpactStat>(`${BASE}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', ...headers },
//         body: JSON.stringify(data),
//     });
// }

// export async function updateHomeImpactStat(
//     id: number | string,
//     data: Omit<ApiHomeImpactStat, 'id' | '_id'>,
//     headers: Headers,
// ): Promise<void> {
//     await apiFetch(`${BASE}/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json', ...headers },
//         body: JSON.stringify(data),
//     });
// }

// export async function deleteHomeImpactStat(id: number | string, headers: Headers): Promise<void> {
//     await apiFetch(`${BASE}/${id}`, {
//         method: 'DELETE',
//         headers: { ...headers },
//     });
// }






















import { apiFetch } from '@/lib/apiFetch';

const BASE = 'https://trustteens-api.onrender.com/api/v1/impact-stats';

// ─── Types (backend shapes) ─────────────────────────────────────────

export interface ApiHomeImpactStat {
    id?: number | string;
    _id?: string;
    statNumber: string;
    statTitle: string;
    position: number;
}

// ═══════════════════════════════════════════════════════════════════════
// HOME IMPACT STATS
// ═══════════════════════════════════════════════════════════════════════

export async function fetchHomeImpactStats(): Promise<ApiHomeImpactStat[]> {
    return apiFetch<ApiHomeImpactStat[]>(`${BASE}`);
}

export async function createHomeImpactStat(
    data: Omit<ApiHomeImpactStat, 'id' | '_id'>
): Promise<ApiHomeImpactStat> {
    return apiFetch<ApiHomeImpactStat>(`${BASE}`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function updateHomeImpactStat(
    id: number | string,
    data: Omit<ApiHomeImpactStat, 'id' | '_id'>
): Promise<void> {
    await apiFetch(`${BASE}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

export async function deleteHomeImpactStat(id: number | string): Promise<void> {
    await apiFetch(`${BASE}/${id}`, {
        method: 'DELETE',
    });
}
