import { MapPinIcon, PhoneIcon } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { links } from "./data";

export function HeroSection() {
    return (
        <div className="relative flex flex-col gap-3 pb-6 border border-border/50 rounded-lg p-6 bg-card">
            {/* Social Icons - Top Right */}
            <div className="absolute top-4 right-4 flex gap-2 items-center">
                {links.map((link) => (
                    <a
                        href={link.url}
                        key={link.name}
                        className="p-2 rounded-lg bg-background hover:bg-muted border border-border/50"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.name}
                    >
                        {link.icon}
                    </a>
                ))}
                {/* Phone Icon with Custom Tooltip */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="p-2 rounded-lg bg-background hover:bg-muted border border-border/50">
                                <PhoneIcon className="w-5 h-5" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>+64 221900286</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight pr-32">
                David Nguyen
            </h1>
            
            <div className="flex items-center gap-2 text-lg">
                <MapPinIcon className="w-5 h-5 text-green-600 dark:text-emerald-500" />
                <span>Victoria University of Wellington</span>
            </div>
            
            <p className="text-lg leading-relaxed max-w-2xl">
                Kia ora! <span className="animate-wave hand-emoji">👋</span> I'm a Third Year Data Science Student. Currently studying data science and discovering that 80% of it is just cleaning messy data.
            </p>
        </div>
    );
}
