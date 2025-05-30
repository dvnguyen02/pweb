import { useState } from "react";
import { skills, frameworks } from "./data";
import { Grid3x3, Play } from "lucide-react";

export function SkillsSlider() {
    const [showGrid, setShowGrid] = useState(false);
    
    const allTechStacks = [...skills, ...frameworks];return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">What I have worked with</h3>                <button
                    onClick={() => setShowGrid(!showGrid)}
                    className="flex items-center gap-2 px-3 py-2 bg-card hover:bg-card/80 border border-border rounded-lg hover:scale-105 active:scale-95"
                    title={showGrid ? "Show animated slider" : "Show all tech stacks"}
                >
                        {showGrid ? (
                            <>
                                <Play className="w-4 h-4" />
                                <span className="text-sm">Animate</span>
                            </>
                        ) : (
                            <>
                                <Grid3x3 className="w-4 h-4" />
                                <span className="text-sm">Show All</span>
                            </>
                        )}
                    </button>
                </div>            {showGrid ? (
                /* Static Grid View - All Tech Stacks */
                <div className="w-full mt-2 mb-6">
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                        {allTechStacks.map((tech, index) => (
                            <div
                                key={`grid-${index}`}
                                className="flex flex-col items-center gap-1.5 p-2 transition-all duration-300 hover:scale-105 group cursor-pointer"
                                title={tech.name}
                            >
                                <div className="transition-transform duration-300 group-hover:scale-110">
                                    {tech.icon}
                                </div>
                                <span className="text-xs font-medium text-center leading-tight">
                                    {tech.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>            ) : (
                /* Auto-Scrolling Icon Slider - Two Rows */
                <div className="relative w-full mt-2 mb-6 space-y-4">

                {/* First Row - Languages & Core Technologies */}
                <div className="w-full overflow-hidden slider-mask">
                    <div className="flex animate-scroll">
                        <ul className="flex items-center justify-center md:justify-start flex-shrink-0">
                            {skills.map((tech, index) => (
                                <li
                                    key={`skills-first-${index}`}
                                    className="mx-3 flex flex-col items-center gap-1.5 min-w-[90px] flex-shrink-0 group"
                                    title={tech.name}
                                >
                                    <div>
                                        {tech.icon}
                                    </div>
                                    <span className="text-base font-medium text-center leading-tight">
                                        {tech.name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <ul className="flex items-center justify-center md:justify-start flex-shrink-0" aria-hidden="true">
                            {skills.map((tech, index) => (
                                <li
                                    key={`skills-second-${index}`}
                                    className="mx-3 flex flex-col items-center gap-1.5 min-w-[90px] flex-shrink-0 group"
                                    title={tech.name}
                                >
                                    <div>
                                        {tech.icon}
                                    </div>
                                    <span className="text-base font-medium text-center leading-tight">
                                        {tech.name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Second Row - Frameworks & Tools */}
                <div className="w-full overflow-hidden slider-mask">
                    <div className="flex animate-scroll-reverse">
                        <ul className="flex items-center justify-center md:justify-start flex-shrink-0">
                            {frameworks.map((tech, index) => (
                                <li
                                    key={`frameworks-first-${index}`}
                                    className="mx-3 flex flex-col items-center gap-1.5 min-w-[90px] flex-shrink-0 group"
                                    title={tech.name}
                                >
                                    <div>
                                        {tech.icon}
                                    </div>
                                    <span className="text-base font-medium text-center leading-tight">
                                        {tech.name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <ul className="flex items-center justify-center md:justify-start flex-shrink-0" aria-hidden="true">
                            {frameworks.map((tech, index) => (
                                <li
                                    key={`frameworks-second-${index}`}
                                    className="mx-3 flex flex-col items-center gap-1.5 min-w-[90px] flex-shrink-0 group"
                                    title={tech.name}
                                >
                                    <div>
                                        {tech.icon}
                                    </div>
                                    <span className="text-base font-medium text-center leading-tight">
                                        {tech.name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                </div>
            )}
        </>
    );
}
