import "./slider.css";
import { useState } from "react";
import React from "react";
import {
    HeroSection,
    SkillsSlider,
    ExperienceEducation,
    ProjectsSection,
    ProjectModal,
    currentProject,
    placeholderProject
} from "./components/mainpage";

export function Main({ scrollAreaViewportRef }: { scrollAreaViewportRef?: React.RefObject<HTMLDivElement> }) {
    const [expandedProject, setExpandedProject] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const scrollPositionRef = React.useRef<number>(0);
    const [isExperienceEducationVisible, setIsExperienceEducationVisible] = useState(false);
    const experienceEducationRef = React.useRef<HTMLDivElement>(null);

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

    // Intersection Observer for ExperienceEducation section
    React.useEffect(() => {
        if (!mounted) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsExperienceEducationVisible(true);
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            },
            {
                root: scrollAreaViewportRef?.current || null, // Use scrollArea if available, otherwise viewport
                threshold: 0.1, // Trigger when 10% of the element is visible
            }
        );

        const currentRef = experienceEducationRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [mounted, scrollAreaViewportRef]);

    return (
        <div className="w-full h-full flex flex-col items-center relative">
            <div className="flex flex-col items-center w-full gap-6 sm:gap-3">
                <div className="flex flex-col gap-6 max-w-2xl w-full">
                    <HeroSection />
                    <SkillsSlider />
                    <div
                        ref={experienceEducationRef}
                        className={`transition-all duration-700 ease-out ${
                            isExperienceEducationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                    >
                        <ExperienceEducation />
                    </div>
                    <ProjectsSection 
                        expandedProject={expandedProject}
                        onExpandProject={setExpandedProject}
                    />
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
