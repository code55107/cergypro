"use client";

import { useInView } from "@/hooks/useInView";
import { type ReactNode } from "react";

type AnimationType =
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "fadeIn"
  | "scaleUp"
  | "blurIn";

const transforms: Record<AnimationType, string> = {
  fadeUp: "translate3d(0, 60px, 0)",
  fadeDown: "translate3d(0, -40px, 0)",
  fadeLeft: "translate3d(60px, 0, 0)",
  fadeRight: "translate3d(-60px, 0, 0)",
  fadeIn: "translate3d(0, 0, 0)",
  scaleUp: "scale(0.92)",
  blurIn: "translate3d(0, 20px, 0)",
};

export default function AnimateIn({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 700,
  className = "",
  threshold = 0.1,
}: {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}) {
  const { ref, isInView } = useInView(threshold);

  const isBlur = animation === "blurIn";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translate3d(0, 0, 0) scale(1)" : transforms[animation],
        filter: isBlur ? (isInView ? "blur(0px)" : "blur(8px)") : undefined,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
