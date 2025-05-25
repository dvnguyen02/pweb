import Image from "next/image";
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
import { AboutFeatureTable } from "./AboutFeatureTable";
import { useEffect, useRef } from "react";

const skills = [
	{
		name: "Python",
		icon: <SiPython className="w-10 h-10 text-foreground/80" />
	},
	{
		name: "TypeScript",
		icon: <SiTypescript className="w-10 h-10 text-foreground/80" />
	},
	{
		name: "Golang",
		icon: <SiGo className="w-10 h-10 text-foreground/80" />
	},
	{
		name: "R",
		icon: <SiR className="w-10 h-10 text-foreground/80" />
	},
	{
		name: "React",
		icon: <SiReact className="w-10 h-10 text-foreground/80" />
	},
	{
		name: "Next.js",
		icon: <SiNextdotjs className="w-10 h-10 text-foreground/80" />
	},
	{
		name: "Tailwind CSS",
		icon: <SiTailwindcss className="w-10 h-10 text-foreground/80" />
	},
	{
		name: "SQL",
		icon: <SiPostgresql className="w-10 h-10 text-foreground/80" />
	},
	{
		name: "Git",
		icon: <SiGit className="w-10 h-10 text-foreground/80" />
	},
];

const frameworks = [
	{
		name: "LangGraph",
		icon: <div className="w-10 h-10 bg-foreground/20 rounded-md flex items-center justify-center text-foreground/80">LG</div>
	},
	{
		name: "Google SDK",
		icon: <SiGooglecloud className="w-10 h-10 text-foreground/80" />
	},
	{
		name: "Neon Vector DB",
		icon: <div className="w-10 h-10 bg-foreground/20 rounded-md flex items-center justify-center text-foreground/80">NV</div>
	},
	{
		name: "FAISS",
		icon: <div className="w-10 h-10 bg-foreground/20 rounded-md flex items-center justify-center text-foreground/80">FS</div>
	},
	{
		name: "Pandas",
		icon: <SiPandas className="w-10 h-10 text-foreground/80" />
	},
	{
		name: "Scikit-learn",
		icon: <SiScikitlearn className="w-10 h-10 text-foreground/80" />
	},
	{
		name: "PyTorch",
		icon: <SiPytorch className="w-10 h-10 text-foreground/80" />
	},
	{
		name: "FastAPI",
		icon: <SiFastapi className="w-10 h-10 text-foreground/80" />
	},
	{
		name: "Docker",
		icon: <SiDocker className="w-10 h-10 text-foreground/80" />
	},
];

const experiences = [
	{
		logo: "/images/orgs/nzta.jpg",
		name: "Data Science Intern",
		company: "NZ Transport Agency",
		description: [
			"Conducted analysis of road maintenance data to identify correlations between soil group types and maintenance frequency, resulting in 15% more efficient resource allocation.",
			"Developed predictive linear regression models to explore counterintuitive trends in road maintenance activities, achieving 83% accuracy in forecasting maintenance needs.",
			"Created an interactive data visualization dashboard and data cube that enabled stakeholders to compare pre and post-COVID freight movement patterns.",
		],
		startDate: "July 2024",
		endDate: "Sep 2024",
	},
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

function ProfileSection() {
	return (
		<div className="flex justify-center items-center flex-shrink-0">
			<div className="rounded-full ring-4 ring-neutral-200 dark:ring-neutral-800 overflow-hidden size-48 md:size-48 lg:size-40">
				<Image
					src="/images/me.jpg"
					alt="me"
					width={512}
					height={512}
					className="object-cover w-full h-full"
				/>
			</div>
		</div>
	);
}

export function About() {

	return (
		<div className="w-full h-full">
			<div className="flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-3">
				<div className="order-2 sm:order-1 flex flex-col gap-6">
					{/* Header Section - matching the image style */}
					<div className="relative flex flex-col gap-3 pb-6 border border-border/50 rounded-lg p-6 bg-card">
						{/* Social Icons - Top Right */}
						<div className="absolute top-4 right-4 flex gap-2">
							{links.map((link) => (
								<a
									href={link.url}
									key={link.name}
									className="sm:cursor-none p-2 rounded-lg bg-background hover:bg-muted transition-all duration-300 border border-border/50"
									target="_blank"
									rel="noopener noreferrer"
								>
									{link.icon}
								</a>
							))}
						</div>

						<h1 className="text-4xl sm:text-5xl font-bold tracking-tight pr-32 transition-colors duration-300">
							David Nguyen
						</h1>
						
						<div className="flex items-center gap-2 text-lg transition-colors duration-300">
							<MapPinIcon className="w-5 h-5 text-green-600 dark:text-emerald-500 transition-colors duration-300" />
							<span>Victoria University of Wellington</span>
						</div>
						
						<p className="text-lg leading-relaxed max-w-2xl transition-colors duration-300">
							Kia ora! <span className="animate-wave hand-emoji">👋</span> I'm a Third Year Data Science Student. Studying data science and discovering that 80% of it is just cleaning messy data.
						</p>
					</div>

					<AboutFeatureTable />

					<h3 className="text-xl font-bold">What I work with</h3>
					<div className="w-full mt-2 mb-6">
						<div className="flex flex-wrap gap-4">
							{skills.map((skill) => (
								<div 
									key={skill.name} 
									className="flex items-center gap-1.5 bg-background border border-border/50 rounded-lg px-3 py-1.5 hover:border-border transition-all duration-300"
									title={skill.name}
								>
									{skill.icon}
									<span className="text-sm font-medium">{skill.name}</span>
								</div>
							))}
							{frameworks.map((framework) => (
								<div 
									key={framework.name} 
									className="flex items-center gap-1.5 bg-background border border-border/50 rounded-lg px-3 py-1.5 hover:border-border transition-all duration-300"
									title={framework.name}
								>
									{framework.icon}
									<span className="text-sm font-medium">{framework.name}</span>
								</div>
							))}
						</div>
					</div>

					<h3 className="text-xl font-bold">Experience 💼</h3>
					<div className="flex flex-col gap-3">
						{experiences.map((experience) => (
							<div
								key={experience.company}
								className="flex flex-row gap-2 justify-between max-w-2xl p-3 rounded-xl bg-muted transition-all duration-300 hover:ring-4 hover:ring-neutral-200 dark:hover:ring-neutral-700"
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
												{experience.startDate} to{" "}
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
					<h3 className="text-xl font-bold">Certifications 📜</h3>
					<div className="flex flex-col gap-3">
						{certifications.map((cert) => (
							<a
								key={cert.name}
								href={cert.url}
								target="_blank"
								rel="noopener noreferrer"
								className="sm:cursor-none flex flex-row gap-2 justify-between max-w-2xl p-3 rounded-xl bg-muted transition-all duration-300 hover:ring-4 hover:ring-neutral-200 dark:hover:ring-neutral-700"
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

				<div className="order-1 sm:order-2">
					<ProfileSection />
				</div>
			</div>
		</div>
	);
}