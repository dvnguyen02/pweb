import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SlidingIconsProps {
  items: Array<{
    name: string;
    icon: React.ReactNode;
  }>;
  direction?: "left" | "right";
  speed?: "slow" | "medium" | "fast";
  className?: string;
}

export default function SlidingIcons({
  items,
  direction = "left",
  speed = "medium",
  className,
}: SlidingIconsProps) {
  // Double the items to ensure smooth infinite looping
  const [duplicatedItems, setDuplicatedItems] = useState<Array<{name: string; icon: React.ReactNode}>>([]);
  
  // Speed mapping
  const speedValues = {
    slow: 40,
    medium: 30,
    fast: 20
  };
  
  const animationDuration = `${speedValues[speed]}s`;
  const animationDirection = direction === "left" ? "normal" : "reverse";
  
  useEffect(() => {
    // We need to duplicate items multiple times to ensure the animation continues smoothly
    setDuplicatedItems([...items, ...items, ...items]);
  }, [items]);
  
  if (duplicatedItems.length === 0) {
    return null;
  }

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div
        className="inline-flex whitespace-nowrap w-max"
        style={{
          animation: `slideIcons ${animationDuration} linear infinite ${animationDirection}`,
          maxWidth: "100%"
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="sliding-icon inline-flex flex-col items-center justify-center mx-5 transition-all duration-300"
            title={item.name}
          >
            <div className="opacity-90 hover:opacity-100">{item.icon}</div>
            <span className="mt-2 text-xs font-medium text-foreground/70">{item.name}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes slideIcons {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
}