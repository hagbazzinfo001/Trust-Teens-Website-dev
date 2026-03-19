'use client';

import { useState, useEffect } from 'react';
import CloudinaryImageUpload from '@/components/CloudinaryImageUpload';
import {
    ImpactHero,
    ImpactMetric,
    ImpactVideo,
    getImpactHero,
    saveImpactHero,
    getImpactMetrics,
    saveImpactMetrics,
    getImpactVideo,
    saveImpactVideo,
    generateId,
} from '@/lib/adminData';
import { Save, Plus, Trash2, Check } from 'lucide-react';

// ─── Defaults ────────────────────────────────────────────────────────

const DEFAULT_HERO: ImpactHero = {
    total_impact_number: '8906',
    hero_body_text:
        'Through every conference hall filled, every small room gathered, every campaign walked, and every conversation held, one thing has remained consistent. Teenagers show up ready.',
    hero_images: [
        '/images/ImpactImage_1.svg',
        '/images/ImpactImage_2.svg',
        '/images/ImpactImage_3.svg',
        '/images/ImpactImage_4.svg',
        '/images/ImpactImage_5.svg',
    ],
};

const DEFAULT_METRICS: ImpactMetric[] = [
    { id: '1', metric_value: '17', metric_label: 'Events Organised' },
    { id: '2', metric_value: '54', metric_label: 'Activities Set Up' },
    { id: '3', metric_value: '19', metric_label: 'Communities Engaged' },
    { id: '4', metric_value: '200', metric_label: 'Members' },
    { id: '5', metric_value: '30', metric_label: 'Speakers / Mentors' },
    { id: '6', metric_value: '105', metric_label: 'Volunteers' },
];

const DEFAULT_VIDEO: ImpactVideo = {
    video_url: 'https://www.youtube.com/watch?v=ygXT6v59cTU',
    video_description:
        'See the moments, voices, and stories behind the numbers. Our impact videos capture teenagers learning, speaking, creating, and leading across conferences, summits, campaigns, and community activities.',
};

const tabs = ['Hero Section', 'Metrics Grid', 'Video Highlight'] as const;
type Tab = (typeof tabs)[number];

export default function AdminImpactPage() {
    const [activeTab, setActiveTab] = useState<Tab>('Hero Section');
    const [saved, setSaved] = useState(false);

    const [hero, setHero] = useState<ImpactHero>(DEFAULT_HERO);
    const [metrics, setMetrics] = useState<ImpactMetric[]>(DEFAULT_METRICS);
    const [video, setVideo] = useState<ImpactVideo>(DEFAULT_VIDEO);

    useEffect(() => {
        const h = getImpactHero();
        if (h) setHero(h);
        const m = getImpactMetrics();
        if (m) setMetrics(m);
        const v = getImpactVideo();
        if (v) setVideo(v);
    }, []);

    const flash = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    // ── Hero helpers ──
    const addHeroImage = () => {
        setHero({ ...hero, hero_images: [...hero.hero_images, ''] });
    };

    const removeHeroImage = (index: number) => {
        const imgs = [...hero.hero_images];
        imgs.splice(index, 1);
        setHero({ ...hero, hero_images: imgs });
    };

    // ── Metrics helpers ──
    const addMetric = () => {
        setMetrics([
            ...metrics,
            { id: generateId(), metric_value: '', metric_label: '' },
        ]);
    };

    const removeMetric = (id: string) => {
        setMetrics(metrics.filter((m) => m.id !== id));
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Impact Page</h1>
                <p className="text-gray-500 mt-1">
                    Manage hero section, metrics grid, and video highlight.
                </p>
            </div>

            {saved && (
                <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-xl shadow-lg">
                    <Check size={16} /> Saved successfully
                </div>
            )}

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
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

            {/* ──── HERO SECTION ──── */}
            {activeTab === 'Hero Section' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-semibold text-gray-900">Hero Impact Section</h2>
                        <button
                            onClick={() => {
                                saveImpactHero(hero);
                                flash();
                            }}
                            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                        >
                            <Save size={16} /> Save
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">
                                    Total Impact Number (max 10)
                                </label>
                                <input
                                    type="text"
                                    maxLength={10}
                                    value={hero.total_impact_number}
                                    onChange={(e) =>
                                        setHero({ ...hero, total_impact_number: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                Body Text (max 600)
                            </label>
                            <textarea
                                maxLength={600}
                                rows={5}
                                value={hero.hero_body_text}
                                onChange={(e) =>
                                    setHero({ ...hero, hero_body_text: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                            />
                            <span className="text-xs text-gray-400">
                                {hero.hero_body_text.length}/600
                            </span>
                        </div>

                        {/* Hero Images */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-xs font-medium text-gray-500">
                                    Scrolling Images (URLs)
                                </label>
                                <button
                                    onClick={addHeroImage}
                                    className="text-xs text-orange-500 hover:text-orange-600 flex items-center gap-1"
                                >
                                    <Plus size={14} /> Add Image
                                </button>
                            </div>
                            <div className="space-y-2">
                                {hero.hero_images.map((url, i) => (
                                    <div key={i} className="flex gap-2 items-start">
                                        <div className="flex-1">
                                            <CloudinaryImageUpload
                                                label={`Hero Image ${i + 1}`}
                                                value={url}
                                                onUpload={(newUrl) => {
                                                    const imgs = [...hero.hero_images];
                                                    imgs[i] = newUrl;
                                                    setHero({ ...hero, hero_images: imgs });
                                                }}
                                            />
                                        </div>
                                        <button
                                            onClick={() => removeHeroImage(i)}
                                            className="text-gray-400 hover:text-red-500 px-2 mt-6"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ──── METRICS GRID ──── */}
            {activeTab === 'Metrics Grid' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">
                                Impact Metrics Grid
                            </h2>
                            <p className="text-sm text-gray-500">The colorful stat cards</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={addMetric}
                                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                            >
                                <Plus size={16} /> Add Metric
                            </button>
                            <button
                                onClick={() => {
                                    saveImpactMetrics(metrics);
                                    flash();
                                }}
                                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                            >
                                <Save size={16} /> Save
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {metrics.map((m, i) => (
                            <div
                                key={m.id}
                                className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl relative"
                            >
                                <button
                                    onClick={() => removeMetric(m.id)}
                                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                                >
                                    <Trash2 size={16} />
                                </button>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">
                                        Value (max 10)
                                    </label>
                                    <input
                                        type="text"
                                        maxLength={10}
                                        value={m.metric_value}
                                        onChange={(e) => {
                                            const updated = [...metrics];
                                            updated[i] = {
                                                ...updated[i],
                                                metric_value: e.target.value,
                                            };
                                            setMetrics(updated);
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">
                                        Label (max 30)
                                    </label>
                                    <input
                                        type="text"
                                        maxLength={30}
                                        value={m.metric_label}
                                        onChange={(e) => {
                                            const updated = [...metrics];
                                            updated[i] = {
                                                ...updated[i],
                                                metric_label: e.target.value,
                                            };
                                            setMetrics(updated);
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ──── VIDEO HIGHLIGHT ──── */}
            {activeTab === 'Video Highlight' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-semibold text-gray-900">
                            &ldquo;Watch our Impact&rdquo; Video
                        </h2>
                        <button
                            onClick={() => {
                                saveImpactVideo(video);
                                flash();
                            }}
                            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                        >
                            <Save size={16} /> Save
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                Video URL (YouTube)
                            </label>
                            <input
                                type="text"
                                value={video.video_url}
                                onChange={(e) =>
                                    setVideo({ ...video, video_url: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="https://www.youtube.com/watch?v=..."
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                Description (max 200)
                            </label>
                            <textarea
                                maxLength={200}
                                rows={4}
                                value={video.video_description}
                                onChange={(e) =>
                                    setVideo({ ...video, video_description: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                            />
                            <span className="text-xs text-gray-400">
                                {video.video_description.length}/200
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
