'use client';

import { useState, useEffect } from 'react';
import CloudinaryImageUpload from '@/components/CloudinaryImageUpload';
import {
    HeroMetric,
    ImpactStat,
    Testimonial,
    getHeroMetrics,
    saveHeroMetrics,
    getImpactStats,
    saveImpactStats,
    getTestimonials,
    saveTestimonials,
    generateId,
} from '@/lib/adminData';
import { Save, Plus, Trash2, Check } from 'lucide-react';

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

export default function AdminHomePage() {
    const [activeTab, setActiveTab] = useState<Tab>('Hero Metrics');
    const [saved, setSaved] = useState(false);

    // ── Hero Metrics ──
    const [heroMetrics, setHeroMetrics] = useState<HeroMetric[]>(DEFAULT_HERO);

    // ── Impact Stats ──
    const [impactStats, setImpactStats] = useState<ImpactStat[]>(DEFAULT_IMPACT);

    // ── Testimonials ──
    const [testimonials, setTestimonials] =
        useState<Testimonial[]>(DEFAULT_TESTIMONIALS);

    // ── Load from localStorage ──
    useEffect(() => {
        const h = getHeroMetrics();
        if (h) setHeroMetrics(h);

        const s = getImpactStats();
        if (s) setImpactStats(s);

        const t = getTestimonials();
        if (t) setTestimonials(t);
    }, []);

    // ── Save & flash ──
    const flash = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleSaveHero = () => {
        saveHeroMetrics(heroMetrics);
        flash();
    };

    const handleSaveImpact = () => {
        saveImpactStats(impactStats);
        flash();
    };

    const handleSaveTestimonials = () => {
        saveTestimonials(testimonials);
        flash();
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
                            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                        >
                            <Save size={16} /> Save
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
                                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                            >
                                <Save size={16} /> Save
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
