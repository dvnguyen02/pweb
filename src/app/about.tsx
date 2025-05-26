import Image from "next/image";
import "./slider.css";
import { 
	GithubIcon, 
	LinkedinIcon, 
	MailIcon,
	MapPinIcon
} from "lucide-react";
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
} from "react-icons/si";
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
		name: "SQL",
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

// Combine all technologies for the grid
// const allTechnologies = [...skills, ...frameworks]; // This line seems unused, consider removing if not needed elsewhere

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
		name: "Bachelor of Commerce in Data Science",
		institution: "Victoria University of Wellington",
		description: [
			"Relevant coursework: Machine Learning, Statistical Learning",
			"Completed a capstone project on predictive Kidney Stone Analysis.",
			"Received letter of Excellence for outstanding performance in Machine Learning course.",
		],
		startDate: "Mar 2022",
		endDate: "June 2025 ",
	}
];

const certifications = [
	{
		logo: "/images/orgs/dlai.png",
		name: "Deep Learning Specialization",
		issuer: "DeepLearning.AI",
		url: "https://coursera.org/share/28858a91ab81b6eedc6f26fee08eb2a3",
	},
	{
		logo: "/images/orgs/aws.png",
		name: "Data Engineering Specialization",
		issuer: "AWS & DeepLearning.AI",
		url: "https://coursera.org/share/709c4292daa131efdf2876dc07a45b44",
	},
];

const links = [
	{
		name: "LinkedIn",
		icon: <LinkedinIcon />,
		color: "bg-blue-950",
		url: "",
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

export function About() {

	return (
		<div className="w-full h-full flex flex-col items-center"> {/* Added flex flex-col items-center */}
			<div className="flex flex-col items-center w-full gap-6 sm:gap-3"> {/* Changed classes, removed justify-between, items-start */}
				<div className="flex flex-col gap-6 max-w-2xl w-full"> {/* Removed order classes, added w-full */}
					{/* Header Section - matching the image style */}
					<div className="relative flex flex-col gap-3 pb-6 border border-border/50 rounded-lg p-6 bg-card">
						{/* Social Icons - Top Right */}
						<div className="absolute top-4 right-4 flex gap-2">
							{links.map((link) => (
								<a
									href={link.url}
									key={link.name}
									className="sm:cursor-none p-2 rounded-lg bg-background hover:bg-muted border border-border/50"
									target="_blank"
									rel="noopener noreferrer"
								>
									{link.icon}
								</a>
							))}
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

					<h3 className="text-xl font-bold">What I work with</h3>
					
					{/* Auto-Scrolling Icon Slider - Two Rows */}
					<div className="relative w-full mt-2 mb-6 space-y-4">
						{/* First Row - Languages & Core Technologies */}
						<div className="w-full overflow-hidden slider-mask"> {/* Changed: Removed inline-flex, flex-nowrap */}
							<div className="flex animate-scroll"> {/* Added: New wrapper div with animation and flex */}
								<ul className="flex items-center justify-center md:justify-start flex-shrink-0"> {/* Changed: Removed animation, added flex-shrink-0 */}
									{skills.map((tech, index) => (
										<li
											key={`skills-first-${index}`}
											className="mx-4 flex flex-col items-center gap-2 min-w-[100px] flex-shrink-0 group" // Changed: min-w
											title={tech.name}
										>
											<div>
												{tech.icon}
											</div>
											<span className="text-base font-medium text-center leading-tight"> {/* Changed: text-sm to text-base */}
												{tech.name}
											</span>
										</li>
									))}
								</ul>
								<ul className="flex items-center justify-center md:justify-start flex-shrink-0" aria-hidden="true"> {/* Changed: Removed animation, added flex-shrink-0 */}
									{skills.map((tech, index) => (
										<li
											key={`skills-second-${index}`}
											className="mx-4 flex flex-col items-center gap-2 min-w-[100px] flex-shrink-0 group" // Changed: min-w
											title={tech.name}
										>
											<div>
												{tech.icon}
											</div>
											<span className="text-base font-medium text-center leading-tight"> {/* Changed: text-sm to text-base */}
												{tech.name}
											</span>
										</li>
									))}
								</ul>
							</div>
						</div>

						{/* Second Row - Frameworks & Tools */}
						<div className="w-full overflow-hidden slider-mask"> {/* Changed: Removed inline-flex, flex-nowrap */}
							<div className="flex animate-scroll-reverse"> {/* Added: New wrapper div with animation and flex */}
								<ul className="flex items-center justify-center md:justify-start flex-shrink-0"> {/* Changed: Removed animation, added flex-shrink-0 */}
									{frameworks.map((tech, index) => (
										<li
											key={`frameworks-first-${index}`}
											className="mx-4 flex flex-col items-center gap-2 min-w-[100px] flex-shrink-0 group" // Changed: min-w
											title={tech.name}
										>
											<div>
												{tech.icon}
											</div>
											<span className="text-base font-medium text-center leading-tight"> {/* Changed: text-sm to text-base */}
												{tech.name}
											</span>
										</li>
									))}
								</ul>
								<ul className="flex items-center justify-center md:justify-start flex-shrink-0" aria-hidden="true"> {/* Changed: Removed animation, added flex-shrink-0 */}
									{frameworks.map((tech, index) => (
										<li
											key={`frameworks-second-${index}`}
											className="mx-4 flex flex-col items-center gap-2 min-w-[100px] flex-shrink-0 group" // Changed: min-w
											title={tech.name}
										>
											<div>
												{tech.icon}
											</div>
											<span className="text-base font-medium text-center leading-tight"> {/* Changed: text-sm to text-base */}
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
										className="flex flex-row gap-2 justify-between max-w-2xl p-3 rounded-xl bg-muted hover:ring-4 hover:ring-neutral-200 dark:hover:ring-neutral-700" // Changed dark:hover:ring-neutral-900 to dark:hover:ring-neutral-700
									>
										<div className="flex flex-row flex-1 gap-2">
											{/* You might want to add a generic school icon or specific logos like with experience */}
											{edu.logo && (
												<Image
													src={edu.logo}
													alt={edu.institution}
													width={256}
													height={256}
													className="size-12 sm:size-14 rounded-full flex"
												/>
											)}
											<div className="flex flex-col">
												<div className="flex justify-between items-center"> {/* Changed items-start to items-center */}
													<p className="text-lg font-semibold">
														{edu.name}
													</p>
													<p className="text-sm"> {/* Removed text-right, whitespace-nowrap, pl-2 */}
														{edu.startDate} - {/* Removed <br/> */}
														{edu.endDate}
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
																className="block mb-2" // Changed mb-1 to mb-2
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

					<h3 className="text-xl font-bold">Certifications 📜</h3>
					<div className="flex flex-col gap-3">
						{certifications.map((cert) => (
							<a
								key={cert.name}
								href={cert.url}
								target="_blank"
								rel="noopener noreferrer"
								className="sm:cursor-none flex flex-row gap-2 justify-between max-w-2xl p-3 rounded-xl bg-muted hover:ring-4 hover:ring-neutral-200 dark:hover:ring-neutral-700"
							>
								<div className="flex flex-row flex-1 gap-2">
									<Image
										src={cert.logo}
										alt={cert.name}
										width={256}
										height={256}
										className="size-12 sm:size-14 rounded-full flex"
									/>
									<div className="flex flex-col">
										<p className="text-lg font-semibold">
											{cert.name}
										</p>
										<p className="text-sm">
											{cert.issuer}
										</p>
									</div>
								</div>
							</a>
						))}
					</div>

					
				</div>

				{/* <div className="order-1 sm:order-2">
					<ProfileSection />
				</div> */}
			</div>
		</div>
	);
}