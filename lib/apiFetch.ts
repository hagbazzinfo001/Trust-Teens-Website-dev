const BASE_URL = 'https://trustteens-api.onrender.com';

export async function apiFetch<T>(
    url: string,
    init?: RequestInit
): Promise<T> {
    const token =
        typeof window !== 'undefined'
            ? localStorage.getItem('admin_access_token')
            : null;

    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;

    console.log('TOKEN USED:', token);
    console.log('REQUEST:', fullUrl, init);

    const res = await fetch(fullUrl, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(init?.headers || {}),
        },
    });

    if (!res.ok) {
        if (res.status === 401 && typeof window !== 'undefined') {
            console.error('Unauthorized (401) - clearing session and redirecting to login.');
            localStorage.removeItem('admin_user');
            localStorage.removeItem('admin_access_token');
            if (window.location.pathname !== '/admin/login') {
                window.location.href = '/admin/login';
            }
        }
        const body = await res.text().catch(() => '');
        throw new Error(
            `API ${init?.method ?? 'GET'} ${url} → ${res.status}: ${body}`
        );
    }

    const text = await res.text();
    return text ? JSON.parse(text) : (undefined as T);
}