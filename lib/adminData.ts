// ─── Type Definitions ────────────────────────────────────────────────

export interface HeroMetric {
    metric_value: string;   // max 10 chars
    metric_label: string;   // max 25 chars
}

export interface ImpactStat {
    value: number;
    label: string;          // max 25 chars
    suffix?: string;
}

export interface Testimonial {
    id: string;
    teen_name: string;      // max 30 chars
    teen_age: string;       // max 15 chars
    quote_text: string;     // max 250 chars
    teen_image: string;     // URL
}

export interface AchievementMetric {
    metric_value: string;   // max 10 chars
    metric_label: string;   // max 30 chars
}

export interface Leader {
    id: string;
    leader_name: string;    // max 40 chars
    leader_title: string;   // max 50 chars
    leader_image: string;   // URL
    display_order: number;
}

export interface ImpactHero {
    total_impact_number: string;  // max 10 chars
    hero_body_text: string;       // max 600 chars
    hero_images: string[];        // array of URLs
}

export interface ImpactMetric {
    id: string;
    metric_value: string;   // max 10 chars
    metric_label: string;   // max 30 chars
}

export interface ImpactVideo {
    video_url: string;
    video_description: string;  // max 200 chars
}

// ─── Missions: Common Types ─────────────────────────────────────────

export interface MissionImpactStat {
    stat_number: string;    // max 10 chars
    stat_label: string;     // max 25 chars
}

export interface UpcomingEvent {
    is_active: boolean;
    name: string;           // max 50 chars
    description: string;    // max 350 chars
    date_time: string;      // max 40 chars
    location: string;       // max 40 chars
    register_url: string;
    promo_image?: string;
}

export interface PastCampaignItem {
    campaign_id: string;
    campaign_title: string;   // max 30 chars
    campaign_date: string;    // max 15 chars
    campaign_image: string;
}

export interface PastSummitItem {
    summit_id: string;
    summit_title: string;     // max 30 chars
    summit_date: string;      // max 15 chars
    summit_image: string;
}

export interface PastConferenceItem {
    conference_id: string;
    conference_title: string; // max 30 chars
    conference_date: string;  // max 15 chars
    conference_image: string;
}

export interface ConferenceHeroGallery {
    primary_hero_image: string;
    secondary_hero_image: string;
}

export interface Speaker {
    id: string;
    speaker_name: string;    // max 40 chars
    speaker_role: string;    // max 50 chars
    speaker_image: string;
}

export interface NewsItem {
    id: string;
    news_title: string;      // max 60 chars
    news_link: string;
    news_thumbnail: string;
}

export interface CampaignDetail {
    campaign_name: string;        // max 40 chars
    short_description: string;    // max 250 chars
    hero_video_url: string;
    about_text_body: string;      // max 600 chars
    action_items: string[];       // max 100 chars each
    about_side_image: string;
    impact: MissionImpactStat[];
    partners: { name: string; logo: string }[];
    gallery: string[];
}

export interface SummitDetail {
    summit_name: string;          // max 50 chars
    short_description: string;    // max 250 chars
    hero_video_url: string;
    about_text_body: string;      // max 600 chars
    event_highlights: string[];   // max 100 chars each
    event_side_image: string;
    impact: MissionImpactStat[];
    speakers: Speaker[];
    partners: { name: string; logo: string }[];
    gallery: string[];
}

export interface ConferenceDetail {
    conference_name: string;      // max 50 chars
    conference_summary: string;   // max 250 chars
    hero_main_image: string;
    about_text_body: string;      // max 600 chars
    event_highlights: string[];   // max 100 chars each
    about_side_image: string;
    impact: MissionImpactStat[];
    news: NewsItem[];
    speakers: Speaker[];
    partners: { name: string; logo: string }[];
    gallery: string[];
}

// ─── Community: Service & Hangouts ───────────────────────────────────

export interface CommunityServiceHero {
    hero_gallery: string[];       // exactly 3 images
}

export interface CommunityServiceApproach {
    approach_image: string;
    focus_points: string[];       // max 80 chars each
}

export interface PastCommunityServiceItem {
    project_id: string;
    project_title: string;        // max 40 chars
    project_date: string;         // max 15 chars
    project_image: string;
}

export interface CommunityServiceDetail {
    project_name: string;         // max 50 chars
    project_summary: string;      // max 350 chars
    hero_main_image: string;
    project_body_text: string;    // max 600 chars
    project_highlights: string[]; // max 100 chars each
    side_action_image: string;
    impact: { impact_value: string; impact_label: string }[]; // exactly 4
    partners: { name: string; logo: string }[];
    gallery: string[];
}

export interface HangoutHero {
    hero_gallery_images: string[]; // exactly 3 images
}

export interface HangoutApproach {
    approach_image: string;
    feature_list: string[];       // max 60 chars each
}

export interface PastHangoutItem {
    hangout_id: string;
    hangout_title: string;        // max 40 chars
    hangout_date: string;         // max 15 chars
    hangout_image: string;
}

export interface HangoutDetail {
    hangout_name: string;         // max 50 chars
    hangout_summary: string;      // max 250 chars
    hero_main_image: string;
    about_text_body: string;      // max 600 chars
    event_highlights: string[];   // max 100 chars each
    side_action_image: string;
    impact: { impact_value: string; impact_label: string }[]; // exactly 4
    partners: { name: string; logo: string }[];
    gallery: string[];
}

export interface CurriculumInfo {
    notion_url: string;
}

// ─── Team: Core Team ─────────────────────────────────────────────────

export interface CoreTeamMember {
    id: string;
    member_name: string;      // max 40 chars
    member_role: string;      // max 50 chars
    member_bio: string;       // max 150 chars
    member_image: string;     // URL
    linkedin_url?: string;
    twitter_url?: string;
    instagram_url?: string;
    display_order: number;
}

// ─── Team: Volunteers ────────────────────────────────────────────────

export interface VolunteerMember {
    id: string;
    member_name: string;      // max 40 chars
    member_role: string;      // max 50 chars
    member_bio: string;       // max 150 chars
    member_image: string;     // URL
    social_links?: {
        linkedin?: string;
        twitter?: string;
        instagram?: string;
    };
    display_order: number;
}

export interface VolunteerCTA {
    join_button_url: string;
}

// ─── Team: Mentors ───────────────────────────────────────────────────

export interface MentorHero {
    hero_mentor_images: string[]; // exactly 2
}

export interface MentorMember {
    id: string;
    member_name: string;      // max 40 chars
    member_role: string;      // max 50 chars
    member_bio: string;       // max 150 chars
    member_image: string;     // URL
    social_links?: {
        linkedin?: string;
        twitter?: string;
        instagram?: string;
    };
    display_order: number;
}

export interface MentorRoleMedia {
    role_feature_image: string;
}

export interface MentorCTA {
    apply_button_url: string;
    cta_footer_image: string;
}

// ─── Team: Ambassadors ───────────────────────────────────────────────

export interface AmbassadorMember {
    id: string;
    ambassador_name: string;  // max 40 chars
    school_name: string;      // max 50 chars
    location: string;         // max 50 chars
    ambassador_image: string; // URL
    display_order: number;
}

export interface AmbassadorCTA {
    apply_button_url: string;
}

// ─── Storage Keys ────────────────────────────────────────────────────

const KEYS = {
    HOME_HERO_METRICS: 'admin_home_hero_metrics',
    HOME_IMPACT_STATS: 'admin_home_impact_stats',
    HOME_TESTIMONIALS: 'admin_home_testimonials',
    ABOUT_ACHIEVEMENT: 'admin_about_achievement',
    ABOUT_LEADERS: 'admin_about_leaders',
    IMPACT_HERO: 'admin_impact_hero',
    IMPACT_METRICS: 'admin_impact_metrics',
    IMPACT_VIDEO: 'admin_impact_video',
    // Missions — Campaigns
    CAMPAIGNS_IMPACT: 'admin_campaigns_impact_stats',
    CAMPAIGNS_PAST: 'admin_campaigns_past',
    CAMPAIGNS_UPCOMING: 'admin_campaigns_upcoming',
    // Missions — Summits
    SUMMITS_HERO_GALLERY: 'admin_summits_hero_gallery',
    SUMMITS_IMPACT: 'admin_summits_impact_stats',
    SUMMITS_PAST: 'admin_summits_past',
    SUMMITS_UPCOMING: 'admin_summits_upcoming',
    // Missions — Conferences
    CONFERENCES_HERO: 'admin_conferences_hero_gallery',
    CONFERENCES_IMPACT: 'admin_conferences_impact_stats',
    CONFERENCES_PAST: 'admin_conferences_past',
    CONFERENCES_UPCOMING: 'admin_conferences_upcoming',
    // Community — Service
    COMMUNITY_SERVICE_HERO: 'admin_community_service_hero',
    COMMUNITY_SERVICE_APPROACH: 'admin_community_service_approach',
    COMMUNITY_SERVICE_IMPACT: 'admin_community_service_impact_stats',
    COMMUNITY_SERVICE_PAST: 'admin_community_service_past',
    // Community — Hangouts
    HANGOUTS_HERO: 'admin_hangouts_hero_gallery',
    HANGOUTS_APPROACH: 'admin_hangouts_approach',
    HANGOUTS_IMPACT: 'admin_hangouts_impact_stats',
    HANGOUTS_PAST: 'admin_hangouts_past',
    HANGOUTS_UPCOMING: 'admin_hangouts_upcoming',
    // Community — Curriculum
    CURRICULUM_INFO: 'admin_curriculum_info',
    // Team — Core Team
    TEAM_CORE_MEMBERS: 'admin_team_core_members',
    // Team — Volunteers
    TEAM_VOLUNTEER_MEMBERS: 'admin_team_volunteer_members',
    TEAM_VOLUNTEER_CTA: 'admin_team_volunteer_cta',
    // Team — Mentors
    TEAM_MENTOR_HERO: 'admin_team_mentor_hero',
    TEAM_MENTOR_MEMBERS: 'admin_team_mentor_members',
    TEAM_MENTOR_ROLE_MEDIA: 'admin_team_mentor_role_media',
    TEAM_MENTOR_CTA: 'admin_team_mentor_cta',
    // Team — Ambassadors
    TEAM_AMBASSADOR_MEMBERS: 'admin_team_ambassador_members',
    TEAM_AMBASSADOR_CTA: 'admin_team_ambassador_cta',
} as const;

// ─── Generic Helpers ─────────────────────────────────────────────────

function getItem<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : null;
    } catch {
        return null;
    }
}

function setItem<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
}

// ─── Unique ID helper ────────────────────────────────────────────────

export function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ─── Home Page: Hero Metrics (exactly 3) ─────────────────────────────

export function getHeroMetrics(): HeroMetric[] | null {
    return getItem<HeroMetric[]>(KEYS.HOME_HERO_METRICS);
}

export function saveHeroMetrics(metrics: HeroMetric[]): void {
    setItem(KEYS.HOME_HERO_METRICS, metrics.slice(0, 3));
}

// ─── Home Page: Impact Stats (exactly 4) ─────────────────────────────

export function getImpactStats(): ImpactStat[] | null {
    return getItem<ImpactStat[]>(KEYS.HOME_IMPACT_STATS);
}

export function saveImpactStats(stats: ImpactStat[]): void {
    setItem(KEYS.HOME_IMPACT_STATS, stats.slice(0, 4));
}

// ─── Home Page: Testimonials (multiple) ──────────────────────────────

export function getTestimonials(): Testimonial[] | null {
    return getItem<Testimonial[]>(KEYS.HOME_TESTIMONIALS);
}

export function saveTestimonials(testimonials: Testimonial[]): void {
    setItem(KEYS.HOME_TESTIMONIALS, testimonials);
}

// ─── About Page: Achievement Metric (1 record) ──────────────────────

export function getAchievementMetric(): AchievementMetric | null {
    return getItem<AchievementMetric>(KEYS.ABOUT_ACHIEVEMENT);
}

export function saveAchievementMetric(metric: AchievementMetric): void {
    setItem(KEYS.ABOUT_ACHIEVEMENT, metric);
}

// ─── About Page: Leaders ─────────────────────────────────────────────

export function getLeaders(): Leader[] | null {
    return getItem<Leader[]>(KEYS.ABOUT_LEADERS);
}

export function saveLeaders(leaders: Leader[]): void {
    const sorted = [...leaders].sort((a, b) => a.display_order - b.display_order);
    setItem(KEYS.ABOUT_LEADERS, sorted);
}

// ─── Impact Page: Hero Section ───────────────────────────────────────

export function getImpactHero(): ImpactHero | null {
    return getItem<ImpactHero>(KEYS.IMPACT_HERO);
}

export function saveImpactHero(hero: ImpactHero): void {
    setItem(KEYS.IMPACT_HERO, hero);
}

// ─── Impact Page: Metrics Grid ───────────────────────────────────────

export function getImpactMetrics(): ImpactMetric[] | null {
    return getItem<ImpactMetric[]>(KEYS.IMPACT_METRICS);
}

export function saveImpactMetrics(metrics: ImpactMetric[]): void {
    setItem(KEYS.IMPACT_METRICS, metrics);
}

// ─── Impact Page: Video Highlight ────────────────────────────────────

export function getImpactVideo(): ImpactVideo | null {
    return getItem<ImpactVideo>(KEYS.IMPACT_VIDEO);
}

export function saveImpactVideo(video: ImpactVideo): void {
    setItem(KEYS.IMPACT_VIDEO, video);
}

// ═══════════════════════════════════════════════════════════════════════
// MISSIONS — CAMPAIGNS
// ═══════════════════════════════════════════════════════════════════════

export function getCampaignsImpact(): MissionImpactStat[] | null {
    return getItem<MissionImpactStat[]>(KEYS.CAMPAIGNS_IMPACT);
}
export function saveCampaignsImpact(stats: MissionImpactStat[]): void {
    setItem(KEYS.CAMPAIGNS_IMPACT, stats.slice(0, 4));
}

export function getPastCampaigns(): PastCampaignItem[] | null {
    return getItem<PastCampaignItem[]>(KEYS.CAMPAIGNS_PAST);
}
export function savePastCampaigns(items: PastCampaignItem[]): void {
    setItem(KEYS.CAMPAIGNS_PAST, items);
}

export function getUpcomingCampaign(): UpcomingEvent | null {
    return getItem<UpcomingEvent>(KEYS.CAMPAIGNS_UPCOMING);
}
export function saveUpcomingCampaign(event: UpcomingEvent): void {
    setItem(KEYS.CAMPAIGNS_UPCOMING, event);
}

export function getCampaignDetail(id: string): CampaignDetail | null {
    return getItem<CampaignDetail>(`admin_campaign_detail_${id}`);
}
export function saveCampaignDetail(id: string, detail: CampaignDetail): void {
    setItem(`admin_campaign_detail_${id}`, detail);
}

// ═══════════════════════════════════════════════════════════════════════
// MISSIONS — SUMMITS
// ═══════════════════════════════════════════════════════════════════════

export function getSummitsHeroGallery(): string[] | null {
    return getItem<string[]>(KEYS.SUMMITS_HERO_GALLERY);
}
export function saveSummitsHeroGallery(images: string[]): void {
    setItem(KEYS.SUMMITS_HERO_GALLERY, images.slice(0, 3));
}

export function getSummitsImpact(): MissionImpactStat[] | null {
    return getItem<MissionImpactStat[]>(KEYS.SUMMITS_IMPACT);
}
export function saveSummitsImpact(stats: MissionImpactStat[]): void {
    setItem(KEYS.SUMMITS_IMPACT, stats.slice(0, 4));
}

export function getPastSummits(): PastSummitItem[] | null {
    return getItem<PastSummitItem[]>(KEYS.SUMMITS_PAST);
}
export function savePastSummits(items: PastSummitItem[]): void {
    setItem(KEYS.SUMMITS_PAST, items);
}

export function getUpcomingSummit(): UpcomingEvent | null {
    return getItem<UpcomingEvent>(KEYS.SUMMITS_UPCOMING);
}
export function saveUpcomingSummit(event: UpcomingEvent): void {
    setItem(KEYS.SUMMITS_UPCOMING, event);
}

export function getSummitDetail(id: string): SummitDetail | null {
    return getItem<SummitDetail>(`admin_summit_detail_${id}`);
}
export function saveSummitDetail(id: string, detail: SummitDetail): void {
    setItem(`admin_summit_detail_${id}`, detail);
}

// ═══════════════════════════════════════════════════════════════════════
// MISSIONS — CONFERENCES
// ═══════════════════════════════════════════════════════════════════════

export function getConferencesHero(): ConferenceHeroGallery | null {
    return getItem<ConferenceHeroGallery>(KEYS.CONFERENCES_HERO);
}
export function saveConferencesHero(hero: ConferenceHeroGallery): void {
    setItem(KEYS.CONFERENCES_HERO, hero);
}

export function getConferencesImpact(): MissionImpactStat[] | null {
    return getItem<MissionImpactStat[]>(KEYS.CONFERENCES_IMPACT);
}
export function saveConferencesImpact(stats: MissionImpactStat[]): void {
    setItem(KEYS.CONFERENCES_IMPACT, stats.slice(0, 4));
}

export function getPastConferences(): PastConferenceItem[] | null {
    return getItem<PastConferenceItem[]>(KEYS.CONFERENCES_PAST);
}
export function savePastConferences(items: PastConferenceItem[]): void {
    setItem(KEYS.CONFERENCES_PAST, items);
}

export function getUpcomingConference(): UpcomingEvent | null {
    return getItem<UpcomingEvent>(KEYS.CONFERENCES_UPCOMING);
}
export function saveUpcomingConference(event: UpcomingEvent): void {
    setItem(KEYS.CONFERENCES_UPCOMING, event);
}

export function getConferenceDetail(id: string): ConferenceDetail | null {
    return getItem<ConferenceDetail>(`admin_conference_detail_${id}`);
}
export function saveConferenceDetail(id: string, detail: ConferenceDetail): void {
    setItem(`admin_conference_detail_${id}`, detail);
}

// ═══════════════════════════════════════════════════════════════════════
// COMMUNITY — SERVICE
// ═══════════════════════════════════════════════════════════════════════

export function getCommunityServiceHero(): CommunityServiceHero | null {
    return getItem<CommunityServiceHero>(KEYS.COMMUNITY_SERVICE_HERO);
}
export function saveCommunityServiceHero(hero: CommunityServiceHero): void {
    setItem(KEYS.COMMUNITY_SERVICE_HERO, hero);
}

export function getCommunityServiceApproach(): CommunityServiceApproach | null {
    return getItem<CommunityServiceApproach>(KEYS.COMMUNITY_SERVICE_APPROACH);
}
export function saveCommunityServiceApproach(approach: CommunityServiceApproach): void {
    setItem(KEYS.COMMUNITY_SERVICE_APPROACH, approach);
}

export function getCommunityServiceImpact(): MissionImpactStat[] | null {
    return getItem<MissionImpactStat[]>(KEYS.COMMUNITY_SERVICE_IMPACT);
}
export function saveCommunityServiceImpact(stats: MissionImpactStat[]): void {
    setItem(KEYS.COMMUNITY_SERVICE_IMPACT, stats.slice(0, 3));
}

export function getPastCommunityServices(): PastCommunityServiceItem[] | null {
    return getItem<PastCommunityServiceItem[]>(KEYS.COMMUNITY_SERVICE_PAST);
}
export function savePastCommunityServices(items: PastCommunityServiceItem[]): void {
    setItem(KEYS.COMMUNITY_SERVICE_PAST, items);
}

export function getCommunityServiceDetail(id: string): CommunityServiceDetail | null {
    return getItem<CommunityServiceDetail>(`admin_community_service_detail_${id}`);
}
export function saveCommunityServiceDetail(id: string, detail: CommunityServiceDetail): void {
    setItem(`admin_community_service_detail_${id}`, detail);
}

// ═══════════════════════════════════════════════════════════════════════
// COMMUNITY — HANGOUTS
// ═══════════════════════════════════════════════════════════════════════

export function getHangoutHero(): HangoutHero | null {
    return getItem<HangoutHero>(KEYS.HANGOUTS_HERO);
}
export function saveHangoutHero(hero: HangoutHero): void {
    setItem(KEYS.HANGOUTS_HERO, hero);
}

export function getHangoutApproach(): HangoutApproach | null {
    return getItem<HangoutApproach>(KEYS.HANGOUTS_APPROACH);
}
export function saveHangoutApproach(approach: HangoutApproach): void {
    setItem(KEYS.HANGOUTS_APPROACH, approach);
}

export function getHangoutImpact(): MissionImpactStat[] | null {
    return getItem<MissionImpactStat[]>(KEYS.HANGOUTS_IMPACT);
}
export function saveHangoutImpact(stats: MissionImpactStat[]): void {
    setItem(KEYS.HANGOUTS_IMPACT, stats.slice(0, 4));
}

export function getPastHangouts(): PastHangoutItem[] | null {
    return getItem<PastHangoutItem[]>(KEYS.HANGOUTS_PAST);
}
export function savePastHangouts(items: PastHangoutItem[]): void {
    setItem(KEYS.HANGOUTS_PAST, items);
}

export function getUpcomingHangout(): UpcomingEvent | null {
    return getItem<UpcomingEvent>(KEYS.HANGOUTS_UPCOMING);
}
export function saveUpcomingHangout(event: UpcomingEvent): void {
    setItem(KEYS.HANGOUTS_UPCOMING, event);
}

export function getHangoutDetail(id: string): HangoutDetail | null {
    return getItem<HangoutDetail>(`admin_hangout_detail_${id}`);
}
export function saveHangoutDetail(id: string, detail: HangoutDetail): void {
    setItem(`admin_hangout_detail_${id}`, detail);
}

// ═══════════════════════════════════════════════════════════════════════
// COMMUNITY — CURRICULUM
// ═══════════════════════════════════════════════════════════════════════

export function getCurriculumInfo(): CurriculumInfo | null {
    return getItem<CurriculumInfo>(KEYS.CURRICULUM_INFO);
}
export function saveCurriculumInfo(info: CurriculumInfo): void {
    setItem(KEYS.CURRICULUM_INFO, info);
}

// ═══════════════════════════════════════════════════════════════════════
// TEAM — CORE TEAM
// ═══════════════════════════════════════════════════════════════════════

export function getCoreTeamMembers(): CoreTeamMember[] | null {
    return getItem<CoreTeamMember[]>(KEYS.TEAM_CORE_MEMBERS);
}
export function saveCoreTeamMembers(members: CoreTeamMember[]): void {
    const sorted = [...members].sort((a, b) => a.display_order - b.display_order);
    setItem(KEYS.TEAM_CORE_MEMBERS, sorted);
}

// ═══════════════════════════════════════════════════════════════════════
// TEAM — VOLUNTEERS
// ═══════════════════════════════════════════════════════════════════════

export function getVolunteerMembers(): VolunteerMember[] | null {
    return getItem<VolunteerMember[]>(KEYS.TEAM_VOLUNTEER_MEMBERS);
}
export function saveVolunteerMembers(members: VolunteerMember[]): void {
    const sorted = [...members].sort((a, b) => a.display_order - b.display_order);
    setItem(KEYS.TEAM_VOLUNTEER_MEMBERS, sorted);
}

export function getVolunteerCTA(): VolunteerCTA | null {
    return getItem<VolunteerCTA>(KEYS.TEAM_VOLUNTEER_CTA);
}
export function saveVolunteerCTA(cta: VolunteerCTA): void {
    setItem(KEYS.TEAM_VOLUNTEER_CTA, cta);
}

// ═══════════════════════════════════════════════════════════════════════
// TEAM — MENTORS
// ═══════════════════════════════════════════════════════════════════════

export function getMentorHero(): MentorHero | null {
    return getItem<MentorHero>(KEYS.TEAM_MENTOR_HERO);
}
export function saveMentorHero(hero: MentorHero): void {
    setItem(KEYS.TEAM_MENTOR_HERO, hero);
}

export function getMentorMembers(): MentorMember[] | null {
    return getItem<MentorMember[]>(KEYS.TEAM_MENTOR_MEMBERS);
}
export function saveMentorMembers(members: MentorMember[]): void {
    const sorted = [...members].sort((a, b) => a.display_order - b.display_order);
    setItem(KEYS.TEAM_MENTOR_MEMBERS, sorted);
}

export function getMentorRoleMedia(): MentorRoleMedia | null {
    return getItem<MentorRoleMedia>(KEYS.TEAM_MENTOR_ROLE_MEDIA);
}
export function saveMentorRoleMedia(media: MentorRoleMedia): void {
    setItem(KEYS.TEAM_MENTOR_ROLE_MEDIA, media);
}

export function getMentorCTA(): MentorCTA | null {
    return getItem<MentorCTA>(KEYS.TEAM_MENTOR_CTA);
}
export function saveMentorCTA(cta: MentorCTA): void {
    setItem(KEYS.TEAM_MENTOR_CTA, cta);
}

// ═══════════════════════════════════════════════════════════════════════
// TEAM — AMBASSADORS
// ═══════════════════════════════════════════════════════════════════════

export function getAmbassadorMembers(): AmbassadorMember[] | null {
    return getItem<AmbassadorMember[]>(KEYS.TEAM_AMBASSADOR_MEMBERS);
}
export function saveAmbassadorMembers(members: AmbassadorMember[]): void {
    const sorted = [...members].sort((a, b) => a.display_order - b.display_order);
    setItem(KEYS.TEAM_AMBASSADOR_MEMBERS, sorted);
}

export function getAmbassadorCTA(): AmbassadorCTA | null {
    return getItem<AmbassadorCTA>(KEYS.TEAM_AMBASSADOR_CTA);
}
export function saveAmbassadorCTA(cta: AmbassadorCTA): void {
    setItem(KEYS.TEAM_AMBASSADOR_CTA, cta);
}
