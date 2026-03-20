'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import CloudinaryImageUpload from '@/components/CloudinaryImageUpload';
import {
    MissionImpactStat,
    PastCampaignItem,
    UpcomingEvent,
    CampaignDetail,
    getCampaignDetail,
    saveCampaignDetail,
    generateId,
} from '@/lib/adminData';
import {
    ApiImpactStat,
    ApiPastCampaign,
    fetchImpactStats,
    createImpactStat,
    updateImpactStat,
    deleteImpactStat,
    fetchPastCampaigns,
    createPastCampaign,
    updatePastCampaign,
    deletePastCampaign,
    fetchUpcoming,
    updateUpcoming,
} from '@/lib/campaignsApi';
import { Save, Plus, Trash2, Check, Loader2 } from 'lucide-react';

// ─── Defaults ────────────────────────────────────────────────────────

const DEFAULT_IMPACT: MissionImpactStat[] = [
    { stat_number: '6+', stat_label: 'Campaign Activities' },
    { stat_number: '15+', stat_label: 'Schools & Communities' },
    { stat_number: '30+', stat_label: 'Volunteers Mobilised' },
    { stat_number: '1000+', stat_label: 'Teenagers Reached' },
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

const EMPTY_DETAIL: CampaignDetail = {
    campaign_name: '',
    short_description: '',
    hero_video_url: '',
    about_text_body: '',
    action_items: [''],
    about_side_image: '',
    impact: [
        { stat_number: '', stat_label: '' },
        { stat_number: '', stat_label: '' },
        { stat_number: '', stat_label: '' },
        { stat_number: '', stat_label: '' },
    ],
    partners: [],
    gallery: [],
};

// ─── Tabs ────────────────────────────────────────────────────────────

const tabs = ['Impact Stats', 'Past Campaigns', 'Upcoming', 'Campaign Details'] as const;
type Tab = (typeof tabs)[number];

// ─── Mappers (API ↔ local) ──────────────────────────────────────────

function apiImpactToLocal(a: ApiImpactStat): MissionImpactStat & { _apiId: number; _position: number } {
    return { stat_number: a.statNumber, stat_label: a.statLabel, _apiId: a.id, _position: a.position };
}

function apiCampaignToLocal(a: ApiPastCampaign): PastCampaignItem & { _apiId: number } {
    return {
        campaign_id: String(a.id),
        campaign_title: a.campaignTitle,
        campaign_date: a.campaignDate,
        campaign_image: a.campaignImage,
        _apiId: a.id,
    };
}

// Extended local types
type ImpactWithApi = MissionImpactStat & { _apiId?: number; _position?: number };
type CampaignWithApi = PastCampaignItem & { _apiId?: number };

export default function AdminCampaignsPage() {
    const { getAuthHeaders } = useAdmin();
    const [activeTab, setActiveTab] = useState<Tab>('Impact Stats');
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);

    // Impact Stats
    const [impact, setImpact] = useState<ImpactWithApi[]>(DEFAULT_IMPACT);
    const [impactLoading, setImpactLoading] = useState(true);
    const [impactError, setImpactError] = useState('');

    // Past Campaigns
    const [pastItems, setPastItems] = useState<CampaignWithApi[]>([]);
    const [pastLoading, setPastLoading] = useState(true);
    const [pastError, setPastError] = useState('');

    // Upcoming
    const [upcoming, setUpcoming] = useState<UpcomingEvent>(DEFAULT_UPCOMING);
    const [upcomingApiId, setUpcomingApiId] = useState<number | null>(null);
    const [upcomingLoading, setUpcomingLoading] = useState(true);
    const [upcomingError, setUpcomingError] = useState('');

    // Campaign Details (still localStorage)
    const [selectedCampaignId, setSelectedCampaignId] = useState<string>('');
    const [detail, setDetail] = useState<CampaignDetail>(EMPTY_DETAIL);

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
            const data = await fetchPastCampaigns();
            if (data) {
                setPastItems(data.map(apiCampaignToLocal));
            }
        } catch (e: unknown) {
            setPastError(e instanceof Error ? e.message : 'Failed to load past campaigns');
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
                setUpcomingApiId(data.id);
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
            // If 404 or no upcoming, that's fine — use defaults
            if (e instanceof Error && !e.message.includes('404')) {
                setUpcomingError(e instanceof Error ? e.message : 'Failed to load upcoming');
            }
        } finally {
            setUpcomingLoading(false);
        }
    }, []);

    useEffect(() => {
        loadImpact();
        loadPast();
        loadUpcoming();
    }, [loadImpact, loadPast, loadUpcoming]);

    // Load detail when selecting a campaign (localStorage)
    useEffect(() => {
        if (selectedCampaignId) {
            const d = getCampaignDetail(selectedCampaignId);
            setDetail(d || { ...EMPTY_DETAIL });
        }
    }, [selectedCampaignId]);

    const flash = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    // ─── Impact Stats save ──────────────────────────────────────────

    const handleSaveImpact = async () => {
        setSaving(true);
        setImpactError('');
        try {
            const headers = getAuthHeaders();
            // Fetch current remote list to determine creates vs. updates vs. deletes
            const remote = await fetchImpactStats();
            const remoteIds = new Set(remote.map((r) => r.id));
            const localIds = new Set(impact.filter((s) => s._apiId).map((s) => s._apiId!));

            // Delete stats that no longer exist locally
            for (const r of remote) {
                if (!localIds.has(r.id)) {
                    await deleteImpactStat(r.id, headers);
                }
            }

            // Create or update
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
            await loadImpact(); // refresh from server
        } catch (e: unknown) {
            setImpactError(e instanceof Error ? e.message : 'Save failed');
        } finally {
            setSaving(false);
        }
    };

    // ─── Past Campaign helpers ──────────────────────────────────────

    const addPastCampaign = () => {
        setPastItems([
            ...pastItems,
            { campaign_id: generateId(), campaign_title: '', campaign_date: '', campaign_image: '' },
        ]);
    };

    const handleRemovePastCampaign = async (item: CampaignWithApi) => {
        if (item._apiId) {
            setSaving(true);
            setPastError('');
            try {
                await deletePastCampaign(item._apiId, getAuthHeaders());
                setPastItems(pastItems.filter((c) => c.campaign_id !== item.campaign_id));
                flash();
            } catch (e: unknown) {
                setPastError(e instanceof Error ? e.message : 'Delete failed');
            } finally {
                setSaving(false);
            }
        } else {
            // Remove unsaved local item
            setPastItems(pastItems.filter((c) => c.campaign_id !== item.campaign_id));
        }
    };

    const handleSavePastCampaigns = async () => {
        setSaving(true);
        setPastError('');
        try {
            const headers = getAuthHeaders();
            for (const item of pastItems) {
                const payload = {
                    campaignTitle: item.campaign_title,
                    campaignDate: item.campaign_date,
                    campaignImage: item.campaign_image,
                    isActive: true,
                };
                if (item._apiId) {
                    await updatePastCampaign(item._apiId, payload, headers);
                } else {
                    await createPastCampaign(payload, headers);
                }
            }
            flash();
            await loadPast(); // refresh from server
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

    // ─── Detail helpers (still localStorage) ────────────────────────

    const addActionItem = () => setDetail({ ...detail, action_items: [...detail.action_items, ''] });
    const removeActionItem = (idx: number) =>
        setDetail({ ...detail, action_items: detail.action_items.filter((_, i) => i !== idx) });

    const addPartner = () => setDetail({ ...detail, partners: [...detail.partners, { name: '', logo: '' }] });
    const removePartner = (idx: number) =>
        setDetail({ ...detail, partners: detail.partners.filter((_, i) => i !== idx) });

    const addGalleryImage = () => setDetail({ ...detail, gallery: [...detail.gallery, ''] });
    const removeGalleryImage = (idx: number) =>
        setDetail({ ...detail, gallery: detail.gallery.filter((_, i) => i !== idx) });

    // CSS classes
    const inputCls =
        'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500';
    const btnSave =
        'flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors';
    const btnAdd =
        'flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors';

    // Error banner
    const ErrorBanner = ({ message }: { message: string }) =>
        message ? (
            <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {message}
            </div>
        ) : null;

    // Section loader
    const SectionLoader = () => (
        <div className="flex items-center justify-center py-12 text-gray-400 gap-2">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-sm">Loading…</span>
        </div>
    );

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
                <p className="text-gray-500 mt-1">Manage campaign impact stats, past items, upcoming events, and individual details.</p>
            </div>

            {saved && (
                <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-xl shadow-lg">
                    <Check size={16} /> Saved successfully
                </div>
            )}

            {/* Saving overlay */}
            {saving && (
                <div className="fixed inset-0 z-40 bg-black/10 flex items-center justify-center">
                    <div className="bg-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3">
                        <Loader2 size={20} className="animate-spin text-orange-500" />
                        <span className="text-sm font-medium text-gray-700">Saving…</span>
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit flex-wrap">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* ──── IMPACT STATS ──── */}
            {activeTab === 'Impact Stats' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">Campaigns&apos; Impact</h2>
                            <p className="text-sm text-gray-500">Exactly 4 records</p>
                        </div>
                        <button onClick={handleSaveImpact} disabled={saving} className={btnSave}>
                            <Save size={16} /> Save
                        </button>
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
                                        <input
                                            type="text"
                                            maxLength={10}
                                            value={stat.stat_number}
                                            onChange={(e) => {
                                                const u = [...impact];
                                                u[i] = { ...u[i], stat_number: e.target.value };
                                                setImpact(u);
                                            }}
                                            className={inputCls}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Label (max 25)</label>
                                        <input
                                            type="text"
                                            maxLength={25}
                                            value={stat.stat_label}
                                            onChange={(e) => {
                                                const u = [...impact];
                                                u[i] = { ...u[i], stat_label: e.target.value };
                                                setImpact(u);
                                            }}
                                            className={inputCls}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ──── PAST CAMPAIGNS ──── */}
            {activeTab === 'Past Campaigns' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">Past Campaigns</h2>
                            <p className="text-sm text-gray-500">Interactive slider items</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={addPastCampaign} className={btnAdd}>
                                <Plus size={16} /> Add
                            </button>
                            <button onClick={handleSavePastCampaigns} disabled={saving} className={btnSave}>
                                <Save size={16} /> Save
                            </button>
                        </div>
                    </div>
                    <ErrorBanner message={pastError} />
                    {pastLoading ? (
                        <SectionLoader />
                    ) : (
                        <div className="space-y-4">
                            {pastItems.map((item, i) => (
                                <div key={item.campaign_id} className="p-4 bg-gray-50 rounded-xl relative">
                                    <button
                                        onClick={() => handleRemovePastCampaign(item)}
                                        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Title (max 30)</label>
                                            <input
                                                type="text"
                                                maxLength={30}
                                                value={item.campaign_title}
                                                onChange={(e) => {
                                                    const u = [...pastItems];
                                                    u[i] = { ...u[i], campaign_title: e.target.value };
                                                    setPastItems(u);
                                                }}
                                                className={inputCls}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Date (max 15)</label>
                                            <input
                                                type="text"
                                                maxLength={15}
                                                value={item.campaign_date}
                                                onChange={(e) => {
                                                    const u = [...pastItems];
                                                    u[i] = { ...u[i], campaign_date: e.target.value };
                                                    setPastItems(u);
                                                }}
                                                className={inputCls}
                                            />
                                        </div>
                                        <div>
                                            <CloudinaryImageUpload
                                                label="Campaign Image"
                                                value={item.campaign_image}
                                                onUpload={(url) => {
                                                    const u = [...pastItems];
                                                    u[i] = { ...u[i], campaign_image: url };
                                                    setPastItems(u);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {pastItems.length === 0 && (
                                <p className="text-gray-400 text-sm text-center py-8">No past campaigns added yet. Click &quot;Add&quot; to create one.</p>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* ──── UPCOMING CAMPAIGN ──── */}
            {activeTab === 'Upcoming' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">Upcoming Campaign</h2>
                            <p className="text-sm text-gray-500">Edit the next upcoming campaign details</p>
                        </div>
                        <button onClick={handleSaveUpcoming} disabled={saving} className={btnSave}>
                            <Save size={16} /> Save
                        </button>
                    </div>
                    <ErrorBanner message={upcomingError} />
                    {upcomingLoading ? (
                        <SectionLoader />
                    ) : (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Campaign Name (max 50)</label>
                                    <input type="text" maxLength={50} value={upcoming.name} onChange={(e) => setUpcoming({ ...upcoming, name: e.target.value })} className={inputCls} />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Date & Time (max 40)</label>
                                    <input type="text" maxLength={40} value={upcoming.date_time} onChange={(e) => setUpcoming({ ...upcoming, date_time: e.target.value })} className={inputCls} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Description (max 350)</label>
                                <textarea
                                    maxLength={350}
                                    rows={3}
                                    value={upcoming.description}
                                    onChange={(e) => setUpcoming({ ...upcoming, description: e.target.value })}
                                    className={`${inputCls} resize-none`}
                                />
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

            {/* ──── CAMPAIGN DETAILS (localStorage) ──── */}
            {activeTab === 'Campaign Details' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">Individual Campaign Details</h2>
                            <p className="text-sm text-gray-500">Select a past campaign to edit its full detail page</p>
                        </div>
                        <button
                            onClick={() => {
                                if (selectedCampaignId) {
                                    saveCampaignDetail(selectedCampaignId, detail);
                                    flash();
                                }
                            }}
                            disabled={!selectedCampaignId}
                            className={`${btnSave} ${!selectedCampaignId ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <Save size={16} /> Save Detail
                        </button>
                    </div>

                    {/* Campaign selector */}
                    <div className="mb-6">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Select Campaign</label>
                        <select
                            value={selectedCampaignId}
                            onChange={(e) => setSelectedCampaignId(e.target.value)}
                            className={inputCls}
                        >
                            <option value="">— Choose a campaign —</option>
                            {pastItems.map((c) => (
                                <option key={c.campaign_id} value={c.campaign_id}>
                                    {c.campaign_title || `Campaign ${c.campaign_id}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedCampaignId && (
                        <div className="space-y-6">
                            {/* Hero */}
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <h3 className="font-semibold text-gray-800 text-sm">Hero Campaign Overview</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Campaign Name (max 40)</label>
                                        <input type="text" maxLength={40} value={detail.campaign_name} onChange={(e) => setDetail({ ...detail, campaign_name: e.target.value })} className={inputCls} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Hero Video URL</label>
                                        <input type="text" value={detail.hero_video_url} onChange={(e) => setDetail({ ...detail, hero_video_url: e.target.value })} className={inputCls} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Short Description (max 250)</label>
                                    <textarea maxLength={250} rows={2} value={detail.short_description} onChange={(e) => setDetail({ ...detail, short_description: e.target.value })} className={`${inputCls} resize-none`} />
                                    <span className="text-xs text-gray-400">{detail.short_description.length}/250</span>
                                </div>
                            </div>

                            {/* About */}
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <h3 className="font-semibold text-gray-800 text-sm">About Event & What We Did</h3>
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
                                        <label className="text-xs font-medium text-gray-500">Action Items (max 100 chars each)</label>
                                        <button onClick={addActionItem} className="text-xs text-orange-500 hover:text-orange-600 font-medium">+ Add Item</button>
                                    </div>
                                    {detail.action_items.map((item, idx) => (
                                        <div key={idx} className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                maxLength={100}
                                                value={item}
                                                onChange={(e) => {
                                                    const u = [...detail.action_items];
                                                    u[idx] = e.target.value;
                                                    setDetail({ ...detail, action_items: u });
                                                }}
                                                className={`${inputCls} flex-1`}
                                            />
                                            <button onClick={() => removeActionItem(idx)} className="text-gray-400 hover:text-red-500">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Impact Metrics */}
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <h3 className="font-semibold text-gray-800 text-sm">Campaign Impact Metrics</h3>
                                {detail.impact.map((imp, i) => (
                                    <div key={i} className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Value (max 10)</label>
                                            <input
                                                type="text"
                                                maxLength={10}
                                                value={imp.stat_number}
                                                onChange={(e) => {
                                                    const u = [...detail.impact];
                                                    u[i] = { ...u[i], stat_number: e.target.value };
                                                    setDetail({ ...detail, impact: u });
                                                }}
                                                className={inputCls}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Label (max 25)</label>
                                            <input
                                                type="text"
                                                maxLength={25}
                                                value={imp.stat_label}
                                                onChange={(e) => {
                                                    const u = [...detail.impact];
                                                    u[i] = { ...u[i], stat_label: e.target.value };
                                                    setDetail({ ...detail, impact: u });
                                                }}
                                                className={inputCls}
                                            />
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
                                        <button onClick={() => removePartner(i)} className="text-gray-400 hover:text-red-500 mt-6">
                                            <Trash2 size={14} />
                                        </button>
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
                                                onUpload={(newUrl) => {
                                                    const u = [...detail.gallery];
                                                    u[i] = newUrl;
                                                    setDetail({ ...detail, gallery: u });
                                                }}
                                            />
                                        </div>
                                        <button onClick={() => removeGalleryImage(i)} className="text-gray-400 hover:text-red-500 mt-6">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {!selectedCampaignId && (
                        <p className="text-gray-400 text-sm text-center py-8">
                            Add past campaigns in the &quot;Past Campaigns&quot; tab first, then select one here to edit its detail page.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
