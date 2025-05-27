import Image from "next/image";
import "./slider.css";
import { 
	GithubIcon, 
	LinkedinIcon, 
	MailIcon,
	MapPinIcon,
	PhoneIcon // Added PhoneIcon
} from "lucide-react";
import Link from "next/link";
import { SquareArrowOutUpRightIcon, XIcon } from "lucide-react"; // Added XIcon
import { useState } from "react"; // Added useState
import React from "react"; // Added React import for React.cloneElement
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"; // Added Tooltip components
import {
	SiPython,
	SiTypescript,
	SiGo,
	SiR,
	SiReact,
	SiNextdotjs,
	SiTailwindcss,
	SiPostgresql,
	SiGit,
	SiGooglecloud,
	SiPandas,
	SiScikitlearn,
	SiPytorch,
	SiDocker,
	SiFastapi,
	SiWebrtc,
	SiFlask,
	SiLangchain 
} from "react-icons/si";
import { Card, CardHeader, CardBody, Image as HeroImage } from "@heroui/react";
import { createPortal } from "react-dom";

const skills = [
	{
		name: "Python",
		icon: <SiPython className="w-10 h-10" /> // Changed size
	},
	{
		name: "TypeScript",
		icon: <SiTypescript className="w-10 h-10" /> // Changed size
	},
	{
		name: "Golang",
		icon: <SiGo className="w-10 h-10" /> // Changed size
	},
	{
		name: "R",
		icon: <SiR className="w-10 h-10" /> // Changed size
	},
	{
		name: "React",
		icon: <SiReact className="w-10 h-10" /> // Changed size
	},
	{
		name: "Next.js",
		icon: <SiNextdotjs className="w-10 h-10" /> // Changed size
	},
	{
		name: "Tailwind CSS",
		icon: <SiTailwindcss className="w-10 h-10" /> // Changed size
	},
	{
		name: "PostgreSQL",
		icon: <SiPostgresql className="w-10 h-10" /> // Changed size
	},
	{
		name: "Git",
		icon: <SiGit className="w-10 h-10" /> // Changed size
	},
];

const frameworks = [
	{
		name: "LangGraph",
		icon: <Image src="/images/orgs/langgraph.png" alt="LangGraph" width={40} height={40} className="w-10 h-10" /> // Changed to Image placeholder
	},
	{
		name: "Google SDK",
		icon: <SiGooglecloud className="w-10 h-10" /> // Changed size
	},
	{
		name: "Pandas",
		icon: <SiPandas className="w-10 h-10" /> // Changed size
	},
	{
		name: "Scikit-learn",
		icon: <SiScikitlearn className="w-10 h-10" /> // Changed size
	},
	{
		name: "PyTorch",
		icon: <SiPytorch className="w-10 h-10" /> // Changed size
	},
	{
		name: "FastAPI",
		icon: <SiFastapi className="w-10 h-10" /> // Changed size
	},
	{
		name: "Docker",
		icon: <SiDocker className="w-10 h-10" /> // Changed size
	},
];

const experiences = [
	{
		logo: "/images/orgs/nzta.jpg",
		name: "Data Science Intern",
		company: "NZ Transport Agency",
		description: [
			"Conducted analysis of road maintenance data to identify correlations between soil group types and maintenance frequency.",
			"Developed predictive linear regression models to explore counterintuitive trends in road maintenance activities, achieving 83% accuracy in forecasting maintenance needs.",
			"Created an interactive data visualization dashboard and heat map that enabled stakeholders to compare pre and post-COVID freight movement patterns.",
		],
		startDate: "July 2024",
		endDate: "Sep 2024",
	},
];

const education = [
	{
		logo: "/images/orgs/vuw.png", // Placeholder logo path
		name: "Commerce in Data Science",
		institution: "Victoria University of Wellington",
		description: [
			"Relevant coursework: Machine Learning, Statistical Learning",
			"Completed a capstone project on predictive Kidney Stone Analysis.",
			"Received letter of Excellence for outstanding performance in Machine Learning course.",
		],
		startDate: "Mar 2022",
		endDate: "June 2025 ",
	},
	{
		logo: "/images/orgs/dlai.png",
		name: "Deep Learning Specialization",
		institution: "DeepLearning.AI",
		description: [
			"Comprehensive understanding of deep learning fundamentals",
		],
		url: "https://coursera.org/share/28858a91ab81b6eedc6f26fee08eb2a3"
	},
	{
		logo: "/images/orgs/aws.png",
		name: "Data Engineering Specialization",
		institution: "AWS & DeepLearning.AI",
		description: [
			"Worked with AWS data engineering services and their best practices",
		],
		url: "https://coursera.org/share/709c4292daa131efdf2876dc07a45b44"
	}
];

const links = [
	{
		name: "LinkedIn",
		icon: <LinkedinIcon />,
		color: "bg-blue-950",
		url: "https://www.linkedin.com/in/david-nguyen-58a378315/",
	},
	{
		name: "GitHub",
		icon: <GithubIcon />,
		color: "bg-neutral-950 dark:bg-neutral-950",
		url: "https://github.com/dvnguyen02",
	},
	{
		name: "Email",
		icon: <MailIcon />,
		color: "bg-green-950",
		url: "mailto:duynguyen290502@gmail.com",
	},
];

const currentProject = {
	coverImage: "/images/projects/7.gif",
	name: "Notetaker",
	description:
			"Notetaker performs real-time transcription of audio streams from both system output and microphone input, accurately capturing spoken content from meetings, lectures, and other sources. The transcribed data can be queried using a large language model (LLM) for further analysis or summarization",
	link: "https://github.com/dvnguyen02/notetaker",
	tags: [
		{ name: "Next.js", icon: <SiNextdotjs className="w-4 h-4" /> },
		{ name: "FastAPI", icon: <SiFastapi className="w-4 h-4" /> },
		{ name: "React", icon: <SiReact className="w-4 h-4" /> },
		{ name: "LangGraph", icon: <Image src="/images/orgs/langgraph.png" alt="LangGraph" width={16} height={16} /> }, // Placeholder for LangGraph
		{ name: "Python", icon: <SiPython className="w-4 h-4" /> },
		{ name: "WebRTC", icon: <SiWebrtc className="w-4 h-4" /> },
	],
};

const placeholderProject = {
	coverImage: "/images/projects/1.png", 
	name: "RAG",
	description: "An intelligent chatbot for PBTech that helps customers find laptops through natural language conversations. Uses Retrieval-Augmented Generation to search 500+ products and provide personalized recommendations, comparisons, and technical specifications.",
	link: "https://pbtechrag.onrender.com",
	tags: [
		{ name: "React", icon: <SiReact className="w-4 h-4" /> },
		{ name: "Python", icon: <SiPython className="w-4 h-4" /> },
		{ name: "Flask", icon: <SiFlask className="w-4 h-4" /> },
		{ name: "LangGraph", icon: <Image src="/images/orgs/langgraph.png" alt="LangGraph" width={16} height={16} /> },
	],
};

export function About() {
    const [isCurrentProjectExpanded, setCurrentProjectExpanded] = useState(false);
    const [mounted, setMounted] = useState(false);
    // Scroll lock/restore state
    const scrollPositionRef = React.useRef<number>(0);
    const aboutContainerRef = React.useRef<HTMLDivElement>(null); // Ref for the About component's root

    React.useEffect(() => { setMounted(true); }, []);

    // Scroll lock and restore logic
    React.useEffect(() => {
        if (!mounted) {
            return;
        }

        const scrollableViewport = aboutContainerRef.current?.closest<HTMLElement>('[data-radix-scroll-area-viewport]');

        if (isCurrentProjectExpanded) {
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

                // Restore ScrollArea's scroll position
                if (scrollableViewport) {
                    requestAnimationFrame(() => {
                        scrollableViewport.scrollTop = scrollPositionRef.current;
                    });
                }
            };
        }
        // No explicit 'else' needed here, as the cleanup function handles restoration when isCurrentProjectExpanded becomes false.
    }, [isCurrentProjectExpanded, mounted]); // mounted ensures aboutContainerRef.current is available

	return (
		<div ref={aboutContainerRef} className="w-full h-full flex flex-col items-center relative">
            <div className="flex flex-col items-center w-full gap-6 sm:gap-3">
                <div className="flex flex-col gap-6 max-w-2xl w-full">
					{/* Header Section - matching the image style */}
					<div className="relative flex flex-col gap-3 pb-6 border border-border/50 rounded-lg p-6 bg-card">
						{/* Social Icons - Top Right */}
						<div className="absolute top-4 right-4 flex gap-2 items-center"> {/* Added items-center for vertical alignment if needed */}
							{links.map((link) => (
								<a
									href={link.url}
									key={link.name}
									className="p-2 rounded-lg bg-background hover:bg-muted border border-border/50"
									target="_blank"
									rel="noopener noreferrer"
									aria-label={link.name} // Added aria-label for accessibility
								>
									{link.icon}
								</a>
							))}
							{/* Phone Icon with Custom Tooltip */}
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<div
											className="p-2 rounded-lg bg-background hover:bg-muted border border-border/50"
										>
											<PhoneIcon className="w-5 h-5" />
										</div>
									</TooltipTrigger>
									<TooltipContent>
										<p>+64 221900286</p> 
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>

						<h1 className="text-4xl sm:text-5xl font-bold tracking-tight pr-32">
							David Nguyen
						</h1>
						
						<div className="flex items-center gap-2 text-lg">
							<MapPinIcon className="w-5 h-5 text-green-600 dark:text-emerald-500" />
							<span>Victoria University of Wellington</span>
						</div>
						
						<p className="text-lg leading-relaxed max-w-2xl">
							Kia ora! <span className="animate-wave hand-emoji">👋</span> I'm a Third Year Data Science Student. Currently studying data science and discovering that 80% of it is just cleaning messy data.
						</p>
					</div>

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

					{/* Experience and Education Section */}
					<div className="flex flex-col md:flex-row gap-y-6 md:gap-x-0"> {/* Changed: from grid to flex, adjusted gap */}
						<div className="md:w-1/2 md:pr-4 md:border-r md:border-border/50"> {/* Added: width, padding, and right border for md screens */}
							<h3 className="text-xl font-bold mb-3 text-center">Experience</h3> {/* Added: text-center */}
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

						<div className="md:w-1/2 md:pl-4">  {/* Added: width and padding for md screens */}
							<h3 className="text-xl font-bold mb-3 text-center">Education</h3> {/* Added: text-center */}
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
					{/* End of Experience and Education Section */}

                    {/* Current Project Section */}
					<h3 className="text-xl font-bold">My Current Projects</h3>
					<div className="w-full flex flex-col items-center gap-8">
					  {/* Notetaker Project Card */}
					  <div className="w-full flex justify-center">
					    <Card
					      className={`relative overflow-hidden border-none bg-[#18181b] shadow-xl rounded-2xl p-0 w-full ${isCurrentProjectExpanded ? 'max-w-2xl max-h-[80vh] scale-100 ring-4 ring-primary shadow-2xl animate-in fade-in' : 'max-w-lg'} transition-all duration-300`}
					      style={{
					        background: 'linear-gradient(180deg, rgba(24,24,27,0.9) 60%, rgba(24,24,27,1) 100%)',
					        boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37)'
					      }}
					      onClick={() => { if (!isCurrentProjectExpanded) setCurrentProjectExpanded(true); }}
					    >
					      {!isCurrentProjectExpanded && (
					        <>
					          <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden rounded-b-none rounded-t-2xl">
					            <Image
					              src={currentProject.coverImage}
					              alt={currentProject.name}
					              fill
					              className="object-cover w-full h-full"
					              style={{filter: 'blur(0px)'}}
					              priority
					            />
					            <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-[#18181b]/80 to-transparent" />
					          </div>
					          <CardHeader className="pb-0 pt-4 px-6 flex-col items-start bg-transparent">
					            <h4 className="font-bold text-2xl text-white drop-shadow-lg mb-2">{currentProject.name}</h4>
					            <div className="flex flex-wrap gap-2 items-center mb-2">
					              {currentProject.tags.map((tag) => (
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
					              {currentProject.description}
					            </p>
					            <button
					              className="mt-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
					              onClick={e => { e.stopPropagation(); setCurrentProjectExpanded(true); }}
					            >
					              More details
					            </button>
					          </CardHeader>
					        </>
					      )}
					    </Card>
					  </div>
					  {/* Placeholder Project Card */}
					  <div className="w-full flex justify-center">
					    <Card
					      className="relative overflow-hidden border-none bg-[#18181b] shadow-xl rounded-2xl p-0 w-full max-w-lg transition-all duration-300"
					      style={{
					        background: 'linear-gradient(180deg, rgba(24,24,27,0.9) 60%, rgba(24,24,27,1) 100%)',
					        boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37)'
					      }}
					    >
					      <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden rounded-b-none rounded-t-2xl">
					        <Image
					          src={placeholderProject.coverImage}
					          alt={placeholderProject.name}
					          fill
					          className="object-cover w-full h-full"
					          style={{filter: 'blur(0px)'}}
					          priority
					        />
					        <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-[#18181b]/80 to-transparent" />
					      </div>
					      <CardHeader className="pb-0 pt-4 px-6 flex-col items-start bg-transparent">
					        <h4 className="font-bold text-2xl text-white drop-shadow-lg mb-2">{placeholderProject.name}</h4>
					        <div className="flex flex-row gap-2 items-center mb-3">
					          <Link
					            href={placeholderProject.link}
					            target="_blank"
					            rel="noopener noreferrer"
					            className="text-white/80 hover:text-primary"
					            aria-label={`Open ${placeholderProject.name} in new tab`}
					          >
					            <SquareArrowOutUpRightIcon className="size-5" />
					          </Link>
					        </div>
					        <div className="flex flex-wrap gap-2 items-center mb-2">
					          {placeholderProject.tags.map((tag) => (
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
					          {placeholderProject.description}
					        </p>
					      </CardHeader>
					    </Card>
					  </div>
					</div>
				</div>
			</div>
			{/* Modal Portal for expanded card */}
			{mounted && isCurrentProjectExpanded && typeof window !== 'undefined' && createPortal(
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
                    onClick={e => {
                        // Only close if the click is directly on the overlay (not on children)
                        if (e.target === e.currentTarget) {
                            setCurrentProjectExpanded(false);
                        }
                    }}
                >
                    <Card
                        className="relative overflow-hidden border-none bg-[#18181b] shadow-xl rounded-2xl p-0 w-full max-w-2xl max-h-[80vh] scale-100 ring-4 ring-primary shadow-2xl animate-in fade-in transition-all duration-300"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={e => { e.stopPropagation(); setCurrentProjectExpanded(false); }}
                            className="absolute top-3 right-3 z-[51] p-2 bg-background/70 hover:bg-background/90 rounded-full text-muted-foreground hover:text-primary transition-colors"
                            aria-label="Close project details"
                        >
                            <XIcon className="size-5" />
                        </button>
                        <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden rounded-b-none rounded-t-2xl">
                            <Image
                                src={currentProject.coverImage}
                                alt={currentProject.name}
                                fill
                                className="object-cover w-full h-full"
                                style={{filter: 'blur(0px)'}}
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-[#18181b]/80 to-transparent" />
                        </div>
                        <CardHeader className="pb-0 pt-4 px-6 flex-col items-start bg-transparent">
                            <h4 className="font-bold text-2xl text-white drop-shadow-lg mb-2">{currentProject.name}</h4>
                            <div className="flex flex-wrap gap-2 items-center mb-2">
                                {currentProject.tags.map((tag) => (
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
                                {currentProject.description}
                            </p>
                            {/* Add more detailed info here if needed */}
                            <div className="mt-4">
                                <a
                                    href={currentProject.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                                    onClick={e => e.stopPropagation()}
                                >
                                    View on GitHub <SquareArrowOutUpRightIcon className="size-4" />
                                </a>
                            </div>
                        </CardHeader>
                    </Card>
                </div>,
                window.document.body
            )}
        </div>
	);
}
