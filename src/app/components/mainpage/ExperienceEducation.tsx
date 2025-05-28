import Image from "next/image";
import Link from "next/link";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import { experiences, education } from "./data";

export function ExperienceEducation() {
    return (
        <div className="flex flex-col md:flex-row gap-y-6 md:gap-x-0">
            <div className="md:w-1/2 md:pr-4 md:border-r md:border-border/50">
                <h3 className="text-xl font-bold mb-3 text-center">Experience</h3>
                <div className="flex flex-col gap-3">
                    {experiences.map((experience) => (
                        <div
                            key={experience.company}
                            className="flex flex-row gap-2 justify-between max-w-2xl p-3 rounded-xl bg-muted hover:ring-4 hover:ring-neutral-200 dark:hover:ring-neutral-700"
                        >
                            <div className="flex flex-row flex-1 gap-2">
                                <Image
                                    src={experience.logo}
                                    alt={experience.company}
                                    width={256}
                                    height={256}
                                    className="size-12 sm:size-14 rounded-full flex"
                                />
                                <div className="flex flex-col">
                                    <div className="flex justify-between items-center">
                                        <p className="text-lg font-semibold">
                                            {experience.name}
                                        </p>
                                        <p className="text-sm">
                                            {experience.startDate} -{" "}
                                            {experience.endDate}
                                        </p>
                                    </div>
                                    <p className="text-sm">
                                        {experience.company}
                                    </p>
                                    <p className="text-sm mt-2">
                                        {experience.description.map((desc, index) => (
                                            <span
                                                key={index}
                                                className="block mb-2"
                                            >
                                                • {desc}
                                            </span>
                                        ))}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="md:w-1/2 md:pl-4">
                <h3 className="text-xl font-bold mb-3 text-center">Education</h3>
                <div className="flex flex-col gap-3">
                    {education.map((edu) => (
                        <div
                            key={edu.institution}
                            className="flex flex-row gap-2 justify-between max-w-2xl p-3 rounded-xl bg-muted hover:ring-4 hover:ring-neutral-200 dark:hover:ring-neutral-700"
                        >
                            <div className="flex flex-row flex-1 gap-2">
                                {edu.logo && (
                                    <Image
                                        src={edu.logo}
                                        alt={edu.institution}
                                        width={256}
                                        height={256}
                                        className="size-10 sm:size-14 rounded-full flex"
                                    />
                                )}
                                <div className="flex flex-col">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <p className="text-lg font-semibold">
                                                {edu.name}
                                            </p>
                                            {edu.url && (
                                                <Link 
                                                    href={edu.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-muted-foreground hover:text-primary"
                                                >
                                                    <SquareArrowOutUpRightIcon className="size-4" />
                                                </Link>
                                            )}
                                        </div>
                                        <p className="text-sm">
                                            {edu.startDate} - {edu.endDate}
                                        </p>
                                    </div>
                                    <p className="text-sm">
                                        {edu.institution}
                                    </p>
                                    {edu.description && edu.description.length > 0 && (
                                        <p className="text-sm mt-2">
                                            {edu.description.map((desc, index) => (
                                                <span
                                                    key={index}
                                                    className="block mb-2"
                                                >
                                                    • {desc}
                                                </span>
                                            ))}
                                        </p>
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
