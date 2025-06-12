"use client";

import { useEffect, useState, useRef } from "react";

import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";
import Particles from "@/components/Particles/Particles";
import TerminalLoader from "@/components/TerminalLoader";
import { MessageSquareText, X } from "lucide-react";
import { ChatWidget } from '@/components/ChatWidget';
import { TerminalStatusBar } from "@/components/TerminalStatusBar";

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
	const [showLoader, setShowLoader] = useState(true);
	const [showChat, setShowChat] = useState(false);
	const viewportRef = useRef<HTMLDivElement>(null);

	const handleLoaderComplete = () => {
		setShowLoader(false);
	};

	useEffect(() => {
		document.documentElement.classList.add("dark");
	}, []);

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
			{showLoader && (
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

			<div 
				className={cn(
					"relative z-10 fixed inset-0 flex items-center justify-center p-4",
					"transition-opacity duration-1000",
					showLoader ? "opacity-0 pointer-events-none" : "opacity-100"
				)}
			>
				<div className={cn(
					"animate-in fade-in zoom-in-95 rounded-2xl bg-transparent shadow-2xl w-full sm:max-w-2xl lg:max-w-[60vw] h-full max-h-[85vh] sm:max-h-96 lg:max-h-[85vh] overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-1000 flex flex-col",
					!showLoader ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
				)}>
					{/* Settings, theme switch, and Chat button inside the card, top right*/}
					<div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20 flex items-center gap-2">
						{/* Theme toggle removed from here */}
					</div>

					{/* PowerShell-style Terminal Tabs */}
					<div className="bg-[#1e1e1e] border-b border-[#3c3c3c] flex flex-row w-full relative">
						{/* Main tabs - distributed evenly */}
						{tabs.map((tab, index) => (
							<div
								key={tab.name}
								className={cn(
									"relative flex items-center justify-center px-3 py-2 text-sm cursor-pointer group flex-1",
									"bg-[#2d2d30] text-[#cccccc] border-r border-[#3c3c3c]",
									"hover:bg-[#383838] transition-colors duration-150",
									activeTab.name === tab.name && "bg-[#1e1e1e] text-white"
								)}
								onClick={() => setActiveTab(tab)}
							>
								<span className="select-none font-mono">
									{tab.name}
								</span>
								{/* Close button for non-active tabs */}
								{activeTab.name !== tab.name && (
									<X className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-60 hover:opacity-100 transition-opacity" />
								)}
							</div>
						))}

						{/* Chat Tab - appears after loader, also takes equal space */}
						{!showLoader && (
							<div
								className={cn(
									"relative flex items-center justify-center px-3 py-2 text-sm cursor-pointer group flex-1",
									"bg-[#2d2d30] text-[#cccccc] border-r border-[#3c3c3c]",
									"hover:bg-[#383838] transition-colors duration-150"
								)}
								onClick={() => setShowChat(true)}
								title="Open Chat Terminal"
							>
								<div className="flex items-center">
									<MessageSquareText className="w-3 h-3 mr-1" />
									<span className="select-none font-mono">chat</span>
								</div>
								<X className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-60 hover:opacity-100 transition-opacity" />
							</div>
						)}						
					</div>

					{/* Content area */}
					<ScrollArea viewportRef={viewportRef} className="bg-transparent flex-1">
						<div className="p-4 pb-6 flex flex-col gap-3 mr-2">
							{activeTab.component}
						</div>
					</ScrollArea>

					{/* Terminal Status Bar Footer */}
					<TerminalStatusBar 
						showThemeToggle={false}
					/>
				</div>
			</div>
			<ChatWidget isVisible={showChat} onExit={() => setShowChat(false)} />
		</div>
	);
}