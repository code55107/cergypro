"use client";

import { useRef, useState, type ReactNode } from "react";

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate3d(0, 0, 0)");

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTransform(`translate3d(${x * strength}px, ${y * strength}px, 0)`);
  };

  const handleMouseLeave = () => {
    setTransform("translate3d(0, 0, 0)");
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: "transform 300ms cubic-bezier(0.33, 1, 0.68, 1)",
      }}
    >
      {children}
    </div>
  );
}
