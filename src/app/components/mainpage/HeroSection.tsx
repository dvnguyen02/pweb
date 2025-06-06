import { MapPinIcon, PhoneIcon, HandIcon } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { links } from "./data";

export function HeroSection() {
    return (
        <div className="relative flex flex-col gap-3 pb-6 rounded-lg p-3 sm:p-4 lg:p-6 w-full min-w-0">
            {/* Social Icons - Responsive positioning */}
            <div className="flex gap-1 sm:gap-2 items-center justify-end mb-2 sm:absolute sm:top-4 sm:right-4 sm:mb-0 flex-shrink-0 overflow-x-auto">
                {links.map((link) => (
                    <a
                        href={link.url}
                        key={link.name}
                        className="p-1.5 sm:p-2 rounded-lg flex-shrink-0"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.name}
                    >
                        <div className="w-4 h-4 sm:w-5 sm:h-5">
                            {link.icon}
                        </div>
                    </a>
                ))}
                {/* Phone Icon with Custom Tooltip */}                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                                <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>+64 221900286</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <div className="min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight break-words">
                    David Nguyen
                </h1>
                
                <div className="flex items-center gap-2 text-sm sm:text-base lg:text-lg mt-2 min-w-0">
                    <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="break-words min-w-0 truncate">Victoria University of Wellington</span>
                </div>
                    <p className="text-sm sm:text-base lg:text-lg leading-relaxed mt-2 break-words">
                        Kia ora! <span className="inline-block animate-wave transition-transform duration-300 hover:scale-125" style={{ transformOrigin: '70% 70%' }}>👋</span> I'm a <strong>soon to be Data Science graduate</strong> passionate about turning messy data into <strong>actionable insights</strong>. Currently seeking <strong>full-time opportunities</strong> where I can apply my <strong>analytical skills</strong> to solve complex business problems.
                    </p>
            </div>
        </div>
    );
}