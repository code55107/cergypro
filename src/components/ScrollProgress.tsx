"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px]">
      <div
        className="h-full bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink"
        style={{
          width: `${progress * 100}%`,
          transition: "width 50ms linear",
        }}
      />
    </div>
  );
}
