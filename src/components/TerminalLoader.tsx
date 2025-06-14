"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { TerminalStatusBar } from "./TerminalStatusBar";
import { X, Minus, Square } from "lucide-react";

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
  const [isReady, setIsReady] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [showSkipButton, setShowSkipButton] = useState<boolean>(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  // Set isReady after a small delay to ensure smooth mounting
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

  // Clock update
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
      "Windows PowerShell",
      "Copyright (C) Microsoft Corporation. All rights reserved.",
      "",
      "Install the latest PowerShell for new features and improvements! https://aka.ms/PSWindows",
      "",
      "PS C:\\David\\Portfolio> python train_model.py",
      "Initializing neural network...",
      "Using CUDA-enabled GPU acceleration",
      "Model architecture: EfficientNetV2", 
    ];

    const addLines = async () => {
      let totalInitTime = 50;
      
      // Add PowerShell header lines quickly
      for (let i = 0; i < 6; i++) {
        const typingSpeed = i < 5 ? 50 : Math.floor(Math.random() * 30) + 150;
        totalInitTime += typingSpeed;
        await new Promise(resolve => setTimeout(resolve, typingSpeed));
        setTerminalLines(prev => [...prev, initializationLines[i]]);
        
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }
      
      // Progressive loading bar animation
      await new Promise(resolve => setTimeout(resolve, 50));
      totalInitTime += 150;
      
      setTerminalLines(prev => [...prev, initializationLines[6]]);
      
      // Loading bar with PowerShell-style progress
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
      
      // Display the remaining initialization lines
      for (let i = 7; i < initializationLines.length; i++) {
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
  
  // Training phase
  useEffect(() => {
    if (currentPhase !== 1) return;
    
    const trainingSimulation = async () => {
      let totalTrainingTime = 0;
      const targetMinTime = 250;

      for (let epoch = 1; epoch <= 3; epoch++) {
        const baseProgress = (epoch - 1) / 3;
        
        const loss = (1.2 - baseProgress * 1.05).toFixed(4);
        const accuracy = (65 + baseProgress * 29).toFixed(2);
        const lr = 0.001;

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
        
        if (epoch < 3) {
          const epochPause = 200;
          totalTrainingTime += epochPause;
          await new Promise(resolve => setTimeout(resolve, epochPause));
        }
      }
      
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
      const targetMinTime = 1000;

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
      
      const testResult = "Test accuracy: 80.8%";
      await new Promise(resolve => setTimeout(resolve, 500));
      totalPostTrainingTime += 100;
      setTerminalLines(prev => [...prev, testResult]);
      
      const remainingTime = targetMinTime - totalPostTrainingTime;
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
      
      const finalLines = [
        "Deploying to production... ✓",
        "PS C:\\David\\Portfolio> start portfolio.tsx",
        "Opening portfolio application..."
      ];
      
      for (let i = 0; i < finalLines.length; i++) {
        const typingSpeed = Math.floor(Math.random() * 50) + 250;
        await new Promise(resolve => setTimeout(resolve, typingSpeed));
        setTerminalLines(prev => [...prev, finalLines[i]]);
        
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 1200));
      setIsComplete(true);
      
      await new Promise(resolve => setTimeout(resolve, 1200));
      onComplete();
    };
    
    postTrainingPhase();
  }, [currentPhase, onComplete]);
  
  return (
    <div 
      className={cn(
        "fixed inset-0 flex items-center justify-center p-4 bg-black z-50",
        "transition-[opacity,transform] duration-500 ease-out",
        !isReady ? "opacity-0" : "opacity-100",
        isComplete ? "opacity-0 scale-[98%]" : "opacity-100 scale-100",
        className
      )}
    >
      <div className={cn(
        "animate-in fade-in zoom-in-95 rounded-2xl bg-transparent shadow-2xl w-full sm:max-w-2xl lg:max-w-[60vw] h-full max-h-[85vh] sm:max-h-96 lg:max-h-[85vh] overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-1000 flex flex-col",
        !isReady ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
      )}>        {/* PowerShell-style Terminal Header */}
        <div className="bg-[#1e1e1e] border-b border-[#3c3c3c] flex flex-row w-full relative">
          {/* Single tab for PowerShell */}
          <div className="flex items-center justify-center px-4 py-2 text-sm bg-[#1e1e1e] text-white border-r border-[#3c3c3c] flex-1">
            <span className="select-none font-mono">Windows PowerShell</span>
          </div>

          {/* Windows-style Window Controls */}
          <div className="absolute top-0 right-0 z-20 flex items-center bg-[#1e1e1e]">
            <div className="flex items-center">
              {/* Minimize Button */}
              <button
                className="w-12 h-8 flex items-center justify-center text-white hover:bg-gray-500/20 transition-colors duration-150"
                title="Minimize"
              >
                <Minus className="w-4 h-4" />
              </button>
              
              {/* Maximize Button */}
              <button
                className="w-12 h-8 flex items-center justify-center text-white hover:bg-gray-500/20 transition-colors duration-150"
                title="Maximize"
              >
                <Square className="w-4 h-4" />
              </button>
                {/* Close Button */}
              <button
                onClick={handleSkip}
                className="w-12 h-8 flex items-center justify-center text-white hover:bg-red-500 hover:text-white transition-colors duration-150"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Skip Button */}
          {showSkipButton && !isComplete && (
            <button
              onClick={handleSkip}
              className="absolute right-14 top-1/2 transform -translate-y-1/2 text-xs text-[#cccccc] hover:text-white transition-colors duration-200 px-2 py-1 rounded-sm hover:bg-[#3c3c3c] font-mono z-10"
              aria-label="Skip loading animation"
            >
              ESC
            </button>
          )}
        </div>
        
        {/* Terminal content with black background */}
        <div 
          ref={terminalRef}
          className="bg-black flex-1 overflow-y-auto p-4 font-mono text-sm"
          style={{ 
            fontFamily: "'Consolas', 'Courier New', monospace",
            color: '#cccccc',
          }}
        >
          {terminalLines.map((line, index) => (
            <div key={index} className={cn(
              "py-0.5 whitespace-pre-wrap",
              line.startsWith("PS C:\\") && "text-yellow-300",
              line.startsWith("Windows PowerShell") && "text-white font-bold",
              line.startsWith("Copyright") && "text-[#cccccc]",
              line.startsWith("Install the latest") && "text-[#cccccc]",
              line.includes("Training completed") && "text-green-400",
              line.includes("Epoch") && "text-cyan-300",
              line.includes("Loading dataset") && "text-white",
              line.includes("Evaluating") && "text-white",
              line.includes("Test accuracy") && "text-green-400",
              line.includes("Deploying") && "text-green-400"
            )}>
              {line}
              {index === terminalLines.length - 1 && !isComplete && line.trim() !== "" && (
                <span className="ml-1 inline-block w-2 h-4 bg-white animate-[blink_1s_infinite]"></span>
              )}
            </div>
          ))}
        </div>

        {/* PowerShell Status Bar */}
        <div className="bg-[#1e1e1e] border-t border-[#3c3c3c] px-3 py-1 flex items-center justify-between text-xs text-[#cccccc]">
          <div className="flex items-center gap-4">
            <span>{isComplete ? "Process Complete" : "Training in progress..."}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>UTF-8</span>
            <span>CRLF</span>
            <span>{currentTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalLoader;