'use client';

import { useState, useEffect } from 'react';
import { mockProjects, Project } from '@/lib/mockCommunityService';
import ProjectDetailsModal from '@/components/ProjectDetailsModal';
import { ChevronRight } from 'lucide-react';
import { getPastCommunityServices, getCommunityServiceDetail } from '@/lib/adminData';

export default function PastCommunityServices() {
    const [projects, setProjects] = useState<Project[]>(mockProjects);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [featuredProject, setFeaturedProject] = useState<Project>(mockProjects[0]);

    useEffect(() => {
        const adminPast = getPastCommunityServices();
        if (adminPast && adminPast.length > 0) {
            const converted: Project[] = adminPast.map(p => ({
                id: p.project_id,
                name: p.project_title,
                date: p.project_date,
                description: p.project_title,
                fullDescription: p.project_title,
                objective: 'What we did',
                objectives: [],
                featuredImage: p.project_image,
                headerImage: p.project_image,
                impact: [],
                partners: [],
                gallery: [],
                color: 'from-blue-500 to-blue-600'
            }));
            setProjects(converted);
            setFeaturedProject(converted[0]);
        }
    }, []);
    // Effect to load full details for the featured project if it's from admin
    useEffect(() => {
        if (featuredProject && featuredProject.objectives.length === 0) {
            const detail = getCommunityServiceDetail(featuredProject.id);
            if (detail) {
                setFeaturedProject(prev => ({
                    ...prev,
                    name: detail.project_name,
                    fullDescription: detail.project_summary,
                    objective: 'What we did',
                    objectives: detail.project_highlights,
                    featuredImage: detail.side_action_image || prev.featuredImage,
                    headerImage: detail.hero_main_image || prev.headerImage,
                    impact: detail.impact.map(s => ({ label: s.impact_label, value: s.impact_value })),
                    partners: detail.partners.map(p => ({ name: p.name, logo: p.logo })),
                    gallery: detail.gallery
                }));
            }
        }
    }, [featuredProject.id]);

    return (
        <>
            <section className="py-12 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-widest">PAST COMMUNITY SERVICE</p>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                            Below are some of the community  <br />
                            service initiatives carried out
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                        <div className="lg:col-span-1 space-y-3">
                            {projects.map((project) => (
                                <button
                                    key={project.id}
                                    onClick={() => setFeaturedProject(project)}
                                    className={`w-full p-5 rounded-2xl text-left transition-all duration-300 group relative overflow-hidden ${featuredProject.id === project.id
                                        ? `bg-gray-900 text-white shadow-xl translate-x-1`
                                        : 'bg-gray-50 text-gray-900 hover:bg-orange-500 hover:text-white'
                                        }`}
                                >
                                    <div className="flex items-center justify-between relative z-10">
                                        <div>
                                            <h3 className="font-bold text-lg mb-0.5">{project.name}</h3>
                                            <p className={`text-xs ${featuredProject.id === project.id
                                                ? 'text-white/70'
                                                : 'text-gray-500 group-hover:text-white/70'
                                                }`}>
                                                {project.date}
                                            </p>
                                        </div>
                                        <ChevronRight size={20} className={`${featuredProject.id === project.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`} />
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="lg:col-span-2">
                            <div className="space-y-6">
                                <div
                                    className="aspect-[16/9] rounded-3xl overflow-hidden bg-gray-100 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 group relative"
                                    onClick={() => setSelectedProject(featuredProject)}
                                >
                                    <img
                                        src={featuredProject.headerImage}
                                        alt={featuredProject.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                                        <p className="text-white font-medium text-lg">Click to view full report</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedProject(featuredProject)}
                                    className={`w-full py-5 px-8 rounded-2xl bg-[#257CFF] text-white font-black hover:bg-orange-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-between shadow-xl shadow-blue-200 hover:shadow-orange-200`}
                                >
                                    <span className="tracking-tight">Explore Full Project Discovery</span>
                                    <ChevronRight size={28} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ProjectDetailsModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </>
    );
}
