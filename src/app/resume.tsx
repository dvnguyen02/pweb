import Link from "next/link";
import { 
  FileTextIcon, 
  BookOpenIcon, 
  AwardIcon, 
  FolderIcon,
  ExternalLinkIcon,
  DownloadIcon,
  CalendarIcon,
  TrendingUpIcon,
  BrainIcon,
  CodeIcon
} from "lucide-react";
import { Figtree } from "next/font/google";

const font = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export function Resume() {
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

  return (
    <div className={`${font.className} flex flex-col gap-4`}>
      <h2 className="text-3xl font-bold">Resume & Documents</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {documents.map(({ title, description, link, Icon, lastUpdated }) => (
          <Link
            key={title}
            href={link}
            target="_blank"
            className="sm:cursor-none group"
          >
            <div className="relative flex flex-col gap-3 bg-muted rounded-xl p-4 transition-all duration-300 hover:ring-4 ring-neutral-200 dark:ring-neutral-700 h-full">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="size-5" />
                  <h3 className="text-xl font-bold">{title}</h3>
                </div>
                <ExternalLinkIcon className="size-4 opacity-50 group-hover:opacity-100 transition-opacity" />
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