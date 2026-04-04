import { apiFetch } from './apiFetch';

export interface ApiCommunityHero {
    images: string[];
}

export interface ApiCommunityApproach {
    approachImage: string;
    focusPoints: string[];
}

export interface ApiCommunityImpact {
    id?: number;
    statNumber: string;
    statLabel: string;
    position: number;
}

export interface ApiPastProject {
    id?: number;
    projectTitle: string;
    projectDate: string;
    projectImage: string;
}

export interface ApiProjectImpact {
    id: number;
    impactValue: string;
    impactLabel: string;
}

export interface ApiProjectDetail {
    projectName: string;
    projectSummary: string;
    heroMainImage: string;
    projectBodyText: string;
    sideActionImage: string;
    projectHighlights: string[];
    impactMetrics: ApiProjectImpact[];
}

export interface ApiProjectPartner {
    id?: number;
    partnerLogo: string;
}

export interface ApiProjectGallery {
    id?: number;
    imageUrl: string;
}

const BASE = '/api/v1/community';
const DETAIL_BASE = '/api/v1/community-service';

// ─── Hero Gallery ───────────────────────────────────────────────────

export const fetchHero = async (): Promise<ApiCommunityHero | null> => {
    return apiFetch<ApiCommunityHero>(`${BASE}/service-hero`);
};

export const updateHero = async (data: ApiCommunityHero) => {
    return apiFetch(`${BASE}/service-hero`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};

// ─── Approach Section ──────────────────────────────────────────────

export const fetchApproach = async (): Promise<ApiCommunityApproach | null> => {
    return apiFetch<ApiCommunityApproach>(`${BASE}/service-approach`);
};

export const updateApproach = async (data: ApiCommunityApproach) => {
    return apiFetch(`${BASE}/service-approach`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};

// ─── Impact Bar ─────────────────────────────────────────────────────

export const fetchImpact = async (): Promise<ApiCommunityImpact[]> => {
    return apiFetch<ApiCommunityImpact[]>(`${BASE}/service-impact`) || [];
};

export const createImpact = async (data: Partial<ApiCommunityImpact>) => {
    return apiFetch(`${BASE}/service-impact`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const updateImpact = async (id: number, data: Partial<ApiCommunityImpact>) => {
    return apiFetch(`${BASE}/service-impact/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};

export const deleteImpact = async (id: number) => {
    return apiFetch(`${BASE}/service-impact/${id}`, {
        method: 'DELETE',
    });
};

// ─── Past Projects (Slider) ────────────────────────────────────────

export const fetchPastProjects = async (): Promise<ApiPastProject[]> => {
    return apiFetch<ApiPastProject[]>(`${BASE}/service-past/all`) || [];
};

export const createPastProject = async (data: Partial<ApiPastProject>) => {
    return apiFetch(`${BASE}/service-past`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const updatePastProject = async (id: number, data: Partial<ApiPastProject>) => {
    return apiFetch(`${BASE}/service-past/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};

export const deletePastProject = async (id: number) => {
    return apiFetch(`${BASE}/service-past/${id}`, {
        method: 'DELETE',
    });
};

// ─── Individual Project Details (Recaps) ───────────────────────────

export const getProjectById = async (id: number): Promise<ApiProjectDetail | null> => {
    return apiFetch<ApiProjectDetail>(`${DETAIL_BASE}/${id}`);
};

export const updateProjectDetail = async (id: number, data: ApiProjectDetail) => {
    return apiFetch(`${DETAIL_BASE}/${id}`, {
        method: 'POST', // Based on Swagger screenshot showing POST for update/sync
        body: JSON.stringify(data),
    });
};

// Partners
export const getPartnersByProject = async (projectId: number): Promise<ApiProjectPartner[]> => {
    return apiFetch<ApiProjectPartner[]>(`${DETAIL_BASE}/${projectId}/partners`) || [];
};

export const addPartnerToProject = async (projectId: number, data: { partnerLogo: string }) => {
    return apiFetch(`${DETAIL_BASE}/${projectId}/partners`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const deletePartnerFromProject = async (projectId: number, partnerId: number) => {
    return apiFetch(`${DETAIL_BASE}/${projectId}/partners/${partnerId}`, {
        method: 'DELETE',
    });
};

// Gallery
export const getGalleryByProject = async (projectId: number): Promise<ApiProjectGallery[]> => {
    return apiFetch<ApiProjectGallery[]>(`${DETAIL_BASE}/${projectId}/gallery`) || [];
};

export const addGalleryToProject = async (projectId: number, data: { imageUrl: string }) => {
    return apiFetch(`${DETAIL_BASE}/${projectId}/gallery`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const deleteGalleryFromProject = async (projectId: number, imageId: number) => {
    return apiFetch(`${DETAIL_BASE}/${projectId}/gallery/${imageId}`, {
        method: 'DELETE',
    });
};
