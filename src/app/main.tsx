import "./slider.css";
import { useState, useRef, useEffect } from "react";
import React from "react";
import {
    HeroSection,
    SkillsSlider,
    ExperienceEducation,
    ProjectsSection,
    ProjectModal,
    Contact,
    currentProject,
    placeholderProject
} from "./components/mainpage";

export function Main({ scrollAreaViewportRef }: { scrollAreaViewportRef?: React.RefObject<HTMLDivElement> }) {
    const [expandedProject, setExpandedProject] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const scrollPositionRef = React.useRef<number>(0);
    const experienceRef = useRef<HTMLDivElement>(null);
    const [showExperience, setShowExperience] = useState(false);
    const projectsRef = useRef<HTMLDivElement>(null);
    const [showProjects, setShowProjects] = useState(false);
    React.useEffect(() => { setMounted(true); }, []);
    
    // Scroll lock and restore logic
    React.useEffect(() => {
        if (!mounted) {
            return;
        }

        const scrollableViewport = scrollAreaViewportRef?.current;

        if (expandedProject) {
            // Save scroll position of the ScrollArea viewport
            if (scrollableViewport) {
                scrollPositionRef.current = scrollableViewport.scrollTop;
            }

            // Prevent background scroll and compensate for scrollbar
            const originalDocumentOverflow = document.documentElement.style.overflow;
            const originalBodyPaddingRight = document.body.style.paddingRight;
            
            document.documentElement.style.overflow = 'hidden';
            
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            if (scrollbarWidth > 0) {
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            }

            return () => {
                // Restore document/body styles
                document.documentElement.style.overflow = originalDocumentOverflow;
                document.body.style.paddingRight = originalBodyPaddingRight;

                // Restore ScrollArea's scroll position with multiple attempts for reliability
                if (scrollableViewport) {
                    const savedPosition = scrollPositionRef.current;
                    // Immediate restore
                    scrollableViewport.scrollTop = savedPosition;
                    // Backup restore attempts with slight delays
                    requestAnimationFrame(() => {
                        scrollableViewport.scrollTop = savedPosition;
                    });
                    setTimeout(() => {
                        scrollableViewport.scrollTop = savedPosition;
                    }, 50);
                    setTimeout(() => {
                        scrollableViewport.scrollTop = savedPosition;
                    }, 100);
                }
            };
        }
    }, [expandedProject, mounted, scrollAreaViewportRef]);

    useEffect(() => {
        const node = experienceRef.current;
        if (!node) return;
        const observer = new window.IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShowExperience(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const node = projectsRef.current;
        if (!node) return;
        const observer = new window.IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShowProjects(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);    return (
        <div className="w-full h-full flex flex-col items-center relative px-2 sm:px-3 lg:px-4 min-w-0 overflow-hidden">
            <div className="flex flex-col items-center w-full gap-3 sm:gap-4 lg:gap-6 max-w-full min-w-0">
                <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6 max-w-2xl w-full min-w-0">
                    <div className="w-full min-w-0">
                        <HeroSection />
                    </div>
                    <div className="w-full min-w-0">
                        <SkillsSlider />
                    </div>
                    <div ref={experienceRef} className="w-full min-w-0">
                        <div className={`transition-opacity duration-700 ease-out ${showExperience ? 'opacity-100 animate-fade-in-up' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                            <ExperienceEducation />
                        </div>
                    </div>                    <div ref={projectsRef} className="w-full min-w-0">
                        <div className={`transition-opacity duration-700 ease-out ${showProjects ? 'opacity-100 animate-fade-in-up' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                            <ProjectsSection 
                                expandedProject={expandedProject}
                                onExpandProject={setExpandedProject}
                            />
                        </div>
                    </div>
                    
                    {/* Contact section */}
                    <div className="w-full min-w-0">
                        <Contact />
                    </div>
                </div>
            </div>
            <ProjectModal
                project={expandedProject === 'notetaker' ? currentProject : placeholderProject}
                isOpen={!!expandedProject}
                onClose={() => setExpandedProject(null)}
                mounted={mounted}
            />
        </div>
    );
}