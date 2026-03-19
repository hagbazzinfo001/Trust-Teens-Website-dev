'use client';

import { useState, useEffect } from 'react';
import CloudinaryImageUpload from '@/components/CloudinaryImageUpload';
import { useRouter } from 'next/navigation';
import {
    CoreTeamMember,
    VolunteerMember,
    VolunteerCTA,
    MentorHero,
    MentorMember,
    MentorRoleMedia,
    MentorCTA,
    AmbassadorMember,
    AmbassadorCTA,
    getCoreTeamMembers, saveCoreTeamMembers,
    getVolunteerMembers, saveVolunteerMembers,
    getVolunteerCTA, saveVolunteerCTA,
    getMentorHero, saveMentorHero,
    getMentorMembers, saveMentorMembers,
    getMentorRoleMedia, saveMentorRoleMedia,
    getMentorCTA, saveMentorCTA,
    getAmbassadorMembers, saveAmbassadorMembers,
    getAmbassadorCTA, saveAmbassadorCTA,
    generateId,
} from '@/lib/adminData';
import { Save, Plus, Trash2, ArrowUp, ArrowDown, Check } from 'lucide-react';

const tabs = ['Core Team', 'Mentors', 'Volunteers', 'Ambassadors'] as const;
type Tab = (typeof tabs)[number];

const tabToParam: Record<Tab, string> = {
    'Core Team': 'core',
    'Mentors': 'mentors',
    'Volunteers': 'volunteers',
    'Ambassadors': 'ambassadors'
};

export default function AdminTeamTabs({ initialTab }: { initialTab: Tab }) {
    const router = useRouter();
    const activeTab = initialTab;
    const [saved, setSaved] = useState(false);

    // --- Core Team ---
    const [coreMembers, setCoreMembers] = useState<CoreTeamMember[]>([]);

    // --- Volunteers ---
    const [volunteerMembers, setVolunteerMembers] = useState<VolunteerMember[]>([]);
    const [volunteerCTA, setVolunteerCTA] = useState<VolunteerCTA>({ join_button_url: '' });

    // --- Mentors ---
    const [mentorHero, setMentorHero] = useState<MentorHero>({ hero_mentor_images: ['', ''] });
    const [mentorMembers, setMentorMembers] = useState<MentorMember[]>([]);
    const [mentorRoleMedia, setMentorRoleMedia] = useState<MentorRoleMedia>({ role_feature_image: '' });
    const [mentorCTA, setMentorCTA] = useState<MentorCTA>({ apply_button_url: '', cta_footer_image: '' });

    // --- Ambassadors ---
    const [ambassadorMembers, setAmbassadorMembers] = useState<AmbassadorMember[]>([]);
    const [ambassadorCTA, setAmbassadorCTA] = useState<AmbassadorCTA>({ apply_button_url: '' });

    useEffect(() => {
        // Load Core
        const cm = getCoreTeamMembers();
        if (cm) setCoreMembers(cm);

        // Load Volunteers
        const vm = getVolunteerMembers();
        if (vm) setVolunteerMembers(vm);
        const vCta = getVolunteerCTA();
        if (vCta) setVolunteerCTA(vCta);

        // Load Mentors
        const mh = getMentorHero();
        if (mh) setMentorHero(mh);
        const mm = getMentorMembers();
        if (mm) setMentorMembers(mm);
        const mrm = getMentorRoleMedia();
        if (mrm) setMentorRoleMedia(mrm);
        const mCta = getMentorCTA();
        if (mCta) setMentorCTA(mCta);

        // Load Ambassadors
        const am = getAmbassadorMembers();
        if (am) setAmbassadorMembers(am);
        const aCta = getAmbassadorCTA();
        if (aCta) setAmbassadorCTA(aCta);
    }, []);

    const flash = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    // --- Save Handlers ---
    const saveCore = () => { saveCoreTeamMembers(coreMembers); flash(); };
    const saveVolunteers = () => { saveVolunteerMembers(volunteerMembers); saveVolunteerCTA(volunteerCTA); flash(); }
    const saveMentors = () => { saveMentorHero(mentorHero); saveMentorMembers(mentorMembers); saveMentorRoleMedia(mentorRoleMedia); saveMentorCTA(mentorCTA); flash(); }
    const saveAmbassadors = () => { saveAmbassadorMembers(ambassadorMembers); saveAmbassadorCTA(ambassadorCTA); flash(); }

    // --- Array Helpers ---
    const addMember = <T extends { id: string, display_order: number }>(arr: T[], setArr: (val: T[]) => void, defaultItem: Omit<T, 'id' | 'display_order'>) => {
        setArr([...arr, { ...defaultItem, id: generateId(), display_order: arr.length + 1 } as unknown as T]);
    };
    const removeMember = <T extends { id: string }>(arr: T[], setArr: (val: T[]) => void, id: string) => {
        setArr(arr.filter(a => a.id !== id));
    };
    const moveMember = <T extends { display_order: number }>(arr: T[], setArr: (val: T[]) => void, index: number, dir: 'up' | 'down') => {
        const newArr = [...arr];
        const swapIndex = dir === 'up' ? index - 1 : index + 1;
        if (swapIndex < 0 || swapIndex >= newArr.length) return;
        [newArr[index], newArr[swapIndex]] = [newArr[swapIndex], newArr[index]];
        newArr.forEach((m, i) => m.display_order = i + 1);
        setArr(newArr);
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Team Page</h1>
                <p className="text-gray-500 mt-1">Manage all team directories and call-to-actions.</p>
            </div>

            {saved && (
                <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-xl shadow-lg">
                    <Check size={16} /> Saved successfully
                </div>
            )}

            <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => router.push(`/admin/team/${tabToParam[tab]}`)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* TAB: CORE TEAM */}
            {activeTab === 'Core Team' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-900">Core Team Members</h2>
                            <p className="text-sm text-gray-500">Add, reorder, or remove core team profiles</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => addMember(coreMembers, setCoreMembers, { member_name: '', member_role: '', member_bio: '', member_image: '', linkedin_url: '', twitter_url: '', instagram_url: '' })} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                                <Plus size={16} /> Add Member
                            </button>
                            <button onClick={saveCore} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                                <Save size={16} /> Save
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {coreMembers.map((member, i) => (
                            <div key={member.id} className="p-4 bg-gray-50 rounded-xl relative">
                                <div className="absolute top-3 right-3 flex items-center gap-1">
                                    <button onClick={() => moveMember(coreMembers, setCoreMembers, i, 'up')} disabled={i === 0} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"><ArrowUp size={14} /></button>
                                    <button onClick={() => moveMember(coreMembers, setCoreMembers, i, 'down')} disabled={i === coreMembers.length - 1} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"><ArrowDown size={14} /></button>
                                    <button onClick={() => removeMember(coreMembers, setCoreMembers, member.id)} className="p-1 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pr-16 mb-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Name (max 40)</label>
                                        <input type="text" maxLength={40} value={member.member_name} onChange={e => { const n = [...coreMembers]; n[i].member_name = e.target.value; setCoreMembers(n); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Role (max 50)</label>
                                        <input type="text" maxLength={50} value={member.member_role} onChange={e => { const n = [...coreMembers]; n[i].member_role = e.target.value; setCoreMembers(n); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                    </div>
                                    <div className="md:col-span-4">
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Bio (max 150)</label>
                                        <textarea maxLength={150} value={member.member_bio} onChange={e => { const n = [...coreMembers]; n[i].member_bio = e.target.value; setCoreMembers(n); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm h-20" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <CloudinaryImageUpload label="Member Image" value={member.member_image} onUpload={(url) => { const n = [...coreMembers]; n[i].member_image = url; setCoreMembers(n); }} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-medium text-gray-500 mb-1">LinkedIn URL</label>
                                        <input type="text" value={member.linkedin_url || ''} onChange={e => { const n = [...coreMembers]; n[i].linkedin_url = e.target.value; setCoreMembers(n); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Twitter URL</label>
                                        <input type="text" value={member.twitter_url || ''} onChange={e => { const n = [...coreMembers]; n[i].twitter_url = e.target.value; setCoreMembers(n); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Instagram URL</label>
                                        <input type="text" value={member.instagram_url || ''} onChange={e => { const n = [...coreMembers]; n[i].instagram_url = e.target.value; setCoreMembers(n); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB: VOLUNTEERS */}
            {activeTab === 'Volunteers' && (
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="font-semibold text-gray-900">Volunteer CTA</h2>
                            </div>
                            <button onClick={saveVolunteers} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                                <Save size={16} /> Save All Volunteers
                            </button>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Join Button URL (Kill switch)</label>
                            <input type="text" value={volunteerCTA.join_button_url} onChange={e => setVolunteerCTA({ ...volunteerCTA, join_button_url: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-semibold text-gray-900">Volunteer Members</h2>
                            <button onClick={() => addMember(volunteerMembers, setVolunteerMembers, { member_name: '', member_role: '', member_bio: '', member_image: '', social_links: {} })} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                                <Plus size={16} /> Add Volunteer
                            </button>
                        </div>

                        <div className="space-y-4">
                            {volunteerMembers.map((member, i) => (
                                <div key={member.id} className="p-4 bg-gray-50 rounded-xl relative">
                                    <div className="absolute top-3 right-3 flex items-center gap-1">
                                        <button onClick={() => moveMember(volunteerMembers, setVolunteerMembers, i, 'up')} disabled={i === 0} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"><ArrowUp size={14} /></button>
                                        <button onClick={() => moveMember(volunteerMembers, setVolunteerMembers, i, 'down')} disabled={i === volunteerMembers.length - 1} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"><ArrowDown size={14} /></button>
                                        <button onClick={() => removeMember(volunteerMembers, setVolunteerMembers, member.id)} className="p-1 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pr-16 mb-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Name (max 40)</label>
                                            <input type="text" maxLength={40} value={member.member_name} onChange={e => { const n = [...volunteerMembers]; n[i].member_name = e.target.value; setVolunteerMembers(n); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Role (max 50)</label>
                                            <input type="text" maxLength={50} value={member.member_role} onChange={e => { const n = [...volunteerMembers]; n[i].member_role = e.target.value; setVolunteerMembers(n); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                        </div>
                                        <div className="md:col-span-4">
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Bio (max 150)</label>
                                            <textarea maxLength={150} value={member.member_bio} onChange={e => { const n = [...volunteerMembers]; n[i].member_bio = e.target.value; setVolunteerMembers(n); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm h-20" />
                                        </div>
                                        <div className="md:col-span-4">
                                            <CloudinaryImageUpload label="Member Image" value={member.member_image} onUpload={(url) => { const n = [...volunteerMembers]; n[i].member_image = url; setVolunteerMembers(n); }} />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-medium text-gray-500 mb-1">LinkedIn URL</label>
                                            <input type="text" value={member.social_links?.linkedin || ''} onChange={e => { const n = [...volunteerMembers]; n[i].social_links = { ...n[i].social_links, linkedin: e.target.value }; setVolunteerMembers(n); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Twitter URL</label>
                                            <input type="text" value={member.social_links?.twitter || ''} onChange={e => { const n = [...volunteerMembers]; n[i].social_links = { ...n[i].social_links, twitter: e.target.value }; setVolunteerMembers(n); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: MENTORS */}
            {activeTab === 'Mentors' && (
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="font-semibold text-gray-900">Mentors Section</h2>
                            </div>
                            <button onClick={saveMentors} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                                <Save size={16} /> Save All Mentors
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <CloudinaryImageUpload label="Hero Image 1" value={mentorHero.hero_mentor_images[0] || ''} onUpload={(url) => setMentorHero({ hero_mentor_images: [url, mentorHero.hero_mentor_images[1]] })} />
                            </div>
                            <div>
                                <CloudinaryImageUpload label="Hero Image 2" value={mentorHero.hero_mentor_images[1] || ''} onUpload={(url) => setMentorHero({ hero_mentor_images: [mentorHero.hero_mentor_images[0], url] })} />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 border-t pt-4">
                            <div>
                                <CloudinaryImageUpload label="Role Feature Image" value={mentorRoleMedia.role_feature_image} onUpload={(url) => setMentorRoleMedia({ role_feature_image: url })} />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Footer CTA URL</label>
                                <input type="text" value={mentorCTA.apply_button_url} onChange={e => setMentorCTA({ ...mentorCTA, apply_button_url: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                            </div>
                            <div>
                                <CloudinaryImageUpload label="Footer CTA Image" value={mentorCTA.cta_footer_image} onUpload={(url) => setMentorCTA({ ...mentorCTA, cta_footer_image: url })} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-semibold text-gray-900">Mentor Members</h2>
                            <button onClick={() => addMember(mentorMembers, setMentorMembers, { member_name: '', member_role: '', member_bio: '', member_image: '', social_links: {} })} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                                <Plus size={16} /> Add Mentor
                            </button>
                        </div>
                        <div className="space-y-4">
                            {mentorMembers.map((member, i) => (
                                <div key={member.id} className="p-4 bg-gray-50 rounded-xl relative">
                                    <div className="absolute top-3 right-3 flex items-center gap-1">
                                        <button onClick={() => moveMember(mentorMembers, setMentorMembers, i, 'up')} disabled={i === 0} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"><ArrowUp size={14} /></button>
                                        <button onClick={() => moveMember(mentorMembers, setMentorMembers, i, 'down')} disabled={i === mentorMembers.length - 1} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"><ArrowDown size={14} /></button>
                                        <button onClick={() => removeMember(mentorMembers, setMentorMembers, member.id)} className="p-1 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pr-16 mb-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Name (max 40)</label>
                                            <input type="text" maxLength={40} value={member.member_name} onChange={e => { const n = [...mentorMembers]; n[i].member_name = e.target.value; setMentorMembers(n); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Role (max 50)</label>
                                            <input type="text" maxLength={50} value={member.member_role} onChange={e => { const n = [...mentorMembers]; n[i].member_role = e.target.value; setMentorMembers(n); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                        </div>
                                        <div className="md:col-span-4">
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Bio (max 150)</label>
                                            <textarea maxLength={150} value={member.member_bio} onChange={e => { const n = [...mentorMembers]; n[i].member_bio = e.target.value; setMentorMembers(n); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm h-20" />
                                        </div>
                                        <div className="md:col-span-4">
                                            <CloudinaryImageUpload label="Member Image" value={member.member_image} onUpload={(url) => { const n = [...mentorMembers]; n[i].member_image = url; setMentorMembers(n); }} />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-medium text-gray-500 mb-1">LinkedIn URL</label>
                                            <input type="text" value={member.social_links?.linkedin || ''} onChange={e => { const n = [...mentorMembers]; n[i].social_links = { ...n[i].social_links, linkedin: e.target.value }; setMentorMembers(n); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Twitter URL</label>
                                            <input type="text" value={member.social_links?.twitter || ''} onChange={e => { const n = [...mentorMembers]; n[i].social_links = { ...n[i].social_links, twitter: e.target.value }; setMentorMembers(n); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: AMBASSADORS */}
            {activeTab === 'Ambassadors' && (
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="font-semibold text-gray-900">Ambassador CTA</h2>
                            </div>
                            <button onClick={saveAmbassadors} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                                <Save size={16} /> Save All Ambassadors
                            </button>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Apply Button URL</label>
                            <input type="text" value={ambassadorCTA.apply_button_url} onChange={e => setAmbassadorCTA({ apply_button_url: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-semibold text-gray-900">Ambassador Members</h2>
                            <button onClick={() => addMember(ambassadorMembers, setAmbassadorMembers, { ambassador_name: '', school_name: '', location: '', ambassador_image: '' })} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                                <Plus size={16} /> Add Ambassador
                            </button>
                        </div>
                        <div className="space-y-4">
                            {ambassadorMembers.map((member, i) => (
                                <div key={member.id} className="p-4 bg-gray-50 rounded-xl relative">
                                    <div className="absolute top-3 right-3 flex items-center gap-1">
                                        <button onClick={() => moveMember(ambassadorMembers, setAmbassadorMembers, i, 'up')} disabled={i === 0} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"><ArrowUp size={14} /></button>
                                        <button onClick={() => moveMember(ambassadorMembers, setAmbassadorMembers, i, 'down')} disabled={i === ambassadorMembers.length - 1} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"><ArrowDown size={14} /></button>
                                        <button onClick={() => removeMember(ambassadorMembers, setAmbassadorMembers, member.id)} className="p-1 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                                    </div>
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pr-16 mb-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Name (max 40)</label>
                                            <input type="text" maxLength={40} value={member.ambassador_name} onChange={e => { const n = [...ambassadorMembers]; n[i].ambassador_name = e.target.value; setAmbassadorMembers(n); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">School (max 50)</label>
                                            <input type="text" maxLength={50} value={member.school_name} onChange={e => { const n = [...ambassadorMembers]; n[i].school_name = e.target.value; setAmbassadorMembers(n); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Location (max 50)</label>
                                            <input type="text" maxLength={50} value={member.location} onChange={e => { const n = [...ambassadorMembers]; n[i].location = e.target.value; setAmbassadorMembers(n); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                        </div>
                                        <div>
                                            <CloudinaryImageUpload label="Ambassador Image" value={member.ambassador_image} onUpload={(url) => { const n = [...ambassadorMembers]; n[i].ambassador_image = url; setAmbassadorMembers(n); }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
