"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import MagneticButton from "./MagneticButton";
import Image from "next/image";

export interface HeroSlide {
  tag: string;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
}

const defaultSlides: HeroSlide[] = [
  {
    tag: "CUSTOMER ENGAGEMENT",
    title: "The most trusted\nutility platform\njust got better",
    subtitle:
      "Introducing the new Sightline\u00AE. Now responsibly powered with AI.",
    cta: "LEARN MORE",
    image: "/images/hero-1.jpg",
  },
  {
    tag: "DATA CENTERS",
    title: "Powering the future\nof data center\ninfrastructure",
    subtitle:
      "End-to-end solutions for planning, designing, and optimizing data centers.",
    cta: "EXPLORE",
    image: "/images/hero-2.jpg",
  },
  {
    tag: "DIGITAL PLATFORM",
    title: "Transform your\ncustomer experience\nwith AI",
    subtitle:
      "Our platform delivers personalized engagement at every touchpoint.",
    cta: "DISCOVER",
    image: "/images/hero-3.jpg",
  },
];

const defaultTabLabels = ["Data Centers", "ICF Sightline", "ICF Platform"];

interface HeroProps {
  slides?: HeroSlide[];
  tabLabels?: string[];
}

export default function Hero({ slides: propSlides, tabLabels: propTabLabels }: HeroProps) {
  const slides = propSlides && propSlides.length > 0 ? propSlides : defaultSlides;
  const tabLabels = propTabLabels && propTabLabels.length > 0 ? propTabLabels : defaultTabLabels;

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [slideKey, setSlideKey] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const slide = slides[activeSlide];

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
    setSlideKey((k) => k + 1);
  }, [slides.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.animation = "none";
      void progressRef.current.offsetHeight;
      progressRef.current.style.animation = isPaused
        ? "none"
        : "progressLine 6s linear forwards";
    }
  }, [activeSlide, isPaused]);

  const goToSlide = (i: number) => {
    setActiveSlide(i);
    setSlideKey((k) => k + 1);
  };

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex items-center">
      {/* Background Images */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={s.image}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === activeSlide ? 1 : 0 }}
          >
            <Image
              src={s.image}
              alt=""
              fill
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        ))}
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 pt-32 pb-24 w-full">
        <div className="max-w-2xl">
          <p
            key={`tag-${slideKey}`}
            className="text-accent-cyan text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 500ms cubic-bezier(0.16,1,0.3,1) 200ms, transform 500ms cubic-bezier(0.16,1,0.3,1) 200ms",
            }}
          >
            {slide.tag}
          </p>

          <h1 key={`title-${slideKey}`} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-6">
            {slide.title.split("\n").map((line, li) => (
              <span key={li} className="block overflow-hidden">
                <span
                  className="block"
                  style={{
                    opacity: loaded ? 1 : 0,
                    transform: loaded ? "translateY(0)" : "translateY(100%)",
                    transition: `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${300 + li * 120}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${300 + li * 120}ms`,
                  }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            key={`sub-${slideKey}`}
            className="text-gray-300 text-base sm:text-lg mb-10 max-w-md"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 600ms cubic-bezier(0.16,1,0.3,1) 700ms, transform 600ms cubic-bezier(0.16,1,0.3,1) 700ms",
            }}
          >
            {slide.subtitle}
          </p>

          <div
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 600ms cubic-bezier(0.16,1,0.3,1) 900ms, transform 600ms cubic-bezier(0.16,1,0.3,1) 900ms",
            }}
          >
            <MagneticButton strength={0.15}>
              <button className="btn-shine inline-flex items-center gap-2 px-8 py-3 border border-white/30 text-white text-sm font-semibold tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300">
                {slide.cta}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </MagneticButton>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-6 right-6 flex items-center justify-between"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 600ms 1100ms" }}
        >
          <div className="flex items-center gap-8">
            <button
              onClick={() => { setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length); setSlideKey((k) => k + 1); }}
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all hover:scale-110"
              aria-label="Previous slide"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {tabLabels.map((label, i) => (
              <button
                key={label}
                onClick={() => goToSlide(i)}
                className={`relative text-sm transition-colors pb-2 ${i === activeSlide ? "text-white font-medium" : "text-gray-400 hover:text-gray-200"}`}
              >
                {label}
                {i === activeSlide && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/30 overflow-hidden">
                    <div ref={progressRef} className="h-full bg-white origin-left" style={{ animation: isPaused ? "none" : "progressLine 6s linear forwards", transformOrigin: "left" }} />
                  </div>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all hover:scale-110"
            aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
          >
            {isPaused ? (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><polygon points="5,3 19,12 5,21" /></svg>
            ) : (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
