import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="flex flex-col gap-6 max-w-2xl w-full">
        <div className="flex flex-col gap-4 p-6 border border-border/50 rounded-lg bg-card">
          <h1 className="text-3xl font-bold tracking-tight">Contact me</h1>
          <p className="text-base leading-relaxed text-center">
            You can contact me via LinkedIn, GitHub, or Email.
          </p>
          <p className="text-base leading-relaxed text-center">
            I love getting your emails!
          </p>
          <div className="flex flex-row justify-center gap-16 mt-8 w-full">
            <div className="flex flex-col items-center gap-2 w-32">
              <FaLinkedin className="text-4xl" />
              <span className="font-semibold">LinkedIn</span>
              <a href="https://www.linkedin.com/in/david-nguyen-58a378315/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground break-all text-center">David Nguyen</a>
            </div>
            <div className="flex flex-col items-center gap-2 w-32">
              <FaGithub className="text-4xl" />
              <span className="font-semibold">GitHub</span>
              <a href="https://github.com/dvnguyen02" target="_blank" rel="noopener noreferrer" className="text-muted-foreground break-all text-center">dvnguyen02</a>
            </div>
            <div className="flex flex-col items-center gap-2 w-32">
              <FaEnvelope className="text-4xl" />
              <span className="font-semibold">Email</span>
              <a href="mailto:duynguyen290502@gmail.com" className="text-muted-foreground break-all text-center">duynguyen290502</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
