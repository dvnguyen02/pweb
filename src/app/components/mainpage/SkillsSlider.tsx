import { skills, frameworks } from "./data";

export function SkillsSlider() {
    const allTechStacks = [...skills, ...frameworks];

    return (
        <div className="w-full min-w-0 overflow-hidden">
            <div className="flex items-center justify-between mb-4 gap-2">
                <h3 className="text-lg sm:text-xl font-bold min-w-0 truncate">What I have worked with</h3>
            </div>

            {/* Static Grid View - All Tech Stacks */}
            <div className="w-full mt-2 mb-6 min-w-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
                    {allTechStacks.map((tech, index) => (
                        <div
                            key={`grid-${index}`}
                            className="flex flex-col items-center gap-1 sm:gap-1.5 p-2 hover:scale-105 group cursor-pointer min-w-0"
                            title={tech.name}
                        >
                            <div className="transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
                                {tech.icon}
                            </div>
                            <span className="text-xs font-medium text-center leading-tight break-words w-full">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
