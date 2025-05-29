import { MapPinIcon, PhoneIcon } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { links } from "./data";

export function HeroSection() {
    return (        <div className="relative flex flex-col gap-3 pb-6 border border-border/50 rounded-lg p-4 sm:p-6 bg-card">
            {/* Social Icons - Responsive positioning */}
            <div className="flex gap-2 items-center justify-end mb-2 sm:absolute sm:top-4 sm:right-4 sm:mb-0">
                {links.map((link) => (
                    <a
                        href={link.url}
                        key={link.name}
                        className="p-1.5 sm:p-2 rounded-lg bg-background hover:bg-muted border border-border/50"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.name}
                    >
                        <div className="w-4 h-4 sm:w-5 sm:h-5">
                            {link.icon}
                        </div>
                    </a>
                ))}
                {/* Phone Icon with Custom Tooltip */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="p-1.5 sm:p-2 rounded-lg bg-background hover:bg-muted border border-border/50">
                                <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>+64 221900286</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                David Nguyen
            </h1>            
            <div className="flex items-center gap-2 text-base sm:text-lg">
                <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="break-words">Victoria University of Wellington</span>
            </div>
            
            <p className="text-base sm:text-lg leading-relaxed max-w-2xl">
                Kia ora! <span className="animate-wave hand-emoji">👋</span> I'm a Third Year Data Science Student. Currently studying data science and discovering that 80% of it is just cleaning messy data.
            </p>
        </div>
    );
}
