import { useState, useEffect, useCallback } from 'react';
import ProjectDetailsModal from '@/components/ProjectDetailsModal';
import { ChevronRight, Loader2 } from 'lucide-react';
import { 
    fetchPastProjects, 
    getProjectById, 
    getPartnersByProject, 
    getGalleryByProject, 
    ApiPastProject, 
    CompleteProject 
} from '@/lib/communityServiceApi';

export default function PastCommunityServices() {
    const [projects, setProjects] = useState<ApiPastProject[]>([]);
    const [selectedProject, setSelectedProject] = useState<CompleteProject | null>(null);
    const [featuredProject, setFeaturedProject] = useState<CompleteProject | null>(null);
    const [loading, setLoading] = useState(true);

    const loadProjects = useCallback(async () => {
        setLoading(true);
        try {
            const apiProjects = await fetchPastProjects();
            if (apiProjects) {
                setProjects(apiProjects);
                if (apiProjects.length > 0) {
                    await loadDetail(apiProjects[0].id!);
                }
            }
        } catch (err) {
            console.error('Failed to load past projects', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const loadDetail = async (id: number) => {
        try {
            const detail = await getProjectById(id);
            if (detail) {
                const [partners, gallery] = await Promise.all([
                    getPartnersByProject(id),
                    getGalleryByProject(id)
                ]);

                const complete: CompleteProject = {
                    ...detail,
                    id,
                    date: projects.find(p => p.id === id)?.projectDate || '',
                    partners,
                    gallery
                };
                setFeaturedProject(complete);
            }
        } catch (err) {
            console.error('Failed to load project detail', err);
        }
    };

    useEffect(() => {
        loadProjects();
    }, [loadProjects]);

    const handleSelectFeatured = async (p: ApiPastProject) => {
        if (p.id) {
            await loadDetail(p.id);
        }
    };

    const handleOpenModal = () => {
        if (featuredProject) {
            setSelectedProject(featuredProject);
        }
    };

    if (loading) {
        return (
            <div className="py-20 flex flex-col items-center justify-center text-gray-500">
                <Loader2 className="animate-spin mb-4" size={48} />
                <p>Loading community service projects...</p>
            </div>
        );
    }

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
                                    onClick={() => handleSelectFeatured(project)}
                                    className={`w-full p-5 rounded-2xl text-left transition-all duration-300 group relative overflow-hidden ${featuredProject?.id === project.id
                                        ? `bg-gray-900 text-white shadow-xl translate-x-1`
                                        : 'bg-gray-50 text-gray-900 hover:bg-orange-500 hover:text-white'
                                        }`}
                                >
                                    <div className="flex items-center justify-between relative z-10">
                                        <div>
                                            <h3 className="font-bold text-lg mb-0.5">{project.projectTitle}</h3>
                                            <p className={`text-xs ${featuredProject?.id === project.id
                                                ? 'text-white/70'
                                                : 'text-gray-500 group-hover:text-white/70'
                                                }`}>
                                                {project.projectDate}
                                            </p>
                                        </div>
                                        <ChevronRight size={20} className={`${featuredProject?.id === project.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`} />
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="lg:col-span-2">
                            {featuredProject && (
                                <div className="space-y-6">
                                    <div
                                        className="aspect-[16/9] rounded-3xl overflow-hidden bg-gray-100 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 group relative"
                                        onClick={handleOpenModal}
                                    >
                                        <img
                                            src={featuredProject.heroMainImage || "/images/communityImage4.svg"}
                                            alt={featuredProject.projectName}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                                            <p className="text-white font-medium text-lg">Click to view full report</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleOpenModal}
                                        className={`w-full py-5 px-8 rounded-2xl bg-[#257CFF] text-white font-black hover:bg-orange-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-between shadow-xl shadow-blue-200 hover:shadow-orange-200`}
                                    >
                                        <span className="tracking-tight">Explore Full Project Discovery</span>
                                        <ChevronRight size={28} />
                                    </button>
                                </div>
                            )}
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
