import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import { Card, CardHeader } from "@heroui/react";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
    project: {
        coverImage: string;
        name: string;
        description: string;
        link: string;
        tags: Array<{
            name: string;
            icon?: React.ReactElement;
        }>;
    };
    projectId: string;
    expandedProject: string | null;
    onExpand: (projectId: string) => void;
}

export function ProjectCard({ project, projectId, expandedProject, onExpand }: ProjectCardProps) {
    const isExpanded = expandedProject === projectId;

    return (
        <div className="w-full flex justify-center">
            <Card
                className="relative overflow-hidden border-none bg-[#18181b] shadow-xl rounded-2xl p-0 w-full max-w-lg transition-all duration-300"
                style={{
                    background: 'linear-gradient(180deg, rgba(24,24,27,0.9) 60%, rgba(24,24,27,1) 100%)',
                    boxShadow: '0 0 15px 2px rgba(255, 255, 255, 0.08), 0 8px 32px 0 rgba(0,0,0,0.37)'
                }}
                onClick={() => { if (!expandedProject) onExpand(projectId); }}
            >
                {!isExpanded && (
                    <>
                        <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden rounded-b-none rounded-t-2xl">
                            <Image
                                src={project.coverImage}
                                alt={project.name}
                                fill
                                className="object-cover w-full h-full"
                                style={{filter: 'blur(0px)'}}
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-[#18181b]/80 to-transparent" />
                        </div>
                        <CardHeader className="pb-0 pt-4 px-6 flex-col items-start bg-transparent">
                            <h4 className="font-bold text-2xl text-white drop-shadow-lg mb-2">{project.name}</h4>
                            
                            {/* Show external link icon for RAG project */}
                            {projectId === 'rag' && (
                                <div className="flex flex-row gap-2 items-center mb-3">
                                    <Link
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/80 hover:text-primary"
                                        aria-label={`Open ${project.name} in new tab`}
                                    >
                                        <SquareArrowOutUpRightIcon className="size-5" />
                                    </Link>
                                </div>
                            )}
                            
                            <div className="flex flex-wrap gap-2 items-center mb-2">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag.name}
                                        className="flex items-center bg-[#23232a] border border-[#23232a] rounded-full text-white/90 gap-2 text-sm px-3 py-1.5 shadow"
                                    >
                                        {tag.icon && React.cloneElement(tag.icon as React.ReactElement, { className: 'w-5 h-5 mr-1' })}
                                        {tag.name}
                                    </span>
                                ))}
                            </div>                            <p className="text-white/80 text-base mt-2 mb-1">
                                {project.description}
                            </p>
                            <Button
                                className="mt-2"
                                onClick={e => { e.stopPropagation(); onExpand(projectId); }}
                            >
                                More details
                            </Button>
                        </CardHeader>
                    </>
                )}
            </Card>
        </div>
    );
}
