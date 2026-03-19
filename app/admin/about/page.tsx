'use client';

import { useState, useEffect } from 'react';
import CloudinaryImageUpload from '@/components/CloudinaryImageUpload';
import {
    AchievementMetric,
    Leader,
    getAchievementMetric,
    saveAchievementMetric,
    getLeaders,
    saveLeaders,
    generateId,
} from '@/lib/adminData';
import { Save, Plus, Trash2, ArrowUp, ArrowDown, Check } from 'lucide-react';

// ─── Defaults ────────────────────────────────────────────────────────

const DEFAULT_ACHIEVEMENT: AchievementMetric = {
    metric_value: '25',
    metric_label: 'Purpose driven initiatives executed',
};

const DEFAULT_LEADERS: Leader[] = [
    {
        id: '1',
        leader_name: 'Deborah Dada',
        leader_title: 'Founder, Trust Teens',
        leader_image:
            'https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764436920/deborah_yw4azn.png?auto=compress&cs=tinysrgb&w=400',
        display_order: 1,
    },
    {
        id: '2',
        leader_name: 'Alex Oyebade',
        leader_title: 'Founder, Peercheck',
        leader_image:
            'https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764440281/alex_dbug1a.png?auto=compress&cs=tinysrgb&w=400',
        display_order: 2,
    },
    {
        id: '3',
        leader_name: 'Emmanuel Oshowobi',
        leader_title: 'UX Designer',
        leader_image:
            'https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764440305/emeal_ec26gr.png?auto=compress&cs=tinysrgb&w=400',
        display_order: 3,
    },
];

const tabs = ['Achievement Metric', 'Leadership'] as const;
type Tab = (typeof tabs)[number];

export default function AdminAboutPage() {
    const [activeTab, setActiveTab] = useState<Tab>('Achievement Metric');
    const [saved, setSaved] = useState(false);

    const [achievement, setAchievement] =
        useState<AchievementMetric>(DEFAULT_ACHIEVEMENT);
    const [leaders, setLeaders] = useState<Leader[]>(DEFAULT_LEADERS);

    useEffect(() => {
        const a = getAchievementMetric();
        if (a) setAchievement(a);
        const l = getLeaders();
        if (l) setLeaders(l);
    }, []);

    const flash = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleSaveAchievement = () => {
        saveAchievementMetric(achievement);
        flash();
    };

    const handleSaveLeaders = () => {
        saveLeaders(leaders);
        flash();
    };

    const addLeader = () => {
        setLeaders([
            ...leaders,
            {
                id: generateId(),
                leader_name: '',
                leader_title: '',
                leader_image: '',
                display_order: leaders.length + 1,
            },
        ]);
    };

    const removeLeader = (id: string) => {
        setLeaders(leaders.filter((l) => l.id !== id));
    };

    const moveLeader = (index: number, direction: 'up' | 'down') => {
        const newLeaders = [...leaders];
        const swapIndex = direction === 'up' ? index - 1 : index + 1;
        if (swapIndex < 0 || swapIndex >= newLeaders.length) return;
        [newLeaders[index], newLeaders[swapIndex]] = [
            newLeaders[swapIndex],
            newLeaders[index],
        ];
        // re-number
        newLeaders.forEach((l, i) => (l.display_order = i + 1));
        setLeaders(newLeaders);
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">About Page</h1>
                <p className="text-gray-500 mt-1">
                    Manage the achievement metric and leadership team.
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

            {/* ──── ACHIEVEMENT METRIC ──── */}
            {activeTab === 'Achievement Metric' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">
                                Orange Card — Achievement Metric
                            </h2>
                            <p className="text-sm text-gray-500">Single record</p>
                        </div>
                        <button
                            onClick={handleSaveAchievement}
                            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                        >
                            <Save size={16} /> Save
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                Value (max 10 chars)
                            </label>
                            <input
                                type="text"
                                maxLength={10}
                                value={achievement.metric_value}
                                onChange={(e) =>
                                    setAchievement({ ...achievement, metric_value: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                Label (max 30 chars)
                            </label>
                            <input
                                type="text"
                                maxLength={30}
                                value={achievement.metric_label}
                                onChange={(e) =>
                                    setAchievement({ ...achievement, metric_label: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="mt-6">
                        <p className="text-xs text-gray-400 mb-2">Preview</p>
                        <div className="w-48 h-32 rounded-2xl bg-orange-500 flex flex-col items-center justify-center text-white">
                            <span className="text-3xl font-bold">
                                {achievement.metric_value}+
                            </span>
                            <span className="text-sm mt-1">{achievement.metric_label}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* ──── LEADERSHIP ──── */}
            {activeTab === 'Leadership' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">Leadership Team</h2>
                            <p className="text-sm text-gray-500">
                                Add, reorder, or remove leaders
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={addLeader}
                                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                            >
                                <Plus size={16} /> Add Leader
                            </button>
                            <button
                                onClick={handleSaveLeaders}
                                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                            >
                                <Save size={16} /> Save
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {leaders.map((leader, i) => (
                            <div key={leader.id} className="p-4 bg-gray-50 rounded-xl relative">
                                <div className="absolute top-3 right-3 flex items-center gap-1">
                                    <button
                                        onClick={() => moveLeader(i, 'up')}
                                        disabled={i === 0}
                                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                        title="Move up"
                                    >
                                        <ArrowUp size={14} />
                                    </button>
                                    <button
                                        onClick={() => moveLeader(i, 'down')}
                                        disabled={i === leaders.length - 1}
                                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                        title="Move down"
                                    >
                                        <ArrowDown size={14} />
                                    </button>
                                    <button
                                        onClick={() => removeLeader(leader.id)}
                                        className="p-1 text-gray-400 hover:text-red-500"
                                        title="Remove"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">
                                            Name (max 40)
                                        </label>
                                        <input
                                            type="text"
                                            maxLength={40}
                                            value={leader.leader_name}
                                            onChange={(e) => {
                                                const updated = [...leaders];
                                                updated[i] = {
                                                    ...updated[i],
                                                    leader_name: e.target.value,
                                                };
                                                setLeaders(updated);
                                            }}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">
                                            Title (max 50)
                                        </label>
                                        <input
                                            type="text"
                                            maxLength={50}
                                            value={leader.leader_title}
                                            onChange={(e) => {
                                                const updated = [...leaders];
                                                updated[i] = {
                                                    ...updated[i],
                                                    leader_title: e.target.value,
                                                };
                                                setLeaders(updated);
                                            }}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                    <div>
                                        <CloudinaryImageUpload
                                            label="Leader Image"
                                            value={leader.leader_image}
                                            onUpload={(url) => {
                                                const updated = [...leaders];
                                                updated[i] = {
                                                    ...updated[i],
                                                    leader_image: url,
                                                };
                                                setLeaders(updated);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
