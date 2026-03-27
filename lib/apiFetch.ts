export async function apiFetch<T>(
    url: string,
    init?: RequestInit
): Promise<T> {
    const token =
        typeof window !== 'undefined'
            ? localStorage.getItem('admin_access_token')
            : null;

    console.log('TOKEN USED:', token);
    console.log('REQUEST:', url, init);

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
        throw new Error(
            `API ${init?.method ?? 'GET'} ${url} → ${res.status}: ${body}`
        );
    }

    const text = await res.text();
    return text ? JSON.parse(text) : (undefined as T);
}