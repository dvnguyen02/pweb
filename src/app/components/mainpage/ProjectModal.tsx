import Image from "next/image";
import React from "react";
import { SquareArrowOutUpRightIcon, XIcon } from "lucide-react";
import { Card, CardHeader } from "@heroui/react";
import { createPortal } from "react-dom";

interface ProjectModalProps {
    project: {
        coverImage: string;
        name: string;
        description: string;
        link: string;
        tags: Array<{
            name: string;
            icon?: React.ReactElement;
        }>;
        detailedDescription: string;
    };
    isOpen: boolean;
    onClose: () => void;
    mounted: boolean;
}

export function ProjectModal({ project, isOpen, onClose, mounted }: ProjectModalProps) {
    if (!mounted || !isOpen || typeof window === 'undefined') {
        return null;
    }    return createPortal(        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300"
            onClick={e => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
            style={{
                animation: 'fadeIn 0.3s ease-out forwards'
            }}
        >            <Card
                className="relative overflow-hidden border-none bg-gradient-to-br from-slate-900/40 to-slate-800/20 backdrop-blur-sm shadow-xl rounded-2xl p-0 w-full max-w-2xl max-h-[80vh] ring-4 ring-white/20 hover:ring-white/30 shadow-2xl transform transition-all duration-500 ease-out animate-in zoom-in-95 slide-in-from-bottom-4 fade-in border border-white/10"
                onClick={e => e.stopPropagation()}
                style={{ 
                    boxShadow: '0 0 20px 3px rgba(255, 255, 255, 0.12), 0 25px 50px -12px rgba(0, 0, 0, 0.3)',
                    animation: 'modalPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
                }}
            >
                <button
                    onClick={e => { e.stopPropagation(); onClose(); }}
                    className="absolute top-3 right-3 z-[51] p-2 bg-background/70 hover:bg-background/90 rounded-full text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Close project details"
                >
                    <XIcon className="size-5" />
                </button>
                <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden rounded-b-none rounded-t-2xl">
                    <Image
                        src={project.coverImage}
                        alt={project.name}
                        fill
                        className="object-cover w-full h-full"
                        style={{filter: 'blur(0px)'}}
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/40 to-transparent" />
                </div>
                <CardHeader className="pb-0 pt-4 px-6 flex-col items-start bg-transparent">
                    <h4 className="font-bold text-2xl text-white drop-shadow-lg mb-2">{project.name}</h4>
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
                    </div>
                    <p className="text-white/80 text-base mt-2 mb-1">
                        {project.description}
                    </p>
                    {/* Detailed description */}
                    <p className="text-white/70 text-sm mt-3 mb-3">
                        {project.detailedDescription}
                    </p>
                    <div className="mt-4 mb-4">
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                            onClick={e => e.stopPropagation()}
                        >
                            {project.name === "Notetaker" ? "View on GitHub" : "Open Link"} <SquareArrowOutUpRightIcon className="size-4" />
                        </a>
                    </div>
                </CardHeader>
            </Card>
        </div>,
        window.document.body
    );
}
