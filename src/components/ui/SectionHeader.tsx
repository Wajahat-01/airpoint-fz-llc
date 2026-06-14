import React from "react";
import { cn } from "@/utils/cn";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "space-y-4",
        isCenter ? "text-center max-w-3xl mx-auto" : "max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "section-eyebrow inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider",
            isCenter && "mx-auto"
          )}
        >
          <span className="section-eyebrow-dot w-1.5 h-1.5 rounded-full bg-brand-cyan" />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="font-outfit font-black text-3xl sm:text-4xl text-white tracking-tight text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed text-balance">
          {subtitle}
        </p>
      )}
    </div>
  );
}
