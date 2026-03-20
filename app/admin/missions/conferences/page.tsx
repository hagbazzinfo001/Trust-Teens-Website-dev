'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import CloudinaryImageUpload from '@/components/CloudinaryImageUpload';
import {
    MissionImpactStat,
    PastConferenceItem,
    UpcomingEvent,
    ConferenceDetail,
    ConferenceHeroGallery,
    getConferencesHero,
    saveConferencesHero,
    getConferenceDetail,
    saveConferenceDetail,
    generateId,
} from '@/lib/adminData';
import {
    ApiImpactStat,
    ApiPastConference,
    fetchImpactStats,
    createImpactStat,
    updateImpactStat,
    deleteImpactStat,
    fetchPastConferences,
    createPastConference,
    updatePastConference,
    deletePastConference,
    fetchUpcoming,
    updateUpcoming,
} from '@/lib/conferencesApi';
import { Save, Plus, Trash2, Check, Loader2 } from 'lucide-react';

// ─── Defaults ────────────────────────────────────────────────────────

const DEFAULT_HERO: ConferenceHeroGallery = {
    primary_hero_image: '',
    secondary_hero_image: '',
};

const DEFAULT_IMPACT: MissionImpactStat[] = [
    { stat_number: '1500+', stat_label: 'Attendees' },
    { stat_number: '20+', stat_label: 'Speakers' },
    { stat_number: '10+', stat_label: 'Sessions' },
    { stat_number: '5', stat_label: 'Communities Engaged' },
];

const DEFAULT_UPCOMING: UpcomingEvent = {
    is_active: false,
    name: '',
    description: '',
    date_time: '',
    location: '',
    register_url: '',
    promo_image: '',
};

const EMPTY_DETAIL: ConferenceDetail = {
    conference_name: '',
    conference_summary: '',
    hero_main_image: '',
    about_text_body: '',
    event_highlights: [''],
    about_side_image: '',
    impact: [
        { stat_number: '', stat_label: '' },
        { stat_number: '', stat_label: '' },
        { stat_number: '', stat_label: '' },
        { stat_number: '', stat_label: '' },
    ],
    news: [],
    speakers: [],
    partners: [],
    gallery: [],
};

// ─── Tabs ────────────────────────────────────────────────────────────

const tabs = ['Hero Images', 'Impact Stats', 'Past Conferences', 'Upcoming', 'Conference Details'] as const;
type Tab = (typeof tabs)[number];

// ─── Mappers ─────────────────────────────────────────────────────────

function apiImpactToLocal(a: ApiImpactStat): MissionImpactStat & { _apiId: number; _position: number } {
    return { stat_number: a.statNumber, stat_label: a.statLabel, _apiId: a.id, _position: a.position };
}

function apiConfToLocal(a: ApiPastConference): PastConferenceItem & { _apiId: number } {
    return {
        conference_id: String(a.id),
        conference_title: a.campaignTitle,
        conference_date: a.campaignDate,
        conference_image: a.campaignImage,
        _apiId: a.id,
    };
}

type ImpactWithApi = MissionImpactStat & { _apiId?: number; _position?: number };
type ConfWithApi = PastConferenceItem & { _apiId?: number };

export default function AdminConferencesPage() {
    const { getAuthHeaders } = useAdmin();
    const [activeTab, setActiveTab] = useState<Tab>('Hero Images');
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);

    // Hero (localStorage)
    const [hero, setHero] = useState<ConferenceHeroGallery>(DEFAULT_HERO);

    // Impact Stats
    const [impact, setImpact] = useState<ImpactWithApi[]>(DEFAULT_IMPACT);
    const [impactLoading, setImpactLoading] = useState(true);
    const [impactError, setImpactError] = useState('');

    // Past Conferences
    const [pastItems, setPastItems] = useState<ConfWithApi[]>([]);
    const [pastLoading, setPastLoading] = useState(true);
    const [pastError, setPastError] = useState('');

    // Upcoming
    const [upcoming, setUpcoming] = useState<UpcomingEvent>(DEFAULT_UPCOMING);
    const [upcomingLoading, setUpcomingLoading] = useState(true);
    const [upcomingError, setUpcomingError] = useState('');

    // Conference Details (localStorage)
    const [selectedConfId, setSelectedConfId] = useState<string>('');
    const [detail, setDetail] = useState<ConferenceDetail>(EMPTY_DETAIL);

    // ─── Data fetching ──────────────────────────────────────────────

    const loadImpact = useCallback(async () => {
        setImpactLoading(true);
        setImpactError('');
        try {
            const data = await fetchImpactStats();
            if (data && data.length > 0) {
                setImpact(data.map(apiImpactToLocal));
            }
        } catch (e: unknown) {
            setImpactError(e instanceof Error ? e.message : 'Failed to load impact stats');
        } finally {
            setImpactLoading(false);
        }
    }, []);

    const loadPast = useCallback(async () => {
        setPastLoading(true);
        setPastError('');
        try {
            const data = await fetchPastConferences();
            if (data) {
                setPastItems(data.map(apiConfToLocal));
            }
        } catch (e: unknown) {
            setPastError(e instanceof Error ? e.message : 'Failed to load past conferences');
        } finally {
            setPastLoading(false);
        }
    }, []);

    const loadUpcoming = useCallback(async () => {
        setUpcomingLoading(true);
        setUpcomingError('');
        try {
            const data = await fetchUpcoming();
            if (data) {
                setUpcoming({
                    is_active: true,
                    name: data.missionTitle || '',
                    description: data.missionDescription || '',
                    date_time: data.missionDate || '',
                    location: '',
                    register_url: data.missionLink || '',
                    promo_image: data.missionImage || '',
                });
            }
        } catch (e: unknown) {
            if (e instanceof Error && !e.message.includes('404')) {
                setUpcomingError(e instanceof Error ? e.message : 'Failed to load upcoming');
            }
        } finally {
            setUpcomingLoading(false);
        }
    }, []);

    useEffect(() => {
        // Hero stays localStorage
        const h = getConferencesHero();
        if (h) setHero(h);

        loadImpact();
        loadPast();
        loadUpcoming();
    }, [loadImpact, loadPast, loadUpcoming]);

    useEffect(() => {
        if (selectedConfId) {
            const d = getConferenceDetail(selectedConfId);
            setDetail(d || { ...EMPTY_DETAIL });
        }
    }, [selectedConfId]);

    const flash = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

    // ─── Impact Stats save ──────────────────────────────────────────

    const handleSaveImpact = async () => {
        setSaving(true);
        setImpactError('');
        try {
            const headers = getAuthHeaders();
            const remote = await fetchImpactStats();
            const remoteIds = new Set(remote.map((r) => r.id));
            const localIds = new Set(impact.filter((s) => s._apiId).map((s) => s._apiId!));

            for (const r of remote) {
                if (!localIds.has(r.id)) {
                    await deleteImpactStat(r.id, headers);
                }
            }

            for (let i = 0; i < impact.length; i++) {
                const stat = impact[i];
                const payload = { statNumber: stat.stat_number, statLabel: stat.stat_label, position: i };
                if (stat._apiId && remoteIds.has(stat._apiId)) {
                    await updateImpactStat(stat._apiId, payload, headers);
                } else {
                    await createImpactStat(payload, headers);
                }
            }

            flash();
            await loadImpact();
        } catch (e: unknown) {
            setImpactError(e instanceof Error ? e.message : 'Save failed');
        } finally {
            setSaving(false);
        }
    };

    // ─── Past Conference helpers ────────────────────────────────────

    const addPastConference = () => {
        setPastItems([...pastItems, { conference_id: generateId(), conference_title: '', conference_date: '', conference_image: '' }]);
    };

    const handleRemovePastConference = async (item: ConfWithApi) => {
        if (item._apiId) {
            setSaving(true);
            setPastError('');
            try {
                await deletePastConference(item._apiId, getAuthHeaders());
                setPastItems(pastItems.filter((c) => c.conference_id !== item.conference_id));
                flash();
            } catch (e: unknown) {
                setPastError(e instanceof Error ? e.message : 'Delete failed');
            } finally {
                setSaving(false);
            }
        } else {
            setPastItems(pastItems.filter((c) => c.conference_id !== item.conference_id));
        }
    };

    const handleSavePastConferences = async () => {
        setSaving(true);
        setPastError('');
        try {
            const headers = getAuthHeaders();
            for (const item of pastItems) {
                const payload = {
                    campaignTitle: item.conference_title,
                    campaignDate: item.conference_date,
                    campaignImage: item.conference_image,
                    isActive: true,
                };
                if (item._apiId) {
                    await updatePastConference(item._apiId, payload, headers);
                } else {
                    await createPastConference(payload, headers);
                }
            }
            flash();
            await loadPast();
        } catch (e: unknown) {
            setPastError(e instanceof Error ? e.message : 'Save failed');
        } finally {
            setSaving(false);
        }
    };

    // ─── Upcoming save ──────────────────────────────────────────────

    const handleSaveUpcoming = async () => {
        setSaving(true);
        setUpcomingError('');
        try {
            await updateUpcoming(
                {
                    missionTitle: upcoming.name,
                    missionDate: upcoming.date_time,
                    missionLink: upcoming.register_url,
                    missionDescription: upcoming.description,
                    missionImage: upcoming.promo_image || '',
                },
                getAuthHeaders(),
            );
            flash();
            await loadUpcoming();
        } catch (e: unknown) {
            setUpcomingError(e instanceof Error ? e.message : 'Save failed');
        } finally {
            setSaving(false);
        }
    };

    // ─── Detail helpers (localStorage) ──────────────────────────────

    const addHighlight = () => setDetail({ ...detail, event_highlights: [...detail.event_highlights, ''] });
    const removeHighlight = (idx: number) => setDetail({ ...detail, event_highlights: detail.event_highlights.filter((_, i) => i !== idx) });

    const addNewsItem = () => setDetail({ ...detail, news: [...detail.news, { id: generateId(), news_title: '', news_link: '', news_thumbnail: '' }] });
    const removeNewsItem = (id: string) => setDetail({ ...detail, news: detail.news.filter((n) => n.id !== id) });

    const addSpeaker = () => setDetail({ ...detail, speakers: [...detail.speakers, { id: generateId(), speaker_name: '', speaker_role: '', speaker_image: '' }] });
    const removeSpeaker = (id: string) => setDetail({ ...detail, speakers: detail.speakers.filter((s) => s.id !== id) });

    const addPartner = () => setDetail({ ...detail, partners: [...detail.partners, { name: '', logo: '' }] });
    const removePartner = (idx: number) => setDetail({ ...detail, partners: detail.partners.filter((_, i) => i !== idx) });

    const addGalleryImage = () => setDetail({ ...detail, gallery: [...detail.gallery, ''] });
    const removeGalleryImage = (idx: number) => setDetail({ ...detail, gallery: detail.gallery.filter((_, i) => i !== idx) });

    const inputCls = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500';
    const btnSave = 'flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors';
    const btnAdd = 'flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors';

    const ErrorBanner = ({ message }: { message: string }) =>
        message ? (
            <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {message}
            </div>
        ) : null;

    const SectionLoader = () => (
        <div className="flex items-center justify-center py-12 text-gray-400 gap-2">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-sm">Loading…</span>
        </div>
    );

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Conferences</h1>
                <p className="text-gray-500 mt-1">Manage conference hero images, impact stats, past items, upcoming events, and individual details.</p>
            </div>

            {saved && (
                <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-xl shadow-lg">
                    <Check size={16} /> Saved successfully
                </div>
            )}

            {saving && (
                <div className="fixed inset-0 z-40 bg-black/10 flex items-center justify-center">
                    <div className="bg-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3">
                        <Loader2 size={20} className="animate-spin text-orange-500" />
                        <span className="text-sm font-medium text-gray-700">Saving…</span>
                    </div>
                </div>
            )}

            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit flex-wrap">
                {tabs.map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                        {tab}
                    </button>
                ))}
            </div>

            {/* ──── HERO IMAGES (localStorage) ──── */}
            {activeTab === 'Hero Images' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">Hero Section Images</h2>
                            <p className="text-sm text-gray-500">Exactly 2 high-resolution images</p>
                        </div>
                        <button onClick={() => { saveConferencesHero(hero); flash(); }} className={btnSave}><Save size={16} /> Save</button>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <CloudinaryImageUpload
                                label="Primary Hero Image"
                                value={hero.primary_hero_image}
                                onUpload={(url) => setHero({ ...hero, primary_hero_image: url })}
                            />
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <CloudinaryImageUpload
                                label="Secondary Hero Image"
                                value={hero.secondary_hero_image}
                                onUpload={(url) => setHero({ ...hero, secondary_hero_image: url })}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ──── IMPACT STATS ──── */}
            {activeTab === 'Impact Stats' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">Conference Impact Metrics</h2>
                            <p className="text-sm text-gray-500">Exactly 4 records</p>
                        </div>
                        <button onClick={handleSaveImpact} disabled={saving} className={btnSave}><Save size={16} /> Save</button>
                    </div>
                    <ErrorBanner message={impactError} />
                    {impactLoading ? (
                        <SectionLoader />
                    ) : (
                        <div className="space-y-4">
                            {impact.map((stat, i) => (
                                <div key={stat._apiId ?? `new-${i}`} className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Number (max 10)</label>
                                        <input type="text" maxLength={10} value={stat.stat_number} onChange={(e) => { const u = [...impact]; u[i] = { ...u[i], stat_number: e.target.value }; setImpact(u); }} className={inputCls} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Label (max 25)</label>
                                        <input type="text" maxLength={25} value={stat.stat_label} onChange={(e) => { const u = [...impact]; u[i] = { ...u[i], stat_label: e.target.value }; setImpact(u); }} className={inputCls} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ──── PAST CONFERENCES ──── */}
            {activeTab === 'Past Conferences' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">Past Conferences</h2>
                            <p className="text-sm text-gray-500">Interactive slider items</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={addPastConference} className={btnAdd}><Plus size={16} /> Add</button>
                            <button onClick={handleSavePastConferences} disabled={saving} className={btnSave}><Save size={16} /> Save</button>
                        </div>
                    </div>
                    <ErrorBanner message={pastError} />
                    {pastLoading ? (
                        <SectionLoader />
                    ) : (
                        <div className="space-y-4">
                            {pastItems.map((item, i) => (
                                <div key={item.conference_id} className="p-4 bg-gray-50 rounded-xl relative">
                                    <button onClick={() => handleRemovePastConference(item)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Title (max 30)</label>
                                            <input type="text" maxLength={30} value={item.conference_title} onChange={(e) => { const u = [...pastItems]; u[i] = { ...u[i], conference_title: e.target.value }; setPastItems(u); }} className={inputCls} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Date (max 15)</label>
                                            <input type="text" maxLength={15} value={item.conference_date} onChange={(e) => { const u = [...pastItems]; u[i] = { ...u[i], conference_date: e.target.value }; setPastItems(u); }} className={inputCls} />
                                        </div>
                                        <div>
                                            <CloudinaryImageUpload
                                                label="Conference Image"
                                                value={item.conference_image}
                                                onUpload={(url) => { const u = [...pastItems]; u[i] = { ...u[i], conference_image: url }; setPastItems(u); }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {pastItems.length === 0 && <p className="text-gray-400 text-sm text-center py-8">No past conferences added yet.</p>}
                        </div>
                    )}
                </div>
            )}

            {/* ──── UPCOMING CONFERENCE ──── */}
            {activeTab === 'Upcoming' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">Upcoming Conference</h2>
                            <p className="text-sm text-gray-500">Edit the next upcoming conference details</p>
                        </div>
                        <button onClick={handleSaveUpcoming} disabled={saving} className={btnSave}><Save size={16} /> Save</button>
                    </div>
                    <ErrorBanner message={upcomingError} />
                    {upcomingLoading ? (
                        <SectionLoader />
                    ) : (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Conference Name (max 50)</label>
                                    <input type="text" maxLength={50} value={upcoming.name} onChange={(e) => setUpcoming({ ...upcoming, name: e.target.value })} className={inputCls} />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Date & Time (max 40)</label>
                                    <input type="text" maxLength={40} value={upcoming.date_time} onChange={(e) => setUpcoming({ ...upcoming, date_time: e.target.value })} className={inputCls} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Description (max 350)</label>
                                <textarea maxLength={350} rows={3} value={upcoming.description} onChange={(e) => setUpcoming({ ...upcoming, description: e.target.value })} className={`${inputCls} resize-none`} />
                                <span className="text-xs text-gray-400">{upcoming.description.length}/350</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Location (max 40)</label>
                                    <input type="text" maxLength={40} value={upcoming.location} onChange={(e) => setUpcoming({ ...upcoming, location: e.target.value })} className={inputCls} />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Register URL</label>
                                    <input type="text" value={upcoming.register_url} onChange={(e) => setUpcoming({ ...upcoming, register_url: e.target.value })} className={inputCls} />
                                </div>
                            </div>
                            <div>
                                <CloudinaryImageUpload
                                    label="Promo Image"
                                    value={upcoming.promo_image || ''}
                                    onUpload={(url) => setUpcoming({ ...upcoming, promo_image: url })}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ──── CONFERENCE DETAILS (localStorage) ──── */}
            {activeTab === 'Conference Details' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">Individual Conference Details</h2>
                            <p className="text-sm text-gray-500">Select a past conference to edit its full detail page</p>
                        </div>
                        <button
                            onClick={() => { if (selectedConfId) { saveConferenceDetail(selectedConfId, detail); flash(); } }}
                            disabled={!selectedConfId}
                            className={`${btnSave} ${!selectedConfId ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <Save size={16} /> Save Detail
                        </button>
                    </div>

                    <div className="mb-6">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Select Conference</label>
                        <select value={selectedConfId} onChange={(e) => setSelectedConfId(e.target.value)} className={inputCls}>
                            <option value="">— Choose a conference —</option>
                            {pastItems.map((c) => (
                                <option key={c.conference_id} value={c.conference_id}>{c.conference_title || `Conference ${c.conference_id}`}</option>
                            ))}
                        </select>
                    </div>

                    {selectedConfId && (
                        <div className="space-y-6">
                            {/* Hero */}
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <h3 className="font-semibold text-gray-800 text-sm">Hero Section</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Conference Name (max 50)</label>
                                        <input type="text" maxLength={50} value={detail.conference_name} onChange={(e) => setDetail({ ...detail, conference_name: e.target.value })} className={inputCls} />
                                    </div>
                                    <div>
                                        <CloudinaryImageUpload
                                            label="Hero Main Image"
                                            value={detail.hero_main_image}
                                            onUpload={(url) => setDetail({ ...detail, hero_main_image: url })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Conference Summary (max 250)</label>
                                    <textarea maxLength={250} rows={2} value={detail.conference_summary} onChange={(e) => setDetail({ ...detail, conference_summary: e.target.value })} className={`${inputCls} resize-none`} />
                                    <span className="text-xs text-gray-400">{detail.conference_summary.length}/250</span>
                                </div>
                            </div>

                            {/* About */}
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <h3 className="font-semibold text-gray-800 text-sm">What We Did</h3>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">About Text (max 600)</label>
                                    <textarea maxLength={600} rows={4} value={detail.about_text_body} onChange={(e) => setDetail({ ...detail, about_text_body: e.target.value })} className={`${inputCls} resize-none`} />
                                    <span className="text-xs text-gray-400">{detail.about_text_body.length}/600</span>
                                </div>
                                <div>
                                    <CloudinaryImageUpload
                                        label="Side Image"
                                        value={detail.about_side_image}
                                        onUpload={(url) => setDetail({ ...detail, about_side_image: url })}
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-xs font-medium text-gray-500">Event Highlights (max 100 chars each)</label>
                                        <button onClick={addHighlight} className="text-xs text-orange-500 hover:text-orange-600 font-medium">+ Add</button>
                                    </div>
                                    {detail.event_highlights.map((item, idx) => (
                                        <div key={idx} className="flex gap-2 mb-2">
                                            <input type="text" maxLength={100} value={item} onChange={(e) => { const u = [...detail.event_highlights]; u[idx] = e.target.value; setDetail({ ...detail, event_highlights: u }); }} className={`${inputCls} flex-1`} />
                                            <button onClick={() => removeHighlight(idx)} className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Impact */}
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <h3 className="font-semibold text-gray-800 text-sm">Impact Metrics</h3>
                                {detail.impact.map((imp, i) => (
                                    <div key={i} className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Value (max 10)</label>
                                            <input type="text" maxLength={10} value={imp.stat_number} onChange={(e) => { const u = [...detail.impact]; u[i] = { ...u[i], stat_number: e.target.value }; setDetail({ ...detail, impact: u }); }} className={inputCls} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Label (max 25)</label>
                                            <input type="text" maxLength={25} value={imp.stat_label} onChange={(e) => { const u = [...detail.impact]; u[i] = { ...u[i], stat_label: e.target.value }; setDetail({ ...detail, impact: u }); }} className={inputCls} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* News */}
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-800 text-sm">News Highlights (3 cards)</h3>
                                    <button onClick={addNewsItem} className="text-xs text-orange-500 hover:text-orange-600 font-medium">+ Add News</button>
                                </div>
                                {detail.news.map((n, i) => (
                                    <div key={n.id} className="p-3 bg-white rounded-lg border border-gray-200 relative">
                                        <button onClick={() => removeNewsItem(n.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                                        <div className="grid grid-cols-3 gap-3">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Title (max 60)</label>
                                                <input type="text" maxLength={60} value={n.news_title} onChange={(e) => { const u = [...detail.news]; u[i] = { ...u[i], news_title: e.target.value }; setDetail({ ...detail, news: u }); }} className={inputCls} />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Link URL</label>
                                                <input type="text" value={n.news_link} onChange={(e) => { const u = [...detail.news]; u[i] = { ...u[i], news_link: e.target.value }; setDetail({ ...detail, news: u }); }} className={inputCls} />
                                            </div>
                                            <div>
                                                <CloudinaryImageUpload
                                                    label="News Thumbnail"
                                                    value={n.news_thumbnail}
                                                    onUpload={(url) => { const u = [...detail.news]; u[i] = { ...u[i], news_thumbnail: url }; setDetail({ ...detail, news: u }); }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Speakers */}
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-800 text-sm">Speakers</h3>
                                    <button onClick={addSpeaker} className="text-xs text-orange-500 hover:text-orange-600 font-medium">+ Add Speaker</button>
                                </div>
                                {detail.speakers.map((sp, i) => (
                                    <div key={sp.id} className="p-3 bg-white rounded-lg border border-gray-200 relative">
                                        <button onClick={() => removeSpeaker(sp.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                                        <div className="grid grid-cols-3 gap-3">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Name (max 40)</label>
                                                <input type="text" maxLength={40} value={sp.speaker_name} onChange={(e) => { const u = [...detail.speakers]; u[i] = { ...u[i], speaker_name: e.target.value }; setDetail({ ...detail, speakers: u }); }} className={inputCls} />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Role (max 50)</label>
                                                <input type="text" maxLength={50} value={sp.speaker_role} onChange={(e) => { const u = [...detail.speakers]; u[i] = { ...u[i], speaker_role: e.target.value }; setDetail({ ...detail, speakers: u }); }} className={inputCls} />
                                            </div>
                                            <div>
                                                <CloudinaryImageUpload
                                                    label="Speaker Image"
                                                    value={sp.speaker_image}
                                                    onUpload={(url) => { const u = [...detail.speakers]; u[i] = { ...u[i], speaker_image: url }; setDetail({ ...detail, speakers: u }); }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Partners */}
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-800 text-sm">Partners</h3>
                                    <button onClick={addPartner} className="text-xs text-orange-500 hover:text-orange-600 font-medium">+ Add Partner</button>
                                </div>
                                {detail.partners.map((p, i) => (
                                    <div key={i} className="flex gap-2 items-start">
                                        <input
                                            type="text"
                                            placeholder="Partner Name"
                                            value={p.name}
                                            onChange={(e) => {
                                                const u = [...detail.partners];
                                                u[i] = { ...p, name: e.target.value };
                                                setDetail({ ...detail, partners: u });
                                            }}
                                            className={`${inputCls} flex-1`}
                                        />
                                        <div className="flex-1">
                                            <CloudinaryImageUpload
                                                label="Partner Logo"
                                                value={p.logo}
                                                onUpload={(url) => {
                                                    const u = [...detail.partners];
                                                    u[i] = { ...p, logo: url };
                                                    setDetail({ ...detail, partners: u });
                                                }}
                                            />
                                        </div>
                                        <button onClick={() => removePartner(i)} className="text-gray-400 hover:text-red-500 mt-6"><Trash2 size={14} /></button>
                                    </div>
                                ))}
                            </div>

                            {/* Gallery */}
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-800 text-sm">Gallery</h3>
                                    <button onClick={addGalleryImage} className="text-xs text-orange-500 hover:text-orange-600 font-medium">+ Add Image</button>
                                </div>
                                {detail.gallery.map((url, i) => (
                                    <div key={i} className="flex gap-2 items-start">
                                        <div className="flex-1">
                                            <CloudinaryImageUpload
                                                label={`Gallery Image ${i + 1}`}
                                                value={url}
                                                onUpload={(newUrl) => { const u = [...detail.gallery]; u[i] = newUrl; setDetail({ ...detail, gallery: u }); }}
                                            />
                                        </div>
                                        <button onClick={() => removeGalleryImage(i)} className="text-gray-400 hover:text-red-500 mt-6"><Trash2 size={14} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {!selectedConfId && (
                        <p className="text-gray-400 text-sm text-center py-8">Add past conferences first, then select one here to edit its detail page.</p>
                    )}
                </div>
            )}
        </div>
    );
}
