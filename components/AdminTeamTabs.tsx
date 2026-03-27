'use client';

import { useState, useEffect, useCallback } from 'react';
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
    generateId,
} from '@/lib/adminData';
import * as teamApi from '@/lib/teamApi';
import { Save, Plus, Trash2, ArrowUp, ArrowDown, Check, Loader2 } from 'lucide-react';

const tabs = ['Core Team', 'Mentors', 'Volunteers', 'Ambassadors'] as const;
type Tab = (typeof tabs)[number];

const tabToParam: Record<Tab, string> = {
    'Core Team': 'core',
    'Mentors': 'mentors',
    'Volunteers': 'volunteers',
    'Ambassadors': 'ambassadors'
};

// ─── Data Mappers ──────────────────────────────────────────────────

function apiToCore(a: teamApi.ApiTeamMember): CoreTeamMember & { _apiId: number } {
    return {
        id: String(a.id),
        _apiId: a.id,
        display_order: a.displayOrder,
        member_name: a.memberName || '',
        member_role: a.memberRole || '',
        member_bio: a.memberBio || '',
        member_image: a.memberImage || '',
        linkedin_url: a.linkedInUrl || '',
        twitter_url: a.twitterUrl || '',
        instagram_url: a.instagramUrl || '',
    };
}

function apiToVol(a: teamApi.ApiTeamMember): VolunteerMember & { _apiId: number } {
    return {
        id: String(a.id),
        _apiId: a.id,
        display_order: a.displayOrder,
        member_name: a.memberName || '',
        member_role: a.memberRole || '',
        member_bio: a.memberBio || '',
        member_image: a.memberImage || '',
        social_links: {
            linkedin: a.linkedInUrl || '',
            twitter: a.twitterUrl || '',
        }
    };
}

function apiToMen(a: teamApi.ApiTeamMember): MentorMember & { _apiId: number } {
    return {
        id: String(a.id),
        _apiId: a.id,
        display_order: a.displayOrder,
        member_name: a.memberName || '',
        member_role: a.memberRole || '',
        member_bio: a.memberBio || '',
        member_image: a.memberImage || '',
        social_links: {
            linkedin: a.linkedInUrl || '',
            twitter: a.twitterUrl || '',
        }
    };
}

function apiToAmb(a: teamApi.ApiAmbassadorMember): AmbassadorMember & { _apiId: number } {
    return {
        id: String(a.id),
        _apiId: a.id,
        display_order: a.displayOrder,
        ambassador_name: a.ambassadorName || '',
        school_name: a.schoolName || '',
        location: a.location || '',
        ambassador_image: a.ambassadorImage || '',
    };
}

export default function AdminTeamTabs({ initialTab }: { initialTab: Tab }) {
    const router = useRouter();
    const activeTab = initialTab;
    
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    // --- Core Team ---
    const [coreHero, setCoreHero] = useState('');
    const [coreMembers, setCoreMembers] = useState<(CoreTeamMember & { _apiId?: number })[]>([]);

    // --- Volunteers ---
    const [volunteerHero, setVolunteerHero] = useState<['', ''] | [string, string]>(['', '']);
    const [volunteerMembers, setVolunteerMembers] = useState<(VolunteerMember & { _apiId?: number })[]>([]);
    const [volunteerCTA, setVolunteerCTA] = useState<VolunteerCTA>({ join_button_url: '' });

    // --- Mentors ---
    const [mentorHero, setMentorHero] = useState<MentorHero>({ hero_mentor_images: ['', ''] });
    const [mentorMembers, setMentorMembers] = useState<(MentorMember & { _apiId?: number })[]>([]);
    const [mentorRoleMedia, setMentorRoleMedia] = useState<MentorRoleMedia>({ role_feature_image: '' });
    const [mentorCTA, setMentorCTA] = useState<MentorCTA>({ apply_button_url: '', cta_footer_image: '' });

    // --- Ambassadors ---
    const [ambassadorHero, setAmbassadorHero] = useState('');
    const [ambassadorMembers, setAmbassadorMembers] = useState<(AmbassadorMember & { _apiId?: number })[]>([]);
    const [ambassadorCTA, setAmbassadorCTA] = useState<AmbassadorCTA>({ apply_button_url: '' });

    // ─── Data Loading ───────────────────────────────────────────────

    const loadData = useCallback(async () => {
        setLoading(true);
        setErrorMsg('');
        try {
            // We load data based on active tab to optimize slightly, or load all. Let's load all for simplicity since it's an admin dashboard.
            
            // Core
            const [cH, cM] = await Promise.all([
                teamApi.fetchCoreHero().catch(() => ({ imageUrl: '' })),
                teamApi.fetchCoreMembers().catch(() => [])
            ]);
            if (cH?.imageUrl) setCoreHero(cH.imageUrl);
            if (cM) setCoreMembers(cM.sort((a,b)=>a.displayOrder-b.displayOrder).map(apiToCore));

            // Volunteers
            const [vH, vM, vC] = await Promise.all([
                teamApi.fetchVolunteersHero().catch(() => ({ heroImage1: '', heroImage2: '' })),
                teamApi.fetchVolunteerMembers().catch(() => []),
                teamApi.fetchVolunteerCta().catch(() => ({ joinButtonUrl: '' } as teamApi.ApiVolunteerCta))
            ]);
            if (vH) setVolunteerHero([vH.heroImage1 || '', vH.heroImage2 || '']);
            if (vM) setVolunteerMembers(vM.sort((a,b)=>a.displayOrder-b.displayOrder).map(apiToVol));
            if (vC) setVolunteerCTA({ join_button_url: vC.joinButtonUrl || '' });

            // Mentors
            const [mH, mM, mR, mC] = await Promise.all([
                teamApi.fetchMentorsHero().catch(() => ({ heroImage1: '', heroImage2: '' })),
                teamApi.fetchMentorMembers().catch(() => []),
                teamApi.fetchMentorRoleMedia().catch(() => ({ imageUrl: '' })),
                teamApi.fetchMentorCta().catch(() => ({ applyButtonUrl: '', ctaFooterImage: '' } as teamApi.ApiMentorCta))
            ]);
            if (mH) setMentorHero({ hero_mentor_images: [mH.heroImage1 || '', mH.heroImage2 || ''] });
            if (mM) setMentorMembers(mM.sort((a,b)=>a.displayOrder-b.displayOrder).map(apiToMen));
            if (mR?.imageUrl) setMentorRoleMedia({ role_feature_image: mR.imageUrl || '' });
            if (mC) setMentorCTA({ apply_button_url: mC.applyButtonUrl || '', cta_footer_image: mC.ctaFooterImage || '' });

            // Ambassadors
            const [aH, aM, aC] = await Promise.all([
                teamApi.fetchAmbassadorsHero().catch(() => ({ imageUrl: '' })),
                teamApi.fetchAmbassadorMembers().catch(() => []),
                teamApi.fetchAmbassadorCta().catch(() => ({ applyButtonUrl: '' } as teamApi.ApiAmbassadorCta))
            ]);
            if (aH?.imageUrl) setAmbassadorHero(aH.imageUrl);
            if (aM) setAmbassadorMembers(aM.sort((a,b)=>a.displayOrder-b.displayOrder).map(apiToAmb));
            if (aC) setAmbassadorCTA({ apply_button_url: aC.applyButtonUrl || '' });

        } catch (err: any) {
            setErrorMsg(err.message || 'Failed to load team data');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);


    const flash = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    // ─── Save Handlers ──────────────────────────────────────────────

    const saveCore = async () => {
        setSaving(true);
        setErrorMsg('');
        try {
            // Save core hero just in case we add it to the UI later, but for now just members
            const remote = await teamApi.fetchCoreMembers().catch(() => []);
            const remoteIds = new Set(remote.map(r => r.id));
            const localIds = new Set(coreMembers.filter(m => m._apiId).map(m => m._apiId!));
            
            for (const r of remote) if (!localIds.has(r.id)) await teamApi.deleteCoreMember(r.id);

            for (const m of coreMembers) {
                const payload = {
                    memberName: m.member_name,
                    memberRole: m.member_role,
                    memberBio: m.member_bio,
                    memberImage: m.member_image,
                    linkedInUrl: m.linkedin_url || '',
                    twitterUrl: m.twitter_url || '',
                    instagramUrl: m.instagram_url || '',
                    displayOrder: m.display_order,
                };
                if (m._apiId && remoteIds.has(m._apiId)) {
                    await teamApi.updateCoreMember(m._apiId, { ...payload, isActive: true });
                } else {
                    await teamApi.createCoreMember(payload);
                }
            }
            flash();
            await loadData();
        } catch (e: any) {
            setErrorMsg(e.message || 'Save failed');
        } finally {
            setSaving(false);
        }
    };

    const saveVolunteers = async () => { 
        setSaving(true);
        setErrorMsg('');
        try {
            await teamApi.updateVolunteerCta({ isActive: true, joinButtonUrl: volunteerCTA.join_button_url });

            const remote = await teamApi.fetchVolunteerMembers().catch(() => []);
            const remoteIds = new Set(remote.map(r => r.id));
            const localIds = new Set(volunteerMembers.filter(m => m._apiId).map(m => m._apiId!));

            for (const r of remote) if (!localIds.has(r.id)) await teamApi.deleteVolunteerMember(r.id);

            for (const m of volunteerMembers) {
                const payload = {
                    memberName: m.member_name,
                    memberRole: m.member_role,
                    memberBio: m.member_bio,
                    memberImage: m.member_image,
                    linkedInUrl: m.social_links?.linkedin || '',
                    twitterUrl: m.social_links?.twitter || '',
                    instagramUrl: '',
                    displayOrder: m.display_order,
                };
                if (m._apiId && remoteIds.has(m._apiId)) {
                    await teamApi.updateVolunteerMember(m._apiId, { ...payload, isActive: true });
                } else {
                    await teamApi.createVolunteerMember(payload);
                }
            }
            flash();
            await loadData();
        } catch (e: any) {
            setErrorMsg(e.message || 'Save failed');
        } finally {
            setSaving(false);
        }
    };

    const saveMentors = async () => { 
        setSaving(true);
        setErrorMsg('');
        try {
            await teamApi.updateMentorsHero({ heroImage1: mentorHero.hero_mentor_images[0], heroImage2: mentorHero.hero_mentor_images[1] });
            await teamApi.updateMentorRoleMedia({ imageUrl: mentorRoleMedia.role_feature_image });
            await teamApi.updateMentorCta({ isActive: true, applyButtonUrl: mentorCTA.apply_button_url, ctaFooterImage: mentorCTA.cta_footer_image });

            const remote = await teamApi.fetchMentorMembers().catch(() => []);
            const remoteIds = new Set(remote.map(r => r.id));
            const localIds = new Set(mentorMembers.filter(m => m._apiId).map(m => m._apiId!));

            for (const r of remote) if (!localIds.has(r.id)) await teamApi.deleteMentorMember(r.id);

            for (const m of mentorMembers) {
                const payload = {
                    memberName: m.member_name,
                    memberRole: m.member_role,
                    memberBio: m.member_bio,
                    memberImage: m.member_image,
                    linkedInUrl: m.social_links?.linkedin || '',
                    twitterUrl: m.social_links?.twitter || '',
                    instagramUrl: '',
                    displayOrder: m.display_order,
                };
                if (m._apiId && remoteIds.has(m._apiId)) {
                    await teamApi.updateMentorMember(m._apiId, { ...payload, isActive: true });
                } else {
                    await teamApi.createMentorMember(payload);
                }
            }
            flash();
            await loadData();
        } catch (e: any) {
            setErrorMsg(e.message || 'Save failed');
        } finally {
            setSaving(false);
        }
    };

    const saveAmbassadors = async () => { 
        setSaving(true);
        setErrorMsg('');
        try {
            await teamApi.updateAmbassadorCta({ isActive: true, applyButtonUrl: ambassadorCTA.apply_button_url });

            const remote = await teamApi.fetchAmbassadorMembers().catch(() => []);
            const remoteIds = new Set(remote.map(r => r.id));
            const localIds = new Set(ambassadorMembers.filter(m => m._apiId).map(m => m._apiId!));

            for (const r of remote) if (!localIds.has(r.id)) await teamApi.deleteAmbassadorMember(r.id);

            for (const m of ambassadorMembers) {
                const payload = {
                    ambassadorName: m.ambassador_name,
                    schoolName: m.school_name,
                    location: m.location,
                    ambassadorImage: m.ambassador_image,
                    displayOrder: m.display_order,
                };
                if (m._apiId && remoteIds.has(m._apiId)) {
                    await teamApi.updateAmbassadorMember(m._apiId, { ...payload, isActive: true });
                } else {
                    await teamApi.createAmbassadorMember(payload);
                }
            }
            flash();
            await loadData();
        } catch (e: any) {
            setErrorMsg(e.message || 'Save failed');
        } finally {
            setSaving(false);
        }
    };

    // ─── Array Helpers ──────────────────────────────────────────────

    const addMember = <T extends { id: string, display_order: number }>(arr: T[], setArr: (val: T[]) => void, defaultItem: Omit<T, 'id' | 'display_order'>) => {
        setArr([...arr, { ...defaultItem, id: generateId(), display_order: arr.length + 1 } as unknown as T]);
    };
    const removeMember = <T extends { id: string, _apiId?: number }>(arr: T[], setArr: (val: T[]) => void, id: string) => {
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

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24 text-gray-400 gap-2">
                <Loader2 size={24} className="animate-spin text-orange-500" />
                <span>Loading team data…</span>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Team Page</h1>
                <p className="text-gray-500 mt-1">Manage all team directories and call-to-actions.</p>
            </div>

            {errorMsg && (
                <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    {errorMsg}
                </div>
            )}

            {saved && (
                <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-xl shadow-lg">
                    <Check size={16} /> Saved successfully
                </div>
            )}

            {saving && (
                <div className="fixed inset-0 z-40 bg-black/10 flex items-center justify-center">
                    <div className="bg-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3">
                        <Loader2 size={20} className="animate-spin text-orange-500" />
                        <span className="text-sm font-medium text-gray-700">Saving…</span>
                    </div>
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
                            <button onClick={saveCore} disabled={saving} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
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
                            <button onClick={saveVolunteers} disabled={saving} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
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
                            <button onClick={saveMentors} disabled={saving} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
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
                            <button onClick={saveAmbassadors} disabled={saving} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
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
