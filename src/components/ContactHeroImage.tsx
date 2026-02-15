"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ContactHeroImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowH = window.innerHeight;
        // Only compute parallax when element is in viewport
        if (rect.top < windowH && rect.bottom > 0) {
          // Value from 0 (top of viewport) to 1 (bottom)
          const progress = (windowH - rect.top) / (windowH + rect.height);
          setScrollY(progress);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax: image moves slower than scroll (shift range: -30px to +30px)
  const parallaxOffset = (scrollY - 0.5) * 60;

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-gray-900">
      {/* Image container with parallax */}
      <div
        className="relative h-[320px] sm:h-[400px] md:h-[480px] overflow-hidden"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 1200ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* The image with parallax transform */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${parallaxOffset}px) scale(1.15)`,
            willChange: "transform",
          }}
        >
          <Image
            src="/images/contact-hero.jpg"
            alt="Modern glass skyscrapers reaching toward the sky"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

        {/* Left accent line */}
        <div
          className="absolute left-6 md:left-12 top-0 bottom-0 w-[2px]"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(8,145,178,0.6), transparent)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "scaleY(1)" : "scaleY(0)",
            transformOrigin: "top",
            transition:
              "opacity 800ms cubic-bezier(0.16,1,0.3,1) 400ms, transform 1000ms cubic-bezier(0.16,1,0.3,1) 400ms",
          }}
        />

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1400px] w-full mx-auto px-6 pb-10 md:pb-14">
            <div className="max-w-xl">
              {/* Accent tag */}
              <p
                className="text-accent-cyan text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-3"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateX(0)" : "translateX(-30px)",
                  transition:
                    "opacity 700ms cubic-bezier(0.16,1,0.3,1) 600ms, transform 700ms cubic-bezier(0.16,1,0.3,1) 600ms",
                }}
              >
                We&apos;re here to help
              </p>

              {/* Headline */}
              <h2
                className="text-white text-xl sm:text-2xl md:text-3xl font-light leading-snug"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(25px)",
                  transition:
                    "opacity 800ms cubic-bezier(0.16,1,0.3,1) 750ms, transform 800ms cubic-bezier(0.16,1,0.3,1) 750ms",
                }}
              >
                Your challenges are unique.
                <br />
                <span className="text-gray-300">Our solutions should be too.</span>
              </h2>

              {/* Decorative line */}
              <div
                className="mt-5 h-[1px] max-w-[80px]"
                style={{
                  background: "linear-gradient(to right, rgba(8,145,178,0.8), transparent)",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition:
                    "opacity 600ms cubic-bezier(0.16,1,0.3,1) 1000ms, transform 800ms cubic-bezier(0.16,1,0.3,1) 1000ms",
                }}
              />
            </div>
          </div>
        </div>

        {/* Corner decorative element */}
        <div
          className="absolute top-6 right-6 md:top-10 md:right-12"
          style={{
            opacity: isVisible ? 0.4 : 0,
            transition: "opacity 1000ms cubic-bezier(0.16,1,0.3,1) 900ms",
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
            className="text-white/30"
          >
            <path d="M0 0h48v2H2v46H0V0z" fill="currentColor" />
          </svg>
        </div>
      </div>
    </section>
  );
}
