import React, { useRef, useEffect, useState } from "react";

export function About() {
	const timelineRef = useRef<HTMLDivElement>(null);
	const [showTimeline, setShowTimeline] = useState(false);

	useEffect(() => {
		const node = timelineRef.current;
		if (!node) return;
		const observer = new window.IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setShowTimeline(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.2 }
		);
		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	return (		<div className="w-full h-full flex flex-col items-center px-4 sm:px-6">
			<div className="flex flex-col gap-6 max-w-4xl w-full">
				<div className="flex flex-col gap-4 p-4 sm:p-6 border border-border/50 rounded-lg bg-card">
					<h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-card-foreground">About Me</h1>
					
					<div className="space-y-4 text-base leading-relaxed text-card-foreground">
						<p>
							I'm a data science major who's also into app development. I get the theory side at university with machine learning and statistics, then go home and work on building actual applications
						</p>
						
						
						<p>
							When I'm not buried in coursework, I will be exploring the latest developments in AI tech, experimenting with new frameworks, or working on side projects.
						</p>
						
								{/* Enhanced Journey Timeline */}
						<div className="my-6" ref={timelineRef}>
							<h2 className="text-lg sm:text-xl font-semibold tracking-tight mb-4 text-card-foreground">My Journey</h2>
							<div className="relative">
								{/* Vertical line - Mobile: left-aligned, Desktop: center */}
								<div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-border dark:bg-white/20 sm:-translate-x-1/2"></div>
								
								{/* Timeline items - Mobile: single column, Desktop: alternating */}
								<div className={`space-y-8 sm:space-y-12 transition-opacity duration-700 ease-out ${showTimeline ? 'opacity-100 animate-fade-in-up' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
									{/* Finance Struggles */}
									<div className="relative flex items-center">
										<div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 z-10">
											<div className="w-3 h-3 bg-white border-2 border-border rounded-full"></div>
										</div>
										<div className="ml-10 sm:ml-0 sm:w-1/2 sm:pr-8 sm:text-right">
											<div className="border border-border/80 rounded-lg p-3 sm:p-4 bg-card">
												<div className="flex items-center gap-2 mb-2 sm:justify-end">
													<span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
														2021
													</span>
												</div>
												<h3 className="text-base sm:text-lg font-semibold mb-2">Finance Studies</h3>
												<p className="text-sm text-muted-foreground leading-relaxed">
													My path to data science wasn't exactly linear. I originally started university studying finance, it didn't click for me at all. It was a wake-up call that I was pursuing something that just wasn't right for me.
												</p>
											</div>
										</div>
									</div>
									
									{/* Discovery */}
									<div className="relative flex items-center sm:justify-end">
										<div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 z-10">
											<div className="w-3 h-3 bg-white border-2 border-border rounded-full"></div>
										</div>
										<div className="ml-10 sm:ml-0 sm:w-1/2 sm:pl-8">
											<div className="border border-border/80 rounded-lg p-3 sm:p-4 bg-card">
												<div className="flex items-center gap-2 mb-2">
													<span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
														2022
													</span>
												</div>
												<h3 className="text-base sm:text-lg font-semibold mb-2">Discovery</h3>
												<p className="text-sm text-muted-foreground leading-relaxed">
													Found a data science major under the commerce program. The intersection of mathematics, statistics, and technology immediately resonated with me.
												</p>
											</div>
										</div>
									</div>
									
									{/* Switch & Commitment */}
									<div className="relative flex items-center">
										<div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 z-10">
											<div className="w-3 h-3 bg-white border-2 border-border rounded-full"></div>
										</div>
										<div className="ml-10 sm:ml-0 sm:w-1/2 sm:pr-8 sm:text-right">
											<div className="border border-border/80 rounded-lg p-3 sm:p-4 bg-card">
												<div className="flex items-center gap-2 mb-2 sm:justify-end">
													<span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
														Mid 2022
													</span>
												</div>
												<h3 className="text-base sm:text-lg font-semibold mb-2">Switch & Commitment</h3>
												<p className="text-sm text-muted-foreground leading-relaxed">
													Made the leap to switch majors and committed fully to data science materials.
												</p>
											</div>
										</div>
									</div>
									
									{/* Self-Teaching Software Engineering */}
									<div className="relative flex items-center sm:justify-end">
										<div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 z-10">
											<div className="w-3 h-3 bg-white border-2 border-border rounded-full"></div>
										</div>
										<div className="ml-10 sm:ml-0 sm:w-1/2 sm:pl-8">
											<div className="border border-border/80 rounded-lg p-3 sm:p-4 bg-card">
												<div className="flex items-center gap-2 mb-2">
													<span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
														2024
													</span>
												</div>
												<h3 className="text-base sm:text-lg font-semibold mb-2">Learning Application Development</h3>
												<p className="text-sm text-muted-foreground leading-relaxed">
													Realized that building models is only half the story. Started learning frameworks, cloud platforms, and deployment to turn models into real applications.
												</p>
											</div>
										</div>
									</div>

									{/* Present/Future */}
									<div className="relative flex items-center">
										<div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 z-10">
											<div className="w-3 h-3 bg-foreground border-2 border-background rounded-full shadow-sm"></div>
										</div>
										<div className="ml-10 sm:ml-0 sm:w-1/2 sm:pr-8 sm:text-right">
											<div className="border border-border/80 rounded-lg p-3 sm:p-4 bg-card shadow-sm">
												<div className="flex items-center gap-2 mb-2 sm:justify-end">
													<span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
														2025
													</span>
												</div>
												<h3 className="text-base sm:text-lg font-semibold mb-2">What's Next</h3>
												<p className="text-sm text-muted-foreground leading-relaxed">
													Finishing degree in June and actively seeking graduate roles.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>


						<h2 className="text-lg sm:text-xl font-semibold tracking-tight mt-6 text-card-foreground">Upcoming Timeline</h2>
								<p>
							I'm actively looking for graduate roles where I can 
							bring together my academic background in data science with my passion for building software.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}