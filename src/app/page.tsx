"use client";

import { useEffect, useState, useRef } from "react";

import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";
import Particles from "@/components/Particles/Particles";
import TerminalLoader from "@/components/TerminalLoader";
import { MessageSquareText } from "lucide-react";
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
];

export default function Page() {
	const [background, setBackground] = useState<string>(
		"black dark:bg-neutral-950"
	);	const [activeTab, setActiveTab] = useState<{
		name: string;
		component: React.ReactNode;
	}>(tabs[0]);
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
			{/* Terminal Loader */}			{showLoader && (
				<TerminalLoader onComplete={handleLoaderComplete} />
			)}
					<Particles 
						className="absolute inset-0 z-0"
						particleCount={250}
						particleSpread={8}
						speed={0.05}
						particleColors={["#ffffff", "#f0f0f0", "#e0e0e0"]}
						moveParticlesOnHover={true}
						particleHoverFactor={0.5}
						alphaParticles={true}
						particleBaseSize={80}
						sizeRandomness={1.2}
						cameraDistance={25}
						disableRotation={false}
					/>
					{/* Main content - will be shown after loader completes */}
			<div 
				className={cn(
					"relative z-10 fixed inset-0 flex items-center justify-center p-4",
					"transition-opacity duration-1000",
					showLoader ? "opacity-0 pointer-events-none" : "opacity-100"
				)}			>				<div className={cn(
					"animate-in fade-in zoom-in-95 rounded-2xl bg-transparent shadow-2xl w-full sm:max-w-2xl lg:max-w-[60vw] h-full max-h-[85vh] sm:max-h-96 lg:max-h-[85vh] overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-1000 flex flex-col",
					!showLoader ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
				)}>
					{/* Settings, theme switch, and Chat button inside the card, top right*/}
					<div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20 flex items-center gap-2">
						{/* Theme toggle removed from here */}
					</div>									
					{/* Terminal-style Tabs */}
					<div className="bg-black/80 border-b border-white/20 p-0 flex flex-row w-full">
						{tabs.map((tab, index) => (
							<div
								key={tab.name}
								className={cn(
									"relative flex-1 px-4 py-2 text-sm font-medium duration-200 cursor-pointer border-r border-white/10 last:border-r-0 group text-center",
									"bg-black/40 text-gray-400 hover:bg-black/60 hover:text-gray-200",
									activeTab.name === tab.name &&
										"bg-black/90 text-blue-400 border-b-2 border-b-blue-400"
								)}
								onClick={() => setActiveTab(tab)}
							>
								<span className="mr-2 text-white/40 group-hover:text-white/60">$</span>
								{tab.name.toLowerCase()}
								{activeTab.name === tab.name && (
									<span className="ml-1 animate-pulse">|</span>
								)}
							</div>
						))}
								{/* Terminal Chat Tab - appears after loader */}
						{!showLoader && (
							<div
								className={cn(
									"relative flex-1 px-4 py-2 text-xs font-medium duration-200 cursor-pointer border-r border-white/10 group text-center",
									"bg-black/40 text-gray-400 hover:bg-black/60 hover:text-gray-200 flex items-center justify-center gap-1"
								)}
								onClick={() => setShowChat(true)}
								title="Open Chat Terminal"
							>
								<span className="text-white/40 group-hover:text-white/60">$</span>
								<MessageSquareText className="w-3 h-3" />
								<span>chat</span>
							</div>
						)}
					</div>
							{/* Content area */}
					<ScrollArea viewportRef={viewportRef} className="bg-transparent flex-1">
						<div className="p-4 pb-6 flex flex-col gap-3 mr-2">
							{activeTab.component}
						</div>
					</ScrollArea>
							{/* Terminal Status Bar Footer - always at bottom */}
					<TerminalStatusBar 
					showThemeToggle={false}
					 />
				</div>
			</div>
			<ChatWidget isVisible={showChat} onExit={() => setShowChat(false)} />
		</div>
	);
}