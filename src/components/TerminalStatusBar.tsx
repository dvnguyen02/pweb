"use client";

import { Sun, Moon, Github, Linkedin, Mail } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface TerminalStatusBarProps {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  statusText?: string;
  showThemeToggle?: boolean;
}

export function TerminalStatusBar({ 
  isDark, 
  setIsDark, 
  statusText = "Ready",
  showThemeToggle = true 
}: TerminalStatusBarProps) {
  return (
    <div className="bg-primary/10 border-t border-neutral-400 dark:border-border/50 px-2 py-1.5 flex items-center justify-between text-xs font-mono flex-shrink-0 sm:px-3">
      {/* Left side */}
      <div className="flex items-center gap-1 sm:gap-3">
        <span className="text-green-400">●</span>
        <span className="hidden sm:inline text-muted-foreground">david@wellington:~$</span>
        <span className="text-blue-400">{statusText}</span>
      </div>
      {/* Right side */}
      <div className="flex items-center gap-1.5 sm:gap-3">
        {showThemeToggle && (
          <div className="flex items-center gap-1">
            <Sun className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            <Switch checked={isDark} onCheckedChange={setIsDark} />
            <Moon className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </div>
        )}
        <div className="flex items-center gap-1">
          <a href="https://github.com/dvnguyen02" target="_blank" rel="noopener noreferrer"
             className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="w-3 h-3" />
          </a>
          <a href="https://www.linkedin.com/in/david-nguyen-58a378315/" target="_blank" rel="noopener noreferrer"
             className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin className="w-3 h-3" />
          </a>
          <a href="mailto:duynguyen290502@gmail.com"
             className="text-muted-foreground hover:text-foreground transition-colors">
            <Mail className="w-3 h-3" />
          </a>
        </div>
        <span className="hidden sm:inline text-muted-foreground">© {new Date().getFullYear()}</span>
      </div>
    </div>
  );
}
