'use client';

import { useState, useEffect } from 'react';
import {
    CurriculumInfo,
    getCurriculumInfo,
    saveCurriculumInfo,
} from '@/lib/adminData';
import { Save, Check, ExternalLink } from 'lucide-react';

export default function AdminCurriculumPage() {
    const [info, setInfo] = useState<CurriculumInfo>({ notion_url: '' });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const data = getCurriculumInfo();
        if (data) setInfo(data);
    }, []);

    const flash = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleSave = () => {
        saveCurriculumInfo(info);
        flash();
    };

    return (
        <div className="max-w-2xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Curriculum</h1>
                <p className="text-gray-500 mt-1">Manage the external link for the Trust Teens Curriculum.</p>
            </div>

            {saved && (
                <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-xl shadow-lg">
                    <Check size={16} /> Saved successfully
                </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Notion Curriculum URL</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={info.notion_url}
                                onChange={(e) => setInfo({ notion_url: e.target.value })}
                                placeholder="https://notion.site/..."
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            {info.notion_url && (
                                <a
                                    href={info.notion_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-gray-400 hover:text-orange-500 transition-colors"
                                    title="Open link"
                                >
                                    <ExternalLink size={20} />
                                </a>
                            )}
                        </div>
                        <p className="mt-2 text-xs text-gray-400">
                            This link will be used when visitors click the &quot;Click Here&quot; button on the Curriculum page.
                        </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl text-sm font-semibold transition-all shadow-md active:scale-95"
                        >
                            <Save size={18} />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <h3 className="text-sm font-semibold text-blue-900 mb-1">Testing the link</h3>
                <p className="text-xs text-blue-700">
                    After saving, you can visit the <a href="/community/curriculum" className="underline font-medium">Curriculum page</a> to verify the button redirects correctly.
                </p>
            </div>
        </div>
    );
}
