'use client';

import { Project } from '@/lib/mockCommunityService';
import { X } from 'lucide-react';
import Image from 'next/image';

interface ProjectDetailsModalProps {
    project: Project | null;
    onClose: () => void;
}

export default function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
    if (!project) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto flex items-center justify-center p-4">
            <div className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-2 text-white transition-all shadow-lg border border-white/20"
                >
                    <X size={24} />
                </button>

                {/* Hero Section */}
                <div className="relative h-[60vh] min-h-[400px]">
                    <Image
                        src={project.headerImage}
                        alt={project.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight leading-tight">
                            {project.name}
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 max-w-2xl font-medium leading-relaxed">
                            {project.fullDescription}
                        </p>
                    </div>
                </div>

                <div className="p-8 md:p-12 space-y-16">
                    {/* Narrative Section */}
                    <div className="grid lg:grid-cols-5 gap-12 items-start">
                        <div className="lg:col-span-3 space-y-6">
                            <h2 className="text-3xl font-extrabold text-gray-900 border-l-4 border-orange-500 pl-4">
                                What we did
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-lg italic">
                                {project.fullDescription}
                            </p>
                            <div className="space-y-4">
                                {project.objectives.map((point, i) => (
                                    <div key={i} className="flex items-start gap-4 group">
                                        <div className={`mt-1.5 w-5 h-5 rounded-full flex-shrink-0 bg-orange-500 flex items-center justify-center text-white text-[10px] font-bold group-hover:scale-110 transition-transform`}>
                                            {i + 1}
                                        </div>
                                        <span className="text-gray-800 font-medium group-hover:text-orange-600 transition-colors">
                                            {point}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {project.featuredImage && (
                            <div className="lg:col-span-2 relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl ring-1 ring-gray-200">
                                <Image
                                    src={project.featuredImage}
                                    alt="Service highlight"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>

                    {/* Impact Bar */}
                    <div className={`rounded-[2rem] p-10 text-white relative overflow-hidden bg-[#257CFF]`}>
                        {/* Background Texture Overlay */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/images/Background.svg')] bg-repeat" />

                        <h3 className="text-3xl font-black mb-10 text-center relative z-10 tracking-wide uppercase">
                            Project Success Metrics
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                            {project.impact.map((stat, i) => (
                                <div key={i} className="text-center group">
                                    <div className="text-4xl md:text-5xl font-black mb-2 group-hover:scale-110 transition-transform">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-white/80">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Partners & Gallery */}
                    <div className="space-y-12">
                        {project.partners && project.partners.length > 0 && (
                            <div className="space-y-6">
                                <h2 className="text-3xl font-extrabold text-gray-900">Our Partners</h2>
                                <div className="flex flex-wrap gap-8 items-center bg-gray-50 p-8 rounded-3xl border border-gray-100">
                                    {project.partners.map((partner, i) => (
                                        <div key={i} className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow ring-1 ring-gray-100 group">
                                            <img
                                                src={partner.logo}
                                                alt={partner.name}
                                                className="h-12 w-auto grayscale group-hover:grayscale-0 transition-all duration-300"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {project.gallery && project.gallery.length > 0 && (
                            <div className="space-y-6">
                                <h2 className="text-3xl font-extrabold text-gray-900">Project Gallery</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    {project.gallery.map((img, i) => (
                                        <div key={i} className="aspect-square relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group">
                                            <Image
                                                src={img}
                                                alt={`Gallery ${i + 1}`}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="bg-gray-50 p-8 flex justify-center border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-orange-500 transition-colors shadow-lg shadow-gray-200 active:scale-95"
                    >
                        Close Report
                    </button>
                </div>
            </div>
        </div>
    );
}
