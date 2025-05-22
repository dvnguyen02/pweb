import React, { useRef, useEffect, memo } from "react"; // Import memo
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { 
  type Container, 
  type ISourceOptions, 
  MoveDirection, 
  OutMode 
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/utils";

// Define the options outside the component to prevent unnecessary rerenders
const particlesOptions: ISourceOptions = {
  fullScreen: {
    enable: false,
    zIndex: -1
  },
  background: {
    color: {
      value: "transparent",
    },
  },
  fpsLimit: 144,
  interactivity: {
    events: {
      onClick: {
        enable: false,
      },

    },
    modes: {
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#FFFFFF",
    },
    
    move: {
      direction: MoveDirection.none,
      enable: true,
      outModes: {
        default: OutMode.out,
      },
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 200,
    },
    opacity: {
      value: 0.3,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  detectRetina: true,
};

// Initialize the engine once at module level
let engineInitialized = false;
let engineInitializationPromise: Promise<void> | null = null;

function initializeEngine() {
  if (!engineInitialized && !engineInitializationPromise) {
    engineInitializationPromise = initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      engineInitialized = true;
    }).catch(error => {
      console.error("Failed to initialize particles engine:", error);
      // Reset the promise so it can be attempted again
      engineInitializationPromise = null;
    });
  }
  return engineInitializationPromise;
}

// Start initialization as soon as the module is loaded
initializeEngine();

interface ParticlesBackgroundProps {
  className?: string;
}

function ParticlesBackgroundInternal({ className }: ParticlesBackgroundProps) { // Renamed for clarity with memo
  const [isReady, setIsReady] = React.useState(engineInitialized);
  
  useEffect(() => {
    if (!engineInitialized) {
      initializeEngine()?.then(() => {
        setIsReady(true);
      });
    } else if (!isReady) {
        setIsReady(true);
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <div className={cn("w-full h-full", className)}>
      <Particles
        id="tsparticles"
        options={particlesOptions}
      />
    </div>
  );
}

export default memo(ParticlesBackgroundInternal); // Export the memoized component
