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
        <div className="w-full flex justify-center px-1 sm:px-2">
            <Card
                className="relative overflow-hidden border-none bg-[#18181b] shadow-xl rounded-2xl p-0 w-full max-w-lg transition-all duration-300 min-w-0"
                style={{
                    background: 'linear-gradient(180deg, rgba(24,24,27,0.9) 60%, rgba(24,24,27,1) 100%)',
                    boxShadow: '0 0 15px 2px rgba(255, 255, 255, 0.08), 0 8px 32px 0 rgba(0,0,0,0.37)'
                }}
                onClick={() => { if (!expandedProject) onExpand(projectId); }}
            >
                {!isExpanded && (
                    <>
                        <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-b-none rounded-t-2xl">
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
                        
                        <CardHeader className="pb-0 pt-4 px-3 sm:px-4 lg:px-6 flex-col items-start bg-transparent min-w-0">
                            <h4 className="font-bold text-xl sm:text-2xl text-white drop-shadow-lg mb-2 break-words w-full">{project.name}</h4>
                            
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
                            
                            <div className="flex flex-wrap gap-1 sm:gap-2 items-center mb-2 w-full">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag.name}
                                        className="flex items-center bg-[#23232a] border border-[#23232a] rounded-full text-white/90 gap-1 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 shadow break-words"
                                    >
                                        {tag.icon && React.cloneElement(tag.icon as React.ReactElement, { className: 'w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 flex-shrink-0' })}
                                        <span className="truncate">{tag.name}</span>
                                    </span>
                                ))}
                            </div>
                            <p className="text-white/80 text-sm sm:text-base mt-2 mb-1 break-words w-full">
                                {project.description}
                            </p>
                            <Button
                                className="mt-2 transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 text-sm"
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
