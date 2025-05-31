import { ProjectCard } from "./ProjectCard";
import { currentProject, placeholderProject } from "./data";

interface ProjectsSectionProps {
    expandedProject: string | null;
    onExpandProject: (projectId: string) => void;
}

export function ProjectsSection({ expandedProject, onExpandProject }: ProjectsSectionProps) {
    return (
        <>
            <h3 className="text-2xl font-bold mb-4">My Current Projects</h3>
            <div className="w-full flex flex-col items-center gap-8">
                <ProjectCard
                    project={currentProject}
                    projectId="notetaker"
                    expandedProject={expandedProject}
                    onExpand={onExpandProject}
                />
                <ProjectCard
                    project={placeholderProject}
                    projectId="rag"
                    expandedProject={expandedProject}
                    onExpand={onExpandProject}
                />
            </div>
        </>
    );
}
