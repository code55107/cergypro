"use client";

import Link from "next/link";
import Image from "next/image";
import GlowCard from "./GlowCard";

export default function FeaturedCard({
  tag,
  title,
  description,
  imageBg,
  imageSrc,
  href = "#",
  reverse = false,
  imagePosition = "center",
}: {
  tag: string;
  title: string;
  description: string;
  imageBg?: string;
  imageSrc?: string;
  href?: string;
  reverse?: boolean;
  imagePosition?: string;
}) {
  return (
    <GlowCard className="rounded-sm">
      <Link
        href={href}
        className="group grid grid-cols-1 md:grid-cols-2 gap-0 bg-white rounded-sm overflow-hidden card-lift"
      >
        <div
          className={`aspect-[16/10] md:aspect-auto min-h-[300px] overflow-hidden relative ${
            reverse ? "md:order-2" : ""
          }`}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              style={{ objectPosition: imagePosition }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div
              className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
              style={{ background: imageBg }}
            />
          )}
        </div>
        <div
          className={`flex flex-col justify-center p-8 md:p-12 ${
            reverse ? "md:order-1" : ""
          }`}
        >
          <p className="text-gray-500 text-xs font-semibold tracking-[0.15em] uppercase mb-4">
            {tag}
          </p>
          <h3 className="text-2xl md:text-3xl font-light text-gray-900 group-hover:text-gray-700 transition-colors duration-300 leading-tight mb-4">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-6 max-w-md group-hover:text-gray-500 transition-colors duration-300">
            {description}
          </p>
          <span className="inline-flex items-center gap-2 text-gray-900 text-sm font-semibold tracking-wider uppercase group-hover:gap-4 transition-all duration-300">
            LEARN MORE
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </div>
      </Link>
    </GlowCard>
  );
}
