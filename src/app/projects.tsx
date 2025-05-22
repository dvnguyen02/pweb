import Image from "next/image";
import Link from "next/link";
import { Figtree } from "next/font/google";

import { SquareArrowOutUpRightIcon } from "lucide-react";

const projects = [
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
		tags: ["Python", "LLM", "RAG", "Email Processing"],
	},
	{
		coverImage: "/images/projects/31.png",
		name: "Kidney Stone Prediction Research 🏥",
		description:
			"Developed predictive models using ensemble learning to identify individuals at high risk for kidney stone formation, using NHANES 2017-2020 data.",
		link: "https://github.com/dvnguyen02/KStoneClassifierML",
		tags: [
			"Machine Learning",
			"Data Analysis",
			"Healthcare",
			"Python",
			"Ensemble Learning",
		],
	},
	{
		coverImage: "/images/projects/4.png",
		name: "ML Model Deployment with FastAPI 🚀",
		description:
			"A demonstration of deploying a machine learning model using FastAPI and Docker, featuring model training, server deployment, and containerization.",
		link: "https://github.com/dvnguyen02/MLModelsAPI",
		tags: [
			"FastAPI",
			"Docker",
			"Machine Learning",
			"Python",
			"API Development",
		],
	},
	{
		coverImage: "/images/projects/5.png",
		name: "PB Tech Scraper 🕷️",
		description:
			"A Python web scraper for collecting all product information from PB Tech's website, with plans to expand to all products.",
		link: "https://github.com/dvnguyen02/PBTech-scraper",
		tags: [
			"Python",
			"Web Scraping",
			"Data Collection",
			"BeautifulSoup",
		],
	},
	{
		coverImage: "/images/projects/6.png",
		name: "DiscordLocalLLM 🤖",
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
		<>
			<div className={`${font.className} grid grid-cols-1 sm:grid-cols-2 gap-4`}>
				{projects.map((project) => (
					<Link
						key={project.name}
						href={project.link}
						target="_blank"
						className="sm:cursor-none"
					>
						<div className="relative flex flex-col gap-2 bg-muted transition-all duration-300 hover:ring-4 ring-neutral-200 dark:ring-neutral-700 rounded-xl p-3">
							<Image
								src={project.coverImage}
								alt={project.name}
								width={1280}
								height={720}
								className="aspect-video rounded-lg"
							/>

							<div className="flex flex-col gap-2">
								<div className="flex flex-row gap-2 items-center">
									<h3 className="text-xl font-bold">{project.name}</h3>

									<SquareArrowOutUpRightIcon className="size-4" />
								</div>

								<p className="text-sm text-muted-foreground">
									{project.description}
								</p>
								<div className="flex flex-wrap gap-1">
									{project.tags.map((tag) => (
										<span
											key={tag}
											className="text-xs text-muted-foreground bg-background rounded-full px-3 py-1"
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
		</>
	);
}