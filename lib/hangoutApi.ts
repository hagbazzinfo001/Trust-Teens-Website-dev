import { apiFetch } from './apiFetch';

const API_BASE_URL = 'https://trustteens-api.onrender.com/api/v1';

export interface PastHangout {
    id: string;
    hangoutTitle: string;
    hangoutDate: string;
    hangoutImage: string;
    isActive: boolean;
}

export interface PastHangoutCreateDto {
    hangoutTitle: string;
    hangoutDate: string;
    hangoutImage: string;
}

export interface PastHangoutUpdateDto {
    hangoutTitle?: string;
    hangoutDate?: string;
    hangoutImage?: string;
    isActive?: boolean;
}

export interface UpcomingHangout {
    isActive: boolean;
    hangoutName: string;
    description: string;
    dateTime: string;
    location: string;
    registerUrl: string;
    promoImage: string;
}

export interface ImpactMetric {
    id?: number;
    impactValue: string;
    impactLabel: string;
    position: number;
}

export interface HangoutDetails {
    hangoutName: string;
    hangoutSummary: string;
    heroMainImage: string;
    aboutTextBody: string;
    sideActionImage: string;
    eventHighlights: string[];
    impactMetrics: ImpactMetric[];
}

export interface Partner {
    id: number;
    partnerLogo: string;
}

export interface GalleryImage {
    id: number;
    imageUrl: string;
}

export const hangoutApi = {
    // --- Past Hangouts ---
    getPastHangouts: () => 
        apiFetch<PastHangout[]>(`${API_BASE_URL}/hangouts/past/all`),

    createPastHangout: (data: PastHangoutCreateDto) =>
        apiFetch<PastHangout>(`${API_BASE_URL}/hangouts/past`, {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    updatePastHangout: (id: string, data: PastHangoutUpdateDto) =>
        apiFetch<PastHangout>(`${API_BASE_URL}/hangouts/past/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    deletePastHangout: (id: string) =>
        apiFetch<void>(`${API_BASE_URL}/hangouts/past/${id}`, {
            method: 'DELETE',
        }),

    // --- Upcoming Hangout ---
    getUpcomingHangout: () =>
        apiFetch<UpcomingHangout>(`${API_BASE_URL}/hangouts/upcoming`),

    upsertUpcomingHangout: (data: UpcomingHangout) =>
        apiFetch<UpcomingHangout>(`${API_BASE_URL}/hangouts/upcoming`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    // --- Hangout Details (Recap) ---
    getHangoutDetails: (id: string) =>
        apiFetch<HangoutDetails>(`${API_BASE_URL}/hangouts/${id}`),

    updateHangoutDetails: (id: string, data: HangoutDetails) =>
        apiFetch<HangoutDetails>(`${API_BASE_URL}/hangouts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    // --- Partners ---
    getPartners: (id: string) =>
        apiFetch<Partner[]>(`${API_BASE_URL}/hangouts/${id}/partners`),

    addPartner: (id: string, partnerLogo: string) =>
        apiFetch<Partner>(`${API_BASE_URL}/hangouts/${id}/partners`, {
            method: 'POST',
            body: JSON.stringify({ partnerLogo }),
        }),

    deletePartner: (id: string, partnerId: number) =>
        apiFetch<void>(`${API_BASE_URL}/hangouts/${id}/partners/${partnerId}`, {
            method: 'DELETE',
        }),

    // --- Gallery ---
    getGallery: (id: string) =>
        apiFetch<GalleryImage[]>(`${API_BASE_URL}/hangouts/${id}/gallery`),

    addGalleryImage: (id: string, imageUrl: string) =>
        apiFetch<GalleryImage>(`${API_BASE_URL}/hangouts/${id}/gallery`, {
            method: 'POST',
            body: JSON.stringify({ imageUrl }),
        }),

    deleteGalleryImage: (id: string, imageId: number) =>
        apiFetch<void>(`${API_BASE_URL}/hangouts/${id}/gallery/${imageId}`, {
            method: 'DELETE',
        }),
};
