import { useState, useEffect, useCallback } from 'react';
import { mockProjects, Project } from '@/lib/mockCommunityService';
import ProjectDetailsModal from '@/components/ProjectDetailsModal';
import { ChevronRight, Loader2 } from 'lucide-react';
import { fetchPastProjects, getProjectById, getPartnersByProject, getGalleryByProject } from '@/lib/communityServiceApi';

export default function PastCommunityServices() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [featuredProject, setFeaturedProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    const loadProjects = useCallback(async () => {
        setLoading(true);
        try {
            const apiProjects = await fetchPastProjects();
            if (apiProjects && apiProjects.length > 0) {
                const converted: Project[] = apiProjects.map(p => ({
                    id: String(p.id),
                    name: p.projectTitle,
                    date: p.projectDate,
                    description: p.projectTitle,
                    fullDescription: p.projectTitle,
                    objective: 'What we did',
                    objectives: [],
                    featuredImage: p.projectImage,
                    headerImage: p.projectImage,
                    impact: [],
                    partners: [],
                    gallery: [],
                    color: 'from-blue-500 to-blue-600'
                }));
                setProjects(converted);
                setFeaturedProject(converted[0]);
            } else {
                setProjects(mockProjects);
                setFeaturedProject(mockProjects[0]);
            }
        } catch (err) {
            console.error('Failed to load past projects', err);
            setProjects(mockProjects);
            setFeaturedProject(mockProjects[0]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProjects();
    }, [loadProjects]);

    // Load full details for the featured project
    useEffect(() => {
        async function loadDetail() {
            if (featuredProject && featuredProject.objectives.length === 0 && featuredProject.id.match(/^\d+$/)) {
                try {
                    const pid = parseInt(featuredProject.id);
                    const detail = await getProjectById(pid);
                    if (detail) {
                        const [partners, gallery] = await Promise.all([
                            getPartnersByProject(pid),
                            getGalleryByProject(pid)
                        ]);

                        setFeaturedProject(prev => prev ? ({
                            ...prev,
                            name: detail.projectName,
                            fullDescription: detail.projectSummary,
                            objective: 'What we did',
                            objectives: detail.projectHighlights,
                            featuredImage: detail.sideActionImage || prev.featuredImage,
                            headerImage: detail.heroMainImage || prev.headerImage,
                            impact: detail.impactMetrics.map(s => ({ label: s.impactLabel, value: s.impactValue })),
                            partners: partners.map(p => ({ name: '', logo: p.partnerLogo })),
                            gallery: gallery.map(g => g.imageUrl)
                        }) : null);
                    }
                } catch (err) {
                    console.error('Failed to load project detail', err);
                }
            }
        }
        loadDetail();
    }, [featuredProject?.id]);

    if (loading) {
        return (
            <div className="py-20 flex flex-col items-center justify-center text-gray-500">
                <Loader2 className="animate-spin mb-4" size={48} />
                <p>Loading community service projects...</p>
            </div>
        );
    }

    if (!featuredProject) return null;

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
