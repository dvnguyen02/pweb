"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";
import ParticlesBackground from "@/components/ParticlesBackground";
import TerminalLoader from "@/components/TerminalLoader";
import { Switch } from "@/components/ui/switch";

import { Main } from "./main";
import { About } from "./about";
import { Projects } from "./projects";
import { Blogs } from "./blogs";
import { Attach } from "./attach";
import Contact from "./contact";

const tabs = [
	{ name: "Main", component: <Main /> },
	{ name: "About", component: <About /> },
	{ name: "Projects", component: <Projects /> },
	{ name: "Blogs", component: <Blogs /> },
	{ name: "Attach", component: <Attach /> },
	{ name: "Contact", component: <Contact /> },
];

export default function Page() {
	const [background, setBackground] = useState<string>(
		"black dark:bg-neutral-950"
	);
	const [activeTab, setActiveTab] = useState<{
		name: string;
		component: React.ReactNode;
	}>(tabs[0]);
	const [isDark, setIsDark] = useState(true);
	const [showLoader, setShowLoader] = useState(true);

	// Simple loader completion handler
	const handleLoaderComplete = () => {
		setShowLoader(false);
	};

	// Force dark mode on mount
	useEffect(() => {
		document.documentElement.classList.add("dark");
	}, []);

	useEffect(() => {
		if (isDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [isDark]);
	return (
		<div
			className={cn(
				"fixed inset-0 h-screen w-screen overflow-hidden touch-none overflow-y-hidden scrollbar-none",
				`bg-${background}`
			)}
		>			{/* Terminal Loader */}
			{showLoader && (
				<TerminalLoader onComplete={handleLoaderComplete} />
			)}
			
			<ParticlesBackground className="absolute inset-0 z-0" />
			
			{/* Main content - will be shown after loader completes */}			<div 
				className={cn(
					"relative z-10 flex h-full w-full items-center justify-center p-2 sm:p-4",
					"transition-opacity duration-1000",
					showLoader ? "opacity-0" : "opacity-100"
				)}
			>
				<div className="animate-in fade-in zoom-in-95 rounded-2xl bg-background backdrop-blur-lg shadow-2xl w-full sm:max-w-2xl lg:max-w-[60vw] h-full max-h-[90vh] sm:max-h-96 lg:max-h-[70vh] overflow-hidden ring-4 dark:ring-neutral-700 ring-black dark:hover:ring-neutral-600 hover:ring-black transition-all duration-1000">
					{/* Settings and theme switch inside the card, top right */}
					<div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20 flex items-center gap-2">
						<Sun className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
						<Switch checked={isDark} onCheckedChange={setIsDark} />
						<Moon className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
					</div>
					<div className="bg-muted pt-2 sm:pt-3 px-2 sm:px-3 gap-2 flex flex-row">
						<div className="size-3 sm:size-4 rounded-full bg-red-400" />
						<div className="size-3 sm:size-4 rounded-full bg-yellow-400" />
						<div className="size-3 sm:size-4 rounded-full bg-green-400" />
					</div>
					<div className="bg-muted p-2 sm:p-3 flex flex-row gap-2 sm:gap-3 overflow-x-auto">
						{tabs.map((tab) => (
							<div
								key={tab.name}
								className={cn(
									"bg-background px-2 sm:px-3 py-1 rounded-lg font-medium duration-300 text-sm whitespace-nowrap flex-shrink-0",
									activeTab.name === tab.name &&
										"bg-black dark:bg-primary text-primary-foreground"
								)}
								onClick={() => setActiveTab(tab)}
							>
								{tab.name}
							</div>
						))}
					</div>
					<ScrollArea className="bg-background h-full">
						<div className="p-3 sm:p-5 pb-20 sm:pb-28 flex flex-col gap-3 mr-1 sm:mr-2">
							{activeTab.component}
						</div>
					</ScrollArea>
				</div>
			</div>
		</div>
	);
}
