import { skills, frameworks } from "./data";

export function SkillsSlider() {
    return (
        <>
            <h3 className="text-xl font-bold">What I have worked with</h3>
            
            {/* Auto-Scrolling Icon Slider - Two Rows */}
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
        </>
    );
}
