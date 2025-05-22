"use client";

import Image from "next/image";

import { GithubIcon, LinkedinIcon } from "lucide-react";
import { cn } from "../lib/utils";

const skills = [
	"Python",
	"TypeScript",
	"Go",
	"R",
	"React",
	"Next.js",
	"Tailwind CSS",
	"SQL",
	"Git",
];

const experiences = [
	{
		logo: "/images/orgs/nzta.jpg",
		name: "Data Science Intern",
		company: "NZ Transport Agency",
		description: [
			"Enhanced AI performance by experimenting with embedding-based matching and LLM integrations.",
			"Collaborated on the development of an AI assistant for shipping calculation and risk analysis using Python, FastAPI, and Langchain, under the mentorship of a senior Backend Engineer.",
			"Streamlined team workflow by developing internal software in Budibase, transitioning the team from manual spreadsheet management to a more efficient system.",
		],
		startDate: "Sep 2024",
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
		color: "bg-blue-500",
		url: "https://www.linkedin.com/in/dvnguyen02/",
	},
	{
		name: "GitHub",
		icon: <GithubIcon />,
		color: "bg-neutral-800 dark:bg-neutral-900",
		url: "https://github.com/dvnguyen02",
	},
];

function ProfileSection() {
	return (
		<div className="flex flex-row sm:flex-col gap-8 sm:gap-5 items-center">
			<div className="flex justify-center items-center flex-shrink-0">
				<div className="rounded-full ring-4 ring-neutral-200 dark:ring-neutral-800 overflow-hidden size-48 md:size-48 lg:size-56">
					<Image
						src="/images/me2.jpg"
						alt="me"
						width={512}
						height={512}
						className="object-cover w-full h-full"
					/>
				</div>
			</div>

			<div className="flex flex-col gap-3 sm:bg-muted sm:p-3 rounded-xl w-full max-w-48">
				{links.map((link) => (
					<a
						href={link.url}
						key={link.name}
						className={`sm:cursor-none ${link.color} text-white rounded-lg flex flex-row gap-2 px-3 py-2 text-lg font-semibold items-center`}
					>
						{link.icon} {link.name}
					</a>
				))}
			</div>
		</div>
	);
}

export function About() {
	return (
		<div className="w-full h-full">
			<div className="flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-3">
				<div className="order-2 sm:order-1 flex flex-col gap-3">
					<h2 className="text-3xl font-bold">
						Kia ora, I'm David Nguyen 👋
					</h2>

					<p className="text-lg font-semibold">
						Data Science @ Victoria University of Wellington | Aspiring Data
						Scientist & Data Engineer/Software Engineer
					</p>

					<h3 className="text-xl font-bold">Skills 💻</h3>
					<div className="flex flex-wrap gap-1 mb-2">
						{skills.map((skill) => (
							<span
								key={skill}
								className="text-xs lg:text-sm text-slate-100 bg-slate-800 dark:bg-foreground dark:text-background rounded-full font-semibold px-3 py-1"
							>
								{skill}
							</span>
						))}
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
											<p className="text-sm text-muted-foreground">
												{experience.startDate} to{" "}
												{experience.endDate}
											</p>
										</div>
										<p className="text-sm text-muted-foreground">
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
										<p className="text-sm text-muted-foreground">
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
