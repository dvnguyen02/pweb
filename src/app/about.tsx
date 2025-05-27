export function About() {
	return (
		<div className="w-full h-full flex flex-col items-center">
			<div className="flex flex-col gap-6 max-w-2xl w-full">
				<div className="flex flex-col gap-4 p-6 border border-border/50 rounded-lg bg-card">
					<h1 className="text-3xl font-bold tracking-tight">About Me</h1>
					
					<div className="space-y-4 text-base leading-relaxed">
						<p>
							A bit about me, I'm a data science student with a bit of a dual personality – by day, I'm diving deep 
							into machine learning, deep learning and statistics concepts at university, and by night, I'm teaching myself the skills of software engineering.
						</p>
						
						<h2 className="text-xl font-semibold tracking-tight mt-6">The Journey So Far</h2>
								<p>
							What started as pure fascination with data and machine learning has evolved into something much broader. 
							At university, I've built a solid foundation in deep learning and ML models – the kind of stuff that 
							gets me genuinely excited about what's possible with data. But somewhere along the way, I realized 
							that knowing how to build great models is only half the story. The other half? <strong>Actually turning 
							those models into real applications that people can use.</strong> 						
							That's where my self-taught software engineering journey began.
						</p>

					
						
						<h2 className="text-xl font-semibold tracking-tight mt-6">What's Next</h2>
								<p>
							I'm <strong>finishing up my degree at the end of June</strong> and actively looking for graduate roles where I can 
							bring together my academic background in data science with my passion for building software. Whether 
							that's as an <strong>AI engineer, software engineer, or data scientist,</strong> I'm excited about roles where I can 
							continue learning and building intelligent systems that make a difference.
						</p>
						
						<p>
							If you're working on interesting AI projects or know of opportunities where someone with my mix of 
							ML knowledge and software development enthusiasm might fit, I'd love to chat!
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
