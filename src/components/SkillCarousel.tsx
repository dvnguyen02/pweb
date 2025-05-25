"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface SkillCarouselProps {
  items: Array<{
    name: string;
    icon: React.ReactNode;
  }>;
  direction?: 'left' | 'right';
  className?: string;
}

export function SkillCarousel({ items, direction = 'left', className }: SkillCarouselProps) {
  // Duplicate items multiple times to create seamless loop
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className={cn("skills-carousel overflow-hidden", className)}>
      <div 
        className={cn(
          "flex gap-6 whitespace-nowrap",
          direction === 'left' ? "animate-scroll-left" : "animate-scroll-right"
        )}
        style={{
          width: 'calc(300% + 2rem)' // Account for tripled items and gap
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="flex items-center gap-3 flex-shrink-0 transition-all duration-300 hover:scale-110"
          >
            <span className="flex items-center justify-center w-8 h-8 opacity-60 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0">
              {/* Scale up the icon */}
              <div className="transform scale-[2.5]">
                {item.icon}
              </div>
            </span>
            <span className="text-lg lg:text-xl font-semibold text-foreground/80 hover:text-foreground transition-colors duration-300">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}