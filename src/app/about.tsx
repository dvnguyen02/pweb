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

	return (
		<div className="w-full h-full flex flex-col items-center">
			<div className="flex flex-col gap-6 max-w-4xl w-full">
				<div className="flex flex-col gap-4 p-6 border border-border/50 rounded-lg bg-card">
					<h1 className="text-3xl font-bold tracking-tight text-card-foreground">About Me</h1>
					
					<div className="space-y-4 text-base leading-relaxed text-card-foreground">
						<p>
							I'm a data science major with a bit of a dual personality. At uni, I'm diving deep 
							into machine learning, deep learning and statistics concepts, and at home I'm teaching myself about application development.
						</p>
						
						<p>
							What drives me is the intersection of analytical thinking and creative problem-solving. I love the process of taking messy, real-world data and extracting meaningful insights from it, but I'm equally fascinated by the challenge of building systems that can scale and deliver those insights to actual users. There's something incredibly satisfying about bridging the gap between academic theory and practical applications.
						</p>
						
						<p>
							When I'm not buried in coursework, I will be exploring the latest developments in AI tech, experimenting with new frameworks, or working on side projects.
						</p>
						
						
						{/* Enhanced Journey Timeline */}
						<div className="my-6" ref={timelineRef}>
							<h2 className="text-xl font-semibold tracking-tight mb-4 text-card-foreground">My Journey</h2>
							<div className="relative">
								{/* Vertical line */}
								<div className="absolute left-1/2 top-0 bottom-0 w-px bg-border dark:bg-white/20 -translate-x-1/2"></div>
								
								{/* Timeline items alternating left/right */}
								<div className={`space-y-12 transition-opacity duration-700 ease-out ${showTimeline ? 'opacity-100 animate-fade-in-up' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
									{/* Finance Struggles - Left */}
									<div className="relative flex items-center justify-start">
										<div className="absolute left-1/2 -translate-x-1/2 z-10">
											<div className="w-3 h-3 bg-white border-2 border-border rounded-full"></div>
										</div>
										<div className="w-1/2 pr-8 text-right">
											<div className="border border-border/80 rounded-lg p-4 bg-card">
												<div className="flex items-center justify-end gap-2 mb-2">
													<span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
														2021
													</span>
												</div>
												<h3 className="text-lg font-semibold mb-2">Finance Studies</h3>
												<p className="text-sm text-muted-foreground leading-relaxed">
													My path to data science wasn't exactly linear. I originally started university studying finance, it didn't click for me at all. It was a wake-up call that I was pursuing something that just wasn't right for me.
												</p>
											</div>
										</div>
									</div>
									
									{/* Discovery - Right */}
									<div className="relative flex items-center justify-end">
										<div className="absolute left-1/2 -translate-x-1/2 z-10">
											<div className="w-3 h-3 bg-white border-2 border-border rounded-full"></div>
										</div>
										<div className="w-1/2 pl-8">
											<div className="border border-border/80 rounded-lg p-4 bg-card">
												<div className="flex items-center gap-2 mb-2">
													<span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
														2022
													</span>
												</div>
												<h3 className="text-lg font-semibold mb-2">Discovery</h3>
												<p className="text-sm text-muted-foreground leading-relaxed">
													Found a data science major under the commerce program. The intersection of mathematics, statistics, and technology immediately resonated with me.
												</p>
											</div>
										</div>
									</div>
									
									{/* Switch & Commitment - Left */}
									<div className="relative flex items-center justify-start">
										<div className="absolute left-1/2 -translate-x-1/2 z-10">
											<div className="w-3 h-3 bg-white border-2 border-border rounded-full"></div>
										</div>
										<div className="w-1/2 pr-8 text-right">
											<div className="border border-border/80 rounded-lg p-4 bg-card">
												<div className="flex items-center justify-end gap-2 mb-2">
													<span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
														Mid 2022
													</span>
												</div>
												<h3 className="text-lg font-semibold mb-2">Switch & Commitment</h3>
												<p className="text-sm text-muted-foreground leading-relaxed">
													Made the leap to switch majors and committed fully to data science materials.
												</p>
											</div>
										</div>
									</div>
									
									{/* Self-Teaching Software Engineering - Right */}
									<div className="relative flex items-center justify-end">
										<div className="absolute left-1/2 -translate-x-1/2 z-10">
											<div className="w-3 h-3 bg-white border-2 border-border rounded-full"></div>
										</div>
										<div className="w-1/2 pl-8">
											<div className="border border-border/80 rounded-lg p-4 bg-card">
												<div className="flex items-center gap-2 mb-2">
													<span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
														2024
													</span>
												</div>
												<h3 className="text-lg font-semibold mb-2">Learning Application Development</h3>
												<p className="text-sm text-muted-foreground leading-relaxed">
													Realized that building models is only half the story. Started learning frameworks, cloud platforms, and deployment to turn models into real applications.
												</p>
											</div>
										</div>
									</div>

									{/* Present/Future - Left */}
									<div className="relative flex items-center justify-start">
										<div className="absolute left-1/2 -translate-x-1/2 z-10">
											<div className="w-3 h-3 bg-foreground border-2 border-background rounded-full shadow-sm"></div>
										</div>
										<div className="w-1/2 pr-8 text-right">
											<div className="border border-border/80 rounded-lg p-4 bg-card shadow-sm">
												<div className="flex items-center justify-end gap-2 mb-2">
													<span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
														2025
													</span>
												</div>
												<h3 className="text-lg font-semibold mb-2">What's Next</h3>
												<p className="text-sm text-muted-foreground leading-relaxed">
													Finishing degree in June and actively seeking graduate roles.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>


						<h2 className="text-xl font-semibold tracking-tight mt-6 text-card-foreground">Upcoming Timeline</h2>
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