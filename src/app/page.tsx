"use client";

import { useEffect, useState, useRef } from "react";

import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";
import Particles from "@/components/Particles/Particles";
import TerminalLoader from "@/components/TerminalLoader";
import { MessageSquareText, X, Plus, ChevronDown, Home, User, FolderOpen, BookOpen, Paperclip, Mail, Minus, Square } from "lucide-react";
import { ChatWidget } from '@/components/ChatWidget';
import { TerminalStatusBar } from "@/components/TerminalStatusBar";

import { Main } from "./main";
import { About } from "./about";
import { Projects } from "./projects";
import { Blogs } from "./blogs";
import { Attach } from "./attach";
import Contact from "./contact";

const tabs = [
	{ name: "Main", component: <Main />, icon: Home },
	{ name: "About", component: <About />, icon: User },
	{ name: "Projects", component: <Projects />, icon: FolderOpen },
	{ name: "Blogs", component: <Blogs />, icon: BookOpen },
	{ name: "Attach", component: <Attach />, icon: Paperclip },
	{ name: "Contact", component: <Contact />, icon: Mail },
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
	const [openTabs, setOpenTabs] = useState<typeof tabs>([tabs[0]]); // Start with only Main tab
	const [showDropdown, setShowDropdown] = useState(false);
	const viewportRef = useRef<HTMLDivElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleLoaderComplete = () => {
		setShowLoader(false);
	};

	// Handle clicking outside dropdown to close it
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setShowDropdown(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	// Get tabs that are not currently open
	const availableTabs = tabs.filter(tab => !openTabs.some(openTab => openTab.name === tab.name));

	const openTab = (tab: typeof tabs[0]) => {
		if (!openTabs.some(openTab => openTab.name === tab.name)) {
			setOpenTabs(prev => [...prev, tab]);
		}
		setActiveTab(tab);
		setShowDropdown(false);
	};

	const closeTab = (tabToClose: typeof tabs[0], e: React.MouseEvent) => {
		e.stopPropagation(); // Prevent tab activation when closing
		
		const newOpenTabs = openTabs.filter(tab => tab.name !== tabToClose.name);
		setOpenTabs(newOpenTabs);
		
		// If closing the active tab, switch to another open tab
		if (activeTab.name === tabToClose.name && newOpenTabs.length > 0) {
			setActiveTab(newOpenTabs[0]);
		}
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
				particleCount={100}
				particleSpread={8}
				speed={0.05}
				moveParticlesOnHover={false}
				particleBaseSize={80}
				sizeRandomness={1.2}
				cameraDistance={30}
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
				)}>					{/* Window Controls and Settings */}
					<div className="absolute top-0 right-0 z-20 flex items-center bg-[#1e1e1e]">
						{/* Windows-style Window Controls */}
						<div className="flex items-center">
							{/* Minimize Button */}
							<button
								className="w-12 h-8 flex items-center justify-center text-white hover:bg-gray-500/20 transition-colors duration-150"
								title="Minimize"
							>
								<Minus className="w-4 h-4" />
							</button>
							
							{/* Maximize Button */}
							<button
								className="w-12 h-8 flex items-center justify-center text-white hover:bg-gray-500/20 transition-colors duration-150"
								title="Maximize"
							>
								<Square className="w-4 h-4" />
							</button>
							
							{/* Close Button */}
							<button
								className="w-12 h-8 flex items-center justify-center text-white hover:bg-red-500 hover:text-white transition-colors duration-150"
								title="Close"
							>
								<X className="w-4 h-4" />
							</button>
						</div>
					</div>{/* PowerShell-style Terminal Tabs */}
					<div className="bg-[#1e1e1e] border-b border-[#3c3c3c] flex flex-row w-full relative">
						{/* Open tabs */}
						{openTabs.map((tab, index) => (							<div
								key={tab.name}
								className={cn(
									"relative flex items-center justify-between px-3 py-2 text-sm cursor-pointer group",
									"bg-[#2d2d30] text-[#cccccc] border-r border-[#3c3c3c]",
									"hover:bg-[#383838] transition-colors duration-150",
									"min-w-0 flex-shrink-0", // Prevent shrinking too much
									activeTab.name === tab.name && "bg-[#1a1a1a] text-white"
								)}
								onClick={() => setActiveTab(tab)}
								style={{ maxWidth: `${100 / Math.max(openTabs.length + 1, 3)}%`, minWidth: '120px' }} // Dynamic width with wider minimum
							>
								<div className="flex items-center mr-2">
									<tab.icon className="w-3 h-3 mr-1.5 flex-shrink-0" />
									<span className="select-none truncate">
										{tab.name}
									</span>
								</div>								{/* Close button - always show, white color with hover outline */}
								<X 
									className="w-4 h-4 opacity-40 group-hover:opacity-60 hover:opacity-100 transition-all text-white hover:text-gray-200 flex-shrink-0 rounded hover:bg-white/20 hover:ring-1 hover:ring-white/30 p-0.5" 
									onClick={(e) => closeTab(tab, e)}
								/>
							</div>
						))}

						{/* Add tab button with dropdown */}
						{availableTabs.length > 0 && (
							<div className="relative" ref={dropdownRef}>
								<div
									className={cn(
										"flex items-center justify-center px-3 py-2 text-sm cursor-pointer group",
										"bg-[#2d2d30] text-[#cccccc] border-r border-[#3c3c3c]",
										"hover:bg-[#383838] transition-colors duration-150",
										"min-w-[40px] flex-shrink-0"
									)}
									onClick={() => setShowDropdown(!showDropdown)}
									title="Open new tab"
								>
									<Plus className="w-3 h-3" />
									<ChevronDown className="w-3 h-3 ml-1" />
								</div>

								{/* Dropdown menu */}
								{showDropdown && (
									<div className="absolute top-full left-0 z-50 bg-[#2d2d30] border border-[#3c3c3c] rounded-b-md shadow-lg min-w-[120px]">										{availableTabs.map((tab) => (
											<div
												key={tab.name}
												className={cn(
													"px-3 py-2 text-sm cursor-pointer flex items-center",
													"text-[#cccccc] hover:bg-[#383838] transition-colors duration-150",
													"border-b border-[#3c3c3c] last:border-b-0"
												)}
												onClick={() => openTab(tab)}
											>
												<tab.icon className="w-3 h-3 mr-1.5 flex-shrink-0" />
												{tab.name}
											</div>
										))}
									</div>
								)}
							</div>
						)}						{/* Chat Tab - appears after loader */}
						{!showLoader && (
							<div
								className={cn(
									"relative flex items-center justify-center px-4 py-2 text-sm cursor-pointer group",
									"bg-[#2d2d30] text-[#cccccc] border-r border-[#3c3c3c]",
									"hover:bg-[#383838] transition-colors duration-150",
									"min-w-0 flex-shrink-0"
								)}
								onClick={() => setShowChat(true)}
								title="Open Chat Terminal"
								style={{ maxWidth: `${100 / Math.max(openTabs.length + 1, 3)}%`, minWidth: '120px' }}
							>
								<div className="flex items-center justify-center">
									<MessageSquareText className="w-3 h-3 mr-1 flex-shrink-0" />
									<span className="select-none font-mono truncate">chat</span>
								</div>
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