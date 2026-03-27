'use client';

import { useState, useEffect, useCallback } from 'react';
import CloudinaryImageUpload from '@/components/CloudinaryImageUpload';
import {
    HeroMetric,
    ImpactStat,
    Testimonial,
    generateId,
} from '@/lib/adminData';
import { Save, Plus, Trash2, Check, Loader2 } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { fetchTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '@/lib/testimonialsApi';
import { fetchHeroStats, createHeroStat, updateHeroStat, deleteHeroStat } from '@/lib/heroStatsApi';
import { ApiHomeImpactStat, fetchHomeImpactStats, createHomeImpactStat, updateHomeImpactStat, deleteHomeImpactStat } from '@/lib/homeImpactStatsApi';

// ─── Defaults (match the hardcoded values in client page) ────────────

const DEFAULT_HERO: HeroMetric[] = [
    { metric_value: '25', metric_label: 'Purpose driven initiatives executed' },
    { metric_value: '8500', metric_label: 'Direct beneficiaries of our programs' },
    { metric_value: '12', metric_label: 'Communities across cities and schools' },
];

const DEFAULT_IMPACT: ImpactStat[] = [
    { value: 22, label: 'Months of impact' },
    { value: 100, label: 'Volunteers', suffix: '+' },
    { value: 8500, label: 'Teens Reached' },
    { value: 25, label: 'Projects Executed' },
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
    {
        id: '1',
        teen_name: 'Jane Cooper',
        teen_age: '18 year old',
        quote_text:
            'We had an incredible experience working with Laundrify and were impressed they made such a big difference in only three weeks.',
        teen_image: '/images/testimonia4.svg',
    },
    {
        id: '2',
        teen_name: 'David Smith',
        teen_age: '17 year old',
        quote_text:
            'This program changed my confidence completely. I now believe in my abilities and leadership skills.',
        teen_image: '/images/testimonia4.svg',
    },
];

// ─── Tabs ────────────────────────────────────────────────────────────

const tabs = ['Hero Metrics', 'Impact Stats', 'Testimonials'] as const;
type Tab = (typeof tabs)[number];

type LocalTestimonial = Testimonial & { apiId?: string | number };
type LocalHeroMetric = { apiId?: string | number, metric_value: string, metric_label: string, position: number };
type LocalImpactStat = ImpactStat & { _apiId?: string | number; _position?: number };

export default function AdminHomePage() {
    const { getAuthHeaders } = useAdmin();
    const [activeTab, setActiveTab] = useState<Tab>('Hero Metrics');
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    // ── Hero Metrics ──
    const [heroMetrics, setHeroMetrics] = useState<LocalHeroMetric[]>(
        DEFAULT_HERO.map((h, i) => ({ ...h, position: i + 1 }))
    );
    const [initialHeroMetrics, setInitialHeroMetrics] = useState<LocalHeroMetric[]>([]);

    // ── Impact Stats ──
    const [impactStats, setImpactStats] = useState<LocalImpactStat[]>(DEFAULT_IMPACT);
    const [impactLoading, setImpactLoading] = useState(true);
    const [impactError, setImpactError] = useState('');

    // ── Testimonials ──
    const [testimonials, setTestimonials] = useState<LocalTestimonial[]>([]);
    const [initialTestimonials, setInitialTestimonials] = useState<LocalTestimonial[]>([]);

    // ── Load from API ──
    const loadImpactStats = useCallback(async () => {
        setImpactLoading(true);
        setImpactError('');
        try {
            const data = await fetchHomeImpactStats();
            if (data && data.length > 0) {
                const mapped: LocalImpactStat[] = data.map((d, i) => ({
                    value: parseInt(String(d.statNumber).replace(/[^0-9]/g, '')) || 0,
                    label: d.statTitle || '',
                    suffix: String(d.statNumber).replace(/[0-9]/g, '').trim() || undefined,
                    _apiId: d._id || d.id,
                    _position: d.position ?? i,
                }));
                setImpactStats(mapped);
            }
        } catch (e) {
            console.error('Failed to load home impact stats', e);
            setImpactError(e instanceof Error ? e.message : 'Failed to load impact stats');
        } finally {
            setImpactLoading(false);
        }
    }, []);

    useEffect(() => {
        loadHeroStats();
        loadImpactStats();
        loadTestimonials();
    }, [loadImpactStats]);

    const loadHeroStats = async () => {
        try {
            const apiData = await fetchHeroStats().catch(() => null);
            if (apiData && apiData.length > 0) {
                // Ensure proper positions (1, 2, 3) mapped to exactly 3 items
                const mapped = Array.from({ length: 3 }).map((_, i) => {
                    const pos = i + 1;
                    const found = apiData.find(d => d.position === pos);
                    return {
                        apiId: found?._id || found?.id,
                        metric_value: found?.metricValue || '',
                        metric_label: found?.metricLabel || '',
                        position: pos,
                    };
                });
                setHeroMetrics(mapped);
                setInitialHeroMetrics(JSON.parse(JSON.stringify(mapped)));
            } else {
                const defaults = DEFAULT_HERO.map((h, i) => ({ ...h, position: i + 1 }));
                setHeroMetrics(defaults);
                setInitialHeroMetrics(defaults);
            }
        } catch (e) {
            console.error("Failed to load hero stats", e);
        }
    };

    const loadTestimonials = async () => {
        try {
            const apiData = await fetchTestimonials().catch(() => null);
            if (apiData && apiData.length > 0) {
                const mapped = apiData.map((t) => ({
                    id: generateId(), // local random ID for react key
                    apiId: t._id || t.id,
                    teen_name: t.teenName || '',
                    teen_age: t.teenAge || '',
                    quote_text: t.quoteText || '',
                    teen_image: t.teenImage || '/images/testimonia4.svg',
                }));
                setTestimonials(mapped);
                setInitialTestimonials(JSON.parse(JSON.stringify(mapped)));
            } else {
                const defaults = DEFAULT_TESTIMONIALS.map(t => ({ ...t, apiId: undefined }));
                setTestimonials(defaults);
                setInitialTestimonials(defaults);
            }
        } catch (e) {
            console.error("Failed to load testimonials", e);
        }
    };

    // ── Save & flash ──
    const flash = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleSaveHero = async () => {
        setLoading(true);
        try {
            for (const m of heroMetrics) {
                const data = {
                    metricValue: m.metric_value,
                    metricLabel: m.metric_label,
                    position: m.position,
                };
                if (m.apiId === undefined) {
                    await createHeroStat(data, getAuthHeaders());
                } else {
                    await updateHeroStat(m.apiId, data, getAuthHeaders());
                }
            }
            await loadHeroStats();
            flash();
        } catch (e) {
            console.error(e);
            alert("Failed to save Hero Metrics");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveImpact = async () => {
        setLoading(true);
        setImpactError('');
        try {
            const headers = getAuthHeaders();
            // Fetch current remote list for diffing
            const remote = await fetchHomeImpactStats();
            const remoteIds = new Set(remote.map((r) => String(r._id || r.id)));
            const localIds = new Set(impactStats.filter((s) => s._apiId).map((s) => String(s._apiId)));

            // Delete stats removed locally
            for (const r of remote) {
                const rid = String(r._id || r.id);
                if (!localIds.has(rid)) {
                    await deleteHomeImpactStat(rid, headers);
                }
            }

            // Create or update
            for (let i = 0; i < impactStats.length; i++) {
                const stat = impactStats[i];
                const numStr = stat.suffix ? `${stat.value}${stat.suffix}` : String(stat.value);
                const payload = { statNumber: numStr, statTitle: stat.label, position: i };
                if (stat._apiId && remoteIds.has(String(stat._apiId))) {
                    await updateHomeImpactStat(stat._apiId, payload, headers);
                } else {
                    await createHomeImpactStat(payload, headers);
                }
            }

            flash();
            await loadImpactStats();
        } catch (e) {
            console.error(e);
            setImpactError(e instanceof Error ? e.message : 'Save failed');
            alert('Failed to save Impact Stats');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveTestimonials = async () => {
        setLoading(true);
        try {
            const initialApiIds = initialTestimonials.filter(t => t.apiId !== undefined).map(t => t.apiId);
            const currentApiIds = testimonials.filter(t => t.apiId !== undefined).map(t => t.apiId);
            const deletedIds = initialApiIds.filter(id => !currentApiIds.includes(id));

            for (const id of deletedIds) {
                if (id !== undefined) await deleteTestimonial(id, getAuthHeaders());
            }

            for (const t of testimonials) {
                const data = {
                    teenName: t.teen_name,
                    teenAge: t.teen_age,
                    quoteText: t.quote_text,
                    teenImage: t.teen_image,
                };
                if (t.apiId === undefined) {
                    await createTestimonial(data, getAuthHeaders());
                } else {
                    await updateTestimonial(t.apiId, data, getAuthHeaders());
                }
            }
            await loadTestimonials();
            flash();
        } catch (e) {
            console.error(e);
            alert("Failed to save Testimonials");
        } finally {
            setLoading(false);
        }
    };

    // ── Testimonial helpers ──
    const addTestimonial = () => {
        setTestimonials([
            ...testimonials,
            {
                id: generateId(),
                teen_name: '',
                teen_age: '',
                quote_text: '',
                teen_image: '/images/testimonia4.svg',
            },
        ]);
    };

    const removeTestimonial = (id: string) => {
        setTestimonials(testimonials.filter((t) => t.id !== id));
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Home Page</h1>
                <p className="text-gray-500 mt-1">
                    Manage hero metrics, impact statistics, and testimonials.
                </p>
            </div>

            {/* Saved toast */}
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

            {/* ──── HERO METRICS TAB ──── */}
            {activeTab === 'Hero Metrics' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">
                                Performance Metrics
                            </h2>
                            <p className="text-sm text-gray-500">Exactly 3 records</p>
                        </div>
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
                        {heroMetrics.map((metric, i) => (
                            <div
                                key={i}
                                className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl"
                            >
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">
                                        Value (max 10 chars)
                                    </label>
                                    <input
                                        type="text"
                                        maxLength={10}
                                        value={metric.metric_value}
                                        onChange={(e) => {
                                            const updated = [...heroMetrics];
                                            updated[i] = { ...updated[i], metric_value: e.target.value };
                                            setHeroMetrics(updated);
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">
                                        Label (max 25 chars)
                                    </label>
                                    <input
                                        type="text"
                                        maxLength={25}
                                        value={metric.metric_label}
                                        onChange={(e) => {
                                            const updated = [...heroMetrics];
                                            updated[i] = { ...updated[i], metric_label: e.target.value };
                                            setHeroMetrics(updated);
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ──── IMPACT STATS TAB ──── */}
            {activeTab === 'Impact Stats' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">
                                &ldquo;The Impact That Matters&rdquo;
                            </h2>
                            <p className="text-sm text-gray-500">Exactly 4 records</p>
                        </div>
                        <button
                            onClick={handleSaveImpact}
                            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                        >
                            <Save size={16} /> Save
                        </button>
                    </div>

                    <div className="space-y-4">
                        {impactStats.map((stat, i) => (
                            <div
                                key={i}
                                className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl"
                            >
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">
                                        Numeric Value
                                    </label>
                                    <input
                                        type="number"
                                        value={stat.value}
                                        onChange={(e) => {
                                            const updated = [...impactStats];
                                            updated[i] = {
                                                ...updated[i],
                                                value: parseInt(e.target.value) || 0,
                                            };
                                            setImpactStats(updated);
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">
                                        Label
                                    </label>
                                    <input
                                        type="text"
                                        maxLength={25}
                                        value={stat.label}
                                        onChange={(e) => {
                                            const updated = [...impactStats];
                                            updated[i] = { ...updated[i], label: e.target.value };
                                            setImpactStats(updated);
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">
                                        Suffix (e.g. +)
                                    </label>
                                    <input
                                        type="text"
                                        maxLength={5}
                                        value={stat.suffix || ''}
                                        onChange={(e) => {
                                            const updated = [...impactStats];
                                            updated[i] = { ...updated[i], suffix: e.target.value };
                                            setImpactStats(updated);
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ──── TESTIMONIALS TAB ──── */}
            {activeTab === 'Testimonials' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">
                                &ldquo;What Our Teenagers Say&rdquo;
                            </h2>
                            <p className="text-sm text-gray-500">
                                Slider enabled — add as many as needed
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={addTestimonial}
                                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                            >
                                <Plus size={16} /> Add
                            </button>
                            <button
                                onClick={handleSaveTestimonials}
                                disabled={loading}
                                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                            >
                                {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                Save
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {testimonials.map((t, i) => (
                            <div key={t.id} className="p-4 bg-gray-50 rounded-xl relative">
                                <button
                                    onClick={() => removeTestimonial(t.id)}
                                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                                    title="Remove"
                                >
                                    <Trash2 size={16} />
                                </button>

                                <div className="grid grid-cols-3 gap-4 mb-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">
                                            Name (max 30)
                                        </label>
                                        <input
                                            type="text"
                                            maxLength={30}
                                            value={t.teen_name}
                                            onChange={(e) => {
                                                const updated = [...testimonials];
                                                updated[i] = { ...updated[i], teen_name: e.target.value };
                                                setTestimonials(updated);
                                            }}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">
                                            Age (max 15)
                                        </label>
                                        <input
                                            type="text"
                                            maxLength={15}
                                            value={t.teen_age}
                                            onChange={(e) => {
                                                const updated = [...testimonials];
                                                updated[i] = { ...updated[i], teen_age: e.target.value };
                                                setTestimonials(updated);
                                            }}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                    <div>
                                        <CloudinaryImageUpload
                                            label="Teen Image"
                                            value={t.teen_image}
                                            onUpload={(url) => {
                                                const updated = [...testimonials];
                                                updated[i] = { ...updated[i], teen_image: url };
                                                setTestimonials(updated);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">
                                        Quote (max 250)
                                    </label>
                                    <textarea
                                        maxLength={250}
                                        rows={3}
                                        value={t.quote_text}
                                        onChange={(e) => {
                                            const updated = [...testimonials];
                                            updated[i] = { ...updated[i], quote_text: e.target.value };
                                            setTestimonials(updated);
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                                    />
                                    <span className="text-xs text-gray-400">
                                        {t.quote_text.length}/250
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
