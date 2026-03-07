'use client';

import { useState, useEffect } from 'react';
import {
    MissionImpactStat,
    PastCommunityServiceItem,
    CommunityServiceHero,
    CommunityServiceApproach,
    CommunityServiceDetail,
    getCommunityServiceHero,
    saveCommunityServiceHero,
    getCommunityServiceApproach,
    saveCommunityServiceApproach,
    getCommunityServiceImpact,
    saveCommunityServiceImpact,
    getPastCommunityServices,
    savePastCommunityServices,
    getCommunityServiceDetail,
    saveCommunityServiceDetail,
    generateId,
} from '@/lib/adminData';
import { Save, Plus, Trash2, Check, Image as ImageIcon } from 'lucide-react';

// ─── Defaults ────────────────────────────────────────────────────────

const DEFAULT_HERO: CommunityServiceHero = {
    hero_gallery: ['', '', ''],
};

const DEFAULT_APPROACH: CommunityServiceApproach = {
    approach_image: '',
    focus_points: [
        'Encourage responsibility and initiative',
        'Build teamwork and leadership skills',
        'Promote environmental and social awareness',
        'Strengthen relationships with local communities',
    ],
};

const DEFAULT_IMPACT: MissionImpactStat[] = [
    { stat_number: '25', stat_label: 'Teenagers participating' },
    { stat_number: '3', stat_label: 'Safe community spaces' },
    { stat_number: '2', stat_label: 'Projects Delivered' },
];

const EMPTY_DETAIL: CommunityServiceDetail = {
    project_name: '',
    project_summary: '',
    hero_main_image: '',
    project_body_text: '',
    project_highlights: ['', '', ''],
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

// ─── Tabs ────────────────────────────────────────────────────────────

const tabs = ['Hero & Approach', 'Impact Bar', 'Past Initiatives', 'Project Details'] as const;
type Tab = (typeof tabs)[number];

export default function AdminCommunityServicePage() {
    const [activeTab, setActiveTab] = useState<Tab>('Hero & Approach');
    const [saved, setSaved] = useState(false);

    // Hero & Approach
    const [hero, setHero] = useState<CommunityServiceHero>(DEFAULT_HERO);
    const [approach, setApproach] = useState<CommunityServiceApproach>(DEFAULT_APPROACH);

    // Impact Bar
    const [impact, setImpact] = useState<MissionImpactStat[]>(DEFAULT_IMPACT);

    // Past Initiatives
    const [pastItems, setPastItems] = useState<PastCommunityServiceItem[]>([]);

    // Project Details
    const [selectedProjectId, setSelectedProjectId] = useState<string>('');
    const [detail, setDetail] = useState<CommunityServiceDetail>(EMPTY_DETAIL);

    useEffect(() => {
        const h = getCommunityServiceHero();
        if (h) setHero(h);
        const a = getCommunityServiceApproach();
        if (a) setApproach(a);
        const i = getCommunityServiceImpact();
        if (i) setImpact(i);
        const p = getPastCommunityServices();
        if (p) setPastItems(p);
    }, []);

    // Load detail when selecting a project
    useEffect(() => {
        if (selectedProjectId) {
            const d = getCommunityServiceDetail(selectedProjectId);
            setDetail(d || { ...EMPTY_DETAIL });
        }
    }, [selectedProjectId]);

    const flash = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    // ─── Past Project helpers ──
    const addPastProject = () => {
        setPastItems([
            ...pastItems,
            { project_id: generateId(), project_title: '', project_date: '', project_image: '' },
        ]);
    };
    const removePastProject = (id: string) => {
        setPastItems(pastItems.filter((p) => p.project_id !== id));
    };

    // ─── Detail helpers ──
    const addHighlight = () => setDetail({ ...detail, project_highlights: [...detail.project_highlights, ''] });
    const removeHighlight = (idx: number) =>
        setDetail({ ...detail, project_highlights: detail.project_highlights.filter((_, i) => i !== idx) });

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
                <h1 className="text-2xl font-bold text-gray-900">Community Service</h1>
                <p className="text-gray-500 mt-1">Manage hero gallery, approach focus points, impact metrics, and project reports.</p>
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
                            <h2 className="font-semibold text-gray-900">Hero Gallery (3 Images)</h2>
                            <button onClick={() => { saveCommunityServiceHero(hero); flash(); }} className={btnSave}>
                                <Save size={16} /> Save Hero
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {hero.hero_gallery.map((url, i) => (
                                <div key={i}>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Image {i + 1} URL</label>
                                    <input
                                        type="text"
                                        value={url}
                                        onChange={(e) => {
                                            const u = [...hero.hero_gallery];
                                            u[i] = e.target.value;
                                            setHero({ hero_gallery: u });
                                        }}
                                        className={inputCls}
                                        placeholder="https://..."
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-semibold text-gray-900">Our Approach Focus Areas</h2>
                            <button onClick={() => { saveCommunityServiceApproach(approach); flash(); }} className={btnSave}>
                                <Save size={16} /> Save Approach
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Side Image URL</label>
                                <input
                                    type="text"
                                    value={approach.approach_image}
                                    onChange={(e) => setApproach({ ...approach, approach_image: e.target.value })}
                                    className={inputCls}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-medium text-gray-500">Designated Focus Points (max 80 chars each)</label>
                                {approach.focus_points.map((p, i) => (
                                    <div key={i} className="flex gap-2">
                                        <input
                                            type="text"
                                            maxLength={80}
                                            value={p}
                                            onChange={(e) => {
                                                const u = [...approach.focus_points];
                                                u[i] = e.target.value;
                                                setApproach({ ...approach, focus_points: u });
                                            }}
                                            className={inputCls}
                                        />
                                        <button
                                            onClick={() => {
                                                const u = approach.focus_points.filter((_, idx) => idx !== i);
                                                setApproach({ ...approach, focus_points: u });
                                            }}
                                            className="text-gray-400 hover:text-red-500"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => setApproach({ ...approach, focus_points: [...approach.focus_points, ''] })}
                                    className={btnAdd}
                                >
                                    <Plus size={16} /> Add Point
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
                            <h2 className="font-semibold text-gray-900">Community Impact Metrics</h2>
                            <p className="text-sm text-gray-500">Exactly 3 records</p>
                        </div>
                        <button onClick={() => { saveCommunityServiceImpact(impact); flash(); }} className={btnSave}>
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
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Label (max 30)</label>
                                    <input
                                        type="text"
                                        maxLength={30}
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

            {/* ──── PAST INITIATIVES ──── */}
            {activeTab === 'Past Initiatives' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">Past Community Service Initiatives</h2>
                            <p className="text-sm text-gray-500">Slider items for previous projects</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={addPastProject} className={btnAdd}>
                                <Plus size={16} /> Add
                            </button>
                            <button onClick={() => { savePastCommunityServices(pastItems); flash(); }} className={btnSave}>
                                <Save size={16} /> Save
                            </button>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {pastItems.map((item, i) => (
                            <div key={item.project_id} className="p-4 bg-gray-50 rounded-xl relative">
                                <button
                                    onClick={() => removePastProject(item.project_id)}
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
                                            value={item.project_title}
                                            onChange={(e) => {
                                                const u = [...pastItems];
                                                u[i] = { ...u[i], project_title: e.target.value };
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
                                            value={item.project_date}
                                            onChange={(e) => {
                                                const u = [...pastItems];
                                                u[i] = { ...u[i], project_date: e.target.value };
                                                setPastItems(u);
                                            }}
                                            className={inputCls}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Image URL</label>
                                        <input
                                            type="text"
                                            value={item.project_image}
                                            onChange={(e) => {
                                                const u = [...pastItems];
                                                u[i] = { ...u[i], project_image: e.target.value };
                                                setPastItems(u);
                                            }}
                                            className={inputCls}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ──── PROJECT DETAILS ──── */}
            {activeTab === 'Project Details' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">Individual Project Reports</h2>
                            <p className="text-sm text-gray-500">Select a project to edit its full narrative and media</p>
                        </div>
                        <button
                            onClick={() => {
                                if (selectedProjectId) {
                                    saveCommunityServiceDetail(selectedProjectId, detail);
                                    flash();
                                }
                            }}
                            disabled={!selectedProjectId}
                            className={`${btnSave} ${!selectedProjectId ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <Save size={16} /> Save Report
                        </button>
                    </div>

                    <div className="mb-6">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Select Project</label>
                        <select
                            value={selectedProjectId}
                            onChange={(e) => setSelectedProjectId(e.target.value)}
                            className={inputCls}
                        >
                            <option value="">— Choose a project —</option>
                            {pastItems.map((p) => (
                                <option key={p.project_id} value={p.project_id}>
                                    {p.project_title || `Project ${p.project_id}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedProjectId && (
                        <div className="space-y-6">
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <h3 className="font-semibold text-gray-800 text-sm">Hero Overview</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Project Name (max 50)</label>
                                        <input type="text" maxLength={50} value={detail.project_name} onChange={(e) => setDetail({ ...detail, project_name: e.target.value })} className={inputCls} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Hero Image URL</label>
                                        <input type="text" value={detail.hero_main_image} onChange={(e) => setDetail({ ...detail, hero_main_image: e.target.value })} className={inputCls} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Summary (max 350)</label>
                                    <textarea maxLength={350} rows={3} value={detail.project_summary} onChange={(e) => setDetail({ ...detail, project_summary: e.target.value })} className={`${inputCls} resize-none`} />
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <h3 className="font-semibold text-gray-800 text-sm">Narrative & Highlights</h3>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Body Text (max 600)</label>
                                    <textarea maxLength={600} rows={5} value={detail.project_body_text} onChange={(e) => setDetail({ ...detail, project_body_text: e.target.value })} className={`${inputCls} resize-none`} />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Side Action Image URL</label>
                                    <input type="text" value={detail.side_action_image} onChange={(e) => setDetail({ ...detail, side_action_image: e.target.value })} className={inputCls} />
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-xs font-medium text-gray-500">Project Highlights (max 100 chars)</label>
                                        <button onClick={addHighlight} className="text-xs text-orange-500 hover:text-orange-600 font-medium">+ Add</button>
                                    </div>
                                    {detail.project_highlights.map((h, idx) => (
                                        <div key={idx} className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                maxLength={100}
                                                value={h}
                                                onChange={(e) => {
                                                    const u = [...detail.project_highlights];
                                                    u[idx] = e.target.value;
                                                    setDetail({ ...detail, project_highlights: u });
                                                }}
                                                className={inputCls}
                                            />
                                            <button onClick={() => removeHighlight(idx)} className="text-gray-400 hover:text-red-500">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <h3 className="font-semibold text-gray-800 text-sm">Impact Bar (4 Metrics)</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {detail.impact.map((imp, i) => (
                                        <div key={i} className="p-3 bg-white border border-gray-200 rounded-lg">
                                            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Metric {i + 1}</label>
                                            <input
                                                type="text"
                                                placeholder="Value (e.g. 10,000+)"
                                                maxLength={15}
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
                                                placeholder="Label (e.g. People reached)"
                                                maxLength={40}
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
                                    <div key={i} className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Partner name"
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
                                            placeholder="Logo URL"
                                            value={p.logo}
                                            onChange={(e) => {
                                                const u = [...detail.partners];
                                                u[i] = { ...p, logo: e.target.value };
                                                setDetail({ ...detail, partners: u });
                                            }}
                                            className={`${inputCls} flex-1`}
                                        />
                                        <button onClick={() => removePartner(i)} className="text-gray-400 hover:text-red-500">
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
                                    <div key={i} className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Image URL"
                                            value={url}
                                            onChange={(e) => {
                                                const u = [...detail.gallery];
                                                u[i] = e.target.value;
                                                setDetail({ ...detail, gallery: u });
                                            }}
                                            className={`${inputCls} flex-1`}
                                        />
                                        <button onClick={() => removeGalleryImage(i)} className="text-gray-400 hover:text-red-500">
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
