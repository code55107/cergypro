"use client";

import { useEffect, useRef, useState } from "react";

export default function SmoothCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const outer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only show custom cursor on desktop
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setIsDesktop(true);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Move inner dot immediately
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    // Detect hovering on interactive elements
    const onOverInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, select")
      ) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    // Smooth follower animation loop
    let rafId: number;
    const animate = () => {
      outer.current.x += (mouse.current.x - outer.current.x) * 0.12;
      outer.current.y += (mouse.current.y - outer.current.y) * 0.12;
      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${outer.current.x}px, ${outer.current.y}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onOverInteractive);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOverInteractive);
    };
  }, [visible]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Outer ring - smooth follower */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 300ms, width 300ms, height 300ms, margin 300ms",
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          marginLeft: hovering ? -24 : -16,
          marginTop: hovering ? -24 : -16,
        }}
      >
        <div
          className="w-full h-full rounded-full border border-white"
          style={{
            opacity: 0.5,
            transition: "opacity 200ms",
          }}
        />
      </div>
      {/* Inner dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 300ms, width 300ms, height 300ms, margin 300ms",
          width: hovering ? 8 : 5,
          height: hovering ? 8 : 5,
          marginLeft: hovering ? -4 : -2.5,
          marginTop: hovering ? -4 : -2.5,
        }}
      >
        <div className="w-full h-full rounded-full bg-white" />
      </div>
    </>
  );
}
