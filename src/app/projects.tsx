"use client";
import Image from "next/image";
import Link from "next/link";
import { Figtree } from "next/font/google";

import { SquareArrowOutUpRightIcon, Code2, Sparkles } from "lucide-react";

const projects = [
	{
		coverImage: "/images/projects/7.gif",
		name: "Notetaker",
		description:
			"Notetaker automatically transcribes audio from your system and microphone in real-time, capturing every word of your meetings without manual effort.",
		link: "https://github.com/dvnguyen02/notetaker",
		tags: ["FastAPI", "React", "LangGraph", "Python", "RAG", "WebRTC"],
	},
  {
		coverImage: "/images/projects/1.png",
		name: "PBTech RAG System 🧠",
		description:
			"A Retrieval-Augmented Generation (RAG) implementation that helps users search, compare, and get recommendations for PBTech products.",
		link: "https://pbtechrag.onrender.com",
		tags: ["Flask", "React", "LangGraph", "Python", "RAG"],
	},
	{
		coverImage: "/images/projects/2.jpeg",
		name: "RAGMail 📧",
		description:
			"An intelligent email management system that uses Retrieval Augmented Generation (RAG) to help you search, analyze, and interact with your emails using LLM.",
		link: "https://github.com/dvnguyen02/RAGMail",
		tags: ["Python", "LLM", "RAG", "Flask", "React"],
	},
	{
		coverImage: "/images/projects/31.png",
		name: "Kidney Stone Research 🏥",
		description:
			"Developed predictive models using ensemble learning to identify individuals at high risk for kidney stone formation, using NHANES 2017-2020 data.",
		link: "https://github.com/dvnguyen02/KStoneClassifierML",
		tags: [
			"Data Analysis",
			"Healthcare",
			"Python",
			"Ensemble Learning",
      "Predictive Modeling",
      "Feature Engineering",

		],
	},
	{
		coverImage: "/images/projects/olympic_dashboard.webp",
		name: "Olympic Games Dashboard (1896-2016) 🏅",
		description:
			"Interactive dashboard analyzing 120 years of Olympic history with dynamic filtering by sports, countries, years, and gender.",
		link: "https://dvidnguyen.shinyapps.io/olympic-analysis/",
		tags: ["R", "Shiny"]
	},
	// {
	// 	coverImage: "/images/projects/4.png",
	// 	name: "ML Model Deployment with FastAPI 🚀",
	// 	description:
	// 		"A demonstration of deploying a machine learning model using FastAPI and Docker, featuring model training, server deployment, and containerization.",
	// 	link: "https://github.com/dvnguyen02/MLModelsAPI",
	// 	tags: [
	// 		"FastAPI",
	// 		"Docker",
	// 		"Machine Learning",
	// 		"Python",
	// 		"API Development",
	// 	],
	// },
	{
		coverImage: "/images/projects/5.png",
		name: "PB Tech Scraper 🕷️",
		description:
			"A Python web scraper for collecting all product information from PB Tech's website, with plans to expand to all products.",
		link: "https://github.com/dvnguyen02/PBTech-scraper",
		tags: [
			"Python",
			"Web Scraping",
		],
	},
	{
		coverImage: "/images/projects/61.png",
		name: "Discord Bot Hosted with Local LLM 🤖",
		description:
			"A Discord bot that leverages locally-hosted Large Language Models (Llama3.2) for natural language processing and conversational AI.",
		link: "https://github.com/dvnguyen02/DiscordLocalLLM",
		tags: [
			"Discord",
			"LLM",
			"Python",
			"Bot Development",
			"Local AI",
		],
	},
];

const font = Figtree({
	subsets: ["latin"],
	variable: "--font-figtree",
});

export function Projects() {
	return (
		<section className={`${font.className} space-y-6 sm:space-y-8 px-4 sm:px-6`}>
			{/* Header Section */}
			<div className="text-center space-y-4 bg-card border border-border/80 rounded-xl p-4 sm:p-6">
				<div className="flex items-center justify-center gap-2 mb-4">
					<div className="p-2 rounded-full bg-primary/10">
						<Code2 className="size-5 sm:size-6 text-primary" />
					</div>
				</div>
				<div className="space-y-2">
					<h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-card-foreground">My Projects</h2>
					<p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
						A collection of projects I've built to explore new technologies, solve problems, and continuously learn.
					</p>
				</div>
				<div className="flex items-center justify-center gap-2 text-sm">
					<div className="flex items-center gap-2 px-3 py-1.5 bg-primary/5 rounded-full border border-border/80">
						<span className="text-muted-foreground">Currently working on</span>
						<span className="font-medium text-card-foreground">Notetaker</span>
					</div>
				</div>
			</div>

			{/* Divider */}
			<div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

			{/* Projects Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
				{projects.map((project) => (
					<Link
						key={project.name}
						href={project.link}
						target="_blank"
						className="sm:cursor-none group"
					>
						<div className="relative flex flex-col gap-3 bg-muted transition-all duration-300 hover:ring-4 ring-neutral-500 dark:ring-neutral-700 rounded-xl p-3 sm:p-4 group-hover:scale-[1.02]">
							<Image
								src={project.coverImage}
								alt={project.name}
								width={1280}
								height={720}
								className="aspect-video rounded-lg object-cover"
							/>

							<div className="flex flex-col gap-2">
								<div className="flex flex-row gap-2 items-center">
									<h3 className="text-lg sm:text-xl font-bold">{project.name}</h3>
									<SquareArrowOutUpRightIcon className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
								</div>

								<p className="text-sm text-muted-foreground leading-relaxed">
									{project.description}
								</p>
								<div className="flex flex-wrap gap-1.5">
									{project.tags.map((tag) => (
										<span
											key={tag}
											className="text-xs text-muted-foreground bg-background rounded-full px-2.5 py-1"
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>

			{/* Footer Section */}
			<div className="text-center pt-4">
				<p className="text-sm text-muted-foreground">
					Want to see more? Check out my{" "}
					<Link 
						href="https://github.com/dvnguyen02" 
						target="_blank"
						className="font-medium hover:underline"
					>
						GitHub profile
					</Link>{" "}
				</p>
			</div>
		</section>
	);
}