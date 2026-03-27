// ─── Testimonials API Service ─────────────────────────────────────────
// Wraps the trustteens backend endpoints for the Home Testimonials

const BASE = 'https://trustteens-api.onrender.com/api/v1/testimonials';

// ─── Types (backend shapes) ─────────────────────────────────────────

export interface ApiTestimonial {
    id?: number | string;
    _id?: string;
    teenName: string;
    teenAge: string;
    quoteText: string;
    teenImage: string;
}

type Headers = Record<string, string>;

// ─── Helper ─────────────────────────────────────────────────────────

async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
    // const res = await fetch(url, init);
    const token = typeof window !== 'undefined'
        ? localStorage.getItem('admin_access_token')
        : null;

    const res = await fetch(url, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(init?.headers || {}),
        },
    });
    if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`API ${init?.method ?? 'GET'} ${url} → ${res.status}: ${body}`);
    }
    const text = await res.text();
    return text ? (JSON.parse(text) as T) : (undefined as unknown as T);
}

// ═══════════════════════════════════════════════════════════════════════
// TESTIMONIALS
// ═══════════════════════════════════════════════════════════════════════

export async function fetchTestimonials(): Promise<ApiTestimonial[]> {
    return apiFetch<ApiTestimonial[]>(`${BASE}`);
}

export async function createTestimonial(
    data: Omit<ApiTestimonial, 'id' | '_id'>,
    headers: Headers,
): Promise<ApiTestimonial> {
    return apiFetch<ApiTestimonial>(`${BASE}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}

export async function updateTestimonial(
    id: number | string,
    data: Omit<ApiTestimonial, 'id' | '_id'>,
    headers: Headers,
): Promise<void> {
    await apiFetch(`${BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}

export async function deleteTestimonial(id: number | string, headers: Headers): Promise<void> {
    await apiFetch(`${BASE}/${id}`, {
        method: 'DELETE',
        headers: { ...headers },
    });
}
