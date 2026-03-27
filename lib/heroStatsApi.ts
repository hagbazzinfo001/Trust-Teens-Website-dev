// // ─── Hero Stats API Service ───────────────────────────────────────────
// // Wraps the trustteens backend endpoints for the Home Hero Stats

// const BASE = 'https://trustteens-api.onrender.com/api/v1/hero-stats';

// // ─── Types (backend shapes) ─────────────────────────────────────────

// export interface ApiHeroStat {
//     id?: number | string;
//     _id?: string;
//     metricValue: string;
//     metricLabel: string;
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
// // HERO STATS
// // ═══════════════════════════════════════════════════════════════════════

// export async function fetchHeroStats(): Promise<ApiHeroStat[]> {
//     return apiFetch<ApiHeroStat[]>(`${BASE}`);
// }

// export async function createHeroStat(
//     data: Omit<ApiHeroStat, 'id' | '_id'>,
//     headers: Headers,
// ): Promise<ApiHeroStat> {
//     return apiFetch<ApiHeroStat>(`${BASE}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', ...headers },
//         body: JSON.stringify(data),
//     });
// }

// export async function updateHeroStat(
//     id: number | string,
//     data: Omit<ApiHeroStat, 'id' | '_id'>,
//     headers: Headers,
// ): Promise<void> {
//     await apiFetch(`${BASE}/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json', ...headers },
//         body: JSON.stringify(data),
//     });
// }

// export async function deleteHeroStat(id: number | string, headers: Headers): Promise<void> {
//     await apiFetch(`${BASE}/${id}`, {
//         method: 'DELETE',
//         headers: { ...headers },
//     });
// }















import { apiFetch } from '@/lib/apiFetch';

const BASE = 'https://trustteens-api.onrender.com/api/v1/hero-stats';

// ─── Types (backend shapes) ─────────────────────────────────────────

export interface ApiHeroStat {
    id?: number | string;
    _id?: string;
    metricValue: string;
    metricLabel: string;
    position: number;
}

// ═══════════════════════════════════════════════════════════════════════
// HERO STATS
// ═══════════════════════════════════════════════════════════════════════

export async function fetchHeroStats(): Promise<ApiHeroStat[]> {
    return apiFetch<ApiHeroStat[]>(`${BASE}`);
}

export async function createHeroStat(
    data: Omit<ApiHeroStat, 'id' | '_id'>
): Promise<ApiHeroStat> {
    return apiFetch<ApiHeroStat>(`${BASE}`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function updateHeroStat(
    id: number | string,
    data: Omit<ApiHeroStat, 'id' | '_id'>
): Promise<void> {
    await apiFetch(`${BASE}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

export async function deleteHeroStat(id: number | string): Promise<void> {
    await apiFetch(`${BASE}/${id}`, {
        method: 'DELETE',
    });
}
