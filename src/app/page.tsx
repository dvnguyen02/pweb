"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";
import ParticlesBackground from "@/components/ParticlesBackground";
import TerminalLoader from "@/components/TerminalLoader";
import { Switch } from "@/components/ui/switch";
import { Github, Linkedin, Mail, MessageSquareText } from "lucide-react";
import { ChatWidget } from '@/components/ChatWidget';

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
	// Chat tab is added dynamically below
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
	const [showChat, setShowChat] = useState(false);
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
		>
			{/* Terminal Loader */}
			{showLoader && (
				<TerminalLoader onComplete={handleLoaderComplete} />
			)}
			
			<ParticlesBackground className="absolute inset-0 z-0" />
			
			{/* Main content - will be shown after loader completes */}
			<div 
				className={cn(
					"relative z-10 flex h-full w-full items-center justify-center p-2 sm:p-4",
					"transition-opacity duration-1000",
					showLoader ? "opacity-0 pointer-events-none" : "opacity-100"
				)}
			>
				<div className="animate-in fade-in zoom-in-95 rounded-2xl bg-background backdrop-blur-lg shadow-2xl w-full sm:max-w-2xl lg:max-w-[60vw] h-full max-h-[90vh] sm:max-h-96 lg:max-h-[70vh] overflow-hidden ring-4 dark:ring-neutral-700 ring-black dark:hover:ring-neutral-600 hover:ring-black transition-all duration-1000 flex flex-col">
					{/* Settings, theme switch, and Chat button inside the card, top right - CHAT BUTTON REMOVED FROM HERE*/}
					<div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20 flex items-center gap-2">
						<Sun className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
						<Switch checked={isDark} onCheckedChange={setIsDark} />
						<Moon className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mr-1 sm:mr-2" />
					</div>
					
					{/* Window controls */}
					<div className="bg-muted pt-2 sm:pt-3 px-2 sm:px-3 gap-2 flex flex-row">
						<div className="size-3 sm:size-4 rounded-full bg-red-400" />
						<div className="size-3 sm:size-4 rounded-full bg-yellow-400" />
						<div className="size-3 sm:size-4 rounded-full bg-green-400" />
					</div>
					
					{/* Tabs */}
					<div className="bg-muted p-2 sm:p-3 flex flex-row gap-2 sm:gap-3 overflow-x-auto">
						{tabs.map((tab) => (
							<div
								key={tab.name}
								className={cn(
									"bg-background px-2 sm:px-3 py-1 rounded-lg font-medium duration-300 text-sm whitespace-nowrap flex-shrink-0 cursor-pointer",
									activeTab.name === tab.name &&
										"bg-black dark:bg-primary text-primary-foreground"
								)}
								onClick={() => setActiveTab(tab)}
							>
								{tab.name}
							</div>
						))}
						{/* Chat Tab Button - appears after loader */}
						{!showLoader && (
							<div
								className={cn(
									"bg-background px-2 sm:px-3 py-1 rounded-lg font-medium duration-300 text-sm whitespace-nowrap flex-shrink-0 cursor-pointer flex items-center gap-1.5 group",
									// Optional: Add active styling if chat is open, e.g.,
									// showChat && "bg-black dark:bg-primary text-primary-foreground"
								)}
								onClick={() => setShowChat(true)}
								title="Open Chat"
							>
								<MessageSquareText className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
								<span className="text-muted-foreground group-hover:text-foreground transition-colors">Chat</span>
							</div>
						)}
					</div>
					
					{/* Content area - flex-1 to take remaining space */}
					<ScrollArea className="bg-background flex-1">
						<div className="p-3 sm:p-5 pb-4 sm:pb-6 flex flex-col gap-3 mr-1 sm:mr-2">
							{activeTab.component}
						</div>
					</ScrollArea>
					
					{/* Terminal Status Bar Footer - always at bottom */}
					<div className="bg-primary/10 border-t border-border/50 px-2 sm:px-3 py-1.5 flex items-center justify-between text-xs font-mono flex-shrink-0">
						<div className="flex items-center gap-3">
							<span className="text-green-400">●</span>
							<span className="text-muted-foreground">david@wellington:~$</span>
							<span className="text-blue-400">Ready</span>
						</div>
						<div className="flex items-center gap-3">
							<div className="flex items-center gap-1">
								<a href="https://github.com/dvnguyen02" target="_blank" rel="noopener noreferrer" 
								   className="text-muted-foreground hover:text-foreground transition-colors">
									<Github className="w-3 h-3" />
								</a>
								<a href="https://www.linkedin.com/in/david-nguyen-58a378315/" target="_blank" rel="noopener noreferrer"
								   className="text-muted-foreground hover:text-foreground transition-colors">
									<Linkedin className="w-3 h-3" />
								</a>
								<a href="mailto:duynguyen290502@gmail.com"
								   className="text-muted-foreground hover:text-foreground transition-colors">
									<Mail className="w-3 h-3" />
								</a>
							</div>
							<span className="text-muted-foreground">© {new Date().getFullYear()}</span>
						</div>
					</div>
				</div>
			</div>
			<ChatWidget isVisible={showChat} onExit={() => setShowChat(false)} />
		</div>
	);
}