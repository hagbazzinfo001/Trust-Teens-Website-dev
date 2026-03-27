'use client';

import { useState, useEffect } from 'react';
import CloudinaryImageUpload from '@/components/CloudinaryImageUpload';
import {
    fetchImpactHero,
    updateImpactHero,
    fetchImpactMetrics,
    createImpactMetric,
    updateImpactMetric,
    deleteImpactMetric,
    fetchImpactVideo,
    updateImpactVideo,
    ApiImpactHero,
    ApiImpactMetric,
    ApiImpactVideo,
} from '@/lib/impactApi';
import { useAdmin } from '@/contexts/AdminContext';
import { Save, Plus, Trash2, Check, Loader2 } from 'lucide-react';

const DEFAULT_HERO: ApiImpactHero = {
    totalImpactNumber: '8906',
    heroBodyText:
        'Through every conference hall filled, every small room gathered, every campaign walked, and every conversation held, one thing has remained consistent. Teenagers show up ready.',
    heroImages: [
        '/images/ImpactImage_1.svg',
        '/images/ImpactImage_2.svg',
        '/images/ImpactImage_3.svg',
        '/images/ImpactImage_4.svg',
        '/images/ImpactImage_5.svg',
    ],
};

const DEFAULT_METRICS: ApiImpactMetric[] = [
    { id: 1, metricValue: '17', metricLabel: 'Events Organised' },
    { id: 2, metricValue: '54', metricLabel: 'Activities Set Up' },
    { id: 3, metricValue: '19', metricLabel: 'Communities Engaged' },
    { id: 4, metricValue: '200', metricLabel: 'Members' },
    { id: 5, metricValue: '30', metricLabel: 'Speakers / Mentors' },
    { id: 6, metricValue: '105', metricLabel: 'Volunteers' },
];

const DEFAULT_VIDEO: ApiImpactVideo = {
    videoUrl: 'https://www.youtube.com/watch?v=ygXT6v59cTU',
    videoDescription:
        'See the moments, voices, and stories behind the numbers. Our impact videos capture teenagers learning, speaking, creating, and leading across conferences, summits, campaigns, and community activities.',
};

const tabs = ['Hero Section', 'Metrics Grid', 'Video Highlight'] as const;
type Tab = (typeof tabs)[number];

export default function AdminImpactPage() {
    const { } = useAdmin();
    const [activeTab, setActiveTab] = useState<Tab>('Hero Section');
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    const [hero, setHero] = useState<ApiImpactHero>(DEFAULT_HERO);

    // For metrics, we need to track local temporary IDs vs backend IDs
    type LocalMetric = Omit<ApiImpactMetric, 'id'> & { id?: number; localId: string };
    const [metrics, setMetrics] = useState<LocalMetric[]>(
        DEFAULT_METRICS.map((m) => ({ ...m, localId: m.id.toString() }))
    );
    const [initialMetrics, setInitialMetrics] = useState<LocalMetric[]>([]);

    const [video, setVideo] = useState<ApiImpactVideo>(DEFAULT_VIDEO);

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadData = async () => {
        try {
            const h = await fetchImpactHero().catch(() => null);
            if (h) setHero(h);

            const m = await fetchImpactMetrics().catch(() => null);
            if (m && m.length > 0) {
                const mapped = m.map((metric) => ({
                    ...metric,
                    localId: metric.id.toString(),
                }));
                // Sort by ID to maintain order if the API doesn't guarantee it natively
                mapped.sort((a, b) => a.id - b.id);
                setMetrics(mapped);
                setInitialMetrics(JSON.parse(JSON.stringify(mapped)));
            }

            const v = await fetchImpactVideo().catch(() => null);
            if (v && v.videoUrl) setVideo(v);
        } catch (e) {
            console.error("Failed to load impact data", e);
        }
    };

    const flash = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleSaveHero = async () => {
        setLoading(true);
        try {
            await updateImpactHero(hero);
            flash();
        } catch (e) {
            console.error(e);
            alert("Failed to save Hero section");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveMetrics = async () => {
        setLoading(true);
        try {
            // Find deleted metrics
            const initialIds = initialMetrics.filter(m => m.id !== undefined).map(m => m.id);
            const currentIds = metrics.filter(m => m.id !== undefined).map(m => m.id);
            const deletedIds = initialIds.filter(id => !currentIds.includes(id));

            // Delete removed metrics
            for (const id of deletedIds) {
                if (id !== undefined) {
                    await deleteImpactMetric(id);
                }
            }

            // Create or update metrics
            for (const m of metrics) {
                const data = { metricValue: m.metricValue, metricLabel: m.metricLabel };
                if (m.id === undefined) {
                    // New metric
                    await createImpactMetric(data);
                } else {
                    // Update existing
                    await updateImpactMetric(m.id, data);
                }
            }
            // Reload metrics to get accurate IDs after creations
            const mData = await fetchImpactMetrics().catch(() => null);
            if (mData) {
                const mapped = mData.map((metric) => ({
                    ...metric,
                    localId: metric.id.toString(),
                }));
                mapped.sort((a, b) => a.id - b.id);
                setMetrics(mapped);
                setInitialMetrics(JSON.parse(JSON.stringify(mapped)));
            }
            flash();
        } catch (e) {
            console.error(e);
            alert("Failed to save Metrics Grid");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveVideo = async () => {
        setLoading(true);
        try {
            await updateImpactVideo(video);
            flash();
        } catch (e) {
            console.error(e);
            alert("Failed to save Video Highlight");
        } finally {
            setLoading(false);
        }
    };

    // ── Hero helpers ──
    const addHeroImage = () => {
        setHero({ ...hero, heroImages: [...hero.heroImages, ''] });
    };

    const removeHeroImage = (index: number) => {
        const imgs = [...hero.heroImages];
        imgs.splice(index, 1);
        setHero({ ...hero, heroImages: imgs });
    };

    // ── Metrics helpers ──
    const addMetric = () => {
        setMetrics([
            ...metrics,
            { localId: Math.random().toString(36).substr(2, 9), metricValue: '', metricLabel: '' },
        ]);
    };

    const removeMetric = (localId: string) => {
        setMetrics(metrics.filter((m) => m.localId !== localId));
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
                            onClick={handleSaveHero}
                            disabled={loading}
                            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            Save
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
                                    value={hero.totalImpactNumber}
                                    onChange={(e) =>
                                        setHero({ ...hero, totalImpactNumber: e.target.value })
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
                                value={hero.heroBodyText}
                                onChange={(e) =>
                                    setHero({ ...hero, heroBodyText: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                            />
                            <span className="text-xs text-gray-400">
                                {hero.heroBodyText.length}/600
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
                                {hero.heroImages.map((url, i) => (
                                    <div key={i} className="flex gap-2 items-start">
                                        <div className="flex-1">
                                            <CloudinaryImageUpload
                                                label={`Hero Image ${i + 1}`}
                                                value={url}
                                                onUpload={(newUrl) => {
                                                    const imgs = [...hero.heroImages];
                                                    imgs[i] = newUrl;
                                                    setHero({ ...hero, heroImages: imgs });
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
                                onClick={handleSaveMetrics}
                                disabled={loading}
                                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                            >
                                {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                Save
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {metrics.map((m, i) => (
                            <div
                                key={m.localId}
                                className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl relative"
                            >
                                <button
                                    onClick={() => removeMetric(m.localId)}
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
                                        value={m.metricValue}
                                        onChange={(e) => {
                                            const updated = [...metrics];
                                            updated[i] = {
                                                ...updated[i],
                                                metricValue: e.target.value,
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
                                        value={m.metricLabel}
                                        onChange={(e) => {
                                            const updated = [...metrics];
                                            updated[i] = {
                                                ...updated[i],
                                                metricLabel: e.target.value,
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
                            onClick={handleSaveVideo}
                            disabled={loading}
                            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            Save
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                Video URL (YouTube)
                            </label>
                            <input
                                type="text"
                                value={video.videoUrl}
                                onChange={(e) =>
                                    setVideo({ ...video, videoUrl: e.target.value })
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
                                value={video.videoDescription}
                                onChange={(e) =>
                                    setVideo({ ...video, videoDescription: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                            />
                            <span className="text-xs text-gray-400">
                                {video.videoDescription.length}/200
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
