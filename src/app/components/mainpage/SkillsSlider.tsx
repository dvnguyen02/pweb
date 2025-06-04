import { skills, frameworks } from "./data";

export function SkillsSlider() {
    const allTechStacks = [...skills, ...frameworks];
      // Technologies I specialize in
    const specializedTechs = allTechStacks.filter(tech => 
        ["Python", "R", "TypeScript", "React", "Next.js", "Tailwind CSS", "FastAPI", "PostgreSQL"].includes(tech.name)
    );
    
    // Other technologies I have worked with
    const otherTechs = allTechStacks.filter(tech => 
        !["Python", "R", "SQL", "TypeScript", "React", "Next.js", "Tailwind CSS", "FastAPI", "PostgreSQL"].includes(tech.name)
    );

    const TechGrid = ({ techs, keyPrefix }: { techs: typeof allTechStacks, keyPrefix: string }) => (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
            {techs.map((tech, index) => (                <div
                    key={`${keyPrefix}-${index}`}
                    className="flex flex-col items-center gap-2 sm:gap-2.5 p-2 hover:scale-105 group cursor-pointer min-w-0"
                    title={tech.name}
                >
                    <div className="transition-transform duration-300 group-hover:scale-110 flex-shrink-0 flex justify-center items-center w-10 h-10">
                        {tech.icon}
                    </div>                    <span className="text-xs font-medium text-center leading-tight w-full">
                        {tech.name}
                    </span>
                </div>
            ))}
        </div>
    );

    return (
        <div className="w-full min-w-0 overflow-hidden">
            {/* I specialize in section */}
            <div className="w-full mb-8 min-w-0">
                <div className="flex items-center justify-between mb-4 gap-2">
                    <h3 className="text-lg sm:text-xl font-bold min-w-0 truncate">I specialize in</h3>
                </div>
                <TechGrid techs={specializedTechs} keyPrefix="specialized" />
            </div>

            {/* What I have worked with section */}
            <div className="w-full mt-2 mb-6 min-w-0">
                <div className="flex items-center justify-between mb-4 gap-2">
                    <h3 className="text-lg sm:text-xl font-bold min-w-0 truncate">What I have worked with</h3>
                </div>
                <TechGrid techs={otherTechs} keyPrefix="other" />
            </div>
        </div>
    );
}
