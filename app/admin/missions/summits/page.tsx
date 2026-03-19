'use client';

import { useState, useEffect } from 'react';
import CloudinaryImageUpload from '@/components/CloudinaryImageUpload';
import {
    MissionImpactStat,
    PastSummitItem,
    UpcomingEvent,
    SummitDetail,
    Speaker,
    getSummitsHeroGallery,
    saveSummitsHeroGallery,
    getSummitsImpact,
    saveSummitsImpact,
    getPastSummits,
    savePastSummits,
    getUpcomingSummit,
    saveUpcomingSummit,
    getSummitDetail,
    saveSummitDetail,
    generateId,
} from '@/lib/adminData';
import { Save, Plus, Trash2, Check } from 'lucide-react';

// ─── Defaults ────────────────────────────────────────────────────────

const DEFAULT_HERO_GALLERY = ['/images/fsummit.svg', '/images/msummit.svg', '/images/Ssummit.svg'];

const DEFAULT_IMPACT: MissionImpactStat[] = [
    { stat_number: '500+', stat_label: 'Teenagers Reached' },
    { stat_number: '25', stat_label: 'Volunteers Mobilised' },
    { stat_number: '7+', stat_label: 'Sessions Delivered' },
    { stat_number: '1', stat_label: 'Communities Engaged' },
];

const DEFAULT_UPCOMING: UpcomingEvent = {
    is_active: false,
    name: '',
    description: '',
    date_time: '',
    location: '',
    register_url: '',
};

const EMPTY_DETAIL: SummitDetail = {
    summit_name: '',
    short_description: '',
    hero_video_url: '',
    about_text_body: '',
    event_highlights: [''],
    event_side_image: '',
    impact: [
        { stat_number: '', stat_label: '' },
        { stat_number: '', stat_label: '' },
        { stat_number: '', stat_label: '' },
        { stat_number: '', stat_label: '' },
    ],
    speakers: [],
    partners: [],
    gallery: [],
};

// ─── Tabs ────────────────────────────────────────────────────────────

const tabs = ['Hero Gallery', 'Impact Stats', 'Past Summits', 'Upcoming', 'Summit Details'] as const;
type Tab = (typeof tabs)[number];

export default function AdminSummitsPage() {
    const [activeTab, setActiveTab] = useState<Tab>('Hero Gallery');
    const [saved, setSaved] = useState(false);

    // Hero Gallery
    const [heroImages, setHeroImages] = useState<string[]>(DEFAULT_HERO_GALLERY);

    // Impact Stats
    const [impact, setImpact] = useState<MissionImpactStat[]>(DEFAULT_IMPACT);

    // Past Summits
    const [pastItems, setPastItems] = useState<PastSummitItem[]>([]);

    // Upcoming
    const [upcoming, setUpcoming] = useState<UpcomingEvent>(DEFAULT_UPCOMING);

    // Summit Details
    const [selectedSummitId, setSelectedSummitId] = useState<string>('');
    const [detail, setDetail] = useState<SummitDetail>(EMPTY_DETAIL);

    useEffect(() => {
        const h = getSummitsHeroGallery();
        if (h) setHeroImages(h);
        const i = getSummitsImpact();
        if (i) setImpact(i);
        const p = getPastSummits();
        if (p) setPastItems(p);
        const u = getUpcomingSummit();
        if (u) setUpcoming(u);
    }, []);

    useEffect(() => {
        if (selectedSummitId) {
            const d = getSummitDetail(selectedSummitId);
            setDetail(d || { ...EMPTY_DETAIL });
        }
    }, [selectedSummitId]);

    const flash = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

    const addPastSummit = () => {
        setPastItems([...pastItems, { summit_id: generateId(), summit_title: '', summit_date: '', summit_image: '' }]);
    };
    const removePastSummit = (id: string) => setPastItems(pastItems.filter((s) => s.summit_id !== id));

    // Detail helpers
    const addHighlight = () => setDetail({ ...detail, event_highlights: [...detail.event_highlights, ''] });
    const removeHighlight = (idx: number) => setDetail({ ...detail, event_highlights: detail.event_highlights.filter((_, i) => i !== idx) });

    const addSpeaker = () => setDetail({ ...detail, speakers: [...detail.speakers, { id: generateId(), speaker_name: '', speaker_role: '', speaker_image: '' }] });
    const removeSpeaker = (id: string) => setDetail({ ...detail, speakers: detail.speakers.filter((s) => s.id !== id) });

    const addPartner = () => setDetail({ ...detail, partners: [...detail.partners, { name: '', logo: '' }] });
    const removePartner = (idx: number) => setDetail({ ...detail, partners: detail.partners.filter((_, i) => i !== idx) });

    const addGalleryImage = () => setDetail({ ...detail, gallery: [...detail.gallery, ''] });
    const removeGalleryImage = (idx: number) => setDetail({ ...detail, gallery: detail.gallery.filter((_, i) => i !== idx) });

    const inputCls = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500';
    const btnSave = 'flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors';
    const btnAdd = 'flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors';

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Summits</h1>
                <p className="text-gray-500 mt-1">Manage summit hero gallery, impact stats, past items, upcoming events, and individual details.</p>
            </div>

            {saved && (
                <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-xl shadow-lg">
                    <Check size={16} /> Saved successfully
                </div>
            )}

            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit flex-wrap">
                {tabs.map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                        {tab}
                    </button>
                ))}
            </div>

            {/* ──── HERO GALLERY ──── */}
            {activeTab === 'Hero Gallery' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">Hero Highlight Images</h2>
                            <p className="text-sm text-gray-500">Exactly 3 images</p>
                        </div>
                        <button onClick={() => { saveSummitsHeroGallery(heroImages); flash(); }} className={btnSave}>
                            <Save size={16} /> Save
                        </button>
                    </div>
                    <div className="space-y-4">
                        {heroImages.map((url, i) => (
                            <div key={i} className="p-4 bg-gray-50 rounded-xl">
                                <CloudinaryImageUpload
                                    label={`Hero Image ${i + 1}`}
                                    value={url}
                                    onUpload={(newUrl) => { const u = [...heroImages]; u[i] = newUrl; setHeroImages(u); }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ──── IMPACT STATS ──── */}
            {activeTab === 'Impact Stats' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">Summit Impact Metrics</h2>
                            <p className="text-sm text-gray-500">Exactly 4 records</p>
                        </div>
                        <button onClick={() => { saveSummitsImpact(impact); flash(); }} className={btnSave}>
                            <Save size={16} /> Save
                        </button>
                    </div>
                    <div className="space-y-4">
                        {impact.map((stat, i) => (
                            <div key={i} className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
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
                </div>
            )}

            {/* ──── PAST SUMMITS ──── */}
            {activeTab === 'Past Summits' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">Past Summits</h2>
                            <p className="text-sm text-gray-500">Interactive slider items</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={addPastSummit} className={btnAdd}><Plus size={16} /> Add</button>
                            <button onClick={() => { savePastSummits(pastItems); flash(); }} className={btnSave}><Save size={16} /> Save</button>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {pastItems.map((item, i) => (
                            <div key={item.summit_id} className="p-4 bg-gray-50 rounded-xl relative">
                                <button onClick={() => removePastSummit(item.summit_id)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Title (max 30)</label>
                                        <input type="text" maxLength={30} value={item.summit_title} onChange={(e) => { const u = [...pastItems]; u[i] = { ...u[i], summit_title: e.target.value }; setPastItems(u); }} className={inputCls} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Date (max 15)</label>
                                        <input type="text" maxLength={15} value={item.summit_date} onChange={(e) => { const u = [...pastItems]; u[i] = { ...u[i], summit_date: e.target.value }; setPastItems(u); }} className={inputCls} />
                                    </div>
                                    <div>
                                        <CloudinaryImageUpload
                                            label="Summit Image"
                                            value={item.summit_image}
                                            onUpload={(url) => { const u = [...pastItems]; u[i] = { ...u[i], summit_image: url }; setPastItems(u); }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        {pastItems.length === 0 && <p className="text-gray-400 text-sm text-center py-8">No past summits added yet.</p>}
                    </div>
                </div>
            )}

            {/* ──── UPCOMING SUMMIT ──── */}
            {activeTab === 'Upcoming' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">Upcoming Summit</h2>
                            <p className="text-sm text-gray-500">Conditional section — toggle to show/hide</p>
                        </div>
                        <button onClick={() => { saveUpcomingSummit(upcoming); flash(); }} className={btnSave}><Save size={16} /> Save</button>
                    </div>
                    <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={upcoming.is_active} onChange={(e) => setUpcoming({ ...upcoming, is_active: e.target.checked })} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-orange-500 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                        </label>
                        <span className="text-sm font-medium text-gray-700">{upcoming.is_active ? 'Visible on frontend' : 'Hidden on frontend'}</span>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Summit Name (max 50)</label>
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
                    </div>
                </div>
            )}

            {/* ──── SUMMIT DETAILS ──── */}
            {activeTab === 'Summit Details' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">Individual Summit Details</h2>
                            <p className="text-sm text-gray-500">Select a past summit to edit its full detail page</p>
                        </div>
                        <button
                            onClick={() => { if (selectedSummitId) { saveSummitDetail(selectedSummitId, detail); flash(); } }}
                            disabled={!selectedSummitId}
                            className={`${btnSave} ${!selectedSummitId ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <Save size={16} /> Save Detail
                        </button>
                    </div>

                    <div className="mb-6">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Select Summit</label>
                        <select value={selectedSummitId} onChange={(e) => setSelectedSummitId(e.target.value)} className={inputCls}>
                            <option value="">— Choose a summit —</option>
                            {pastItems.map((s) => (
                                <option key={s.summit_id} value={s.summit_id}>{s.summit_title || `Summit ${s.summit_id}`}</option>
                            ))}
                        </select>
                    </div>

                    {selectedSummitId && (
                        <div className="space-y-6">
                            {/* Hero */}
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <h3 className="font-semibold text-gray-800 text-sm">Hero Summit Overview</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Summit Name (max 50)</label>
                                        <input type="text" maxLength={50} value={detail.summit_name} onChange={(e) => setDetail({ ...detail, summit_name: e.target.value })} className={inputCls} />
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
                                <h3 className="font-semibold text-gray-800 text-sm">What We Did</h3>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">About Text (max 600)</label>
                                    <textarea maxLength={600} rows={4} value={detail.about_text_body} onChange={(e) => setDetail({ ...detail, about_text_body: e.target.value })} className={`${inputCls} resize-none`} />
                                    <span className="text-xs text-gray-400">{detail.about_text_body.length}/600</span>
                                </div>
                                <div>
                                    <CloudinaryImageUpload
                                        label="Side Image"
                                        value={detail.event_side_image}
                                        onUpload={(url) => setDetail({ ...detail, event_side_image: url })}
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
                                <h3 className="font-semibold text-gray-800 text-sm">Summit Impact Metrics</h3>
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

                    {!selectedSummitId && (
                        <p className="text-gray-400 text-sm text-center py-8">Add past summits first, then select one here to edit its detail page.</p>
                    )}
                </div>
            )}
        </div>
    );
}
