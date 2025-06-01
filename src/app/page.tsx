"use client";

import { useEffect, useState, useRef } from "react";
import { Sun, Moon } from "lucide-react";

import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";
import ParticlesBackground from "@/components/ParticlesBackground";
import TerminalLoader from "@/components/TerminalLoader";
import { Switch } from "@/components/ui/switch";
import { Github, Linkedin, Mail, MessageSquareText } from "lucide-react";
import { ChatWidget } from '@/components/ChatWidget';
import { TerminalStatusBar } from "@/components/TerminalStatusBar"; // Added import

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
	const viewportRef = useRef<HTMLDivElement>(null); // Changed ref name for clarity and direct viewport access

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

	// useEffect to reset scroll position on tab change
	useEffect(() => {
		if (viewportRef.current) {
			viewportRef.current.scrollTop = 0;
		}
	}, [activeTab]);
	
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
					"relative z-10 fixed inset-0 flex items-center justify-center p-4",
					"transition-opacity duration-1000",
					showLoader ? "opacity-0 pointer-events-none" : "opacity-100"
				)}
			>
				<div className={cn(
					"animate-in fade-in zoom-in-95 rounded-2xl bg-background backdrop-blur-lg shadow-2xl w-full sm:max-w-2xl lg:max-w-[60vw] h-full max-h-[85vh] sm:max-h-96 lg:max-h-[85vh] overflow-hidden ring-4 ring-neutral-500 hover:ring-neutral-600 dark:ring-neutral-700 dark:hover:ring-neutral-600 transition-all duration-1000 flex flex-col",
					!showLoader ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
				)}>
					{/* Settings, theme switch, and Chat button inside the card, top right*/}
					<div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20 flex items-center gap-2">
						{/* Theme toggle removed from here */}
					</div>
					
					{/* Window controls */}
					<div className="bg-muted pt-3 px-3 gap-2 flex flex-row">
						<div className="size-4 rounded-full bg-red-500" />
						<div className="size-4 rounded-full bg-yellow-500" />
						<div className="size-4 rounded-full bg-green-500" />
					</div>
					
					{/* Tabs */}
					<div className="bg-muted p-3 flex flex-row gap-3 overflow-x-auto">
						{tabs.map((tab) => (
							<div
								key={tab.name}
								className={cn(
									"bg-background px-3 py-1 rounded-lg font-medium duration-300 text-sm whitespace-nowrap flex-shrink-0 cursor-pointer",
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
									"bg-background px-3 py-1 rounded-lg font-medium duration-300 text-sm whitespace-nowrap flex-shrink-0 cursor-pointer flex items-center gap-1.5 group",
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
					<ScrollArea viewportRef={viewportRef} className="bg-background flex-1">
						<div className="p-4 pb-6 flex flex-col gap-3 mr-2">
							{activeTab.component}
						</div>
					</ScrollArea>
					
					{/* Terminal Status Bar Footer - always at bottom */}
					<TerminalStatusBar isDark={isDark} setIsDark={setIsDark} />
				</div>
			</div>
			<ChatWidget isVisible={showChat} onExit={() => setShowChat(false)} />
		</div>
	);
}