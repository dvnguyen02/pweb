import Link from "next/link";
import { FileTextIcon, BookOpenIcon } from "lucide-react";

export function Resume() {
  return (
    <>
      <h2 className="text-3xl font-bold">Resume & Documents</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        { [
          {
            title: "Resume/CV",
            description:
              "My resume detailing my education, work experience, projects, skills, and certifications.",
            link: "https://drive.google.com/file/d/1OHZ48Y-1_B4x_uizQ0OYq58UB9HbNO3S/view?usp=sharing",
            Icon: FileTextIcon,
          },
          {
            title: "Academic Transcript",
            description: "My transcript from Victoria University of Wellington.",
            link: "https://drive.google.com/file/d/1coDnJCEo272aFQLGVRdIT7ggFdHV-BaA/view?usp=sharing",
            Icon: BookOpenIcon,
          },
        ].map(({ title, description, link, Icon }) => (
          <Link
            key={title}
            href={link}
            target="_blank"
            className="sm:cursor-none"
          >
            <div className="relative flex flex-col gap-2 bg-muted rounded-xl p-3 transition-all duration-300 hover:ring-4 ring-neutral-200 dark:ring-neutral-700">
              <div className="flex items-center gap-2">
                <Icon className="size-5 inline" />
                <h3 className="text-lg font-semibold">{title}</h3>
              </div>
              <p className="text-sm mb-2">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
