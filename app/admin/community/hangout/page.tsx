'use client';

import { useState, useEffect } from 'react';
import CloudinaryImageUpload from '@/components/CloudinaryImageUpload';
import {
    MissionImpactStat,
    PastHangoutItem,
    UpcomingEvent,
    HangoutHero,
    HangoutApproach,
    HangoutDetail,
    getHangoutHero,
    saveHangoutHero,
    getHangoutApproach,
    saveHangoutApproach,
    getHangoutImpact,
    saveHangoutImpact,
    getPastHangouts,
    savePastHangouts,
    getUpcomingHangout,
    saveUpcomingHangout,
    getHangoutDetail,
    saveHangoutDetail,
    generateId,
} from '@/lib/adminData';
import { Save, Plus, Trash2, Check, Image as ImageIcon } from 'lucide-react';

// ─── Defaults ────────────────────────────────────────────────────────

const DEFAULT_HERO: HangoutHero = {
    hero_gallery_images: ['', '', ''],
};

const DEFAULT_APPROACH: HangoutApproach = {
    approach_image: '',
    feature_list: [
        'Safe spaces',
        'Fun games',
        'Skill building',
    ],
};

const DEFAULT_IMPACT: MissionImpactStat[] = [
    { stat_number: '80+', stat_label: 'Teenagers reached' },
    { stat_number: '2', stat_label: 'States covered' },
    { stat_number: '1', stat_label: 'Venues Delivered' },
    { stat_number: '10', stat_label: 'Volunteers Mobilised' },
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

const EMPTY_DETAIL: HangoutDetail = {
    hangout_name: '',
    hangout_summary: '',
    hero_main_image: '',
    about_text_body: '',
    event_highlights: ['', '', ''],
    side_action_image: '',
    impact: [
        { impact_value: '', impact_label: '' },
        { impact_value: '', impact_label: '' },
        { impact_value: '', impact_label: '' },
        { impact_value: '', impact_label: '' },
    ],
    partners: [],
    gallery: [],
};


const tabs = ['Hero & Approach', 'Impact Bar', 'Past Hangouts', 'Upcoming', 'Hangout Details'] as const;
type Tab = (typeof tabs)[number];

export default function AdminHangoutPage() {
    const [activeTab, setActiveTab] = useState<Tab>('Hero & Approach');
    const [saved, setSaved] = useState(false);

    // Hero & Approach
    const [hero, setHero] = useState<HangoutHero>(DEFAULT_HERO);
    const [approach, setApproach] = useState<HangoutApproach>(DEFAULT_APPROACH);

    // Impact Bar
    const [impact, setImpact] = useState<MissionImpactStat[]>(DEFAULT_IMPACT);

    // Past Hangouts
    const [pastItems, setPastItems] = useState<PastHangoutItem[]>([]);

    // Upcoming
    const [upcoming, setUpcoming] = useState<UpcomingEvent>(DEFAULT_UPCOMING);

    // Hangout Details
    const [selectedHangoutId, setSelectedHangoutId] = useState<string>('');
    const [detail, setDetail] = useState<HangoutDetail>(EMPTY_DETAIL);

    useEffect(() => {
        const h = getHangoutHero();
        if (h) setHero(h);
        const a = getHangoutApproach();
        if (a) setApproach(a);
        const i = getHangoutImpact();
        if (i) setImpact(i);
        const p = getPastHangouts();
        if (p) setPastItems(p);
        const u = getUpcomingHangout();
        if (u) setUpcoming(u);
    }, []);

    // Load detail when selecting a hangout
    useEffect(() => {
        if (selectedHangoutId) {
            const d = getHangoutDetail(selectedHangoutId);
            setDetail(d || { ...EMPTY_DETAIL });
        }
    }, [selectedHangoutId]);

    const flash = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    // ─── Past Item helpers ──
    const addPastHangout = () => {
        setPastItems([
            ...pastItems,
            { hangout_id: generateId(), hangout_title: '', hangout_date: '', hangout_image: '' },
        ]);
    };
    const removePastHangout = (id: string) => {
        setPastItems(pastItems.filter((p) => p.hangout_id !== id));
    };

    // ─── Detail helpers ──
    const addHighlight = () => setDetail({ ...detail, event_highlights: [...detail.event_highlights, ''] });
    const removeHighlight = (idx: number) =>
        setDetail({ ...detail, event_highlights: detail.event_highlights.filter((_, i) => i !== idx) });

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

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Hangouts</h1>
                <p className="text-gray-500 mt-1">Manage hero gallery, approach points, impact metrics, and hangout event lifecycle.</p>
            </div>

            {saved && (
                <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-xl shadow-lg">
                    <Check size={16} /> Saved successfully
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

            {/* ──── HERO & APPROACH ──── */}
            {activeTab === 'Hero & Approach' && (
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-semibold text-gray-900">Hero Highlights Gallery (3 Images)</h2>
                            <button onClick={() => { saveHangoutHero(hero); flash(); }} className={btnSave}>
                                <Save size={16} /> Save Hero
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {hero.hero_gallery_images.map((url, i) => (
                                <div key={i}>
                                    <CloudinaryImageUpload
                                        label={`Hero Image ${i + 1}`}
                                        value={url}
                                        onUpload={(newUrl) => {
                                            const u = [...hero.hero_gallery_images];
                                            u[i] = newUrl;
                                            setHero({ hero_gallery_images: u });
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-semibold text-gray-900">Hangout Experience (Approach)</h2>
                            <button onClick={() => { saveHangoutApproach(approach); flash(); }} className={btnSave}>
                                <Save size={16} /> Save Approach
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <CloudinaryImageUpload
                                    label="Vertical Side Image"
                                    value={approach.approach_image}
                                    onUpload={(url) => setApproach({ ...approach, approach_image: url })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-medium text-gray-500">Feature List (max 60 chars each)</label>
                                {approach.feature_list.map((f, i) => (
                                    <div key={i} className="flex gap-2">
                                        <input
                                            type="text"
                                            maxLength={60}
                                            value={f}
                                            onChange={(e) => {
                                                const u = [...approach.feature_list];
                                                u[i] = e.target.value;
                                                setApproach({ ...approach, feature_list: u });
                                            }}
                                            className={inputCls}
                                        />
                                        <button
                                            onClick={() => {
                                                const u = approach.feature_list.filter((_, idx) => idx !== i);
                                                setApproach({ ...approach, feature_list: u });
                                            }}
                                            className="text-gray-400 hover:text-red-500"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => setApproach({ ...approach, feature_list: [...approach.feature_list, ''] })}
                                    className={btnAdd}
                                >
                                    <Plus size={16} /> Add Feature
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ──── IMPACT BAR ──── */}
            {activeTab === 'Impact Bar' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">Hangout Impact Metrics</h2>
                            <p className="text-sm text-gray-500">Exactly 4 records</p>
                        </div>
                        <button onClick={() => { saveHangoutImpact(impact); flash(); }} className={btnSave}>
                            <Save size={16} /> Save
                        </button>
                    </div>
                    <div className="space-y-4">
                        {impact.map((stat, i) => (
                            <div key={i} className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
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
                </div>
            )}

            {/* ──── PAST HANGOUTS ──── */}
            {activeTab === 'Past Hangouts' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">Past Hangouts Slider</h2>
                            <p className="text-sm text-gray-500">Browser/Slider items for previous hangout sessions</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={addPastHangout} className={btnAdd}>
                                <Plus size={16} /> Add
                            </button>
                            <button onClick={() => { savePastHangouts(pastItems); flash(); }} className={btnSave}>
                                <Save size={16} /> Save
                            </button>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {pastItems.map((item, i) => (
                            <div key={item.hangout_id} className="p-4 bg-gray-50 rounded-xl relative">
                                <button
                                    onClick={() => removePastHangout(item.hangout_id)}
                                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Title (max 40)</label>
                                        <input
                                            type="text"
                                            maxLength={40}
                                            value={item.hangout_title}
                                            onChange={(e) => {
                                                const u = [...pastItems];
                                                u[i] = { ...u[i], hangout_title: e.target.value };
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
                                            value={item.hangout_date}
                                            onChange={(e) => {
                                                const u = [...pastItems];
                                                u[i] = { ...u[i], hangout_date: e.target.value };
                                                setPastItems(u);
                                            }}
                                            className={inputCls}
                                        />
                                    </div>
                                    <div>
                                        <CloudinaryImageUpload
                                            label="Hangout Image"
                                            value={item.hangout_image}
                                            onUpload={(url) => {
                                                const u = [...pastItems];
                                                u[i] = { ...u[i], hangout_image: url };
                                                setPastItems(u);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ──── UPCOMING HANGOUT ──── */}
            {activeTab === 'Upcoming' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">Upcoming Hangout</h2>
                            <p className="text-sm text-gray-500">Toggle to show/hide the upcoming card on the frontend</p>
                        </div>
                        <button onClick={() => { saveUpcomingHangout(upcoming); flash(); }} className={btnSave}>
                            <Save size={16} /> Save
                        </button>
                    </div>

                    <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={upcoming.is_active}
                                onChange={(e) => setUpcoming({ ...upcoming, is_active: e.target.checked })}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-orange-500 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                        </label>
                        <span className="text-sm font-medium text-gray-700">
                            {upcoming.is_active ? 'Visible on frontend' : 'Hidden on frontend'}
                        </span>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Hangout Name (max 50)</label>
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
                </div>
            )}

            {/* ──── HANGOUT DETAILS ──── */}
            {activeTab === 'Hangout Details' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">Individual Hangout Recaps</h2>
                            <p className="text-sm text-gray-500">Manage the narrative, impact, and gallery for a specific hangout</p>
                        </div>
                        <button
                            onClick={() => {
                                if (selectedHangoutId) {
                                    saveHangoutDetail(selectedHangoutId, detail);
                                    flash();
                                }
                            }}
                            disabled={!selectedHangoutId}
                            className={`${btnSave} ${!selectedHangoutId ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <Save size={16} /> Save Recap
                        </button>
                    </div>

                    <div className="mb-6">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Select Hangout</label>
                        <select
                            value={selectedHangoutId}
                            onChange={(e) => setSelectedHangoutId(e.target.value)}
                            className={inputCls}
                        >
                            <option value="">— Choose a hangout —</option>
                            {pastItems.map((p) => (
                                <option key={p.hangout_id} value={p.hangout_id}>
                                    {p.hangout_title || `Hangout ${p.hangout_id}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedHangoutId && (
                        <div className="space-y-6">
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <h3 className="font-semibold text-gray-800 text-sm">Hero Overview</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Hangout Name (max 50)</label>
                                        <input type="text" maxLength={50} value={detail.hangout_name} onChange={(e) => setDetail({ ...detail, hangout_name: e.target.value })} className={inputCls} />
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
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Summary (max 250)</label>
                                    <textarea maxLength={250} rows={2} value={detail.hangout_summary} onChange={(e) => setDetail({ ...detail, hangout_summary: e.target.value })} className={`${inputCls} resize-none`} />
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <h3 className="font-semibold text-gray-800 text-sm">Narrative & Highlights</h3>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">About Text (max 600)</label>
                                    <textarea maxLength={600} rows={4} value={detail.about_text_body} onChange={(e) => setDetail({ ...detail, about_text_body: e.target.value })} className={`${inputCls} resize-none`} />
                                </div>
                                <div>
                                    <CloudinaryImageUpload
                                        label="Side Action Image"
                                        value={detail.side_action_image}
                                        onUpload={(url) => setDetail({ ...detail, side_action_image: url })}
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-xs font-medium text-gray-500">Highlights (3 bullets)</label>
                                        <button onClick={addHighlight} className="text-xs text-orange-500 hover:text-orange-600 font-medium">+ Add</button>
                                    </div>
                                    {detail.event_highlights.map((h, i) => (
                                        <div key={i} className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                maxLength={100}
                                                value={h}
                                                onChange={(e) => {
                                                    const u = [...detail.event_highlights];
                                                    u[i] = e.target.value;
                                                    setDetail({ ...detail, event_highlights: u });
                                                }}
                                                className={inputCls}
                                            />
                                            <button onClick={() => removeHighlight(i)} className="text-gray-400 hover:text-red-500">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <h3 className="font-semibold text-gray-800 text-sm">Hangout Impact Metrics (4)</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {detail.impact.map((imp, i) => (
                                        <div key={i} className="p-3 bg-white border border-gray-200 rounded-lg">
                                            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Metric {i + 1}</label>
                                            <input
                                                type="text"
                                                placeholder="Value (e.g. 30+)"
                                                maxLength={10}
                                                value={imp.impact_value}
                                                onChange={(e) => {
                                                    const u = [...detail.impact];
                                                    u[i] = { ...u[i], impact_value: e.target.value };
                                                    setDetail({ ...detail, impact: u });
                                                }}
                                                className={`${inputCls} mb-2`}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Label (e.g. Venues)"
                                                maxLength={25}
                                                value={imp.impact_label}
                                                onChange={(e) => {
                                                    const u = [...detail.impact];
                                                    u[i] = { ...u[i], impact_label: e.target.value };
                                                    setDetail({ ...detail, impact: u });
                                                }}
                                                className={inputCls}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-800 text-sm">Partners</h3>
                                    <button onClick={addPartner} className="text-xs text-orange-500 hover:text-orange-600 font-medium">+ Add Partner</button>
                                </div>
                                {detail.partners.map((p, i) => (
                                    <div key={i} className="flex gap-2 items-start">
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
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>

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
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
