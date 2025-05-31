import Image from "next/image";
import Link from "next/link";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import { experiences, education } from "./data";

export function ExperienceEducation() {
    return (
        <div className="flex flex-col md:flex-row gap-y-6 md:gap-x-0 w-full min-w-0">
            <div className="md:w-1/2 md:pr-4 md:border-r md:border-border/50 min-w-0">
                <h3 className="text-xl font-bold mb-3 text-center">Experience</h3>
                <div className="flex flex-col gap-3">                    {experiences.map((experience) => (                        <div
                            key={experience.company}
                            className="flex flex-col sm:flex-row gap-2 w-full p-3 rounded-xl bg-muted hover:ring-4 hover:ring-neutral-500 dark:hover:ring-neutral-700 min-w-0"
                        >
                            <div className="flex flex-row flex-1 gap-2 min-w-0">
                                <Image
                                    src={experience.logo}
                                    alt={experience.company}
                                    width={256}
                                    height={256}
                                    className="size-12 sm:size-14 rounded-full flex-shrink-0"
                                />
                                <div className="flex flex-col min-w-0 flex-1">
                                    <p className="text-base sm:text-lg font-semibold truncate">
                                        {experience.name}
                                    </p>
                                    <p className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">
                                        {experience.startDate} -{" "}
                                        {experience.endDate}
                                    </p>
                                    <p className="text-sm text-muted-foreground truncate">
                                        {experience.company}
                                    </p>
                                    <div className="text-sm mt-2">
                                        {experience.description.map((desc, index) => (
                                            <div
                                                key={index}
                                                className="mb-2 break-words"
                                            >
                                                • {desc}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="md:w-1/2 md:pl-4 min-w-0">
                <h3 className="text-xl font-bold mb-3 text-center">Education</h3>
                <div className="flex flex-col gap-3">                    {education.map((edu) => (                        <div
                            key={edu.institution}
                            className="flex flex-col sm:flex-row gap-2 w-full p-3 rounded-xl bg-muted hover:ring-4 hover:ring-neutral-500 dark:hover:ring-neutral-700 min-w-0"
                        >
                            <div className="flex flex-row flex-1 gap-2 min-w-0">
                                {edu.logo && (
                                    <Image
                                        src={edu.logo}
                                        alt={edu.institution}
                                        width={256}
                                        height={256}
                                        className="size-10 sm:size-14 rounded-full flex-shrink-0"
                                    />
                                )}
                                <div className="flex flex-col min-w-0 flex-1">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <p className="text-base sm:text-lg font-semibold truncate">
                                            {edu.name}
                                        </p>
                                        {edu.url && (
                                            <Link
                                                href={edu.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-primary flex-shrink-0"
                                            >
                                                <SquareArrowOutUpRightIcon className="size-4" />
                                            </Link>
                                        )}
                                    </div>
                                    <p className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">
                                        {edu.startDate} - {edu.endDate}
                                    </p>
                                    <p className="text-sm text-muted-foreground truncate">
                                        {edu.institution}
                                    </p>
                                    {edu.description && edu.description.length > 0 && (
                                        <div className="text-sm mt-2">
                                            {edu.description.map((desc, index) => (
                                                <div
                                                    key={index}
                                                    className="mb-2 break-words"
                                                >
                                                    • {desc}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
