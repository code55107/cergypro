"use client";

import Link from "next/link";
import Image from "next/image";
import TiltCard from "./TiltCard";
import GlowCard from "./GlowCard";

export default function ContentCard({
  tag,
  title,
  description,
  imageBg,
  imageSrc,
  href = "#",
}: {
  tag: string;
  title: string;
  description?: string;
  imageBg?: string;
  imageSrc?: string;
  href?: string;
}) {
  return (
    <TiltCard maxTilt={4}>
      <GlowCard className="rounded-sm">
        <Link href={href} className="group block card-lift rounded-sm">
          <div className="aspect-[16/10] rounded-sm mb-4 overflow-hidden relative">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <div
                className="w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                style={{ background: imageBg }}
              />
            )}
          </div>
          <p className="text-gray-500 text-xs font-semibold tracking-[0.15em] uppercase mb-2">
            {tag}
          </p>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-600 transition-colors duration-300 leading-tight mb-2">
            {title}
          </h3>
          {description && (
            <p className="text-gray-600 text-sm line-clamp-2 group-hover:text-gray-500 transition-colors duration-300">
              {description}
            </p>
          )}
        </Link>
      </GlowCard>
    </TiltCard>
  );
}
