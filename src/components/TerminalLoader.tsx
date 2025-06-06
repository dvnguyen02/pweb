"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { TerminalStatusBar } from "./TerminalStatusBar";

interface TerminalLoaderProps {
  onComplete: () => void;
  className?: string;
}

const TerminalLoader: React.FC<TerminalLoaderProps> = ({ 
  onComplete,
  className 
}) => {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [currentPhase, setCurrentPhase] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);  const [isDark, setIsDark] = useState(true); // Added state for isDark
  const [currentTime, setCurrentTime] = useState<string>("");
  const [showSkipButton, setShowSkipButton] = useState<boolean>(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);  // Set isReady after a small delay to ensure smooth mounting
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Show skip button immediately
  useEffect(() => {
    setShowSkipButton(true);
  }, []);
  // Skip function
  const handleSkip = () => {
    setIsComplete(true);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  // Keyboard support for ESC key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showSkipButton && !isComplete) {
        handleSkip();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showSkipButton, isComplete]);

  // Clock update - add this first
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };
    
    updateClock();
    const clockInterval = setInterval(updateClock, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initializationLines = [
      "$ python train_model.py",
      "Initializing neural network...",
      "Using CUDA-enabled GPU acceleration",
      "Model architecture: EfficientNetV2", 
    ];

    const addLines = async () => {
      let totalInitTime = 50;
      
      // First two lines
      for (let i = 0; i < 2; i++) {
        const typingSpeed = Math.floor(Math.random() * 30) + 50;
        totalInitTime += typingSpeed;
        await new Promise(resolve => setTimeout(resolve, typingSpeed));
        setTerminalLines(prev => [...prev, initializationLines[i]]);
        
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }
      
      // Progressive loading bar animation (about 2 seconds)
      await new Promise(resolve => setTimeout(resolve, 50));
      totalInitTime += 150;
      
      setTerminalLines(prev => [...prev, initializationLines[2]]);
      
      // Start with empty loading bar and progressively fill it
      const loadingBarSteps = [
        "Loading dataset... [                    ] 0%",
        "Loading dataset... [█                   ] 5%",
        "Loading dataset... [███                 ] 15%",
        "Loading dataset... [█████               ] 25%",
        "Loading dataset... [███████             ] 35%",
        "Loading dataset... [█████████           ] 45%",
        "Loading dataset... [███████████         ] 55%",
        "Loading dataset... [█████████████       ] 65%",
        "Loading dataset... [███████████████     ] 75%",
        "Loading dataset... [█████████████████   ] 85%",
        "Loading dataset... [█████████████████   ] 90%",
        "Loading dataset... [██████████████████  ] 95%",
        "Loading dataset... [████████████████████] 100%"
      ];
      
      for (let i = 0; i < loadingBarSteps.length; i++) {
        const stepDelay = i === loadingBarSteps.length - 1 ? 100 : 50;
        totalInitTime += stepDelay;
        await new Promise(resolve => setTimeout(resolve, stepDelay));
        
        setTerminalLines(prev => {
          const newLines = [...prev];
          newLines[newLines.length - 1] = loadingBarSteps[i];
          return newLines;
        });
        
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }
      
      // Display the last two initialization lines
      for (let i = 3; i < initializationLines.length; i++) {
        const typingSpeed = Math.floor(Math.random() * 30) + 200;
        totalInitTime += typingSpeed;
        await new Promise(resolve => setTimeout(resolve, typingSpeed));
        setTerminalLines(prev => [...prev, initializationLines[i]]);
        
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }
      
      const remainingTime = 4000 - totalInitTime;
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
      
      setCurrentPhase(1);
    };

    addLines();
  }, []);
  
  // Training phase - 1-3 seconds
  useEffect(() => {
    if (currentPhase !== 1) return;
    
    const trainingSimulation = async () => {
      let totalTrainingTime = 0;
      const targetMinTime = 250; // 250 milliseconds minimum

      // Reduce to 3 epochs instead of 5
      for (let epoch = 1; epoch <= 3; epoch++) {
        // Calculate realistic metrics that improve over time
        const baseProgress = (epoch - 1) / 3;
        
        const loss = (1.2 - baseProgress * 1.05).toFixed(4);
        const accuracy = (65 + baseProgress * 29).toFixed(2);
        const lr = 0.001;

        // Multiple steps per epoch for more authentic training simulation
        const stepsPerEpoch = 2;
        for (let step = 1; step <= stepsPerEpoch; step++) {
          const actualStep = Math.floor((500 / stepsPerEpoch) * step);
          const trainingLine = `Epoch [${epoch}/3], Step [${actualStep}/500], Loss: ${loss}, Accuracy: ${accuracy}%, LR: ${lr}`;
          
          const stepDelay = 200;
          totalTrainingTime += stepDelay;
          
          await new Promise(resolve => setTimeout(resolve, stepDelay));
          setTerminalLines(prev => [...prev, trainingLine]);
          
          if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
          }
        }
        
        // Brief pause between epochs
        if (epoch < 3) {
          const epochPause = 200;
          totalTrainingTime += epochPause;
          await new Promise(resolve => setTimeout(resolve, epochPause));
        }
      }
      
      // Add additional delay if needed to meet minimum training time
      const remainingTime = targetMinTime - totalTrainingTime;
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
      
      setCurrentPhase(2);
    };
    
    trainingSimulation();
  }, [currentPhase]);
  
  useEffect(() => {
    if (currentPhase !== 2) return;
    
    const postTrainingPhase = async () => {
      let totalPostTrainingTime = 0;
      const targetMinTime = 1000; // 1 second minimum

      const postTrainingLines = [
        "Training completed successfully! 🎉",
      ];
      
      for (let i = 0; i < postTrainingLines.length; i++) {
        const typingSpeed = Math.floor(Math.random() * 30);
        totalPostTrainingTime += typingSpeed;
        await new Promise(resolve => setTimeout(resolve, typingSpeed));
        setTerminalLines(prev => [...prev, postTrainingLines[i]]);
        
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }
      
      // Progressively animate evaluation progress bar - takes ~1 second
      const progressSteps = [
        "Evaluating on test set... [          ] 0%",
        "Evaluating on test set... [█         ] 10%",
        "Evaluating on test set... [██        ] 20%",
        "Evaluating on test set... [███       ] 30%",
        "Evaluating on test set... [████      ] 40%",
        "Evaluating on test set... [█████     ] 50%",
        "Evaluating on test set... [██████    ] 60%",
        "Evaluating on test set... [███████   ] 70%",
        "Evaluating on test set... [████████  ] 80%",
        "Evaluating on test set... [█████████ ] 90%",
        "Evaluating on test set... [██████████] 100%"
      ];
      
      setTerminalLines(prev => [...prev, progressSteps[0]]);
      
      for (let i = 1; i < progressSteps.length; i++) {
        const stepDelay = 80;
        totalPostTrainingTime += stepDelay;
        await new Promise(resolve => setTimeout(resolve, stepDelay));
        
        setTerminalLines(prev => {
          const newLines = [...prev];
          newLines[newLines.length - 1] = progressSteps[i];
          return newLines;
        });
        
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }
      
      // Add test accuracy result
      const testResult = "Test accuracy: 80.8%";
      await new Promise(resolve => setTimeout(resolve, 500));
      totalPostTrainingTime += 100;
      setTerminalLines(prev => [...prev, testResult]);
      
      // Add any additional delay to meet minimum time
      const remainingTime = targetMinTime - totalPostTrainingTime;
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
      
      const finalLines = [
        "Deploying to production... ✓",
        "$ open portfolio.tsx"
      ];
      
      for (let i = 0; i < finalLines.length; i++) {
        const typingSpeed = Math.floor(Math.random() * 50) + 250;
        await new Promise(resolve => setTimeout(resolve, typingSpeed));
        setTerminalLines(prev => [...prev, finalLines[i]]);
        
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }
      
      // Set complete status for fade-out
      await new Promise(resolve => setTimeout(resolve, 1200));
      setIsComplete(true);
      
      // Final transition fade-out timing 
      await new Promise(resolve => setTimeout(resolve, 1200));
      onComplete();
    };
    
    postTrainingPhase();
  }, [currentPhase, onComplete]);
  
  // Main return statement
  return (
    <div 
      className={cn(
        "fixed inset-0 flex items-center justify-center p-4 bg-black z-50",
        "transition-[opacity,transform] duration-500 ease-out",
        !isReady ? "opacity-0" : "opacity-100",
        isComplete ? "opacity-0 scale-[98%]" : "opacity-100 scale-100",
        className
      )}
    >      <div        className={cn(
          "animate-in fade-in zoom-in-95 rounded-2xl bg-transparent shadow-2xl w-full sm:max-w-2xl lg:max-w-[60vw] h-full max-h-[85vh] sm:max-h-96 lg:max-h-[85vh] overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-1000 flex flex-col",
          !isReady ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        )}
      >
        {/* Terminal header */}        {/* Window controls */}
        <div className="bg-transparent pt-3 px-3 gap-2 flex flex-row justify-between items-center">
          <div className="flex gap-2">
            <div className="size-4 rounded-full bg-red-500" />
            <div className="size-4 rounded-full bg-yellow-500" />
            <div className="size-4 rounded-full bg-green-500" />
          </div>
          
          {/* Skip Button */}
          {showSkipButton && !isComplete && (
            <button
              onClick={handleSkip}
              className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors duration-200 px-2 py-1 rounded-md hover:bg-neutral-800/50 font-mono"
              aria-label="Skip loading animation"
            >
              ESC
            </button>
          )}
        </div>
        
        {/* Title bar */}
        <div className="bg-transparent p-3 flex items-center justify-between border-b border-white/20">
          <div className="text-sm font-medium flex items-center gap-2">
            <span>python 3.12</span>
            <span className="text-neutral-600">-</span>
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            {currentTime}
          </div>
        </div>
        
        {/* Terminal content */}
        <div 
          ref={terminalRef}
          className="bg-black p-4 font-mono text-sm sm:text-base flex-1 overflow-y-auto" // Removed h-full
          style={{ 
            fontFamily: "'Fira Code', Consolas, Monaco, 'Courier New', monospace",
            color: '#00ff00',
            textShadow: '0 0 5px #00ff00',
            backgroundImage: "radial-gradient(rgba(0, 255, 0, 0.05) 1px, transparent 0)",
            backgroundSize: "30px 30px",
            backgroundPosition: "50% 50%",
          }}
        >
          {terminalLines.map((line, index) => (
            <div key={index} className="py-0.5 whitespace-pre-wrap">
              {line}
              {index === terminalLines.length - 1 && !isComplete && (
                <span className="ml-1 inline-block w-2 h-5 animate-[blink_1s_infinite]" style={{ background: '#00ff00', boxShadow: '0 0 5pxrgb(208, 255, 0)' }}></span>
              )}
            </div>
          ))}
      </div>

        {/* Footer Status Bar */}
        <TerminalStatusBar 
          statusText={isComplete ? "Process Complete" : "Training..."} 
          showThemeToggle={false}
        />
      </div>
    </div>
  );
};

export default TerminalLoader;