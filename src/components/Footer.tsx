import { Heart, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="w-full border-t border-border/50 bg-card/30 backdrop-blur-sm">
            <div className="container mx-auto px-4 sm:px-6 py-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Left side - Copyright */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>© {currentYear} David Nguyen</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-1">
                            Built with <Heart className="w-3 h-3 text-red-500 fill-current" /> in Wellington
                        </span>
                    </div>
                      {/* Right side - Social Links */}
                    <div className="flex items-center gap-3">
                        <a
                            href="https://github.com/dvnguyen02"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-background/50 hover:bg-background/80 border border-border/30 transition-all duration-300 hover:scale-105"
                            aria-label="GitHub"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/david-nguyen-58a378315/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-background/50 hover:bg-background/80 border border-border/30 transition-all duration-300 hover:scale-105"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-4 h-4" />
                        </a>
                        <a
                            href="mailto:duynguyen290502@gmail.com"
                            className="p-2 rounded-lg bg-background/50 hover:bg-background/80 border border-border/30 transition-all duration-300 hover:scale-105"
                            aria-label="Email"
                        >
                            <Mail className="w-4 h-4" />
                        </a>
                    </div>
                </div>
                
                {/* Additional info row */}
                <div className="mt-4 pt-4 border-t border-border/20 text-center">
                    <p className="text-xs text-muted-foreground">
                        Data Science Student • Victoria University of Wellington
                    </p>
                </div>
            </div>
        </footer>
    );
}
