// ─── Team API Service ──────────────────────────────────────────────────
// Wraps the trustteens backend endpoints for Team (Core, Mentors, Volunteers, Ambassadors)

const BASE = 'https://trustteens-api.onrender.com/api/v1/team';

// ─── Types (Backend Shapes) ─────────────────────────────────────────

export interface ApiTeamMember {
    id: number;
    memberName: string;
    memberRole: string;
    memberBio: string;
    memberImage: string;
    linkedInUrl: string | null;
    twitterUrl: string | null;
    instagramUrl: string | null;
    displayOrder: number;
    isActive: boolean;
}

export interface ApiAmbassadorMember {
    id: number;
    ambassadorName: string;
    schoolName: string;
    location: string;
    ambassadorImage: string;
    displayOrder: number;
    isActive: boolean;
}

export interface ApiSingleImage {
    imageUrl: string;
}

export interface ApiHeroGallery {
    heroImage1: string;
    heroImage2: string;
}

export interface ApiVolunteerCta {
    isActive: boolean;
    joinButtonUrl: string;
    ctaImage?: string;
}

export interface ApiMentorCta {
    isActive: boolean;
    applyButtonUrl: string;
    ctaFooterImage: string;
}

export interface ApiAmbassadorCta {
    isActive: boolean;
    applyButtonUrl: string;
    ctaSideImage?: string;
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
// CORE TEAM
// ═══════════════════════════════════════════════════════════════════════

export async function fetchCoreHero(): Promise<ApiSingleImage> {
    return apiFetch<ApiSingleImage>(`${BASE}/core-hero`);
}

export async function updateCoreHero(data: ApiSingleImage, headers: Headers): Promise<void> {
    await apiFetch(`${BASE}/core-hero`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}

export async function fetchCoreMembers(): Promise<ApiTeamMember[]> {
    return apiFetch<ApiTeamMember[]>(`${BASE}/core-members/all`);
}

export async function createCoreMember(data: Omit<ApiTeamMember, 'id' | 'isActive'>, headers: Headers): Promise<void> {
    await apiFetch(`${BASE}/core-members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}

export async function updateCoreMember(id: number, data: Partial<ApiTeamMember>, headers: Headers): Promise<void> {
    await apiFetch(`${BASE}/core-members/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}

export async function deleteCoreMember(id: number, headers: Headers): Promise<void> {
    await apiFetch(`${BASE}/core-members/${id}`, {
        method: 'DELETE',
        headers: { ...headers },
    });
}

// ═══════════════════════════════════════════════════════════════════════
// VOLUNTEERS
// ═══════════════════════════════════════════════════════════════════════

export async function fetchVolunteersHero(): Promise<ApiHeroGallery> {
    return apiFetch<ApiHeroGallery>(`${BASE}/volunteers-hero`);
}

export async function updateVolunteersHero(data: ApiHeroGallery, headers: Headers): Promise<void> {
    await apiFetch(`${BASE}/volunteers-hero`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}

export async function fetchVolunteerMembers(): Promise<ApiTeamMember[]> {
    return apiFetch<ApiTeamMember[]>(`${BASE}/volunteer-members`);
}

export async function createVolunteerMember(data: Omit<ApiTeamMember, 'id' | 'isActive'>, headers: Headers): Promise<void> {
    await apiFetch(`${BASE}/volunteer-members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}

export async function updateVolunteerMember(id: number, data: Partial<ApiTeamMember>, headers: Headers): Promise<void> {
    await apiFetch(`${BASE}/volunteer-members/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}

export async function deleteVolunteerMember(id: number, headers: Headers): Promise<void> {
    await apiFetch(`${BASE}/volunteer-members/${id}`, {
        method: 'DELETE',
        headers: { ...headers },
    });
}

export async function fetchVolunteerCta(): Promise<ApiVolunteerCta> {
    return apiFetch<ApiVolunteerCta>(`${BASE}/volunteer-cta`);
}

export async function updateVolunteerCta(data: ApiVolunteerCta, headers: Headers): Promise<void> {
    await apiFetch(`${BASE}/volunteer-cta`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}

// ═══════════════════════════════════════════════════════════════════════
// MENTORS
// ═══════════════════════════════════════════════════════════════════════

export async function fetchMentorsHero(): Promise<ApiHeroGallery> {
    return apiFetch<ApiHeroGallery>(`${BASE}/mentors-hero`);
}

export async function updateMentorsHero(data: ApiHeroGallery, headers: Headers): Promise<void> {
    await apiFetch(`${BASE}/mentors-hero`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}

export async function fetchMentorMembers(): Promise<ApiTeamMember[]> {
    return apiFetch<ApiTeamMember[]>(`${BASE}/mentor-members`);
}

export async function createMentorMember(data: Omit<ApiTeamMember, 'id' | 'isActive'>, headers: Headers): Promise<void> {
    await apiFetch(`${BASE}/mentor-members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}

export async function updateMentorMember(id: number, data: Partial<ApiTeamMember>, headers: Headers): Promise<void> {
    await apiFetch(`${BASE}/mentor-members/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}

export async function deleteMentorMember(id: number, headers: Headers): Promise<void> {
    await apiFetch(`${BASE}/mentor-members/${id}`, {
        method: 'DELETE',
        headers: { ...headers },
    });
}

export async function fetchMentorRoleMedia(): Promise<ApiSingleImage> {
    return apiFetch<ApiSingleImage>(`${BASE}/mentor-role-media`);
}

export async function updateMentorRoleMedia(data: ApiSingleImage, headers: Headers): Promise<void> {
    await apiFetch(`${BASE}/mentor-role-media`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}

export async function fetchMentorCta(): Promise<ApiMentorCta> {
    return apiFetch<ApiMentorCta>(`${BASE}/mentor-cta`);
}

export async function updateMentorCta(data: ApiMentorCta, headers: Headers): Promise<void> {
    await apiFetch(`${BASE}/mentor-cta`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}
// ═══════════════════════════════════════════════════════════════════════
// AMBASSADORS
// ═══════════════════════════════════════════════════════════════════════

export async function fetchAmbassadorsHero(): Promise<ApiSingleImage> {
    return apiFetch<ApiSingleImage>(`${BASE}/ambassadors-hero`);
}

export async function updateAmbassadorsHero(data: ApiSingleImage, headers: Headers): Promise<void> {
    await apiFetch(`${BASE}/ambassadors-hero`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}

export async function fetchAmbassadorMembers(): Promise<ApiAmbassadorMember[]> {
    return apiFetch<ApiAmbassadorMember[]>(`${BASE}/ambassador-members/all`);
}

export async function createAmbassadorMember(data: Omit<ApiAmbassadorMember, 'id' | 'isActive'>, headers: Headers): Promise<void> {
    await apiFetch(`${BASE}/ambassador-members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}

export async function updateAmbassadorMember(id: number, data: Partial<ApiAmbassadorMember>, headers: Headers): Promise<void> {
    await apiFetch(`${BASE}/ambassador-members/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}

export async function deleteAmbassadorMember(id: number, headers: Headers): Promise<void> {
    await apiFetch(`${BASE}/ambassador-members/${id}`, {
        method: 'DELETE',
        headers: { ...headers },
    });
}

export async function fetchAmbassadorCta(): Promise<ApiAmbassadorCta> {
    return apiFetch<ApiAmbassadorCta>(`${BASE}/ambassador-cta`);
}

export async function updateAmbassadorCta(data: ApiAmbassadorCta, headers: Headers): Promise<void> {
    await apiFetch(`${BASE}/ambassador-cta`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}
