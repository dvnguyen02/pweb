"use client";

import Link from "next/link";
import { 
  FileTextIcon, 
  BookOpenIcon, 
  ExternalLinkIcon,
  DownloadIcon,
  CalendarIcon,
} from "lucide-react";
import { Figtree } from "next/font/google";
import React, { useRef, useEffect, useState } from "react";

const font = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export function Attach() {
  const documents = [
    {
      title: "Resume/CV",
      description: "My resume detailing my education, work experience, projects, skills, and certifications.",
      link: "https://drive.google.com/file/d/1OHZ48Y-1_B4x_uizQ0OYq58UB9HbNO3S/view?usp=sharing",
      Icon: FileTextIcon,
      lastUpdated: "May 2025"
    },
    {
      title: "Academic Transcript",
      description: "My transcript from Victoria University of Wellington.",
      link: "https://drive.google.com/file/d/1coDnJCEo272aFQLGVRdIT7ggFdHV-BaA/view?usp=sharing",
      Icon: BookOpenIcon,
      lastUpdated: "Current"
    }
  ];

  const docsRef = useRef<HTMLDivElement>(null);
  const [showDocs, setShowDocs] = useState(false);

  useEffect(() => {
    const node = docsRef.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowDocs(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${font.className} flex flex-col gap-4`}>
      <div className="flex flex-col gap-4 p-4 sm:p-6 border border-border/50 rounded-lg bg-card">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-card-foreground">Attachments</h1>
          <p className="text-base leading-relaxed text-card-foreground">
            Here's where you could find my CV and academic transcript. Feel free to download them for more details about my background and qualifications.
          </p>
        </div>
      <div ref={docsRef} className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-opacity duration-700 ease-out ${showDocs ? 'opacity-100 animate-fade-in-up' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        {documents.map(({ title, description, link, Icon, lastUpdated }) => (
          <Link
            key={title}
            href={link}
            target="_blank"
            className="sm:cursor-none group"
          >
            <div className="relative flex flex-col gap-3 bg-card border border-border/80 rounded-xl p-4 hover:ring-4 ring-neutral-500 dark:ring-neutral-700 h-full">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="size-5 text-card-foreground" />
                  <h3 className="text-xl font-bold text-card-foreground">{title}</h3>
                </div>
                <ExternalLinkIcon className="size-4 opacity-50 group-hover:opacity-100 text-card-foreground" />
              </div>
              <p className="text-sm text-muted-foreground flex-grow">{description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CalendarIcon className="size-3" />
                  Updated {lastUpdated}
                </span>
                <span className="flex items-center gap-1">
                  <DownloadIcon className="size-3" />
                  View/Download
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}