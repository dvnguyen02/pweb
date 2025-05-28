// Data constants for the main page components
import Image from "next/image";
import {
    GithubIcon,
    LinkedinIcon,
    MailIcon,
} from "lucide-react";
import {
    SiPython,
    SiTypescript,
    SiGo,
    SiR,
    SiReact,
    SiNextdotjs,
    SiTailwindcss,
    SiPostgresql,
    SiGit,
    SiGooglecloud,
    SiPandas,
    SiScikitlearn,
    SiPytorch,
    SiDocker,
    SiFastapi,
    SiWebrtc,
    SiFlask,
} from "react-icons/si";

export const skills = [
    {
        name: "Python",
        icon: <SiPython className="w-10 h-10" />
    },
    {
        name: "TypeScript",
        icon: <SiTypescript className="w-10 h-10" />
    },
    {
        name: "Golang",
        icon: <SiGo className="w-10 h-10" />
    },
    {
        name: "R",
        icon: <SiR className="w-10 h-10" />
    },
    {
        name: "React",
        icon: <SiReact className="w-10 h-10" />
    },
    {
        name: "Next.js",
        icon: <SiNextdotjs className="w-10 h-10" />
    },
    {
        name: "Tailwind CSS",
        icon: <SiTailwindcss className="w-10 h-10" />
    },
    {
        name: "PostgreSQL",
        icon: <SiPostgresql className="w-10 h-10" />
    },
    {
        name: "Git",
        icon: <SiGit className="w-10 h-10" />
    },
];

export const frameworks = [
    {
        name: "LangGraph",
        icon: <Image src="/images/orgs/langgraph.png" alt="LangGraph" width={40} height={40} className="w-10 h-10" />
    },
    {
        name: "Google SDK",
        icon: <SiGooglecloud className="w-10 h-10" />
    },
    {
        name: "Pandas",
        icon: <SiPandas className="w-10 h-10" />
    },
    {
        name: "Scikit-learn",
        icon: <SiScikitlearn className="w-10 h-10" />
    },
    {
        name: "PyTorch",
        icon: <SiPytorch className="w-10 h-10" />
    },
    {
        name: "FastAPI",
        icon: <SiFastapi className="w-10 h-10" />
    },
    {
        name: "Docker",
        icon: <SiDocker className="w-10 h-10" />
    },
];

export const experiences = [
    {
        logo: "/images/orgs/nzta.jpg",
        name: "Data Science Intern",
        company: "NZ Transport Agency",
        description: [
            "Conducted analysis of road maintenance data to identify correlations between soil group types and maintenance frequency.",
            "Developed predictive linear regression models to explore counterintuitive trends in road maintenance activities, achieving 83% accuracy in forecasting maintenance needs.",
            "Created an interactive data visualization dashboard and heat map that enabled stakeholders to compare pre and post-COVID freight movement patterns.",
        ],
        startDate: "July 2024",
        endDate: "Sep 2024",
    },
];

export const education = [
    {
        logo: "/images/orgs/vuw.png",
        name: "Commerce in Data Science",
        institution: "Victoria University of Wellington",
        description: [
            "Relevant coursework: Machine Learning, Statistical Learning",
            "Completed a capstone project on predictive Kidney Stone Analysis.",
            "Received letter of Excellence for outstanding performance in Machine Learning course.",
        ],
        startDate: "Mar 2022",
        endDate: "June 2025 ",
    },
    {
        logo: "/images/orgs/dlai.png",
        name: "Deep Learning Specialization",
        institution: "DeepLearning.AI",
        description: [
            "Comprehensive understanding of deep learning fundamentals",
        ],
        url: "https://coursera.org/share/28858a91ab81b6eedc6f26fee08eb2a3"
    },
    {
        logo: "/images/orgs/aws.png",
        name: "Data Engineering Specialization",
        institution: "AWS & DeepLearning.AI",
        description: [
            "Worked with AWS data engineering services and their best practices",
        ],
        url: "https://coursera.org/share/709c4292daa131efdf2876dc07a45b44"
    }
];

export const links = [
    {
        name: "LinkedIn",
        icon: <LinkedinIcon />,
        color: "bg-blue-950",
        url: "https://www.linkedin.com/in/david-nguyen-58a378315/",
    },
    {
        name: "GitHub",
        icon: <GithubIcon />,
        color: "bg-neutral-950 dark:bg-neutral-950",
        url: "https://github.com/dvnguyen02",
    },
    {
        name: "Email",
        icon: <MailIcon />,
        color: "bg-green-950",
        url: "mailto:duynguyen290502@gmail.com",
    },
];

export const currentProject = {
    coverImage: "/images/projects/7.gif",
    name: "Notetaker",
    description: "AI Real-Time Notetaker",
    link: "https://github.com/dvnguyen02/notetaker",
    tags: [
        { name: "Next.js", icon: <SiNextdotjs className="w-4 h-4" /> },
        { name: "FastAPI", icon: <SiFastapi className="w-4 h-4" /> },
        { name: "React", icon: <SiReact className="w-4 h-4" /> },
        { name: "LangGraph", icon: <Image src="/images/orgs/langgraph.png" alt="LangGraph" width={16} height={16} /> },
        { name: "Python", icon: <SiPython className="w-4 h-4" /> },
        { name: "WebRTC", icon: <SiWebrtc className="w-4 h-4" /> },
    ],
    detailedDescription: "A real-time AI-powered notetaking app that transcribes, summarizes, and organizes your notes as you speak. Features live transcription, AI-generated summaries, and seamless export to your favorite tools. Built with Next.js, FastAPI, and WebRTC for low-latency collaboration.",
};

export const placeholderProject = {
    coverImage: "/images/projects/1.png",
    name: "RAG",
    description: "RAG Shopping Assistant",
    link: "https://pbtechrag.onrender.com",
    tags: [
        { name: "React", icon: <SiReact className="w-4 h-4" /> },
        { name: "Python", icon: <SiPython className="w-4 h-4" /> },
        { name: "Flask", icon: <SiFlask className="w-4 h-4" /> },
        { name: "LangGraph", icon: <Image src="/images/orgs/langgraph.png" alt="LangGraph" width={16} height={16} /> },
    ],
    detailedDescription: "An intelligent chatbot for PBTech that helps customers find laptops through natural language conversations. Uses Retrieval-Augmented Generation to search 500+ products and provide personalized recommendations, comparisons, and technical specifications.",
};
