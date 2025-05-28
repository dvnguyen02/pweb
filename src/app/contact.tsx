import React, { useRef, useEffect, useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

export default function Contact() {
  const contactRef = React.useRef<HTMLDivElement>(null);
  const [showContact, setShowContact] = React.useState(false);

  React.useEffect(() => {
    const node = contactRef.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowContact(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="flex flex-col gap-6 max-w-2xl w-full">
        <div ref={contactRef} className={`flex flex-col gap-4 p-6 border border-border/80 rounded-lg bg-card transition-opacity duration-700 ease-out ${showContact ? 'opacity-100 animate-fade-in-up' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
          <h1 className="text-3xl font-bold tracking-tight text-card-foreground">Contact me</h1>
          <p className="text-base leading-relaxed text-center text-card-foreground">
            You can contact me via LinkedIn, GitHub, or Email.
          </p>
          <p className="text-base leading-relaxed text-center text-card-foreground">
            I love getting your emails!
          </p>
          <div className="flex flex-row justify-center gap-16 mt-8 w-full">
            <div className="flex flex-col items-center gap-2 w-32">
              <FaLinkedin className="text-4xl text-card-foreground" />
              <span className="font-semibold text-card-foreground">LinkedIn</span>
              <a href="https://www.linkedin.com/in/david-nguyen-58a378315/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground break-all text-center">David Nguyen</a>
            </div>
            <div className="flex flex-col items-center gap-2 w-32">
              <FaGithub className="text-4xl text-card-foreground" />
              <span className="font-semibold text-card-foreground">GitHub</span>
              <a href="https://github.com/dvnguyen02" target="_blank" rel="noopener noreferrer" className="text-muted-foreground break-all text-center">dvnguyen02</a>
            </div>
            <div className="flex flex-col items-center gap-2 w-32">
              <FaEnvelope className="text-4xl text-card-foreground" />
              <span className="font-semibold text-card-foreground">Email</span>
              <a href="mailto:duynguyen290502@gmail.com" className="text-muted-foreground break-all text-center">duynguyen290502</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
