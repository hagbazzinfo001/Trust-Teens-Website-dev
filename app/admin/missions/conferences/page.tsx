'use client';

import { useState, useEffect } from 'react';
import {
    MissionImpactStat,
    PastConferenceItem,
    UpcomingEvent,
    ConferenceDetail,
    ConferenceHeroGallery,
    NewsItem,
    Speaker,
    getConferencesHero,
    saveConferencesHero,
    getConferencesImpact,
    saveConferencesImpact,
    getPastConferences,
    savePastConferences,
    getUpcomingConference,
    saveUpcomingConference,
    getConferenceDetail,
    saveConferenceDetail,
    generateId,
} from '@/lib/adminData';
import { Save, Plus, Trash2, Check } from 'lucide-react';

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

export default function AdminConferencesPage() {
    const [activeTab, setActiveTab] = useState<Tab>('Hero Images');
    const [saved, setSaved] = useState(false);

    const [hero, setHero] = useState<ConferenceHeroGallery>(DEFAULT_HERO);
    const [impact, setImpact] = useState<MissionImpactStat[]>(DEFAULT_IMPACT);
    const [pastItems, setPastItems] = useState<PastConferenceItem[]>([]);
    const [upcoming, setUpcoming] = useState<UpcomingEvent>(DEFAULT_UPCOMING);
    const [selectedConfId, setSelectedConfId] = useState<string>('');
    const [detail, setDetail] = useState<ConferenceDetail>(EMPTY_DETAIL);

    useEffect(() => {
        const h = getConferencesHero(); if (h) setHero(h);
        const i = getConferencesImpact(); if (i) setImpact(i);
        const p = getPastConferences(); if (p) setPastItems(p);
        const u = getUpcomingConference(); if (u) setUpcoming(u);
    }, []);

    useEffect(() => {
        if (selectedConfId) {
            const d = getConferenceDetail(selectedConfId);
            setDetail(d || { ...EMPTY_DETAIL });
        }
    }, [selectedConfId]);

    const flash = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

    const addPastConference = () => {
        setPastItems([...pastItems, { conference_id: generateId(), conference_title: '', conference_date: '', conference_image: '' }]);
    };
    const removePastConference = (id: string) => setPastItems(pastItems.filter((c) => c.conference_id !== id));

    // Detail helpers
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

            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit flex-wrap">
                {tabs.map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                        {tab}
                    </button>
                ))}
            </div>

            {/* ──── HERO IMAGES ──── */}
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
                            <label className="block text-xs font-medium text-gray-500 mb-1">Primary Hero Image URL</label>
                            <input type="text" value={hero.primary_hero_image} onChange={(e) => setHero({ ...hero, primary_hero_image: e.target.value })} className={inputCls} />
                            {hero.primary_hero_image && <img src={hero.primary_hero_image} alt="Primary preview" className="mt-2 h-24 rounded-lg object-cover" />}
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Secondary Hero Image URL</label>
                            <input type="text" value={hero.secondary_hero_image} onChange={(e) => setHero({ ...hero, secondary_hero_image: e.target.value })} className={inputCls} />
                            {hero.secondary_hero_image && <img src={hero.secondary_hero_image} alt="Secondary preview" className="mt-2 h-24 rounded-lg object-cover" />}
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
                        <button onClick={() => { saveConferencesImpact(impact); flash(); }} className={btnSave}><Save size={16} /> Save</button>
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
                            <button onClick={() => { savePastConferences(pastItems); flash(); }} className={btnSave}><Save size={16} /> Save</button>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {pastItems.map((item, i) => (
                            <div key={item.conference_id} className="p-4 bg-gray-50 rounded-xl relative">
                                <button onClick={() => removePastConference(item.conference_id)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
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
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Image URL</label>
                                        <input type="text" value={item.conference_image} onChange={(e) => { const u = [...pastItems]; u[i] = { ...u[i], conference_image: e.target.value }; setPastItems(u); }} className={inputCls} />
                                    </div>
                                </div>
                            </div>
                        ))}
                        {pastItems.length === 0 && <p className="text-gray-400 text-sm text-center py-8">No past conferences added yet.</p>}
                    </div>
                </div>
            )}

            {/* ──── UPCOMING CONFERENCE ──── */}
            {activeTab === 'Upcoming' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">Upcoming Conference</h2>
                            <p className="text-sm text-gray-500">Conditional section — toggle to show/hide</p>
                        </div>
                        <button onClick={() => { saveUpcomingConference(upcoming); flash(); }} className={btnSave}><Save size={16} /> Save</button>
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
                            <label className="block text-xs font-medium text-gray-500 mb-1">Promo Image URL</label>
                            <input type="text" value={upcoming.promo_image || ''} onChange={(e) => setUpcoming({ ...upcoming, promo_image: e.target.value })} className={inputCls} />
                        </div>
                    </div>
                </div>
            )}

            {/* ──── CONFERENCE DETAILS ──── */}
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
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Hero Main Image URL</label>
                                        <input type="text" value={detail.hero_main_image} onChange={(e) => setDetail({ ...detail, hero_main_image: e.target.value })} className={inputCls} />
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
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Side Image URL</label>
                                    <input type="text" value={detail.about_side_image} onChange={(e) => setDetail({ ...detail, about_side_image: e.target.value })} className={inputCls} />
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
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Thumbnail URL</label>
                                                <input type="text" value={n.news_thumbnail} onChange={(e) => { const u = [...detail.news]; u[i] = { ...u[i], news_thumbnail: e.target.value }; setDetail({ ...detail, news: u }); }} className={inputCls} />
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
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Image URL</label>
                                                <input type="text" value={sp.speaker_image} onChange={(e) => { const u = [...detail.speakers]; u[i] = { ...u[i], speaker_image: e.target.value }; setDetail({ ...detail, speakers: u }); }} className={inputCls} />
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
                                    <div key={i} className="flex gap-2">
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
                                        <input
                                            type="text"
                                            placeholder="Partner logo URL"
                                            value={p.logo}
                                            onChange={(e) => {
                                                const u = [...detail.partners];
                                                u[i] = { ...p, logo: e.target.value };
                                                setDetail({ ...detail, partners: u });
                                            }}
                                            className={`${inputCls} flex-1`}
                                        />
                                        <button onClick={() => removePartner(i)} className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
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
                                    <div key={i} className="flex gap-2">
                                        <input type="text" placeholder="Gallery image URL" value={url} onChange={(e) => { const u = [...detail.gallery]; u[i] = e.target.value; setDetail({ ...detail, gallery: u }); }} className={`${inputCls} flex-1`} />
                                        <button onClick={() => removeGalleryImage(i)} className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
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
